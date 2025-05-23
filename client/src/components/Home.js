import { useAuth } from '../hooks/AuthProvider';
import Logout from '../components/Logout';
import LoginForm from '../components/LoginForm';
import CreateItemForm from './CreateItemForm';

// imports
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  // Hook instance;
  const auth = useAuth(null);

  // State;
  const [data, setData] = useState(null);

  // Calling data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/items');
        setData(response.data.data);
        return;
      } catch (err) {
        console.error('No items found:', err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div>
        <h1>Welcome! {auth.user ? auth.user.username : ''}</h1>
        {!auth.user ? <LoginForm /> : <Logout />}
        {auth.user && auth.user.isAdmin ? <CreateItemForm /> : ''}
      </div>
    </div>
  );
};

export default Home;
