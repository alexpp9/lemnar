import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>Welcome to our furniture website!</h1>
      <Link className="btn btn-primary" to="/home">
        Browse website
      </Link>
    </div>
  );
};

export default IndexPage;
