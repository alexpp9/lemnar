import { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';

import axios from 'axios';

const ReviewForm = ({ data }) => {
  // Axios instance
  const client = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  });

  // For protection
  const auth = useAuth();

  //   Form fields state
  const [comment, setComment] = useState('');

  // Handles comment change
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  // Form Submission
  const handleCreateComment = (e) => {
    e.preventDefault();

    createComment(comment);
  };

  // Create commnet
  // API POST CALL
  const createComment = (comment) => {
    client
      .post('/api/items/:id/reviews', {
        body: comment,
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
  };

  return (
    <form className="border rounded p-3 bg-white shadow-sm mb-3 shadow-lg">
      <h6 className="border-bottom pb-2 mb-3 text-muted">Leave a comment</h6>

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
