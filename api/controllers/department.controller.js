const departmentService = require('../services/department.service');

const getDepartments = async function (req, res, next) {
    try {
        const departments = await departmentService.getAllDepartments();
        res.send(departments);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDepartments
};