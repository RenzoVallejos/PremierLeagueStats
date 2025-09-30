package com.renzovallejos.PremierLeague.live;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchDTO {
    private Long id;
    private String utcDate;
    private String status;

    private Long homeTeamId;
    private String homeTeamName;
    private String homeTeamCrest;
    private Integer homeScore;

    private Long awayTeamId;
    private String awayTeamName;
    private String awayTeamCrest;
    private Integer awayScore;
}
