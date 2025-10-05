/**
 * FootballApiServiceTest.java
 * 
 * Unit tests for FootballApiService class that handles external Football API integration.
 * Tests all service methods that fetch and parse live Premier League data:
 * - Match data parsing
 * - Top scorers data parsing  
 * - League standings data parsing
 * - Team details data parsing
 * - Error handling scenarios
 */
package com.renzovallejos.PremierLeague.live;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class FootballApiServiceTest {

    private RestTemplate restTemplate;
    private ObjectMapper objectMapper;
    private FootballApiService footballApiService;

    /**
     * Set up test dependencies before each test method.
     * Creates mock RestTemplate and real ObjectMapper for JSON parsing.
     */
    @BeforeEach
    void setUp() {
        restTemplate = mock(RestTemplate.class);
        objectMapper = new ObjectMapper();
        footballApiService = new FootballApiService(restTemplate, objectMapper);
    }

    /**
     * Test that getMatches() correctly parses Football API JSON response
     * and converts it to MatchDTO objects with all required fields.
     */
    @Test
    void testGetMatchesParsesCorrectly() throws Exception {
        String mockJson = """
        {
          "matches": [
            {
              "id": 12345,
              "utcDate": "2025-09-07T14:00:00Z",
              "status": "SCHEDULED",
              "homeTeam": { "id": 57, "name": "Arsenal", "crest": "arsenal.png" },
              "awayTeam": { "id": 61, "name": "Chelsea", "crest": "chelsea.png" },
              "score": { "fullTime": { "home": 2, "away": 1 } }
            }
          ]
        }
        """;

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(String.class)
        )).thenReturn(ResponseEntity.ok(mockJson));

        List<MatchDTO> matches = footballApiService.getMatches();

        assertNotNull(matches);
        assertEquals(1, matches.size());

        MatchDTO match = matches.get(0);
        assertEquals(12345L, match.getId());
        assertEquals("Arsenal", match.getHomeTeamName());
        assertEquals("Chelsea", match.getAwayTeamName());
        assertEquals(2, match.getHomeScore());
        assertEquals(1, match.getAwayScore());
        assertEquals("SCHEDULED", match.getStatus());
    }

    /**
     * Test that getTopScorers() correctly parses Football API JSON response
     * and converts it to PlayerDTO objects with goals and assists data.
     */
    @Test
    void testGetTopScorersParsesCorrectly() {
        String mockJson = """
        {
          "scorers": [
            {
              "player": {
                "name": "Erling Haaland",
                "position": "Centre-Forward",
                "dateOfBirth": "2000-07-21",
                "nationality": "Norway"
              },
              "team": {
                "name": "Manchester City FC",
                "crest": "https://crests.football-data.org/65.png"
              },
              "goals": 15,
              "assists": 3
            }
          ]
        }
        """;

        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(String.class)))
                .thenReturn(ResponseEntity.ok(mockJson));

        List<PlayerDTO> players = footballApiService.getTopScorers();

        assertNotNull(players);
        assertEquals(1, players.size());
        
        PlayerDTO player = players.get(0);
        assertEquals("Erling Haaland", player.getPlayerName());
        assertEquals("Manchester City FC", player.getTeamName());
        assertEquals("Centre-Forward", player.getPosition());
        assertEquals("Norway", player.getNation());
        assertEquals(15, player.getGoals());
        assertEquals(3, player.getAssists());
    }

    /**
     * Test that getStandings() correctly parses Football API JSON response
     * and converts it to StandingsDTO objects with league table data.
     */
    @Test
    void testGetStandingsParsesCorrectly() {
        String mockJson = """
        {
          "standings": [
            {
              "table": [
                {
                  "position": 1,
                  "team": {
                    "id": 65,
                    "name": "Manchester City FC",
                    "crest": "https://crests.football-data.org/65.png"
                  },
                  "playedGames": 20,
                  "won": 15,
                  "draw": 3,
                  "lost": 2,
                  "points": 48,
                  "goalsFor": 45,
                  "goalsAgainst": 15,
                  "goalDifference": 30
                }
              ]
            }
          ]
        }
        """;

        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(String.class)))
                .thenReturn(ResponseEntity.ok(mockJson));

        List<StandingsDTO> standings = footballApiService.getStandings();

        assertNotNull(standings);
        assertEquals(1, standings.size());
        
        StandingsDTO team = standings.get(0);
        assertEquals(1, team.getPosition());
        assertEquals(65L, team.getTeamId());
        assertEquals("Manchester City FC", team.getTeamName());
        assertEquals(20, team.getPlayedGames());
        assertEquals(15, team.getWon());
        assertEquals(48, team.getPoints());
    }

    /**
     * Test that getTeamById() correctly parses Football API JSON response
     * and converts it to TeamDTO object with squad player data.
     */
    @Test
    void testGetTeamByIdParsesCorrectly() {
        String mockJson = """
        {
          "id": 65,
          "name": "Manchester City FC",
          "crest": "https://crests.football-data.org/65.png",
          "squad": [
            {
              "name": "Erling Haaland",
              "position": "Centre-Forward",
              "dateOfBirth": "2000-07-21",
              "nationality": "Norway"
            }
          ]
        }
        """;

        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(String.class)))
                .thenReturn(ResponseEntity.ok(mockJson));

        TeamDTO team = footballApiService.getTeamById(65L);

        assertNotNull(team);
        assertEquals(65L, team.getId());
        assertEquals("Manchester City FC", team.getName());
        assertNotNull(team.getSquad());
        assertEquals(1, team.getSquad().size());
        assertEquals("Erling Haaland", team.getSquad().get(0).getPlayerName());
    }

    /**
     * Test that service methods return empty lists when API calls fail,
     * ensuring graceful error handling without throwing exceptions.
     */
    @Test
    void testErrorHandlingReturnsEmptyResults() {
        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(String.class)))
                .thenThrow(new RuntimeException("API Error"));

        List<PlayerDTO> players = footballApiService.getTopScorers();
        List<MatchDTO> matches = footballApiService.getMatches();
        List<StandingsDTO> standings = footballApiService.getStandings();
        TeamDTO team = footballApiService.getTeamById(65L);

        assertNotNull(players);
        assertTrue(players.isEmpty());
        assertNotNull(matches);
        assertTrue(matches.isEmpty());
        assertNotNull(standings);
        assertTrue(standings.isEmpty());
        assertNull(team);
    }
}

