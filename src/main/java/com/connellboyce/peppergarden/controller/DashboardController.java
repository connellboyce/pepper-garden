package com.connellboyce.peppergarden.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {
    @Value("${spring.application.name}")
    String appName;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String homePage(Model model) {
        model.addAttribute("appName", appName);
        return "dashboard";
    }

    @GetMapping("/dictionary")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String dictionaryPage(Model model) {
        model.addAttribute("appName", appName);
        return "dictionary";
    }

    @GetMapping("/contact")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String contactPage(Model model) {
        model.addAttribute("appName", appName);
        return "contact";
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String profilePage(Model model) {
        model.addAttribute("appName", appName);
        return "profile";
    }

    @GetMapping("/pepperdetails")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String pepperDetailPage(Model model) {
        model.addAttribute("appName", appName);
        return "pepperdetails";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminPage(Model model) {
        model.addAttribute("appName", appName);
        return "dashboard";
    }
}
