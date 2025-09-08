package com.renzovallejos.PremierLeague.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {

    @Query("SELECT t FROM TeamEntity t ORDER BY (t.wins * 3 + t.draws) DESC, (t.goalsScored - t.goalsConceded) DESC, t.goalsScored DESC")
    List<TeamEntity> findLeaderboard(); // Calculates points dynamically and sorts the leaderboard
}
