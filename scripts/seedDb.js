const { sequelize, Department } = require('./../api/models/model');
const path = require('path');
const fs = require('fs');

const departments = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "scripts", "departments.json")));

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
    // create tables
    await sequelize.sync({ force: true });

    // seed data
    for (const department of departments) {
        await Department.create({
            name: department
        });
    }

    console.log('Database seeded');
}