package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.model.BlogPost;
import com.connellboyce.peppergarden.payload.request.BlogRequest;
import com.connellboyce.peppergarden.payload.request.CommentRequest;
import com.connellboyce.peppergarden.payload.request.LikeRequest;
import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.repository.BlogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/blog")
public class BlogPostController {

    private static final Logger logger = LoggerFactory.getLogger(BlogPostController.class);

    @Autowired
    BlogRepository blogRepository;

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

    @PostMapping("/comment/{postId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> addCommentToPost (@PathVariable("postId") String postId, @Valid @RequestBody CommentRequest commentRequest){
        Optional<BlogPost> blogPost = blogRepository.findById(postId);

        if (blogPost.orElse(null) != null) {
            blogPost.orElse(null).addComment(commentRequest.getCommentBody());
            blogRepository.save(blogPost.orElse(null));
            return ResponseEntity.ok(new MessageResponse("Comment posted successfully!"));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{postId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @ResponseBody
    public BlogPost getPostById (@PathVariable("postId") String postId){
        Optional<BlogPost> blogPost = blogRepository.findById(postId);

        return blogPost.orElse(null);
    }

    @PostMapping("/like/{postId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @ResponseBody
    public ArrayList<String> likePostById (@PathVariable("postId") String postId, @Valid @RequestBody LikeRequest likeRequest){
        Optional<BlogPost> blogPost = blogRepository.findById(postId);

        System.out.println("--------------------------------------------------------\n\n\n\n"+likeRequest.getUserId());

        if(blogPost.orElse(null)!=null) {
            blogPost.orElse(null).addLike(likeRequest.getUserId());
            blogRepository.save(blogPost.orElse(null));

            return blogPost.orElse(null).getLikes();
        }
        return null;
    }
}
