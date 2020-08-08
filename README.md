# Profile page

This project serves a simple profile page. It has been created as a coding practice.

## Content details
The page contains the following elements
- Name (max. 16 characters)
- Avatar Image
- Small description (can be lorem ipsum)
- A link to another page (can be yours, if you have one)
- An Edit/Done button

The project consists of a backend and a frontend part. The backend is a Spring Boot application that serves an api. The frontend part is a ReactJS app.

## Run prebuilt binary

To run the binary you need Java Runtime 11 or higher.
1. Choose a release from the [releases page](releases/).
1. Download the jar file.
1. You can run the executable jar with `java -jar profile-page.jar`.
1. Open [http://localhost:8080/](http://localhost:8080/) in a web browser to access the application.

## Run this project from source

To build this project you need
- NodeJs 12
- Java SDK 11 or higher

To run the web app locally follow the steps:
1. Checkout the git repository to a local folder.
1. Run the backend
    - change to directory [backend](backend/)
    - execute `./gradlew bootRun`
1. Run the frontend
    - change to directory [frontend](frontend/)
    - execute `npm start`
1. Open [http://localhost:3000/](http://localhost:3000/) in a web browser.

## Build a release

To build a release follow the steps:
1. Build the frontend
    - change to directory [frontend](frontend/)
    - execute `npm build --prod`

        **Note:** The command copies the generated files to the backend. This works fine for Windows. If you want to run this under Unix, you have to adapt the build command in [package.json](frontend/package.json).
1. Build the backend
    - change to directory [backend](backend/)
    - execute `./gradlew build`
1. The executable jar file can be found in [build/libs](backend/build/libs).
1. You can run the executable jar with `java -jar profile-page.jar`.
1. Open [http://localhost:8080/](http://localhost:8080/) in a web browser to access the application.