const request = require('supertest');
const { app } = require('../src/index');

describe('API routes', () => {
  it('GET /api/teams', async () => {
    const res = await request(app).get('/api/teams');
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/contact validation', async () => {
    const res = await request(app).post('/api/contact').send({});
    expect(res.statusCode).toBe(400);
  });
});
