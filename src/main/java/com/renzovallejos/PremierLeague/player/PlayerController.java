package com.renzovallejos.PremierLeague.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller // Use @Controller instead of @RestController to work with Thymeleaf
@RequestMapping(path = "players")
@CrossOrigin(origins = "http://localhost:3000")

public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    // This method handles GET requests and returns a Thymeleaf template
    @GetMapping
    public String getPlayers(@RequestParam(required = false) String name,
                             @RequestParam(required = false) String team,
                             @RequestParam(required = false) String position,
                             @RequestParam(required = false) String nation,
                             Model model) {
        List<PlayerEntity> players;

        // Filtering logic based on request parameters
        if (team != null && position != null) {
            players = playerService.getPlayersByTeamAndPosition(team, position);
        } else if (team != null) {
            players = playerService.getPlayersFromTeam(team);
        } else if (position != null) {
            players = playerService.getPlayersByPosition(position);
        } else if (name != null) {
            players = playerService.getPlayersByName(name);
        } else if (nation != null) {
            players = playerService.getPlayersByNation(nation);
        } else {
            players = playerService.getAllPlayers();
        }

        // Add the list of players to the model to pass to the Thymeleaf view
        model.addAttribute("players", players);

        // Return the name of the Thymeleaf template to be rendered (without .html)
        return "playerList";
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
