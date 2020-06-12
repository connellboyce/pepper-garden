FROM adoptopenjdk/openjdk14:ubi
MAINTAINER connellboyce17@gmail.com
RUN mkdir /opt/connell
COPY target/pepper-garden-0.0.1-SNAPSHOT.jar /opt/connell/
CMD ["java", "-jar", "/opt/connell/pepper-garden-0.0.1-SNAPSHOT.jar"]
EXPOSE 9999
