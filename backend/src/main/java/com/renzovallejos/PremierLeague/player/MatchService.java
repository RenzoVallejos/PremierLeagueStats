package com.renzovallejos.PremierLeague.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private TeamRepository teamRepository;

    public MatchEntity saveMatch(MatchEntity match) {
        if (match.getHomeTeam().getId().equals(match.getAwayTeam().getId())) {
            throw new IllegalArgumentException("Home and Away teams cannot be the same.");
        }

        TeamEntity homeTeam = teamRepository.findById(match.getHomeTeam().getId())
                .orElseThrow(() -> new RuntimeException("Home team not found"));
        TeamEntity awayTeam = teamRepository.findById(match.getAwayTeam().getId())
                .orElseThrow(() -> new RuntimeException("Away team not found"));

        updateTeamStats(match, homeTeam, awayTeam);

        match.setHomeTeam(homeTeam);
        match.setAwayTeam(awayTeam);

        return matchRepository.save(match);
    }

    private void updateTeamStats(MatchEntity match, TeamEntity homeTeam, TeamEntity awayTeam) {
        if (match.getHomeTeamScore() > match.getAwayTeamScore()) {
            homeTeam.setWins(homeTeam.getWins() + 1);
            awayTeam.setLosses(awayTeam.getLosses() + 1);
        } else if (match.getHomeTeamScore() < match.getAwayTeamScore()) {
            awayTeam.setWins(awayTeam.getWins() + 1);
            homeTeam.setLosses(homeTeam.getLosses() + 1);
        } else {
            homeTeam.setDraws(homeTeam.getDraws() + 1);
            awayTeam.setDraws(awayTeam.getDraws() + 1);
        }
        homeTeam.setGoalsScored(homeTeam.getGoalsScored() + match.getHomeTeamScore());
        awayTeam.setGoalsScored(awayTeam.getGoalsScored() + match.getAwayTeamScore());
        homeTeam.setGoalsConceded(homeTeam.getGoalsConceded() + match.getAwayTeamScore());
        awayTeam.setGoalsConceded(awayTeam.getGoalsConceded() + match.getHomeTeamScore());

        teamRepository.save(homeTeam);
        teamRepository.save(awayTeam);
    }

    public List<MatchEntity> getAllMatches() {
        return matchRepository.findAll();
    }
}
