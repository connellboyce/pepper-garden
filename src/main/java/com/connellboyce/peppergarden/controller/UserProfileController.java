package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.model.Pepper;
import com.connellboyce.peppergarden.model.UserProfile;
import com.connellboyce.peppergarden.repository.UserProfileRepository;
import com.connellboyce.peppergarden.services.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;

@Controller
@RequestMapping("/api/profiles")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @PostMapping("/profile/add")
    public ResponseEntity<?> editProfile(@RequestParam("id") String id, @RequestParam("image") MultipartFile image, Model model, @RequestParam("zipCode") String zipCode, @RequestParam("hardinessZone") String hardinessZone, @RequestParam("description") String description) throws IOException {
        return userProfileService.editProfile(id, image, zipCode, hardinessZone, description);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @ResponseBody
    public UserProfile getUserProfileById(@PathVariable("id")String id) {
        //To do: throw 404 not found if else
        return userProfileService.getById(id);
    }
}
