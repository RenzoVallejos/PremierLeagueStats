# PremierLeague Spring Boot Application

This is a Spring Boot application for managing Premier League player statistics. It allows you to retrieve, add, update, and delete player information.

## Table of Contents
- [Project Setup](#project-setup)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)

---

## Project Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/PremierLeague.git
    ```

2. Navigate into the project directory:

    ```bash
    cd PremierLeague
    ```

3. Ensure the `application.properties` file is set up properly for your database connection in `src/main/resources/application.properties`.

## Technologies Used

- **Spring Boot** - 3.3.4
- **Spring Data JPA** for database access
- **Thymeleaf** for server-side HTML rendering
- **PostgreSQL** as the database
- **Lombok** to reduce boilerplate code
- **Maven** as the build tool

## Prerequisites

- Java 17 or later (You are using Java 23)
- Maven 3.x
- PostgreSQL database

Ensure that PostgreSQL is running and you've set up the correct database.

## Database Setup

1. Create a PostgreSQL database:

    ```sql
    CREATE DATABASE football_stats;
    ```

2. Set the following properties in the `src/main/resources/application.properties`:

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/football_stats
    spring.datasource.username=your_database_username
    spring.datasource.password=your_database_password
    spring.jpa.hibernate.ddl-auto=update
    ```

3. Your database schema will be automatically created based on the `PlayerEntity` class when the application runs for the first time.

## How to Run

1. Run the following Maven command to start the application:

    ```bash
    mvn spring-boot:run
    ```

2. Alternatively, if you are using an IDE like IntelliJ, simply run the `PremierLeagueApplication` class from the IDE.

3. The application will start at [http://localhost:8081](http://localhost:8081).

## API Endpoints

The following REST API endpoints are available:

### 1. Get All Players
**GET** `/players`

Returns a list of all Premier League players.

### 2. Filter Players by Name, Team, Position, Nation
**GET** `/players?name={name}&team={team}&position={position}&nation={nation}`

Example: `/players?team=Arsenal` will return all Arsenal players.

### 3. Add a New Player
**POST** `/players`

- Request Body (JSON):
  ```json
  {
    "playerName": "Bukayo Saka",
    "teamName": "Arsenal",
    "position": "MF",
    "nation": "ENG",
    "age": 21,
    "goals": 5
  }
  ```

### 4. Update an Existing Player
**PUT** `/players`

- Request Body (JSON):
  ```json
  {
    "playerName": "Bukayo Saka",
    "teamName": "Arsenal",
    "position": "MF",
    "nation": "ENG",
    "age": 22,
    "goals": 6
  }
  ```

### 5. Deleting a Player
**DELETE** `/players/{playerName}`

Deletes a player by their name.

---

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://opensource.org/licenses/MIT)

