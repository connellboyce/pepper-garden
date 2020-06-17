# Creating a Service that will Consume an External API

### Introduction
In this project, it is important to be able to know what hardiness zone a zip code corresponds to. Because the list of this information is so vast, I had to rely on an external API to provide this service. [Phzmapi.org](https://phzmapi.org/19342.json) has an API for hardiness zone by zip code, so I decided to use that API for my project.

### Set Up Application Properties
I first put the URL to the API in my application.properties as a variable. I added special annotation for the endpoint which can change.
```properties
service.hardinesszone.api.template=https://phzmapi.org/{zipCode}.json
```

###Set Up Services
Create a services package with 2 files:
* An ExternalAPIService Interface (HardinessZoneService in my project)
* An ExternalAPIImpl Class (HardinessZoneImpl in my project)
    * Should implement ExternalAPIService

The interface should be fairly simple but include a method similar to the following:
```java
public interface HardinessZoneService {
    public ResponseEntity<?> findHardinessZoneByZipCode(String zipCode);
}
```
The ExternalAPIImpl class should implement the previous interface and handle calling the external API with any zip code (or whatever field you are modifying this for).
```java
//This is annotated as a service so it can be injected in the controller
@Service
public class HardinessZoneImpl implements HardinessZoneService {

    //Value injection
    @Value("${service.hardinesszone.api.template}")
    private String apiTemplate;

    @Override
    public ResponseEntity<?> findHardinessZoneByZipCode(String zipCode) {
        if (zipCode.length() != 5) {
            return ResponseEntity.badRequest().build();
        }
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("zipCode", zipCode);

        ResponseEntity<String> exchange = restTemplate.exchange(apiTemplate, HttpMethod.GET, entity, String.class, uriVariables);


        if (exchange.getStatusCode()==HttpStatus.OK) {
            return exchange;
        }
        return ResponseEntity.notFound().build();
    }
}
```
This class first pulls the URL from the application.properties; including the replaceable zipCode field.

It then creates a RestTemplate and fills in the zipCode field with the zip code provided to it.

###Create a Payload Request Model
Once those classes are created, we will need a model of what the HTTP request body should look like.
```java
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
```
This is simply a model of what the request body should look like.

###Create the Controller
Now that all of those are completed, it is possible to put them all together with a controller.

This controller will have GET mapping for a request using a body and for a request using a path variable.
```java
@Controller
@RequestMapping("/api/hardinesszone")
public class HardinessZoneController {

    @Autowired
    private HardinessZoneImpl hardinessZoneImpl;

    //This GET is not RESTful, but instead takes information in the body.
    @GetMapping("/")
    public ResponseEntity<?> findHardinessByRequestBody(@Valid @RequestBody HardinessZoneRequest hardinessZoneRequest) {
        return hardinessZoneImpl.findHardinessZoneByZipCode(hardinessZoneRequest.getZipCode());
    }

    //This GET is RESTful
    @GetMapping("/zipcode/{zipCode}")
    public ResponseEntity<?> getByZipCodePath(@PathVariable("zipCode")String zipCode) {
        return hardinessZoneImpl.findHardinessZoneByZipCode(zipCode);
    }
}
```

Once this is finished, the application is able to get information from the external API using REST services.