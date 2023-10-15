var express = require('express');
var router = express.Router();
const employeeController = require('../controllers/employee.controller');

router
    .route('/')
    .get(employeeController.getEmployees)
    .post(employeeController.createEmployee)

router
    .route('/:id')
    .get(employeeController.getEmployeeById)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

module.exports = router;