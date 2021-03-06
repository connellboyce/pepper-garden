# Pepper Garden App
This repository is based on the Pepper Garden App written in Java.

## Table of Contents
1. [Installation](#Installation)
2. [Components](#Components)
3. [Features](#Features)
4. [Tasks](#Tasks)
5. [Dependencies](#Dependencies)
6. [Project-Notes](#Project-Notes)
7. [Resources-Used](#Resources-Used)
8. [Further-Documentation](#Further-Documentation)
9. [Related Repositories](#Related-Repositories)


### **Installation**
Clone the repository
```bash
$ git clone https://github.com/connellboyce/pepper-garden.git
```

Open the project in an IDE and use Maven to clean and install.
```bash
$ mvn clean
```
```bash
$ mvn install
```

Still using your IDE, run the project through Maven and Spring Boot.
```bash
$ mvn spring-boot run
```
Do NOT run the project through the command line, or it will likely require a computer to restart or shut down to terminate the process.

Navigate to localhost:9999 on your web browser.
```aidl
http://localhost:9999
```

When finished, use your IDE's stop button to terminate the process.


### **Components**
* Java 14
* SpringBoot 2.3.0
* Spring Security
* Maven 3.6.3
* RESTful APIs
* MongoDB Atlas
* Web Tokens
* Bootstrap CDN
* Docker
* AWS
* Shell Scripting


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
- [x] Basic SpringBoot Project Initialization
    - [x] Maven Functionality
    - [x] MongoDB pairing
    - [x] Dependencies Declared
    - [x] Set up start/stop for server hosting
- [ ] UI / UX
    - [x] Login Page
        - [x] Login/Register Account
        - [x] Aesthetic design
    - [ ] Dashboards
        - [x] Navbar
        - [x] Traversible pepper "dictionary"
        - [ ] Feed
            - [ ] View pictures of peppers (with titles/captions)
            - [ ] Written posts
            - [ ] Tag implementation
            - [x] Make new post
            - [ ] Comment
        - [ ] Aesthetic design
    - [ ] My Profile
        - [x] Changeable profile picture
        - [ ] Change fields options
        - [x] Aesthetic design
- [ ] Backend
    - [ ] MongoDB/RESTful APIs
        - [ ] User
            - [x] Create new user
            - [ ] Update fields
            - [x] Login Authentication
        - [ ] Peppers
            - [x] POST
            - [x] GET
            - [ ] PUT
            - [ ] DELETE
    - [ ] Project Functionality
        - [ ] Blog Post
            - [x] Post text
            - [ ] Edit text
            - [ ] Delete text
            - [ ] Post image
            - [ ] Edit image title/caption
            - [ ] Delete image
        - [x] Manageable permissions to POST/PUT/DELETE
    - [x] Spring Security
        - [x] JWT
        - [x] Security Controllers
        - [x] Security Payload Models
        - [x] Security Services 
    - [x] Other Applications
        - [x] Web Scraper
        - [x] JSON Parser/Poster


### **Dependencies**
* org.springframework.boot
	* Spring Boot Starter Data MongoDB
	* Spring Boot Starter Security
	* Spring Boot Starter Web
	* Spring Boot Starter Thymeleaf
	* Spring Boot Starter Validation
	* Spring Boot Starter Test
		* Excludes: JUnit Vintage Engine
	* Spring Security Test
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
* Dependencies Jakarta XML Bind-API and JAXB Runtime are to resolve a Java 14 issue where a class could not be found.
* AWS Credentials must be refreshed fairly often


### **Resources-Used**
* [Bezkoder - Spring Boot Token based Authentication with Spring Security & JWT](https://bezkoder.com/spring-boot-jwt-authentication/)
* [Baeldung - Spring Actuator](https://www.baeldung.com/spring-boot-actuators)
* [Baeldung - Upload and Retrieve Files](https://www.baeldung.com/spring-boot-mongodb-upload-file)
* [bluematador - How to deploy an app to AWS: Route 53 and DNS explained](https://www.bluematador.com/blog/how-to-deploy-an-app-to-aws-route-53-and-dns-explained)

### **Further-Documentation**
* [Project Timeline](documentation/TASKS_TIMELINE.md)
* [Spring Security](documentation/SPRING_SECURITY.md)
* [JWT](documentation/JWT.md)
* [Thymeleaf](documentation/THYMELEAF.md)
* [Mongo DB](documentation/MONGODB.md)
* [AWS and Docker](documentation/AWS_and_DOCKER.md)
* [Creating a Service that will Consume an External API](documentation/USING_AN_EXTERNAL_API.md)


### **Related Repositories**
* [Web Scraper for Extracting Pepper Information](https://github.com/connellboyce/spring-boot-scraper)
* [Script to Post JSON Array to the Database](https://github.com/connellboyce/Python-API-Poster)