package com.connellboyce.peppergarden.repository;

import com.connellboyce.peppergarden.model.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PhotoRepository extends MongoRepository<Photo, String> { }