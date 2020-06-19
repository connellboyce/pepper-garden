package com.connellboyce.peppergarden.services;

import com.connellboyce.peppergarden.model.UserProfile;
import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.repository.UserProfileRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    public ResponseEntity<?> editProfile(String id, MultipartFile file, String zipCode, String hardinessZone, String description) throws IOException {
        UserProfile userProfile = new UserProfile();
        userProfile.setId(id);
        userProfile.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        userProfile.setZipCode(zipCode);
        userProfile.setHardinessZone(hardinessZone);
        userProfile.setDescription(description);

        if (userProfileRepository.existsById(userProfile.getId())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Profile ID already exists!"));
        }

        userProfileRepository.insert(userProfile);
        return ResponseEntity.ok(new MessageResponse("Success"));

    }

    public UserProfile getProfile(String id) {
        if (userProfileRepository.findById(id).isPresent()) {
            return userProfileRepository.findById(id).get();
        }
        return null;
    }
}
