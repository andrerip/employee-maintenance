const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');

describe('Employee endpoints', () => {
    let employeeId;

    describe('Create employee', () => {
        it('should create a new employee', async () => {
            const newEmployee = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@example.com',
                phone: '1234567890',
                hireDate: '2021-10-01',
                address: '123 Main St',
                departmentId: 1
            };

            const res = await request(app).post('/employees').send(newEmployee);
            expect(res.statusCode).toEqual(httpStatus.CREATED);
            expect(res.body).toHaveProperty('id');
            employeeId = res.body.id;
        });
    });

    describe('Get employee by ID', () => {
        it('should get the employee by ID', async () => {
            const res = await request(app).get(`/employees/${employeeId}`);
            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('id', employeeId);
        });
    });

    describe('Update employee address by ID', () => {
        it('should update the employee address by ID', async () => {
            const updatedEmployee = {
                address: 'update test address'
            };

            const res = await request(app).put(`/employees/${employeeId}`).send(updatedEmployee);
            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('address', updatedEmployee.address);
        });
    });

    describe('Get all employees', () => {
        it('should return all employees', async () => {
            const res = await request(app).get('/employees');
            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('Delete employee by ID', () => {
        it('should delete the employee by ID', async () => {
            const res = await request(app).delete(`/employees/${employeeId}`);
            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(res.body).toHaveProperty('message', 'Employee deleted successfully');
        });
    });
});
