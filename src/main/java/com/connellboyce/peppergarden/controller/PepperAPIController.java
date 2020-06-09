package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.model.*;
import com.connellboyce.peppergarden.payload.request.AddPepperRequest;
import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.repository.PepperRepository;
import com.connellboyce.peppergarden.repository.SpeciesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pepper")
public class PepperAPIController {
    private static final Logger logger = LoggerFactory.getLogger(PepperAPIController.class);

    @Autowired
    PepperRepository pepperRepository;

    @Autowired
    SpeciesRepository speciesRepository;

    @PostMapping("/add")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> registerPepper(@Valid @RequestBody AddPepperRequest addPepperRequest) {
        if (pepperRepository.existsByName(addPepperRequest.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Pepper already exists!"));
        }

        String species = addPepperRequest.getSpecies();
        if (species == null) {
            speciesRepository.findByName(ESpecies.SPECIES_UNKNOWN).orElseThrow(() -> new RuntimeException("Error: Null species"));
        } else {
            switch (species) {
                case "annuum":
                    speciesRepository.findByName(ESpecies.SPECIES_ANNUUM).orElseThrow(() -> new RuntimeException("Error: Species \"annuum\" is not found"));
                    break;
                case "baccatum":
                    speciesRepository.findByName(ESpecies.SPECIES_BACCATUM).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "cardenasii":
                    speciesRepository.findByName(ESpecies.SPECIES_CARDENASII).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "chacoense":
                    speciesRepository.findByName(ESpecies.SPECIES_CHACOENSE).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "chinense":
                    speciesRepository.findByName(ESpecies.SPECIES_CHINENSE).orElseThrow(() -> new RuntimeException("Error: Species \"chinense\" is not found"));
                    break;
                case "eximium":
                    speciesRepository.findByName(ESpecies.SPECIES_EXIMIUM).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "flexuosum":
                    speciesRepository.findByName(ESpecies.SPECIES_FLEXUOSUM).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "frutescens":
                    speciesRepository.findByName(ESpecies.SPECIES_FRUTESCENS).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "mirabile":
                    speciesRepository.findByName(ESpecies.SPECIES_MIRABILE).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "pubescens":
                    speciesRepository.findByName(ESpecies.SPECIES_PUBESCENS).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                case "rhomboideum":
                    speciesRepository.findByName(ESpecies.SPECIES_RHOMBOIDEUM).orElseThrow(() -> new RuntimeException("Error: Species is not found"));
                    break;
                default:
                    species = "unknown";
            }
        }

        // Create new pepper
        Pepper pepper = new Pepper(addPepperRequest.getName(), species, addPepperRequest.getMinSHU(), addPepperRequest.getMaxSHU(), addPepperRequest.getOrigin(), addPepperRequest.getDescription(), addPepperRequest.getImageURL());
        logger.info(pepper.toString());
        pepperRepository.save(pepper);

        return ResponseEntity.ok(new MessageResponse("Pepper registered successfully!"));
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Pepper> getAllPeppers() {
        List<Pepper> pepperList = pepperRepository.findAll();
        pepperList.forEach(e -> {
            logger.debug(e.toString());
        });


        return pepperList;
    }

    @GetMapping("/{pepperId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Pepper getPepperById(@PathVariable("pepperId")String pepperId) {
        Optional<Pepper> pepper = pepperRepository.findById(pepperId);

        //To do: throw 404 not found if else
        return pepper.orElse(null);
    }
}
