package com.connellboyce.peppergarden.model;

import org.springframework.data.annotation.Id;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class BlogPost {

    @Id
    private String id;

    private String title;

    private String content;

    private String author;

    private String date;

    private ArrayList<String> comments = new ArrayList<>();

    public BlogPost() { setCurrentDate(new Date()); }

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public void setDate(String date) { this.date = date; }

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

    public String getDate() { return date; }

    public ArrayList<String> getComments() { return comments; }

    public void setComments(ArrayList<String> comments) { this.comments = comments; }

    public void addComment(String comment) { this.comments.add(comment); }

    /**
     * Gets the system's current time and date
     */
    public void setCurrentDate(Date wholeDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy hh:mm a");
        this.date = formatter.format(wholeDate);
    }
}
