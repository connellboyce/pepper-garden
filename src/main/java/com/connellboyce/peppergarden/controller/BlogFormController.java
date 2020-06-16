package com.connellboyce.peppergarden.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BlogFormController {
    @Value("Pepper Garden")
    String appName;

    @GetMapping("/blogform")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String homePage(Model model) {
        model.addAttribute("appName", appName);
        return "blogform";
    }
}
