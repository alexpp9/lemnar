import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import axios from 'axios';
import { client } from '../Utilities/Client';

// Components
import ReviewForm from '../Review/ReviewForm';

const ItemDetails = () => {
  // State
  const { id } = useParams();
  const [item, setItem] = useState(null);

  // Fetch Item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await client.get(`/api/items/${id}`);
        setItem(response.data.data);
      } catch (err) {
        console.log('Error occured while fetching item: ', err);
      }
    };

    fetchItem();
  }, [id]);

  // Initialize navigate
  const navigate = useNavigate();
  // For protection
  const auth = useAuth();

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
        {/* key={idx} as unique identifier for each image */}
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
      <div className="card shadow-lg mb-4">
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

      {/* Post comment form */}
      <div className="mb-3">
        {auth.user ? (
          <ReviewForm data={item._id} />
        ) : (
          <p>
            <Link to="/register">Register</Link> or{' '}
            <Link to="/login">Login</Link> in order to leave a comment! 😄
          </p>
        )}
      </div>
      {/* Reviews Section */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h5 className="card-title border-bottom pb-2 mb-3">Reviews</h5>

          {item.reviews_ref.length === 0 ? (
            <p className="text-muted">There are no reviews yet.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {item.reviews_ref.map((review) => (
                <li key={review._id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{review.author.username}</strong>
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleString('en-GB')}
                    </small>
                  </div>

                  {review.rating && (
                    <p className="mb-1">
                      <span className="fw-semibold">Rating:</span>{' '}
                      {review.rating}/5
                    </p>
                  )}

                  <p className="mb-0">{review.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
