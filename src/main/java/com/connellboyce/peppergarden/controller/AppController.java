package com.connellboyce.peppergarden.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {
    @Value("${spring.application.name}")
    String appName;

    /**
     * Maps the "/" endpoint in the URL to the index.html file
     *
     * @param model This model is storing the app name
     * @return the path to index.html
     */
    @GetMapping("/")
    public String homePage(Model model) {
        model.addAttribute("appName", appName);
        return "index";
    }
}
