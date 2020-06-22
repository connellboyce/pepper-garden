package com.connellboyce.peppergarden.services;

import com.connellboyce.peppergarden.model.Pepper;
import com.connellboyce.peppergarden.model.Photo;
import com.connellboyce.peppergarden.model.UserProfile;
import com.connellboyce.peppergarden.payload.response.MessageResponse;
import com.connellboyce.peppergarden.repository.PhotoRepository;
import com.connellboyce.peppergarden.repository.UserProfileRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private PhotoRepository photoRepository;

    public ResponseEntity<?> editProfile(String id, MultipartFile file, String zipCode, String hardinessZone, String description) throws IOException {
        UserProfile userProfile = new UserProfile();
        userProfile.setId(id);
        Photo photo = new Photo();
        photo.setId(id);
        photo.setTitle("Profile Picture");
        photo.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = photoRepository.insert(photo);
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

    public UserProfile getById(String id) {
        Optional<UserProfile> userProfile = userProfileRepository.findById(id);

        //To do: throw 404 not found if else
        return userProfile.orElse(null);
    }
}