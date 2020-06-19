package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.services.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("/api/profiles")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @PostMapping("/profile/add")
    public ResponseEntity<?> addPhoto(@RequestParam("userID") String userID, @RequestParam("image") MultipartFile image, Model model, @RequestParam("zipCode") String zipCode, @RequestParam("hardinessZone") String hardinessZone, @RequestParam("description") String description) throws IOException {
        String id = userProfileService.editProfile(userID, image, zipCode, hardinessZone, description);
        return ResponseEntity.ok(new MessageResponse("Profile updated"));
    }
}
