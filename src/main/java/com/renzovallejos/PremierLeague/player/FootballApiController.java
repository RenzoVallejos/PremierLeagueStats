package com.renzovallejos.PremierLeague.player;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FootballApiController {

    private final FootballApiService footballApiService;

    public FootballApiController(FootballApiService footballApiService) {
        this.footballApiService = footballApiService;
    }

    @GetMapping("/live-scorers")
    public ResponseEntity<String> getLiveScorers() {
        String json = footballApiService.getTopScorers();
        return ResponseEntity.ok(json);
    }
}
