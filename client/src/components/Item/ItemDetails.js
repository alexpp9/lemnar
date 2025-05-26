import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import axios from 'axios';

const ItemDetails = () => {
  // Initialize navigate
  const navigate = useNavigate();
  // For protection
  const auth = useAuth();
  // Makes use of useLocation for passing in state
  const location = useLocation();
  //   Checks to see if there's data and assigns it or assings undefined if not.

  const item =
    location.state && location.state.item ? location.state.item : undefined;
  // Checks truthy values - if unthruthy, means no item so show message.
  if (!item) {
    return (
      <div>
        <Link className="btn btn-primary" to="/home">
          Keep browsing
        </Link>
      </div>
    );
  }

  //   Delete images from Cloudinary as well.
  //   Function call to delete Item.
  const deleteItem = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${item._id}`, {
        withCredentials: true,
      });
      navigate('/home');
    } catch (err) {
      console.error('Error occured while trying to delete:', err);
    }
  };
  return (
    <div className="container mt-5">
      {/* Title */}
      <h2 className="mb-4 text-center fw-bold">{item.name}</h2>

      {/* Item Images */}
      <div className="row mb-4 g-3">
        {item.image_url.map((url, idx) => (
          <div key={idx} className="col-6 col-md-4">
            <img
              src={url}
              alt={`${item.name} ${idx + 1}`}
              className="img-fluid rounded shadow-sm"
              style={{ objectFit: 'cover', height: '350px', width: '100%' }}
            />
          </div>
        ))}
      </div>

      {/* Item Info Card */}
      <div className="card shadow-lg mb-3">
        <div className="card-body">
          <h5 className="card-title border-bottom pb-2 mb-3">Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Description:</strong> {item.description}
            </li>
            <li className="list-group-item">
              <strong>Material:</strong> {item.material}
            </li>
            <li className="list-group-item">
              <strong>Color:</strong> {item.colour}
            </li>
            <li className="list-group-item">
              <strong>Room:</strong> {item.room}
            </li>
            <li className="list-group-item">
              <strong>Type:</strong> {item.type}
            </li>
            <li className="list-group-item">
              <strong>Weight:</strong> {item.weight} kg
            </li>
            <li className="list-group-item">
              <strong>Price:</strong>{' '}
              <span className="text-success fw-semibold">${item.price}</span>
            </li>
          </ul>
        </div>

        {auth.user && auth.user.isAdmin ? (
          <div className="p-3 d-flex flex-wrap gap-2 justify-content-start border-top">
            <Link to="/update" state={{ item }} className="btn btn-info">
              Edit info
            </Link>
            <button onClick={deleteItem} className="btn btn-danger">
              Delete item
            </button>
          </div>
        ) : (
          ' '
        )}

        <div className="p-3 border-top">
          <Link className="btn btn-success w-100" to="/home">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
