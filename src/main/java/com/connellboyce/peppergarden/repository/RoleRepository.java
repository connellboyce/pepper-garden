package com.connellboyce.peppergarden.repository;

import com.connellboyce.peppergarden.model.ERole;
import com.connellboyce.peppergarden.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
