package com.connellboyce.peppergarden.repository;

import com.connellboyce.peppergarden.model.BlogPost;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BlogRepository extends MongoRepository<BlogPost, String>{
    Optional<BlogPost> findByTitle(String title);
    Boolean existsByTitle(String title);

    @Override
    <S extends BlogPost> Optional<S> findOne(Example<S> example);
}
