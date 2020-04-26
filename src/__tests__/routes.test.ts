import request from 'supertest';
import app from '../app';

test('should redirect user to main page when q param are missing', async () => {
  const { status, } = await request(app).get('/drugs');
  expect(status).toBe(302);
});

test('should render an alert', async () => {
  const { status, text } = await request(app).get('/drugs?q=drugs');
  expect(status).toBe(200);
  expect(text).toContain("Drug drugs not available");
});