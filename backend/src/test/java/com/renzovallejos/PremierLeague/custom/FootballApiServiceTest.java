package com.renzovallejos.PremierLeague.custom;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.renzovallejos.PremierLeague.live.FootballApiService;
import com.renzovallejos.PremierLeague.live.MatchDTO;
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

    @BeforeEach
    void setUp() {
        restTemplate = mock(RestTemplate.class);
        objectMapper = new ObjectMapper();
        footballApiService = new FootballApiService(restTemplate, objectMapper); //  pass mocks directly
    }

    @Test
    void testGetMatchesParsesCorrectly() throws Exception {
        String mockJson = """
        {
          "matches": [
            {
              "id": 12345,
              "utcDate": "2025-09-07T14:00:00Z",
              "status": "SCHEDULED",
              "homeTeam": { "name": "Arsenal", "crest": "arsenal.png" },
              "awayTeam": { "name": "Chelsea", "crest": "chelsea.png" },
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
}
