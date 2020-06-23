package com.connellboyce.peppergarden.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "species")
public class Species {

    @Id
    private String id;

    private ESpecies name;

    /**
     * Empty Constructor
     */
    public Species() {}

    /**
     * Full Constructor
     *
     * @param name Name of species within the Capsicum family
     */
    public Species(ESpecies name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ESpecies getName() {
        return name;
    }

    public void setName(ESpecies species) {
        this.name = species;
    }

    @Override
    public String toString() {
        return this.name.toString();
    }
}
