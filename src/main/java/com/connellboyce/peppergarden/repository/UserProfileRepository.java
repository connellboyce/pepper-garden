package com.connellboyce.peppergarden.repository;

import com.connellboyce.peppergarden.model.UserProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserProfileRepository extends MongoRepository<UserProfile, String> { }
