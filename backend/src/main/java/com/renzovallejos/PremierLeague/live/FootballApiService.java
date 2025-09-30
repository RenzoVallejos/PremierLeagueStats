package com.renzovallejos.PremierLeague.live;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Service
public class FootballApiService {

    private static final String API_TOKEN = "81810629e7704a509a137696da7133d7";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public FootballApiService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public List<PlayerDTO> getTopScorers() {
        try {
            var headers = new HttpHeaders();
            headers.set("X-Auth-Token", API_TOKEN);
            var entity = new HttpEntity<>(headers);

            var response = restTemplate.exchange(
                    "https://api.football-data.org/v4/competitions/PL/scorers",
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode scorers = root.get("scorers");

            List<PlayerDTO> players = new ArrayList<>();

            for (JsonNode s : scorers) {
                String name = s.get("player").get("name").asText();
                String teamName = s.get("team").get("name").asText();
                String teamCrest = s.get("team").has("crest")
                        ? s.get("team").get("crest").asText()
                        : null;
                String position = s.get("player").has("position")
                        ? s.get("player").get("position").asText()
                        : "N/A";
                String nation = s.get("player").has("nationality")
                        ? s.get("player").get("nationality").asText()
                        : "N/A";

                Integer age = null;
                if (s.get("player").has("dateOfBirth")) {
                    LocalDate dob = LocalDate.parse(s.get("player").get("dateOfBirth").asText());
                    age = Period.between(dob, LocalDate.now()).getYears();
                }

                Integer goals = s.get("goals").asInt();
                Integer assists = (s.has("assists") && !s.get("assists").isNull())
                        ? s.get("assists").asInt()
                        : 0;

                players.add(new PlayerDTO(
                        name, teamName, teamCrest, position,
                        nation, age, goals, assists
                ));
            }

            return players;

        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public List<StandingsDTO> getStandings() {
        try {
            var headers = new HttpHeaders();
            headers.set("X-Auth-Token", API_TOKEN);
            var entity = new HttpEntity<>(headers);

            var response = restTemplate.exchange(
                    "https://api.football-data.org/v4/competitions/PL/standings",
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode table = root.get("standings").get(0).get("table");

            List<StandingsDTO> standings = new ArrayList<>();
            for (JsonNode t : table) {
                int position = t.get("position").asInt();
                Long teamId = t.get("team").get("id").asLong();
                String teamName = t.get("team").get("name").asText();
                String crest = t.get("team").get("crest").asText();
                int playedGames = t.get("playedGames").asInt();
                int won = t.get("won").asInt();
                int draw = t.get("draw").asInt();
                int lost = t.get("lost").asInt();
                int points = t.get("points").asInt();
                int goalsFor = t.get("goalsFor").asInt();
                int goalsAgainst = t.get("goalsAgainst").asInt();
                int goalDifference = t.get("goalDifference").asInt();

                standings.add(new StandingsDTO(
                        position, teamId, teamName, crest,
                        playedGames, won, draw, lost, points,
                        goalsFor, goalsAgainst, goalDifference
                ));
            }
            return standings;

        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public List<MatchDTO> getMatches() {
        try {
            var headers = new HttpHeaders();
            headers.set("X-Auth-Token", API_TOKEN);
            var entity = new HttpEntity<>(headers);

            var response = restTemplate.exchange(
                    "https://api.football-data.org/v4/competitions/PL/matches",
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode matchesNode = root.get("matches");

            List<MatchDTO> matches = new ArrayList<>();
            for (JsonNode m : matchesNode) {
                long id = m.get("id").asLong();
                String utcDate = m.get("utcDate").asText();
                String status = m.get("status").asText();

                String homeTeam = m.get("homeTeam").get("name").asText();
                Long homeTeamId = m.get("homeTeam").get("id").asLong();
                String homeCrest = m.get("homeTeam").has("crest")
                        ? m.get("homeTeam").get("crest").asText()
                        : null;
                Integer homeScore = m.get("score").get("fullTime").get("home").isNull()
                        ? null : m.get("score").get("fullTime").get("home").asInt();

                String awayTeam = m.get("awayTeam").get("name").asText();
                Long awayTeamId = m.get("awayTeam").get("id").asLong();
                String awayCrest = m.get("awayTeam").has("crest")
                        ? m.get("awayTeam").get("crest").asText()
                        : null;
                Integer awayScore = m.get("score").get("fullTime").get("away").isNull()
                        ? null : m.get("score").get("fullTime").get("away").asInt();

                matches.add(new MatchDTO(
                        id, utcDate, status,
                        homeTeamId, homeTeam, homeCrest, homeScore,
                        awayTeamId, awayTeam, awayCrest, awayScore
                ));
            }

            return matches;

        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public TeamDTO getTeamById(Long teamId) {
        try {
            var headers = new HttpHeaders();
            headers.set("X-Auth-Token", API_TOKEN);
            var entity = new HttpEntity<>(headers);

            var response = restTemplate.exchange(
                    "https://api.football-data.org/v4/teams/" + teamId,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            JsonNode root = objectMapper.readTree(response.getBody());

            TeamDTO team = new TeamDTO();
            team.setId(root.get("id").asLong());
            team.setName(root.get("name").asText());
            team.setCrest(root.has("crest") ? root.get("crest").asText() : null);

            List<PlayerDTO> squad = new ArrayList<>();
            if (root.has("squad")) {
                for (JsonNode p : root.get("squad")) {
                    String name = p.get("name").asText();
                    String position = p.has("position") && !p.get("position").isNull()
                            ? p.get("position").asText()
                            : "N/A";
                    String nation = p.has("nationality") ? p.get("nationality").asText() : "N/A";

                    Integer age = null;
                    if (p.has("dateOfBirth") && !p.get("dateOfBirth").isNull()) {
                        LocalDate dob = LocalDate.parse(p.get("dateOfBirth").asText());
                        age = Period.between(dob, LocalDate.now()).getYears();
                    }

                    squad.add(new PlayerDTO(
                            name,
                            team.getName(),
                            team.getCrest(),
                            position,
                            nation,
                            age,
                            0,
                            0
                    ));
                }
            }

            team.setSquad(squad);
            return team;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
