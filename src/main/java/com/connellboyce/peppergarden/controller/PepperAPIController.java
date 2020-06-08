package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.model.*;
import com.connellboyce.peppergarden.payload.request.AddPepperRequest;
import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.repository.PepperRepository;
import com.connellboyce.peppergarden.repository.SpeciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/pepper")
public class PepperAPIController {
    @Autowired
    PepperRepository pepperRepository;

    @Autowired
    SpeciesRepository speciesRepository;

    @PostMapping("/add")
    public ResponseEntity<?> registerPepper(@Valid @RequestBody AddPepperRequest addPepperRequest) {
        if (pepperRepository.existsByName(addPepperRequest.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Pepper already exists!"));
        }

        String species = addPepperRequest.getSpecies();
        Species pepperSpecies;
        if (species == null) {
            pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_UNKNOWN).orElseThrow(() -> new RuntimeException("Error: Null species"));
        } else {
            switch (species) {
                case "annuum":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_ANNUUM).orElseThrow(() -> new RuntimeException("Error: Species \"annuum\" is not found"));
                    break;
                case "baccatum":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_BACCATUM).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "cardenasii":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_CARDENASII).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "chacoense":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_CHACOENSE).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "chinense":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_CHINENSE).orElseThrow(() -> new RuntimeException("Error: Species \"chinense\" is not found"));
                    break;
                case "eximium":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_EXIMIUM).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "flexuosum":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_FLEXUOSUM).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "frutescens":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_FRUTESCENS).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "mirabile":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_MIRABILE).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "pubescens":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_PUBESCENS).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "rhomboideum":
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_RHOMBOIDEUM).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                default:
                    pepperSpecies = speciesRepository.findByName(ESpecies.SPECIES_UNKNOWN).orElseThrow(() -> new RuntimeException("Error: Unknown species or species is not found"));
            }
        }

        // Create new pepper
        Pepper pepper = new Pepper(addPepperRequest.getName(), pepperSpecies, addPepperRequest.getMinSHU(), addPepperRequest.getMaxSHU(), addPepperRequest.getOrigin(), addPepperRequest.getDescription());

        pepperRepository.save(pepper);

        return ResponseEntity.ok(new MessageResponse("Pepper registered successfully!"));
    }
}
