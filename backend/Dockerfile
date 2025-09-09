# Use OpenJDK 21
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Give permissions to mvnw
RUN chmod +x mvnw

# Build the app (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# Copy the built jar (adjust name if needed)
# This assumes your jar ends up in target/
COPY target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]

