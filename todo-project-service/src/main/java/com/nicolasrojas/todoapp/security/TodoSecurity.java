package com.nicolasrojas.todoapp.security;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class TodoSecurity  {
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.cors(cors -> cors.configurationSource(request -> {
					CorsConfiguration config = new CorsConfiguration();
					config.addAllowedOrigin("*");
					config.setAllowedMethods(Collections.singletonList("*"));
					config.setAllowCredentials(false);
					config.setAllowedHeaders(Collections.singletonList("*"));
					config.setExposedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-type"));
					config.setMaxAge(3600L);
					return config;
				}))
				.authorizeHttpRequests((authorize) -> authorize
			        .requestMatchers("/todos/**").permitAll()
			        .anyRequest().authenticated())
				.csrf(csrf -> csrf.disable());
		return http.build();
	}
}
