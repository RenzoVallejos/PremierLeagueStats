package com.renzovallejos.PremierLeague.custom;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }
    public TeamEntity getTeamById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with ID: " + id));
    }
    public TeamEntity addTeam(TeamEntity team) {
        return teamRepository.save(team);
    }
    public List<TeamEntity> getLeaderboard() {
        // Delegate the leaderboard query to the repository
        return teamRepository.findLeaderboard();
    }

    public List<TeamEntity> getAllTeams() {
        return teamRepository.findAll();
    }

    public TeamEntity saveTeam(TeamEntity team) {
        return teamRepository.save(team);
    }
}
