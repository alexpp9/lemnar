import { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { client } from '../Utilities/Client';

const ReviewForm = ({ data }) => {
  // For protection
  const auth = useAuth();
  //   Form fields state
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  // Handles comment change
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  // Form Submission
  const handleCreateComment = (e) => {
    e.preventDefault();
    createComment(comment, rating);
  };

  // Create commnet
  // API POST CALL
  const createComment = (comment, rating) => {
    client
      .post('/api/items/:id/reviews', {
        body: comment,
        rating: rating,
        item_ref: data,
        author: auth.user._id,
      })
      .then((response) => {
        console.log('Comment created', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setComment('');
    setRating('');
  };

  return (
    <form className="border rounded p-3 bg-white shadow-sm mb-3 shadow-lg">
      <h6 className="border-bottom pb-2 mb-3 text-muted">Leave a comment</h6>
      <div className="mb-3">
        <label htmlFor="customRange2" className="form-label">
          Rating: {rating}
        </label>
        <input
          onChange={handleRating}
          type="range"
          value={rating}
          className="form-range"
          min="0"
          max="5"
          id="rating"
          title={`Rating: ${rating}`}
        ></input>
      </div>
      <div className="mb-3">
        <textarea
          onChange={handleComment}
          value={comment}
          name="comment"
          placeholder="Write your comment here..."
          className="form-control"
          rows="3"
        />
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-outline-primary btn-sm fw-semibold"
          onClick={handleCreateComment}
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
