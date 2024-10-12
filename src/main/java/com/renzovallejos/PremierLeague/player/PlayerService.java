package com.renzovallejos.PremierLeague.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<PlayerEntity> getAllPlayers(){
        return playerRepository.findAll();
    }

    public List<PlayerEntity> getPlayersFromTeam(String teamname) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeamName().equals(teamname))
                .collect(Collectors.toList());
    }
    public List<PlayerEntity> getPlayersByName(String name) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPlayerName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<PlayerEntity> getPlayersByPosition(String position) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPosition() != null)
                .filter(player -> player.getPosition().toLowerCase().contains(position.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<PlayerEntity> getPlayersByNation(String nation) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getNation() != null)
                .filter(player -> player.getNation().toLowerCase().contains(nation.toLowerCase()))
                .collect(Collectors.toList());
    }
    public List<PlayerEntity> getPlayersByTeamAndPosition(String team, String position) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPosition() != null)
                .filter(player -> player.getTeamName().equals(team) && player.getPosition().toLowerCase().contains(position.toLowerCase()))
                .collect(Collectors.toList());
    }

    public PlayerEntity addPlayer(PlayerEntity player) {
        return playerRepository.save(player);
    }
    public PlayerEntity updatePlayer(PlayerEntity playertoupdate) {
        Optional<PlayerEntity> existingplayer = playerRepository.findByPlayerName(playertoupdate.getPlayerName());
        if (existingplayer.isEmpty()) {
            throw new ResourceNotFoundException("No players found with name: " + playertoupdate.getPlayerName());
        }
        else {
           PlayerEntity updatedPlayer = existingplayer.get();
           updatedPlayer.setPlayerName(playertoupdate.getPlayerName());
           updatedPlayer.setPosition(playertoupdate.getPosition());
           updatedPlayer.setNation(playertoupdate.getNation());
           updatedPlayer.setTeamName(playertoupdate.getTeamName());
            playerRepository.save(updatedPlayer);
            return updatedPlayer;
        }
    }

    @Transactional
    public void deletePlayer(String playerName) {
         playerRepository.deleteByPlayerName(playerName);
    }

}
