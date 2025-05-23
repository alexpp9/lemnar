import { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  // Instantiate useNavigate
  const navigate = useNavigate();
  // auth From Context
  const auth = useAuth();
  // new state
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  // Handle bulk states
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  // Form Submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (input.username !== '' && input.password !== '') {
      auth.loginAction(input);
      // Clear the form inputs after login
      setInput({
        username: '',
        password: '',
      });
      navigate('/home');
      return;
    }
    alert('please provide a valid input');
  };
  return (
    <div>
      <form>
        <label>Please enter your username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <label>Please enter your password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
      <p>
        Don’t have an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
};

export default LoginForm;
