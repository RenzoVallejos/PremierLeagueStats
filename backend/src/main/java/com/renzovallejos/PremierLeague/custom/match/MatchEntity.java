package com.renzovallejos.PremierLeague.custom.match;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.renzovallejos.PremierLeague.custom.team.TeamEntity;
import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
public class MatchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "home_team_id")
    @JsonBackReference(value = "homeTeamReference")
    private TeamEntity homeTeam;

    @ManyToOne
    @JoinColumn(name = "away_team_id")
    @JsonBackReference(value = "awayTeamReference")
    private TeamEntity awayTeam;



    @Column(name = "home_score") // Maps to the database column "home_score"
    private int homeTeamScore;

    @Column(name = "away_score") // Maps to the database column "away_score"
    private int awayTeamScore;

    @Column(name = "match_date") // Maps to the database column "match_date"
    private LocalDate matchDate;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TeamEntity getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(TeamEntity homeTeam) {
        this.homeTeam = homeTeam;
    }

    public TeamEntity getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(TeamEntity awayTeam) {
        this.awayTeam = awayTeam;
    }

    public int getHomeTeamScore() {
        return homeTeamScore;
    }

    public void setHomeTeamScore(int homeTeamScore) {
        this.homeTeamScore = homeTeamScore;
    }

    public int getAwayTeamScore() {
        return awayTeamScore;
    }

    public void setAwayTeamScore(int awayTeamScore) {
        this.awayTeamScore = awayTeamScore;
    }

    public LocalDate getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDate matchDate) {
        this.matchDate = matchDate;
    }
}

