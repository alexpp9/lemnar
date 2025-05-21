import { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  // Axios instance
  const client = axios.create({
    baseURL: 'http://localhost:3000',
  });
  // Declare state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Handling the username change
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  // Handling the password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  // Form Submission
  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(username, password);
  };

  // API POST CALL
  const loginUser = (username, password) => {
    client
      .post('/loginUser', {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log('User Logged in.', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setUsername('');
    setPassword('');

    // // Set locally
    // localStorage.setItem('lemnar_username', username);
    // localStorage.setItem('lemnar_loginStatus', true);
    // localStorage.setItem('lemnar_loginTime', Date.now());
    // // 24h = 86400000 mili
  };

  // const normalForm =

  return (
    <div>
      <form>
        <label>Please enter your username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        <label>Please enter your password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
