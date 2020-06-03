# Pepper Garden App
This com.connellboyce.peppergarden.repository is based on the Pepper Garden App written in Java.

## Table of Contents
1. [Installation](#Installation)
2. [Components](#Components)
3. [Features](#Features)
4. [Tasks](#Tasks)
5. [Dependencies](#Dependencies)
6. [Project-Notes](#Project-Notes)
7. [Project-Timeline](#Project-Timeline)


### **Installation**
Clone the com.connellboyce.peppergarden.repository
```bash
$ git clone https://github.com/connellboyce/pepper-garden.git
```


### **Components**
* Java 14
* SpringBoot 2.3.0
* Maven 3.6.3
* RESTful APIs
* MongoDB Atlas


### **Features**
* View database of peppers
* View information when selecting a specific item
* Add/View images
* Add/View new varieties/crossbreeds
* View viability by zone
* View pictures by zone
* Operate in web-based form
* Save users and their information to database
* Include CRUD case using RESTful APIs


### **Tasks**
- [ ] Basic SpringBoot Project Initialization
    - [ ] Maven Functionality
    - [ ] MongoDB pairing
    - [ ] Dependencies Declared
    - [ ] Set up start/stop for server hosting
- [ ] UI / UX
    - [ ] Login Page
        - [ ] Login/Register Account
        - [ ] Recover password
        - [ ] Aesthetic design
    - [ ] Dashboards
        - [ ] Navbar
        - [ ] Traversible pepper "dictionary"
            - [ ] Sortable by species, zone, alphabetical
        - [ ] "Scrapbook" page
            - [ ] View pictures of peppers (with titles/captions)
                - [ ] Sortable by zone
        - [ ] "What I Learned" Page (Blog posts about lessons learned)
        - [ ] Aesthetic design
    - [ ] My Profile
        - [ ] List of past entries
            - [ ] Sortable by recency/year
        - [ ] Changeable profile picture
        - [ ] Change fields options
        - [ ] Aesthetic design
- [ ] Backend
    - [ ] RESTful APIs
        - [ ] Create base API for pepper information
        - [ ] POST
        - [ ] GET
        - [ ] PUT
        - [ ] DELETE
    - [ ] MongoDB
        - [ ] Create new user
        - [ ] Update fields
        - [ ] Login Authentication
    - [ ] Project Functionality
        - [ ] "Lesson Learned"
            - [ ] Post "Lesson Learned"
            - [ ] Edit "Lesson Learned"
            - [ ] Delete "Lesson Learned"
        - [ ] Scrapbook
            - [ ] Post image
            - [ ] Edit image title/caption
            - [ ] Delete image
        - [ ] Pepper Information
            - [ ] Post new pepper information
            - [ ] Edit new pepper information
            - [ ] Delete new pepper information
        - [ ] Manageable permissions to POST/PUT/DELETE


### **Dependencies**
* org.springframework.boot
	* Spring Boot Starter Data MongoDB
	* Spring Boot Starter Security
	* Spring Boot Starter Web
	* Spring Boot Starter Test
		* Excludes: JUnit Vintage Engine
	* Spring Security Test
	* Spring Boot Starter Thymeleaf
	* Spring Boot DevTools
* io.jsonwebtoken
	* JJWT
* javax.validation
	* Validation API
* jakarta.xml.bind
	* Jakarta XML Bind-API
* org.glassfish.jaxb
	* JAXB Runtime


### **Project Notes**
* Spring Security set up through MongoDB with 3 possible roles
	* Moderator, User, Admin
* UI Handled with Thymeleaf and Bootstrap
* MongoDB connection handled through MongoDB cloud (Atlas).

### **Project-Timeline**
* 06/01/2020: Initial Spring setup and Spring Security Configuration with MongoDB
* 06/02/2020: Continued Spring Security Config. and initial Thymeleaf setup
* 06/15/2020: Official start of project