package com.renzovallejos.PremierLeague.live;

public class StandingsDTO {
    private int position;
    private String teamName;
    private String crest;
    private int playedGames;
    private int won;
    private int draw;
    private int lost;
    private int points;
    private int goalsFor;
    private int goalsAgainst;
    private int goalDifference;

    public StandingsDTO(int position, String teamName, String crest,
                        int playedGames, int won, int draw, int lost,
                        int points, int goalsFor, int goalsAgainst, int goalDifference) {
        this.position = position;
        this.teamName = teamName;
        this.crest = crest;
        this.playedGames = playedGames;
        this.won = won;
        this.draw = draw;
        this.lost = lost;
        this.points = points;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.goalDifference = goalDifference;
    }

    // Getters
    public int getPosition() { return position; }
    public String getTeamName() { return teamName; }
    public String getCrest() { return crest; }
    public int getPlayedGames() { return playedGames; }
    public int getWon() { return won; }
    public int getDraw() { return draw; }
    public int getLost() { return lost; }
    public int getPoints() { return points; }
    public int getGoalsFor() { return goalsFor; }
    public int getGoalsAgainst() { return goalsAgainst; }
    public int getGoalDifference() { return goalDifference; }
}

