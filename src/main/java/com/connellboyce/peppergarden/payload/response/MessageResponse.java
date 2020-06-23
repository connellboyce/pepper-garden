package com.connellboyce.peppergarden.payload.response;

public class MessageResponse {

    private String message;

    /**
     * Full Constructor
     *
     * @param message message to be returned in the response body
     */
    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
