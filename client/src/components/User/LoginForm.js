import { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container" style={{ maxWidth: '450px' }}>
        <form className="p-4 border rounded shadow-sm bg-white w-100">
          {/* Input 1 */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Please enter your username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={input.username}
              onChange={handleChange}
            />
          </div>

          {/* Input 2 */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Please enter your password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={input.password}
              onChange={handleChange}
            />
          </div>

          {/* Input 3 */}
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        {/* Input 4 */}
        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
