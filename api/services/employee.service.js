const { sequelize, Employee, Department, DepartmentHistory } = require('../models/model');

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

const getDepartmentHistory = async (employee) => {
    return await employee.getDepartmentHistories({
        attributes: ['id', 'startDate'],
        include: {
            model: Department,
            attributes: ['id', 'name']
        }
    });
}

const createEmployee = async (employeeData) => {
    const t = await sequelize.transaction();
    try {
        const employee = await Employee.create(employeeData, { transaction: t });
        await DepartmentHistory.create({
            DepartmentId: employeeData.DepartmentId,
            EmployeeId: employee.id,
            startDate: employeeData.hireDate
        }, { transaction: t });
        await t.commit();
        return employee;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const updateEmployee = async (employee, newEmployeeData) => {
    const t = await sequelize.transaction();
    try {
        if (newEmployeeData.DepartmentId && newEmployeeData.DepartmentId !== employee.Department.id) {
            await DepartmentHistory.create({
                DepartmentId: newEmployeeData.DepartmentId,
                EmployeeId: employee.id,
                startDate: new Date()
            }, { transaction: t });
        }
        await employee.update(newEmployeeData, { transaction: t });
        await t.commit();
        return await getEmployeeById(employee.id);
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const deleteEmployee = async (employee) => {
    return await employee.destroy();
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    getDepartmentHistory,
    createEmployee,
    updateEmployee,
    deleteEmployee
};