package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.payload.request.HardinessZoneRequest;
import com.connellboyce.peppergarden.services.HardinessZoneImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping("/api/hardinesszone")
public class HardinessZoneController {

    @Autowired
    private HardinessZoneImpl hardinessZoneImpl;

    /**
     * GET mapping for hardinesszone where the API handles a body
     *
     * @param hardinessZoneRequest Request body that is pre-validated in a prevous class
     * @return Message response for the operation
     */
    @GetMapping("/")
    public ResponseEntity<?> findHardinessByRequestBody(@Valid @RequestBody HardinessZoneRequest hardinessZoneRequest) {
        return hardinessZoneImpl.findHardinessZoneByZipCode(hardinessZoneRequest.getZipCode());
    }

    /**
     * GET mapping for hardinesszone in a RESTful manner
     *
     * @param zipCode path variable for the zip code
     * @return the hardiness zone for the specified zip code
     */
    @GetMapping("/zipcode/{zipCode}")
    public ResponseEntity<?> getByZipCodePath(@PathVariable("zipCode") String zipCode) {
        return hardinessZoneImpl.findHardinessZoneByZipCode(zipCode);
    }
}
