import { Link } from 'react-router-dom';

const Item = ({ data }) => {
  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      {data.map((item) => (
        <div
          key={item.id || item.name}
          className="d-flex justify-content-center mb-4"
          style={{ width: '70%' }}
        >
          {/* Image container */}
          <div style={{ width: '30%' }}>
            <img
              src={item.image_url[0]}
              className="img-thumbnail w-100"
              alt={item.name}
            />
          </div>

          {/* Card container */}
          <div style={{ width: '70%' }}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>

                <Link
                  to="/details"
                  state={{ item }}
                  className="btn btn-primary mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item;
