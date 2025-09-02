package com.renzovallejos.PremierLeague.player;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FootballApiService {

    private static final String API_URL = "https://api.football-data.org/v4/competitions/PL/scorers";
    private static final String API_KEY = "81810629e7704a509a137696da7133d7"; // your token

    public String getTopScorers() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Auth-Token", API_KEY);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                API_URL,
                HttpMethod.GET,
                entity,
                String.class
        );

        return response.getBody(); // raw JSON
    }
}
