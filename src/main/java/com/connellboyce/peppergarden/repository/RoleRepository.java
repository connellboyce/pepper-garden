package com.connellboyce.peppergarden.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.connellboyce.peppergarden.model.ERole;
import com.connellboyce.peppergarden.model.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
