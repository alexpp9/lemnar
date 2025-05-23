import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();

  // Create an Axios instance
  const client = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  });

  const loginAction = async ({ username, password }) => {
    try {
      const response = await client.post('/loginUser', {
        username,
        password,
      });

      setUser(response.data.data);
      setToken('session-active');

      localStorage.setItem('site', 'session-active');

      navigate('/home');
      return;
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const logOut = async () => {
    try {
      await client.post('/logoutUser');
      setUser(null);
      setToken('');
      localStorage.removeItem('site');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
