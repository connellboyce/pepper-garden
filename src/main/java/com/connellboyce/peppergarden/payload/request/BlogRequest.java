package com.connellboyce.peppergarden.payload.request;

import com.sun.istack.NotNull;
import org.bson.types.Binary;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class BlogRequest {

    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private String author;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() { return author; }

    public void setAuthor(String author) { this.author = author; }

}
