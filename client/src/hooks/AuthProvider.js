import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../components/Utilities/Client';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkSession = async () => {
      if (token === 'session-active') {
        try {
          // You must implement this route in your backend
          const res = await client.get('/check-auth');
          if (res.data?.data) {
            setUser(res.data.data);
          } else {
            // Session not valid
            setUser(null);
            setToken('');
            localStorage.removeItem('site');
          }
        } catch (err) {
          console.error('Session check failed:', err);
          setUser(null);
          setToken('');
          localStorage.removeItem('site');
        }
      }
    };
    checkSession();
  }, [token]);

  // Login function
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
    } catch (err) {
      console.error('Login error:', err);
    }
  };
  // Logout function
  const logOut = async () => {
    try {
      await client.post('/logoutUser');
      setUser(null);
      setToken('');
      localStorage.removeItem('site');
      navigate('/home');
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
