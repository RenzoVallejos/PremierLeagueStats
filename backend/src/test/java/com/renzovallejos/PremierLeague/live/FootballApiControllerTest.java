/**
 * FootballApiControllerTest.java
 * 
 * Unit tests for FootballApiController REST endpoints that expose live Premier League data.
 * Tests all controller endpoints that serve external Football API data to the frontend:
 * - GET /api/live-scorers - Top scorers endpoint with player goals/assists
 * - GET /api/standings - League standings endpoint with team positions/points
 * - GET /api/live-matches - Live matches endpoint with scores and status
 * - GET /api/live/teams/{id} - Team details endpoint with squad information
 * - HTTP status code validation (200 OK, 404 Not Found)
 * - Error handling scenarios and empty result handling
 * - Service layer integration through mocking
 */
package com.renzovallejos.PremierLeague.live;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FootballApiControllerTest {

    @Mock
    private FootballApiService footballApiService;

    @InjectMocks
    private FootballApiController footballApiController;

    /**
     * Set up test dependencies before each test method.
     * Initializes mocks and injects them into the controller.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test that GET /api/live-scorers endpoint returns top scorers data
     * with HTTP 200 OK status when service call succeeds.
     */
    @Test
    void testGetLiveScorersReturnsOkWithData() {
        PlayerDTO mockPlayer = new PlayerDTO("Haaland", "Man City", "crest.png", "Forward", "Norway", 24, 15, 3);
        List<PlayerDTO> mockPlayers = List.of(mockPlayer);
        
        when(footballApiService.getTopScorers()).thenReturn(mockPlayers);

        ResponseEntity<List<PlayerDTO>> response = footballApiController.getLiveScorers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals("Haaland", response.getBody().get(0).getPlayerName());
        verify(footballApiService).getTopScorers();
    }

    /**
     * Test that GET /api/standings endpoint returns league standings data
     * with HTTP 200 OK status when service call succeeds.
     */
    @Test
    void testGetStandingsReturnsOkWithData() {
        StandingsDTO mockTeam = new StandingsDTO(1, 65L, "Man City", "crest.png", 20, 15, 3, 2, 48, 45, 15, 30);
        List<StandingsDTO> mockStandings = List.of(mockTeam);
        
        when(footballApiService.getStandings()).thenReturn(mockStandings);

        ResponseEntity<List<StandingsDTO>> response = footballApiController.getStandings();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals("Man City", response.getBody().get(0).getTeamName());
        verify(footballApiService).getStandings();
    }

    /**
     * Test that GET /api/live-matches endpoint returns match data
     * with HTTP 200 OK status when service call succeeds.
     */
    @Test
    void testGetLiveMatchesReturnsOkWithData() {
        MatchDTO mockMatch = new MatchDTO(12345L, "2025-01-15T15:00:00Z", "FINISHED", 
                                         57L, "Arsenal", "arsenal.png", 2,
                                         61L, "Chelsea", "chelsea.png", 1);
        List<MatchDTO> mockMatches = List.of(mockMatch);
        
        when(footballApiService.getMatches()).thenReturn(mockMatches);

        ResponseEntity<List<MatchDTO>> response = footballApiController.getLiveMatches();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals("Arsenal", response.getBody().get(0).getHomeTeamName());
        verify(footballApiService).getMatches();
    }

    /**
     * Test that GET /api/live/teams/{id} endpoint returns team data
     * with HTTP 200 OK status when team exists.
     */
    @Test
    void testGetTeamByIdReturnsOkWhenTeamExists() {
        TeamDTO mockTeam = new TeamDTO();
        mockTeam.setId(65L);
        mockTeam.setName("Man City");
        mockTeam.setCrest("crest.png");
        
        when(footballApiService.getTeamById(65L)).thenReturn(mockTeam);

        ResponseEntity<TeamDTO> response = footballApiController.getTeamById(65L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Man City", response.getBody().getName());
        verify(footballApiService).getTeamById(65L);
    }

    /**
     * Test that GET /api/live/teams/{id} endpoint returns HTTP 404 Not Found
     * when team does not exist or service returns null.
     */
    @Test
    void testGetTeamByIdReturnsNotFoundWhenTeamDoesNotExist() {
        when(footballApiService.getTeamById(999L)).thenReturn(null);

        ResponseEntity<TeamDTO> response = footballApiController.getTeamById(999L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(footballApiService).getTeamById(999L);
    }

    /**
     * Test that all endpoints handle empty results gracefully
     * by returning HTTP 200 OK with empty lists.
     */
    @Test
    void testEndpointsHandleEmptyResultsGracefully() {
        when(footballApiService.getTopScorers()).thenReturn(List.of());
        when(footballApiService.getStandings()).thenReturn(List.of());
        when(footballApiService.getMatches()).thenReturn(List.of());

        ResponseEntity<List<PlayerDTO>> scorersResponse = footballApiController.getLiveScorers();
        ResponseEntity<List<StandingsDTO>> standingsResponse = footballApiController.getStandings();
        ResponseEntity<List<MatchDTO>> matchesResponse = footballApiController.getLiveMatches();

        assertEquals(HttpStatus.OK, scorersResponse.getStatusCode());
        assertTrue(scorersResponse.getBody().isEmpty());
        
        assertEquals(HttpStatus.OK, standingsResponse.getStatusCode());
        assertTrue(standingsResponse.getBody().isEmpty());
        
        assertEquals(HttpStatus.OK, matchesResponse.getStatusCode());
        assertTrue(matchesResponse.getBody().isEmpty());
    }
}