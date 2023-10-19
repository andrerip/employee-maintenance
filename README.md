# fullstack-assessment

Andre's FullStack Assessment. 
Project: Simple Employee Maintenance web app

## Data Models

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
