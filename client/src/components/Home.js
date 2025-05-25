// import { useAuth } from '../hooks/AuthProvider';
import Navbar from './Navbar';
// import CreateItemForm from './CreateItemForm';
import Catalogue from './Catalogue';
// import { Link } from 'react-router-dom';
// imports
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  // Hook instance;
  // const auth = useAuth();

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
      <div className="container">
        <h1 className="text-center mt-5">
          Welcome to our furniture webiste. Please browse our collections below
        </h1>

        <div>
          <Catalogue fetchedData={data} />
        </div>
      </div>
    </div>
  );
};

export default Home;
