package com.connellboyce.peppergarden.payload.request;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AddPepperRequest {
    @NotBlank
    @Size(min = 3)
    private String name;

    @NotBlank
    private String species;

    private String minSHU;
    private String maxSHU;

    private String origin;

    private String description;

    private String imageURL;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getMinSHU() {
        return minSHU;
    }

    public void setMinSHU(String minSHU) {
        this.minSHU = minSHU;
    }

    public String getMaxSHU() {
        return maxSHU;
    }

    public void setMaxSHU(String maxSHU) {
        this.maxSHU = maxSHU;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageURL() { return imageURL; }

    public void setImageURL(String imageURL) { this.imageURL = imageURL; }
}
