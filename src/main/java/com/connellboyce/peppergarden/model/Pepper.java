package com.connellboyce.peppergarden.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotBlank;

@Document(collection = "peppers")
public class Pepper {
    @Id
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    @DBRef
    private Species species;

    private String minSHU;

    private String maxSHU;

    private String origin;

    private String description;

    public Pepper() {}

    public Pepper(String name, Species species, String minSHU, String maxSHU, String origin, String description) {
        this.name = name;
        this.species = species;
        this.minSHU = minSHU;
        this.maxSHU = maxSHU;
        this.origin = origin;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Species getSpecies() {
        return species;
    }

    public void setSpecies(Species species) {
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

}
