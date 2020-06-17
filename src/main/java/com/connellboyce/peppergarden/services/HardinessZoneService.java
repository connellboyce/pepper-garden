package com.connellboyce.peppergarden.services;

import org.springframework.http.ResponseEntity;

public interface HardinessZoneService {
    public ResponseEntity<?> findHardinessZoneByZipCode(String zipCode);
}
