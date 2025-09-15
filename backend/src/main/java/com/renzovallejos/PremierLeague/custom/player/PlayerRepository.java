package com.renzovallejos.PremierLeague.custom.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<PlayerEntity, String> {
    void deleteByPlayerName(String playername);
    Optional<PlayerEntity> findByPlayerName(String playername);
}
