const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
});

const Department = sequelize.define('Department', {
    name: Sequelize.STRING
});

const Employee = sequelize.define('Employee', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    hireDate: Sequelize.DATE,
    phone: Sequelize.STRING,
    address: Sequelize.STRING
});

Employee.belongsTo(Department);
Department.hasMany(Employee);

module.exports = {
    sequelize,
    Department,
    Employee
};