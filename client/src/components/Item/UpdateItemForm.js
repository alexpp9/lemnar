import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const UpdateItemForm = () => {
  // Instantiate useNavigate
  const navigate = useNavigate();
  //   location holds state data.
  const location = useLocation();
  //   Checks to see if there's data and assigns it or assings undefined if not.
  const itemToUpdate =
    location.state && location.state.item ? location.state.item : undefined;

  //   Form fields state
  // For simpicity's sake I shall remove the image edit.
  const [formData, setFormData] = useState({
    name: itemToUpdate.name,
    type: itemToUpdate.type,
    material: itemToUpdate.material,
    colour: itemToUpdate.colour,
    weight: itemToUpdate.weight,
    price: itemToUpdate.price,
    room: itemToUpdate.room,
    description: itemToUpdate.description,
  });

  // Axios instance
  const client = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  });

  // Handles change on all fields at once instead of doing it for each input field
  // Function improved with AI.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Handles the submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      updateItem(formData);
      navigate(`/`);
    } catch (error) {
      console.error('Error during submit:', error);
    }
  };
  // API call function using axios instance
  const updateItem = (itemData) => {
    client
      .put(`/api/items/${itemToUpdate._id}`, itemData)
      .then((response) => {
        console.log('Item updated successfully', response.data);

        // Reset the form fields after successful creation
        setFormData({
          name: '',
          type: '',
          material: '',
          colour: '',
          weight: '',
          price: '',
          room: '',
          description: '',
        });
      })
      .catch((error) => {
        console.error('Error creating item:', error);
      });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form className="p-4 border rounded bg-white shadow-sm w-100">
          {/* 1 */}
          <div className="mb-3 w-100">
            <label
              htmlFor="name"
              className="form-label fw-semibold text-secondary"
            >
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control border border-2 border-primary rounded"
            />
          </div>

          {/* 2 */}
          <div className="mb-3 w-100">
            <label
              htmlFor="type"
              className="form-label fw-semibold text-secondary"
            >
              Type
            </label>
            <input
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-control border border-2 border-primary rounded"
            />
          </div>

          {/* 3 */}
          <div className="mb-3 w-100">
            <label
              htmlFor="material"
              className="form-label fw-semibold text-secondary"
            >
              Material
            </label>
            <input
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="form-control border border-2 border-primary rounded"
            />
          </div>

          {/* 4 */}
          <div className="mb-3 w-100">
            <label
              htmlFor="colour"
              className="form-label fw-semibold text-secondary"
            >
              Colour
            </label>
            <input
              name="colour"
              value={formData.colour}
              onChange={handleChange}
              className="form-control border border-2 border-primary rounded"
            />
          </div>

          {/* 5 */}
          <div className="mb-3 w-100">
            <label
              htmlFor="weight"
              className="form-label fw-semibold text-secondary"
            >
              Weight
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="form-control border border-2 border-primary rounded"
            />
          </div>

          {/* 6 */}
          <div className="mb-3 w-100">
            <label
              htmlFor="price"
              className="form-label fw-semibold text-secondary"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control border border-2 border-primary rounded"
            />
          </div>

          {/* 7 */}
          <div className="mb-3 w-100">
            <label
              htmlFor="room"
              className="form-label fw-semibold text-secondary"
            >
              Room
            </label>
            <input
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="form-control border border-2 border-primary rounded"
            />
          </div>

          {/* 8 */}
          {/* (Empty, preserved as requested) */}

          {/* 9 */}
          <div className="mb-3 w-100">
            <label
              htmlFor="description"
              className="form-label fw-semibold text-secondary"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control border border-2 border-primary rounded"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <div className="w-100 d-grid">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary fw-semibold"
            >
              Update Item
            </button>
          </div>
          <Link to="/home">Back home</Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateItemForm;
