package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.model.BlogPost;
import com.connellboyce.peppergarden.payload.request.BlogRequest;
import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.repository.BlogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/api/blog")
public class BlogPostController {

    private static Logger logger = LoggerFactory.getLogger(BlogPostController.class);

    @Autowired
    BlogRepository blogRepository;

    /*@GetMapping("/")
    public ResponseEntity<?> getBlog(Model model) {
        model.addAttribute("post", new Post());
        return ResponseEntity.ok(new MessageResponse("Post blogged successfully!"));
    }*/

    /**
     * Base endpoint to get all blog posts
     *
     * @return List of all posts
     */
    @CrossOrigin(origins = "*")
    @GetMapping("/")
    @ResponseBody
    public List<BlogPost> getAllBlogPosts() {
        List<BlogPost> postList = blogRepository.findAll();
        postList.forEach(e -> {
            logger.debug(e.toString());
        });


        return postList;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBlog(@Valid @RequestBody BlogRequest blogRequest) {
        BlogPost post = new BlogPost();
        post.setTitle(blogRequest.getTitle());
        post.setContent(blogRequest.getContent());
        post.setAuthor(blogRequest.getAuthor());
        logger.info(post.toString());
        blogRepository.save(post);
        if (post.getContent() == null || post.getTitle() == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(new MessageResponse("Post blogged successfully!"));
    }
}
