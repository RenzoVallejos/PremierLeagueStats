package com.renzovallejos.PremierLeague.player;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Service
public class FootballApiService {

    private static final String API_URL = "https://api.football-data.org/v4/competitions/PL/scorers";
    private static final String API_TOKEN = "81810629e7704a509a137696da7133d7";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public FootballApiService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public List<PlayerDTO> getTopScorers() {
        try {
            var headers = new org.springframework.http.HttpHeaders();
            headers.set("X-Auth-Token", API_TOKEN);
            var entity = new org.springframework.http.HttpEntity<>(headers);

            var response = restTemplate.exchange(
                    API_URL,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    String.class
            );

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode scorers = root.get("scorers");

            List<PlayerDTO> players = new ArrayList<>();

            for (JsonNode s : scorers) {
                String name = s.get("player").get("name").asText();
                String teamName = s.get("team").get("name").asText();

                //  New: get crest
                String teamCrest = s.get("team").has("crest") ? s.get("team").get("crest").asText() : null;

                String position = s.get("player").has("position")
                        ? s.get("player").get("position").asText()
                        : "N/A";
                String nation = s.get("player").has("nationality")
                        ? s.get("player").get("nationality").asText()
                        : "N/A";

                //  Calculate age
                Integer age = null;
                if (s.get("player").has("dateOfBirth")) {
                    LocalDate dob = LocalDate.parse(s.get("player").get("dateOfBirth").asText());
                    age = Period.between(dob, LocalDate.now()).getYears();
                }

                Integer goals = s.get("goals").asInt();
                Integer assists = (s.has("assists") && !s.get("assists").isNull())
                        ? s.get("assists").asInt()
                        : 0;

                //  Updated PlayerDTO constructor includes crest
                players.add(new PlayerDTO(
                        name,
                        teamName,
                        teamCrest,
                        position,
                        nation,
                        age,
                        goals,
                        assists
                ));
            }

            return players;

        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // return empty list if error
        }
    }
}
