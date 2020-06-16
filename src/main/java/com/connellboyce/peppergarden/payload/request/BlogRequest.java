package com.connellboyce.peppergarden.payload.request;

import com.sun.istack.NotNull;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class BlogRequest {
    @NotNull
    private String slug;
    @NotNull
    private String title;
    @NotNull
    private String body;
    private Date date = new Date();
    private Set<String> tags = new HashSet<>();
    @NotNull
    private String poster;

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }
}
