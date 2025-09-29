package com.renzovallejos.PremierLeague.live;

import java.util.List;

public class TeamDTO {
    private Long id;
    private String name;
    private String crest;
    private List<PlayerDTO> squad;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCrest() { return crest; }
    public void setCrest(String crest) { this.crest = crest; }

    public List<PlayerDTO> getSquad() { return squad; }
    public void setSquad(List<PlayerDTO> squad) { this.squad = squad; }
}
