
> Andre's FullStack Assessment. Project: Simple Employee Maintenance web app

# About my solution

In this assignment, I built a web application using a tech stack that combines the power of Express.js, Next.js, and Tailwind CSS. The project is structured within a mono repo, providing a seamless development experience.

## Backend
### Express.js
For the backend, I chose Express.js, a widely-used and well-documented Node.js framework. Express.js allowed me to build a robust and efficient server. It follows a Model-View-Controller (MVC) architecture, making the codebase organized and maintainable. Express.js is known for its speed and scalability, which makes it a solid choice for building RESTful APIs and handling HTTP requests efficiently.

### SQLite3
As the database system, I opted for SQLite3. This choice is excellent for small to medium-sized applications, as it is lightweight and serverless, which simplifies the setup. SQLite3 provides persistent storage on disk, ensuring data integrity and reliability. Its flexibility and simplicity made it a great fit for this project.

### Better-npm-run
To streamline the configuration management of the project, I utilized Better-npm-run. This tool helped manage scripts within the package.json file, making it easier to run various tasks, such as building and running the application. It enhances the development process by simplifying and automating routine tasks.

### ESLint
ESLint was employed for code quality and style consistency. It's a widely adopted tool for identifying and fixing problems in JavaScript code. By using ESLint, I ensured that the code adheres to best practices and maintains a high level of quality.

### Testing
I adopted a comprehensive testing approach for this project. Unit testing was performed on the model, validating the correctness of the individual components. 

Additionally, integration tests were conducted among the backend endpoints to ensure the smooth interaction of different parts of the application.

### Database Seeding
I incorporated a script for seeding the database and configuring initial values, such as Departments. This feature ensures that the application starts with predefined data, allowing for a smooth user experience from the beginning.

## Frontend
### Next.js
For the frontend, I selected Next.js, a React framework known for its performance, scalability, and developer-friendly features. Next.js provides server-side rendering, automatic code splitting, and routing, making it perfect for building fast and SEO-friendly web applications. The choice of Next.js allowed me to create a dynamic and responsive user interface.

### Tailwind CSS
For styling, I harnessed the power of Tailwind CSS. Tailwind is a utility-first CSS framework that simplifies the design process and provides a consistent and visually appealing user interface. It enables rapid development by applying pre-defined styles, which significantly accelerates the frontend development workflow.

## Conclusion
The combination of Express.js, Next.js, Tailwind CSS, and the other tools mentioned above creates a robust, maintainable, and high-performance web application. 

The use of these technologies ensures a seamless development experience, efficient resource management, and a user-friendly interface. This tech stack allowed me to deliver a reliable and well-structured solution for this assignment.


# Data Models

> **All models are defined in src/models/model.js**

![Entity Diagram](./docs/entity-diagram.png)


# Pre-requisites

The exercise requires [Node.js 16.14 or later](https://nodejs.org/en/) to be installed. I recommend using the LTS version.

> Start by creating a local repository for this folder.


# DEV

## Getting Set Up

1. In the repo root directory, open a terminal and run `npm install` to gather all dependencies.

1. Next, on the terminal, `npm run seed-dev` will seed the local SQLite database with all tables populated with some tests. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Open a terminal and run `npm run start-dev-api` which should start the api. Leave it running.

1. Open another terminal and run `npm run start-dev` which should start the frontend server. Leave it running.

1. Open the URL localhost:3000/ on a browser of your choice.


## How to start the backend server on Debug Mode

1. Stop all other instances of the terminal

1. Open the terminal and run `npm run debug-dev-api`


## How to run the tests (Unit and Integration)

> Open the terminal and run `npm run test`


## How to change the running port of the server (frontend)

1. Open the file 'package.json' on the root folder

1. Locate the property "betterScripts" and inside it you will find "start-prod" and "start-dev"

1. Change the property "PORT" for the one that you need (the default Prod port is 8080 and Dev is 3000)



# PROD

## Building and deploying manually

1. Log into the production server and clone this project repository to it.

1. In the repo root directory, open a terminal and run `npm install` to gather all dependencies.

1. Configure the departments of your company by editing the file `scripts\departments.json`

1. On the terminal, run `npm run build` to deploy a ".next" folder fully optimized

1. Next, on the terminal, run `npm run seed`. It will create the local SQLite database and seed it with the departments you have configured.
**Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Open a terminal and run `npm run start-prod-api` which should start the api. LEAVE it running.

1. Open another terminal and run `npm run start-prod` which should start the frontend server. LEAVE it running.

1. Open the URL localhost:8080/ on a browser of your choice and test the application to see if suceeded. If failed, check if you did not change port 8080 by another one.

