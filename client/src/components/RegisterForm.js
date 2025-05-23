import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  // Instantiated useNavigate
  const nagivate = useNavigate();
  // Axios instance
  const client = axios.create({
    baseURL: 'http://localhost:3000',
  });
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

    createUser(username, email, password);
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
    <form>
      <label>Please enter your username: </label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleUsername}
      />
      <label>Please enter your email: </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmail}
      />
      <label>Please enter your password: </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handlePassword}
      />
      <button onClick={handleRegister}>Create account</button>
    </form>
  );
};

export default RegisterForm;
