package com.renzovallejos.PremierLeague.player;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.renzovallejos.PremierLeague.player.TeamEntity;

import jakarta.persistence.*;

@Entity
@Table(name = "player_stats")
public class PlayerEntity {

    @Id
    @Column(name = "player_name", unique = true)
    private String playerName;

    @ManyToOne
    @JoinColumn(name = "team_id") // This maps the foreign key in the Player table
    @JsonBackReference
    private TeamEntity team;

    @Column(name = "nation")
    private String nation;

    @Column(name = "position")
    private String position;

    @Column(name = "age")
    private Integer age;

    @Column(name = "matches_played")
    private Integer matchesPlayed;

    @Column(name = "starts")
    private Integer starts;

    @Column(name = "minutes_played")
    private Double minutesPlayed;

    @Column(name = "goals")
    private Double goals;

    @Column(name = "assists")
    private Double assists;

    @Column(name = "penalties_scored")
    private Double penaltiesScored;

    @Column(name = "yellow_cards")
    private Double yellowCards;

    @Column(name = "red_cards")
    private Double redCards;

    @Column(name = "expected_goals")
    private Double expectedGoals;

    @Column(name = "expected_assists")
    private Double expectedAssists;

    @Column(name = "team_name")
    private String teamName;

    public PlayerEntity() {
    }

    public PlayerEntity(String playerName, String nation, String position, Integer age, Integer matchesPlayed, Integer starts, Double minutesPlayed, Double goals, Double assists, Double penaltiesScored, Double yellowCards, Double redCards, Double expectedGoals, Double expectedAssists, String teamName) {
        this.playerName = playerName;
        this.nation = nation;
        this.position = position;
        this.age = age;
        this.matchesPlayed = matchesPlayed;
        this.starts = starts;
        this.minutesPlayed = minutesPlayed;
        this.goals = goals;
        this.assists = assists;
        this.penaltiesScored = penaltiesScored;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
        this.expectedGoals = expectedGoals;
        this.expectedAssists = expectedAssists;
        this.teamName = teamName;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getMatchesPlayed() {
        return matchesPlayed;
    }

    public void setMatchesPlayed(Integer matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public Integer getStarts() {
        return starts;
    }

    public void setStarts(Integer starts) {
        this.starts = starts;
    }

    public Double getMinutesPlayed() {
        return minutesPlayed;
    }

    public void setMinutesPlayed(Double minutesPlayed) {
        this.minutesPlayed = minutesPlayed;
    }

    public Double getGoals() {
        return goals;
    }

    public void setGoals(Double goals) {
        this.goals = goals;
    }

    public Double getAssists() {
        return assists;
    }

    public void setAssists(Double assists) {
        this.assists = assists;
    }

    public Double getPenaltiesScored() {
        return penaltiesScored;
    }

    public void setPenaltiesScored(Double penaltiesScored) {
        this.penaltiesScored = penaltiesScored;
    }

    public Double getYellowCards() {
        return yellowCards;
    }

    public void setYellowCards(Double yellowCards) {
        this.yellowCards = yellowCards;
    }

    public Double getRedCards() {
        return redCards;
    }

    public void setRedCards(Double redCards) {
        this.redCards = redCards;
    }

    public Double getExpectedGoals() {
        return expectedGoals;
    }

    public void setExpectedGoals(Double expectedGoals) {
        this.expectedGoals = expectedGoals;
    }

    public Double getExpectedAssists() {
        return expectedAssists;
    }

    public void setExpectedAssists(Double expectedAssists) {
        this.expectedAssists = expectedAssists;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlayerEntity)) return false;
        PlayerEntity that = (PlayerEntity) o;
        return Double.compare(that.getPenaltiesScored(), getPenaltiesScored()) == 0 &&
                Double.compare(that.getYellowCards(), getYellowCards()) == 0 &&
                Double.compare(that.getRedCards(), getRedCards()) == 0 &&
                Double.compare(that.getExpectedGoals(), getExpectedGoals()) == 0 &&
                Double.compare(that.getExpectedAssists(), getExpectedAssists()) == 0 &&
                getPlayerName().equals(that.getPlayerName()) &&
                getNation().equals(that.getNation()) &&
                getPosition().equals(that.getPosition()) &&
                getAge().equals(that.getAge()) &&
                getMatchesPlayed().equals(that.getMatchesPlayed()) &&
                getStarts().equals(that.getStarts()) &&
                getMinutesPlayed().equals(that.getMinutesPlayed()) &&
                getGoals().equals(that.getGoals()) &&
                getAssists().equals(that.getAssists()) &&
                getTeamName().equals(that.getTeamName());
    }

    @Override
    public int hashCode() {
        int result = 1;
        result = 31 * result + (playerName != null ? playerName.hashCode() : 0);
        result = 31 * result + (nation != null ? nation.hashCode() : 0);
        result = 31 * result + (position != null ? position.hashCode() : 0);
        result = 31 * result + (age != null ? age.hashCode() : 0);
        result = 31 * result + (matchesPlayed != null ? matchesPlayed.hashCode() : 0);
        result = 31 * result + (starts != null ? starts.hashCode() : 0);
        result = 31 * result + (minutesPlayed != null ? minutesPlayed.hashCode() : 0);
        result = 31 * result + (goals != null ? goals.hashCode() : 0);
        result = 31 * result + (assists != null ? assists.hashCode() : 0);
        result = 31 * result + (penaltiesScored != null ? penaltiesScored.hashCode() : 0);
        result = 31 * result + (yellowCards != null ? yellowCards.hashCode() : 0);
        result = 31 * result + (redCards != null ? redCards.hashCode() : 0);
        result = 31 * result + (expectedGoals != null ? expectedGoals.hashCode() : 0);
        result = 31 * result + (expectedAssists != null ? expectedAssists.hashCode() : 0);
        result = 31 * result + (teamName != null ? teamName.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "PlayerEntity{" +
                "playerName='" + playerName + '\'' +
                ", nation='" + nation + '\'' +
                ", position='" + position + '\'' +
                ", age=" + age +
                ", matchesPlayed=" + matchesPlayed +
                ", starts=" + starts +
                ", minutesPlayed=" + minutesPlayed +
                ", goals=" + goals +
                ", assists=" + assists +
                ", penaltiesScored=" + penaltiesScored +
                ", yellowCards=" + yellowCards +
                ", redCards=" + redCards +
                ", expectedGoals=" + expectedGoals +
                ", expectedAssists=" + expectedAssists +
                ", teamName='" + teamName + '\'' +
                '}';
    }
}
