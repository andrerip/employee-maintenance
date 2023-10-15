const { sequelize, Employee, Department } = require('../src/models/model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
    // create tables
    await sequelize.sync({ force: true });

    // seed data
    const itDepartment = await Department.create({
        name: 'IT'
    });

    const employee1 = await Employee.create({
        firstName: 'Andre',
        lastName: 'Ripari',
        hireDate: '2023-10-25',
        phone: '+55-11-96719906',
        address: '123 Saint John St'
    });

    await employee1.setDepartment(itDepartment);

    console.log('Database seeded');
}