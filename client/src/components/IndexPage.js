import { Link } from 'react-router-dom';
import './../index.css';

const IndexPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 backgroundImage">
      <h1
        style={{
          zIndex: '100',
          color: '#fff',
        }}
      >
        Welcome to our furniture website!
      </h1>
      <Link
        className="btn btn-primary"
        to="/home"
        style={{
          zIndex: '100',
        }}
      >
        Browse website
      </Link>
    </div>
  );
};

export default IndexPage;
