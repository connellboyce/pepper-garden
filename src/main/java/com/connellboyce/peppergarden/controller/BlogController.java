package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.model.BlogPost;
import com.connellboyce.peppergarden.payload.request.BlogRequest;
import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.repository.BlogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    private static Logger logger  = LoggerFactory.getLogger(BlogController.class);

    @Autowired
    private BlogRepository blogRepository;

    @PostMapping("/")
    public ResponseEntity<?> makePost(@Valid @RequestBody BlogRequest blogRequest) {
        if (blogRepository.existsBySlug(blogRequest.getSlug())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: URL already exists!"));
        }

        BlogPost blogPost = new BlogPost(blogRequest.getSlug(), blogRequest.getTitle(), blogRequest.getBody(), blogRequest.getTags());
        logger.info(blogPost.toString());
        blogRepository.save(blogPost);

        return ResponseEntity.ok(new MessageResponse("Post blogged successfully!"));
    }
}
