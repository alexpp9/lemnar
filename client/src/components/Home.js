import Catalogue from './Item/Catalogue';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
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
    <div className="container">
      <h1 className="text-center mt-5">
        Welcome to our furniture webiste. Please browse our collections below
      </h1>

      <div>
        <Catalogue fetchedData={data} />
      </div>
    </div>
  );
};

export default Home;
