# trackforge-notification-service

Extractable service candidate (Phase 2, see Technical Architecture Document §2.1).
Consumes notification events from Kafka (emitted by `trackforge-api`), renders and
sends email notifications, and drives the in-app notification center's async writes.

Not required for MVP — `trackforge-api`'s `notification` module handles this
in-process until independent scaling is needed (see Feature Ticket [F8-02]).
