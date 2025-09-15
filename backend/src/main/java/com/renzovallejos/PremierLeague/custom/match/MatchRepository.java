package com.renzovallejos.PremierLeague.custom;

import com.renzovallejos.PremierLeague.custom.match.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<MatchEntity, Long> {
}
