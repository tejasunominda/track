package io.trackforge.notification.service;

import io.trackforge.common.security.TrackForgePrincipal;
import io.trackforge.notification.dto.NotificationResponse;
import io.trackforge.notification.model.Notification;
import io.trackforge.notification.repository.NotificationRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public void dispatch(UUID userId, String eventType, String title, String body, String entityType, UUID entityId) {
        TrackForgePrincipal principal = currentPrincipal();
        Notification notification = new Notification(
                principal.tenantId(), userId, eventType, title, body);
        notification.setEntityType(entityType);
        notification.setEntityId(entityId);
        notificationRepository.save(notification);
        // Email/SMS/Slack dispatch is stubbed for Phase 2 via NotificationPort.
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> listForCurrentUser() {
        TrackForgePrincipal principal = currentPrincipal();
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(principal.userId()).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void markAsRead(UUID notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        TrackForgePrincipal principal = currentPrincipal();
        if (!notification.getUserId().equals(principal.userId())) {
            throw new AccessDeniedException("Not your notification");
        }
        if (notification.getReadAt() == null) {
            notification.setReadAt(java.time.Instant.now());
            notificationRepository.save(notification);
        }
    }

    private NotificationResponse toResponse(Notification n) {
        return new NotificationResponse(
                n.getId(),
                n.getEventType(),
                n.getEntityType(),
                n.getEntityId(),
                n.getTitle(),
                n.getBody(),
                n.getReadAt() != null,
                n.getCreatedAt());
    }

    private TrackForgePrincipal currentPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof TrackForgePrincipal trackForgePrincipal) {
            return trackForgePrincipal;
        }
        throw new AccessDeniedException("User not authenticated");
    }
}
