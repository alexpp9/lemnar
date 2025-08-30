import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { client } from '../Utilities/Client';

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
  const [spinner, setSpinner] = useState(false);
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
    setSpinner(true);
    try {
      await updateItem(formData);
      navigate(`/`);
    } catch (error) {
      console.error('Error during submit:', error);
    } finally {
      setSpinner(false);
    }
  };
  // API call function using axios instance
  const updateItem = (itemData) => {
    return client
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
          {/* 1 - name */}
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

          {/* 2 - type */}
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

          {/* 3 - material */}
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

          {/* 4 - colour */}
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

          {/* 5 - weight */}
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

          {/* 6 - price */}
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

          {/* 7 - room */}
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

          {/* 8 - images */}
          {/* (Empty, preserved as requested) */}

          {/* 9 - descriptions */}
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
              <span className="m-1">Update Item</span>
              <RotatingLines
                visible={spinner}
                height="36"
                width="36"
                strokeWidth="5"
                ariaLabel="rotating-lines-loading"
                strokeColor="#fa8128"
              />
            </button>
          </div>
          <Link to="/home">Back home</Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateItemForm;
