const employeeService = require('../services/employee.service');

const getEmployees = async function (req, res, next) {
    try {
        const employees = await employeeService.getAllEmployees();
        res.send(employees);
    } catch (error) {
        next(error);
    }
}

const getEmployeeById = async function (req, res, next) {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        if (employee) {
            res.send(employee);
        } else {
            res.status(404).send({ error: "Employee not found" });
        }
    } catch (error) {
        next(error);
    }
}

const createEmployee = async function (req, res, next) {
    try {
        const employee = await employeeService.createEmployee(req.body);
        res.status(201).send(employee);
    } catch (error) {
        next(error);
    }
}

const updateEmployee = async function (req, res, next) {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        if (employee) {
            const employeeUpdated = await employeeService.updateEmployee(employee, req.body);
            res.send(employeeUpdated);
        } else {
            res.status(404).send({ error: "Employee not found" });
        }
    } catch (error) {
        next(error);
    }
}

const deleteEmployee = async function (req, res, next) {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        if (employee) {
            await employeeService.deleteEmployee(employee);
            res.send({ message: "Employee deleted successfully" });
        } else {
            res.status(404).send({ error: "Employee not found" });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};