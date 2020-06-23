package com.connellboyce.peppergarden.payload.request;

import javax.validation.constraints.NotBlank;

public class HardinessZoneRequest {

    @NotBlank
    private String zipCode;

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
