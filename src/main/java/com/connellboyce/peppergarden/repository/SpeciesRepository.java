package com.connellboyce.peppergarden.repository;

import com.connellboyce.peppergarden.model.ESpecies;
import com.connellboyce.peppergarden.model.Species;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SpeciesRepository extends MongoRepository<Species, String> {
    Optional<Species> findByName(ESpecies name);
}
