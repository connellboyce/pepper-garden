package com.connellboyce.peppergarden.security.jwt;

import com.connellboyce.peppergarden.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${connellboyce.app.jwtSecret}")
    private String jwtSecret;

    @Value("${connellboyce.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    /**
     * Creates the JWT
     *
     * @param authentication User's authentications
     * @return built JWT
     */
    public String generateJwtToken(Authentication authentication) {

        //Creates a User Detail object with our custom authentications
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        //Build JWT
        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    /**
     * Retrieves username from within the JWT
     *
     * @param token JWT to be parsed
     * @return String username
     */
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * Validates a JWT
     *
     * @param authToken uniquely generated authorization token
     * @return valid or invalid
     */
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
