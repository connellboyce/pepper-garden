package com.connellboyce.peppergarden.services;

import com.connellboyce.peppergarden.model.UserProfile;
import com.connellboyce.peppergarden.repository.UserProfileRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    public String editProfile(String userID, MultipartFile file, String zipCode, String hardinessZone, String description) throws IOException {
        UserProfile userProfile = new UserProfile();
        userProfile.setUserID(userID);
        userProfile.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        userProfile.setZipCode(zipCode);
        userProfile.setHardinessZone(hardinessZone);
        userProfile.setDescription(description);

        userProfile = userProfileRepository.insert(userProfile);
        return userProfile.getId();

    }

    public UserProfile getProfile(String id) {
        return userProfileRepository.findById(id).get();
    }
}
