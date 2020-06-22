package com.connellboyce.peppergarden.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BlogFormController {

    /**
     * Handles navigation permissions to perform an AJAX request for the blogform.html file
     *
     * @return blogform.html
     */
    @GetMapping("/blogform")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String homePage() {
        return "blogform";
    }
}
