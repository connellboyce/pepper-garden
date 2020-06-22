package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.model.BlogPost;
import com.connellboyce.peppergarden.payload.request.BlogRequest;
import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.repository.BlogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    private static Logger logger = LoggerFactory.getLogger(BlogController.class);

    @Autowired
    private BlogRepository blogRepository;

    /**
     * API Endpoint to add a new blog post
     *
     * @param blogRequest Request body with validated fields
     * @return Successful message response
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/add")
    public ResponseEntity<?> makePost(@Valid @RequestBody BlogRequest blogRequest) {
        BlogPost blogPost = new BlogPost(blogRequest.getSlug(), blogRequest.getTitle(), blogRequest.getBody(), blogRequest.getTags(), blogRequest.getPoster());
        logger.info(blogPost.toString());
        blogRepository.save(blogPost);

        return ResponseEntity.ok(new MessageResponse("Post blogged successfully!"));
    }

    /**
     * API Endpoint to find a post by slug
     *
     * @param slug unique identifier by thread (not post)
     * @return the blog post attached to it
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/{slug}")
    public BlogPost getPepperById(@PathVariable("slug") String slug) {
        Optional<BlogPost> blogPost = blogRepository.findBySlug(slug);

        //To do: throw 404 not found if else
        return blogPost.orElse(null);
    }

    /**
     * Base endpoint to get all blog posts
     *
     * @return List of all posts
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/")
    public List<BlogPost> getAllPosts() {
        List<BlogPost> blogPostList = blogRepository.findAll();
        blogPostList.forEach(e -> {
            logger.debug(e.toString());
        });


        return blogPostList;
    }
}
