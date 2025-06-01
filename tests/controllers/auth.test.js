// Mocked models/functions
// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hash password'),
}));

// Allows us to mock the whole module
jest.mock('../../models/user');

const { registeredUser, loginUser } = require('../../controllers/users');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

// REGISTER user test
// ==================
// Describe what the test is doing
// for register, we need to test: if a user already exists,
// and another is the cretion.
// in conclusion, we need two tests.

// GPT - suggestion
afterEach(() => {
  jest.clearAllMocks();
});

/*
// Fake request object
const request = {
  body: {
    username: 'test_username',
    email: 'test_username@gmail.com',
    password: 'test_password',
  },
  session: {},
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
  bcrypt.hash.mockReturnValueOnce('hash password');

  // Mock user create - GPT suggestion
  const saveMock = jest.fn().mockResolvedValueOnce();
  const userInstance = {
    // Step 3: Create a save mock and attach it to the mocked User instance
    // GPT - suggestion
    save: saveMock,
    id: 1,
    username: 'test_username',
    email: 'test_username@gmail.com',
    password: 'test_password',
  };
  User.mockImplementation(() => userInstance);
  await registeredUser(request, response);

  //   Assertions - 10 represents the salt rounds
  expect(bcrypt.hash).toHaveBeenCalledWith('test_password', 10);

  //   Creating the user - GTP suggestion

  expect(User).toHaveBeenCalledWith({
    username: 'test_username',
    email: 'test_username@gmail.com',
    password: 'hash password',
  });
  expect(saveMock).toHaveBeenCalled();

  expect(response.status).toHaveBeenCalledWith(201);
});
*/

// Login User
const request = {
  body: {
    username: 'test_username',
    password: 'test_password',
  },
  session: {},
};

const response = {
  status: jest.fn((x) => x).mockReturnThis(),
  json: jest.fn(),
};
// ==========
it('should return a status code of 200 if user found', async () => {
  // Mock findOne - return fake user
  User.findOne.mockImplementationOnce(() => ({
    username: 'test_username',
    password: 'hash password',
  }));

  bcrypt.compare = jest.fn().mockResolvedValue(true); // GPT suggestion
  // mock the findOne function call
  await loginUser(request, response);
  // Assertions
  // excepts 400 (because user already exists)
  expect(response.status).toHaveBeenCalledWith(200);
  // Test to see if the chaining of .json works
  // .toHaveBeenCalledTimes - asserts how many times a function has been called.
  expect(response.json).toHaveBeenCalledTimes(1);
});
