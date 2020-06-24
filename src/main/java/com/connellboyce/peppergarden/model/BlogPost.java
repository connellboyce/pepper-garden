package com.connellboyce.peppergarden.model;

import org.springframework.data.annotation.Id;

import java.text.SimpleDateFormat;
import java.util.Date;

public class BlogPost {

    @Id
    private String id;

    private String title;

    private String content;

    private String author;

    private String date;
    private final SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy hh:mm a");

    public BlogPost() { setCurrentDate(new Date()); }

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

    /**
     * Gets the system's current time and date
     */
    public void setCurrentDate(Date wholeDate) {
        this.date = formatter.format(wholeDate);
    }
}
