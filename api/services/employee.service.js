const { Employee, Department } = require('../models/model');

const getAllEmployees = async () => {
    return await Employee.findAll({
        attributes: { exclude: ['DepartmentId'] },
        include: {
            model: Department,
            attributes: ['id', 'name']
        }
    });
}

const getEmployeeById = async (id) => {
    return await Employee.findByPk(id, {
        attributes: { exclude: ['DepartmentId'] },
        include: {
            model: Department,
            attributes: ['id', 'name']
        }
    });
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