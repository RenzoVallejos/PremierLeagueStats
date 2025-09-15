package com.renzovallejos.PremierLeague.custom;
/* Football API returns messy JSON (nested objects, extra fields).

DTO lets us grab only the fields we care about (name, team, crest, goals, assists, etc.)
and shape them into clean Java objects.

So in the backend, we now have a List<PlayerDTO>.

Spring Boot + Jackson automatically converts that list of DTOs into JSON again,
but this time in the flat, clean format React expects. */
public class PlayerDTO {
    private String playerName;
    private String teamName;
    private String teamCrest; 
    private String position;
    private String nation;
    private Integer age;
    private Integer goals;
    private Integer assists;

    public PlayerDTO(String playerName, String teamName, String teamCrest,
                     String position, String nation,
                     Integer age, Integer goals, Integer assists) {
        this.playerName = playerName;
        this.teamName = teamName;
        this.teamCrest = teamCrest;
        this.position = position;
        this.nation = nation;
        this.age = age;
        this.goals = goals;
        this.assists = assists;
    }

    //  Getters and setters (Lombok can simplify this)
    public String getPlayerName() { return playerName; }
    public String getTeamName() { return teamName; }
    public String getTeamCrest() { return teamCrest; }
    public String getPosition() { return position; }
    public String getNation() { return nation; }
    public Integer getAge() { return age; }
    public Integer getGoals() { return goals; }
    public Integer getAssists() { return assists; }
}
