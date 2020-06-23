package com.connellboyce.peppergarden.model;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Document(collection="user-profile")
public class UserProfile {

    @Id
    @NotNull
    @NotBlank
    private String id;

    private String zipCode;

    private String hardinessZone;

    private String description;

    private Binary image;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getHardinessZone() {
        return hardinessZone;
    }

    public void setHardinessZone(String hardinessZone) {
        this.hardinessZone = hardinessZone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
