const request = require('supertest');
const mongoose = require('mongoose');
const { createApp } = require('../../createApp');

describe('create user & login - end to end integration test', () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect('mongodb://localhost/lemnar-testDB')
      .then(() => console.log('Connected to Test Database'))
      .catch((err) => console.log(`Error: ${err}`));
    app = createApp();
  });

  //   Register
  it('should create a new user', async () => {
    const response = await request(app).post('/registerUser').send({
      username: 'jkl',
      email: 'jkl@gmail.com',
      password: 'jkl1234567',
    });
    // Assert what you expect
    expect(response.statusCode).toBe(201);
  });

  //   Login
  it('should login previously registered user', async () => {
    const response = await request(app).post('/loginUser').send({
      username: 'jkl',
      password: 'jkl1234567',
    });

    // Assert expecttions
    expect(response.statusCode).toBe(200);
    expect(response.body.data.username).toBe('jkl');
  });

  //   Runs at each cycle
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
