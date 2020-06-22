package com.connellboyce.peppergarden.controller;

import com.connellboyce.peppergarden.model.UserProfile;
import com.connellboyce.peppergarden.repository.PhotoRepository;
import com.connellboyce.peppergarden.services.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("/api/profiles")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private PhotoRepository photoRepository;

    /**
     * POST mapping for adding new profile information
     *
     * @param id            id to match the user's account id
     * @param image         profile picture
     * @param zipCode       user's zip code
     * @param hardinessZone user's hardiness zone (based on zip code)
     * @param description   user's account description
     * @return Response message regarding success
     * @throws IOException for errors with the Multipart file
     */
    @PostMapping("/profile/add")
    public ResponseEntity<?> editProfile(@RequestParam("id") String id, @RequestParam("image") MultipartFile image, @RequestParam("zipCode") String zipCode, @RequestParam("hardinessZone") String hardinessZone, @RequestParam("description") String description) throws IOException {
        return userProfileService.editProfile(id, image, zipCode, hardinessZone, description);
    }

    /**
     * GET mapping for finding a profile by id
     *
     * @param id user account/profile id
     * @return profile with the specified id
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @ResponseBody
    public UserProfile getUserProfileById(@PathVariable("id") String id) {
        //To do: throw 404 not found if else
        return userProfileService.getById(id);
    }
}
