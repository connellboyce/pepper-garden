package com.connellboyce.peppergarden.payload.request;

import javax.validation.constraints.NotBlank;

public class CommentRequest {
    @NotBlank
    private String commentBody;

    public String getCommentBody() {
        return commentBody;
    }

    public void setCommentBody(String commentBody) {
        this.commentBody = commentBody;
    }
}
