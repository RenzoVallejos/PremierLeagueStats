package com.renzovallejos.PremierLeague.custom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Use @Controller instead of @RestController to work with Thymeleaf
@RequestMapping(path = "players")

public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }


    @GetMapping
    public List<PlayerEntity> getPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String nation) {

        if (team != null && position != null) {
            return playerService.getPlayersByTeamAndPosition(team, position);
        } else if (team != null) {
            return playerService.getPlayersFromTeam(team);
        } else if (position != null) {
            return playerService.getPlayersByPosition(position);
        } else if (name != null) {
            return playerService.getPlayersByName(name);
        } else if (nation != null) {
            return playerService.getPlayersByNation(nation);
        } else {
            return playerService.getAllPlayers();
        }
    }
    // This method handles adding a new player using POST
    @PostMapping
    public ResponseEntity<PlayerEntity> addPlayer(@RequestBody PlayerEntity player) {
        PlayerEntity createdPlayer = playerService.addPlayer(player);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    // This method handles updating an existing player using PUT
    @PutMapping
    public ResponseEntity<PlayerEntity> updatePlayer(@RequestBody PlayerEntity player) {
        try {
            PlayerEntity updatedPlayer = playerService.updatePlayer(player);
            return new ResponseEntity<>(updatedPlayer, HttpStatus.OK);  // Return 200 OK with the updated player
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Return 404 Not Found if the player doesn't exist
        }
    }

    // This method handles deleting a player using DELETE
    @DeleteMapping("/{playerName}")
    public ResponseEntity<String> deletePlayer(@PathVariable String playerName) {
        playerService.deletePlayer(playerName);
        return new ResponseEntity<>("The player was deleted successfully", HttpStatus.OK);
    }
}
