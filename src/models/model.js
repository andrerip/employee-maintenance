const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
});

const Department = sequelize.define('Department', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Employee = sequelize.define('Employee', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hireDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Employee.belongsTo(Department);
Department.hasMany(Employee);

module.exports = {
    sequelize,
    Department,
    Employee
};