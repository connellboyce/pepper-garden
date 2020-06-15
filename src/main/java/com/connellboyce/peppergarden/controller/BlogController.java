package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.model.BlogPost;
import com.connellboyce.peppergarden.model.Pepper;
import com.connellboyce.peppergarden.payload.request.BlogRequest;
import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.repository.BlogRepository;
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
@RequestMapping("/api/blog")
public class BlogController {
    private static Logger logger  = LoggerFactory.getLogger(BlogController.class);

    @Autowired
    private BlogRepository blogRepository;

    @PostMapping("/add")
    public ResponseEntity<?> makePost(@Valid @RequestBody BlogRequest blogRequest) {
        BlogPost blogPost = new BlogPost(blogRequest.getSlug(), blogRequest.getTitle(), blogRequest.getBody(), blogRequest.getTags());
        logger.info(blogPost.toString());
        blogRepository.save(blogPost);

        return ResponseEntity.ok(new MessageResponse("Post blogged successfully!"));
    }

    @GetMapping("/{slug}")
    public BlogPost getPepperById(@PathVariable("slug")String slug) {
        Optional<BlogPost> blogPost = blogRepository.findBySlug(slug);

        //To do: throw 404 not found if else
        return blogPost.orElse(null);
    }

    @GetMapping("/")
    public List<BlogPost> getAllPosts() {
        List<BlogPost> blogPostList = blogRepository.findAll();
        blogPostList.forEach(e -> {
            logger.debug(e.toString());
        });


        return blogPostList;
    }
}
