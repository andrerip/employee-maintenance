const { Employee } = require('../models/model');

const getAllEmployees = async () => {
    return await Employee.findAll();
}

const getEmployeeById = async (id) => {
    return await Employee.findByPk(id);
}

const createEmployee = async (employeeData) => {
    return await Employee.create(employeeData);
}

const updateEmployee = async (employee, employeeData) => {
    return await employee.update(employeeData);
}

const deleteEmployee = async (employee) => {
    return await employee.destroy();
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};