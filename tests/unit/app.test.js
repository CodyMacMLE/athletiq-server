// tests/unit/app.test.js

const request = require('supertest');

// Get our Express app object (we don't need the server part)
const app = require('../../src/app');

describe("App level routes check", () => {
  test('404 handler', async () => {
    const res = await request(app).get('/pageThatWillNeverExist');
    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({
      status: 'error',
      error: {
        code: 404,
        message: 'not found',
      },
    })
  });
})
