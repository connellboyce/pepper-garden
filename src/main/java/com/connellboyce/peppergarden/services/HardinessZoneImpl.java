package com.connellboyce.peppergarden.services;

import com.connellboyce.peppergarden.controller.BlogController;
import com.connellboyce.peppergarden.payload.request.HardinessZoneRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class HardinessZoneImpl implements HardinessZoneService {

    private static Logger logger  = LoggerFactory.getLogger(HardinessZoneImpl.class);

    @Value("${service.hardinesszone.api.template}")
    private String apiTemplate;

    @Override
    public ResponseEntity<?> findHardinessZoneByZipCode(String zipCode) {
        logger.error("apiTemplate={} zipCode={}",apiTemplate,zipCode);
        if (zipCode.length() != 5) {
            return ResponseEntity.badRequest().build();
        }
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("zipCode", zipCode);

        ResponseEntity<String> exchange = restTemplate.exchange(apiTemplate, HttpMethod.GET, entity, String.class, uriVariables);


        if (exchange.getStatusCode()==HttpStatus.OK) {
            return exchange;
        }
        return ResponseEntity.notFound().build();
    }
}
