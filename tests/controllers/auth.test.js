const { registeredUser, loginUser } = require('../../controllers/users');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn((x) => x),
}));

// Allows us to mock the whole module
jest.mock('../../models/user');
// REGISTER user test
// ==================
// Describe what the test is doing
// for register, we need to test: if a user already exists,
// and another is the cretion.
// in conclusion, we need two tests.

// Fake request object
const request = {
  body: {
    username: 'test_username',
    email: 'test_username@gmail.com',
    password: 'test_password',
  },
};
// Fake response object
const response = {
  // jest.fn() mocks a function
  // .mockReturnThis() - allows chaining (GPT suggestion)
  status: jest.fn((x) => x).mockReturnThis(),
  json: jest.fn(),
};
it('should send a status code of 400 when user exists', async () => {
  // Mock findOne - return fake user
  User.findOne.mockImplementationOnce(() => ({
    id: 1,
    username: 'fake_username',
    email: 'fake_email',
    password: 'fake_passowrd',
  }));
  // mock the findOne function call
  await registeredUser(request, response);
  // Assertions
  // excepts 400 (because user already exists)
  expect(response.status).toHaveBeenCalledWith(400);
  // Test to see if the chaining of .json works
  // .toHaveBeenCalledTimes - asserts how many times a function has been called.
  expect(response.json).toHaveBeenCalledTimes(1);
});

// Mock new User
it('should send a status code 201 when new user is created', async () => {
  // Mock find user, but force it to be false, so the logic will move towards creating the new user.
  User.findOne.mockResolvedValueOnce(undefined);

  //   Mock hashing - rule of unit testing? doesn't slow down the application
  bcrypt.hash.mockReturnValueOnce('hash');
  await registeredUser(request, response);
});
