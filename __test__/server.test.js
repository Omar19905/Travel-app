const request = require('supertest');
const app = require('../src/server/server');


describe('Test server /test', () => {
    test('should return 200 and pass', async () => {
        const response = await request(app).get('/test');

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Pass!')
    });
});
