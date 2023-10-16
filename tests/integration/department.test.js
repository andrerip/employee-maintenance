const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');

describe('Department endpoints', () => {
    describe('GET all departments', () => {
        it('should return all departments', async () => {
            const res = await request(app).get('/departments');
            expect(res.statusCode).toEqual(httpStatus.OK);
            expect(Array.isArray(res.body)).toBeTruthy();
        });
    });
});