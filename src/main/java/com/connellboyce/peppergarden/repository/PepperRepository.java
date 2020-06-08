package com.connellboyce.peppergarden.repository;

import com.connellboyce.peppergarden.model.Pepper;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface PepperRepository extends MongoRepository<Pepper, String> {
    Optional<Pepper> findByName(String name);
    Boolean existsByName(String name);
}
