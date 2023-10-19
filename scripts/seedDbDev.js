const { sequelize, Employee, Department, DepartmentHistory } = require('./../api/models/model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
    // create tables
    await sequelize.sync({ force: true });

    // seed data
    const itDepartment = await Department.create({
        name: 'IT'
    });

    const hrDepartment = await Department.create({
        name: 'HR'
    });

    const accountingDepartment = await Department.create({
        name: 'Accounting'
    });

    const employee1 = await Employee.create({
        firstName: 'Andre',
        lastName: 'Ripari',
        hireDate: '2023-05-25',
        phone: '+55-11-96719906',
        address: '123 Saint John St',
        active: true
    });
    await employee1.setDepartment(itDepartment);
    await DepartmentHistory.create({
        DepartmentId: itDepartment.id,
        EmployeeId: employee1.id,
        startDate: '2023-05-25'
    });


    const employee2 = await Employee.create({
        firstName: 'John',
        lastName: 'Doe',
        hireDate: '2022-01-01',
        phone: '+55-11-96719907',
        address: '456 Main St',
        active: false
    });
    await employee2.setDepartment(hrDepartment);
    await DepartmentHistory.create({
        DepartmentId: hrDepartment.id,
        EmployeeId: employee2.id,
        startDate: '2022-01-01'
    });


    const employee3 = await Employee.create({
        firstName: 'Bob',
        lastName: 'Johnson',
        hireDate: '2021-12-31',
        phone: '+44-20-12345678',
        address: '789 Main St',
        active: true
    });
    await employee3.setDepartment(hrDepartment);
    await DepartmentHistory.create({
        DepartmentId: hrDepartment.id,
        EmployeeId: employee3.id,
        startDate: '2021-12-31'
    });


    const employee4 = await Employee.create({
        firstName: 'Jane',
        lastName: 'Doe',
        hireDate: '2010-04-15',
        phone: '+33-1-23456789',
        address: '101 Main St',
        active: true
    });
    await employee4.setDepartment(accountingDepartment);
    await DepartmentHistory.create({
        DepartmentId: accountingDepartment.id,
        EmployeeId: employee4.id,
        startDate: '2010-04-15'
    });

    console.log('Database seeded');
}