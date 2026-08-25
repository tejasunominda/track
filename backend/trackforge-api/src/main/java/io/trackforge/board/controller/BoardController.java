package io.trackforge.board.controller;

import io.trackforge.board.dto.BoardStateResponse;
import io.trackforge.board.service.BoardService;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/projects/{projectId}/board")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BoardStateResponse> getBoard(@PathVariable UUID projectId) {
        return ResponseEntity.ok(boardService.getBoard(projectId));
    }
}
