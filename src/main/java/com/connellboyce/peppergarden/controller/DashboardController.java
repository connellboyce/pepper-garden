package com.connellboyce.peppergarden.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {
    @Value("${spring.application.name}")
    String appName;

    /**
     * GET mapping for endpoint: dashboard
     *
     * @return dashboard.html
     */
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String homePage() {
        return "dashboard";
    }

    /**
     * GET mapping for endpoint: dictionary
     *
     * @return dictionary.html
     */
    @GetMapping("/dictionary")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String dictionaryPage() {
        return "dictionary";
    }

    /**
     * GET mapping for endpoint: contact
     *
     * @return contact.html
     */
    @GetMapping("/contact")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String contactPage() {
        return "contact";
    }

    /**
     * GET mapping for endpoint: profile
     *
     * @return profile.html
     */
    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String profilePage() {
        return "profile";
    }

    /**
     * GET mapping for endpoint: pepperdetails
     *
     * @return pepperdetails.html
     */
    @GetMapping("/pepperdetails")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String pepperDetailPage() {
        return "pepperdetails";
    }

    /**
     * GET mapping for endpoint: comments
     *
     * @return comments.html
     */
    @GetMapping("/comments")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String commentsPage() {
        return "comments";
    }
}
