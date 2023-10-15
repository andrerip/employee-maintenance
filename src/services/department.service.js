const { Department } = require('../models/model');

const getAllDepartments = async () => {
    const departments = await Department.findAll();
    return departments;
}

module.exports = {
    getAllDepartments
};