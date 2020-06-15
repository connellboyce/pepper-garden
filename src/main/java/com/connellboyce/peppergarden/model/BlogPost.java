package com.connellboyce.peppergarden.model;

import com.sun.istack.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "blog_posts")
public class BlogPost {
    @Id
    private String id;

    @NotNull @Indexed(unique = true)
    private String slug;

    @NotNull
    private String title;

    @NotNull
    private String body;

    private Date date = new Date();
    private Set<String> tags = new HashSet<>();

    public BlogPost(){}

    @PersistenceConstructor
    public BlogPost(String slug, String title, String body, Set<String> tags){
        this.title = title;
        this.slug = slug;
        this.body = body;
        this.tags = tags;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    @Override
    public String toString() {
        return "BlogPost{" +
                "id='" + id + '\'' +
                ", slug='" + slug + '\'' +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", date=" + date +
                ", tags=" + tags +
                '}';
    }
}
