package com.renzovallejos.PremierLeague.live;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FootballApiController {

    private final FootballApiService footballApiService;

    public FootballApiController(FootballApiService footballApiService) {
        this.footballApiService = footballApiService;
    }

    // ================================
    // TOP SCORERS
    // ================================
    @GetMapping("/live-scorers")
    public ResponseEntity<List<PlayerDTO>> getLiveScorers() {
        List<PlayerDTO> players = footballApiService.getTopScorers();
        return ResponseEntity.ok(players);
    }

    // ================================
    // STANDINGS
    // ================================
    @GetMapping("/standings")
    public ResponseEntity<List<StandingsDTO>> getStandings() {
        List<StandingsDTO> standings = footballApiService.getStandings();
        return ResponseEntity.ok(standings);
    }

    // ================================
    // MATCHES
    // ================================
    @GetMapping("/live-matches")
    public ResponseEntity<List<MatchDTO>> getLiveMatches() {
        List<MatchDTO> matches = footballApiService.getMatches();
        return ResponseEntity.ok(matches);
    }

    // ================================
    // TEAM + ROSTER (LIVE API ONLY)
    // ================================
    @GetMapping("/live/teams/{id}")
    public ResponseEntity<TeamDTO> getTeamById(@PathVariable Long id) {
        TeamDTO team = footballApiService.getTeamById(id);
        if (team == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(team);
    }
}
