# fullstack-assessment

Andre's FullStack Assessment. 
Project: Simple Employee Maintenance web app

## Data Models

> **All models are defined in src/models/model.js**

![Entity Diagram](./artifacts/entity-diagram.png)


## Getting Set Up

The exercise requires [Node.js 16.14 or later](https://nodejs.org/en/) to be installed. I recommend using the LTS version.

1. Start by creating a local repository for this folder.

1. In the repo root directory, open a terminal and run `npm install` to gather all dependencies.

1. Next, on the terminal, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Then run `npm start` which should start the server.


## How to start the server on Debug Mode

> Open the terminal and run `npm run debug`


# How to run the tests (Unit and Integration)

> Open the terminal and run `npm run test`

To run with "watch" enabled:

> Open the terminal and run `npm run test:watch`