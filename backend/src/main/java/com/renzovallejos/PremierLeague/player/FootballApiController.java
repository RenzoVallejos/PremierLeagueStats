package com.renzovallejos.PremierLeague.player;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FootballApiController {

    private final FootballApiService footballApiService;

    public FootballApiController(FootballApiService footballApiService) {
        this.footballApiService = footballApiService;
    }

    @GetMapping("/live-scorers")
    public ResponseEntity<List<PlayerDTO>> getLiveScorers() {
        List<PlayerDTO> players = footballApiService.getTopScorers();
        return ResponseEntity.ok(players);
    }
   @GetMapping("/standings")
   public ResponseEntity<List<StandingsDTO>> getStandings() {
       List<StandingsDTO> standings = footballApiService.getStandings();
       return ResponseEntity.ok(standings);
    }

    @GetMapping("/live-matches")
    public ResponseEntity<List<MatchDTO>> getLiveMatches() {
        List<MatchDTO> matches = footballApiService.getMatches();
        return ResponseEntity.ok(matches);
    }

}
