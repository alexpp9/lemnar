import { useAuth } from '../hooks/AuthProvider';
import Navbar from './Navbar';
import CreateItemForm from './CreateItemForm';
import Catalogue from './Catalogue';
import { Link } from 'react-router-dom';
// imports
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  // Hook instance;
  const auth = useAuth();

  // State;
  const [data, setData] = useState([]);

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
      <Navbar />
      <div>
        <h1>Welcome! {auth.user ? auth.user.username : ''}</h1>
        {!auth.user ? (
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
        ) : (
          <button className="btn btn-danger" onClick={auth.logOut}>
            Logout
          </button>
        )}
        {auth.user && auth.user.isAdmin ? <CreateItemForm /> : ''}
      </div>
      <div>
        <Catalogue fetchedData={data} />
      </div>
    </div>
  );
};

export default Home;
