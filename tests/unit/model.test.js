const { faker } = require('@faker-js/faker');
const { Department, Employee } = require('../../src/models/model');

describe('Model tests', () => {
    describe('Employee validation', () => {
        let employee;
        beforeEach(() => {
            employee = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                hireDate: faker.date.past(),
                phone: faker.phone.number(),
                address: faker.location.streetAddress()
            };
        });

        test('should correctly validate a valid employee', async () => {
            const result = await new Employee(employee).validate();
            expect(result).toEqual(expect.objectContaining({
                firstName: expect.any(String),
                lastName: expect.any(String),
                hireDate: expect.any(String),
                phone: expect.any(String),
                address: expect.any(String)
            }));
        });

        test('should throw a validation error if firstName is null', async () => {
            employee.firstName = null;
            await expect(new Employee(employee).validate()).rejects.toThrow();
        });

        test('should throw a validation error if lastName is null', async () => {
            employee.lastName = null;
            await expect(new Employee(employee).validate()).rejects.toThrow();
        });

        test('should throw a validation error if hireDate is null', async () => {
            employee.hireDate = null;
            await expect(new Employee(employee).validate()).rejects.toThrow();
        });

        test('should throw a validation error if phone is null', async () => {
            employee.phone = null;
            await expect(new Employee(employee).validate()).rejects.toThrow();
        });

        test('should throw a validation error if address is null', async () => {
            employee.address = null;
            await expect(new Employee(employee).validate()).rejects.toThrow();
        });
    });

    describe('Department validation', () => {
        let department;
        beforeEach(() => {
            department = {
                name: faker.commerce.department()
            };
        });

        test('should correctly validate a valid department', async () => {
            const result = await new Department(department).validate();
            expect(result).toEqual(expect.objectContaining({
                name: expect.any(String)
            }));
        });

        test('should throw a validation error if name is null', async () => {
            department.name = null;
            await expect(new Department(department).validate()).rejects.toThrow();
        });
    });
});