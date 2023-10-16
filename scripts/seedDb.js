const { sequelize, Employee, Department } = require('../src/models/model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
    // create tables
    await sequelize.sync({ force: true });

    // seed data
    const itDepartment = await Department.create({
        name: 'IT Department'
    });

    const hrDepartment = await Department.create({
        name: 'HR Department'
    });

    const employee1 = await Employee.create({
        firstName: 'Andre',
        lastName: 'Ripari',
        hireDate: '2023-10-25',
        phone: '+55-11-96719906',
        address: '123 Saint John St'
    });

    const employee2 = await Employee.create({
        firstName: 'John',
        lastName: 'Doe',
        hireDate: '2023-10-26',
        phone: '+55-11-96719907',
        address: '456 Main St'
    });

    const employee3 = await Employee.create({
        firstName: 'Bob',
        lastName: 'Johnson',
        hireDate: '2024-05-15',
        phone: '+44-20-12345678',
        address: '789 Main St'
    });

    const employee4 = await Employee.create({
        firstName: 'Jane',
        lastName: 'Doe',
        hireDate: '2025-12-31',
        phone: '+33-1-23456789',
        address: '101 Main St'
    });

    await employee1.setDepartment(itDepartment);
    await employee2.setDepartment(hrDepartment);
    await employee3.setDepartment(hrDepartment);
    await employee4.setDepartment(itDepartment);

    console.log('Database seeded');
}