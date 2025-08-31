import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Axios instance
const client = axios.create({
  baseURL: 'http://localhost:3000',
});

const RegisterForm = () => {
  // Instantiated useNavigate
  const nagivate = useNavigate();

  // Declare state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handling the username change
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Form Submission
  const handleRegister = (e) => {
    e.preventDefault();
    try {
      createUser(username, email, password);
      window.flash('User registered with success!', 'success');
    } catch (err) {
      console.log(`Error:`, err);
      window.flash(
        'Error while trying to register user, please try again!',
        'error'
      );
    }
  };

  // API POST CALL
  const createUser = (username, email, password) => {
    client
      .post('/registerUser', {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log('User create', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setUsername('');
    setEmail('');
    setPassword('');

    nagivate('/home');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container" style={{ maxWidth: '400px' }}>
        <form className="p-4 border rounded shadow-sm bg-white w-100">
          {/* Input 1 - username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Please enter your username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={username}
              onChange={handleUsername}
            />
          </div>

          {/* Input 2 - email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Please enter your email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={handleEmail}
            />
          </div>

          {/* Input 3 - password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Please enter your password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={handlePassword}
            />
          </div>

          {/* Input 4 - submit */}
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={handleRegister}
          >
            Create account
          </button>
        </form>
        {/* Input 5 - link to login */}
        <p className="mt-3 text-center">
          Alrady have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
