package com.renzovallejos.PremierLeague;

import com.renzovallejos.PremierLeague.player.PlayerEntity;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PlayerEntityTest {

    @Test
    void testPlayerEntityFields() {
        // Arrange
        PlayerEntity player = new PlayerEntity();

        // Act
        player.setPlayerName("John Doe");
        player.setNation("England");
        player.setPosition("Forward");
        player.setAge(25);

        // Assert
        assertEquals("John Doe", player.getPlayerName());
        assertEquals("England", player.getNation());
        assertEquals("Forward", player.getPosition());
        assertEquals(25, player.getAge());
    }

    @Test
    void testPlayerEquality() {
        // Arrange
        PlayerEntity player1 = new PlayerEntity("John Doe", "England", "Forward", 25, 100, 80, 2000.0, 50.0, 20.0, 5.0, 10.0, 2.0, 15.0, 10.0, "Team A");
        PlayerEntity player2 = new PlayerEntity("John Doe", "England", "Forward", 25, 100, 80, 2000.0, 50.0, 20.0, 5.0, 10.0, 2.0, 15.0, 10.0, "Team A");

        // Act & Assert
        assertEquals(player1, player2);  // Ensure custom equals() works as expected
        assertEquals(player1.hashCode(), player2.hashCode());  // Test hashCode consistency
    }
}

