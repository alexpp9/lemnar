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
        {/* New Rating */}
        <fieldset className="starability-basic">
          <legend style={{ width: '200px' }}>Leave a rating:</legend>
          <input
            type="radio"
            id="rate1"
            name="rating"
            value="1"
            checked={rating === '1'}
            onChange={handleRating}
          />
          <label htmlFor="rate1" title="1 star">
            1 star
          </label>

          <input
            type="radio"
            id="rate2"
            name="rating"
            value="2"
            checked={rating === '2'}
            onChange={handleRating}
          />
          <label htmlFor="rate2" title="2 stars">
            2 stars
          </label>

          <input
            type="radio"
            id="rate3"
            name="rating"
            value="3"
            checked={rating === '3'}
            onChange={handleRating}
          />
          <label htmlFor="rate3" title="3 stars">
            3 stars
          </label>

          <input
            type="radio"
            id="rate4"
            name="rating"
            value="4"
            checked={rating === '4'}
            onChange={handleRating}
          />
          <label htmlFor="rate4" title="4 stars">
            4 stars
          </label>

          <input
            type="radio"
            id="rate5"
            name="rating"
            value="5"
            checked={rating === '5'}
            onChange={handleRating}
          />
          <label htmlFor="rate5" title="5 stars">
            5 stars
          </label>

          <span className="starability-focus-ring"></span>
        </fieldset>

        {/* Old rating */}
        {/* <label htmlFor="customRange2" className="form-label">
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
        ></input> */}
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
