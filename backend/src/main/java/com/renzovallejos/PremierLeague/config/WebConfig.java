/**
 * WebConfig.java
 *
 * This configuration class enables Cross-Origin Resource Sharing (CORS) globally
 * for the Spring Boot backend. CORS is required so that the frontend can successfully make requests
 * to the backend.
 * Without this, the browser will block API calls due to cross-origin restrictions.
 */

package com.renzovallejos.PremierLeague.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                                "http://localhost:3000",  // for local React dev
                                "https://premier-league-stats.vercel.app" // your Vercel frontend
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
