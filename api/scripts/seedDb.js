const { sequelize, Employee, Department } = require('../models/model');

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

    const accountingDepartment = await Department.create({
        name: 'Accounting Department'
    });

    const employee1 = await Employee.create({
        firstName: 'Andre',
        lastName: 'Ripari',
        hireDate: '2023-05-25',
        phone: '+55-11-96719906',
        address: '123 Saint John St',
        active: true
    });

    const employee2 = await Employee.create({
        firstName: 'John',
        lastName: 'Doe',
        hireDate: '2022-01-01',
        phone: '+55-11-96719907',
        address: '456 Main St',
        active: false
    });

    const employee3 = await Employee.create({
        firstName: 'Bob',
        lastName: 'Johnson',
        hireDate: '2021-12-31',
        phone: '+44-20-12345678',
        address: '789 Main St',
        active: true
    });

    const employee4 = await Employee.create({
        firstName: 'Jane',
        lastName: 'Doe',
        hireDate: '2010-04-15',
        phone: '+33-1-23456789',
        address: '101 Main St',
        active: true
    });

    await employee1.setDepartment(itDepartment);
    await employee2.setDepartment(hrDepartment);
    await employee3.setDepartment(hrDepartment);
    await employee4.setDepartment(accountingDepartment);

    console.log('Database seeded');
}