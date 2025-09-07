import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { client } from '../Utilities/Client';
// import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';

const CreateItemForm = () => {
  // Instantiate useNavigate
  const navigate = useNavigate();

  //   Form fields state
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    material: '',
    colour: '',
    weight: '',
    price: '',
    room: '',
    image_url: '',
    description: '',
  });

  // const [spinner, setSpinner] = useState(false);
  // Handles change on all fields at once instead of doing it for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload to cloudinary and get back URLs
  // Function written with the help of AI
  const uploadImagesToCloudinary = async (files) => {
    const urls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      // replace with your preset
      formData.append('upload_preset', 'lemnar_preset');

      try {
        const response = await axios.post(
          // replace with your cloud name
          'https://api.cloudinary.com/v1_1/dw2tb27dj/upload',
          formData
        );

        if (response.data.secure_url) {
          urls.push(response.data.secure_url);
        } else {
          console.error('Cloudinary upload error:', response.data);
        }
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
      }
    }

    return urls;
  };
  // Handles the submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSpinner(true);
    try {
      const uploadedImageUrls = await uploadImagesToCloudinary(
        // if no data is returned to Cloudinary, set uploadedImagesUrls to empty array
        formData.image_url || []
      );

      // Put together data
      const itemData = {
        ...formData,
        image_url: uploadedImageUrls,
      };
      // make new item

      await createItem(itemData);
      window.flash('Item successfully created!', 'success');
      navigate(`/`);
    } catch (error) {
      console.error('Error during submit:', error);
      window.flash(
        'There was an error while trying to create the item, please try again!',
        'error'
      );
    } finally {
      // setSpinner(false);
    }
  };

  // API call function using axios instance
  const createItem = (itemData) => {
    return client
      .post('/api/items', itemData)
      .then((response) => {
        console.log('Item created successfully', response.data);

        // Reset the form fields after successful creation
        setFormData({
          name: '',
          type: '',
          material: '',
          colour: '',
          weight: '',
          price: '',
          room: '',
          image_url: '',
          description: '',
        });
      })
      .catch((error) => {
        console.error('Error creating item:', error);
      });
  };

  return (
    <div className="row justify-content-center m-5">
      <div className="col-md-6">
        <form className="p-4 border rounded bg-light shadow-sm w-100">
          {/* 1 - name */}
          <div className="mb-4 w-100">
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
              className="form-control "
            />
          </div>

          {/* 2 - type */}
          <div className="mb-4 w-100">
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
              className="form-control "
            />
          </div>

          {/* 3 - material */}
          <div className="mb-4 w-100">
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
              className="form-control "
            />
          </div>

          {/* 4 - colour */}
          <div className="mb-4 w-100">
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
              className="form-control "
            />
          </div>

          {/* 5 - weight */}
          <div className="mb-4 w-100">
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
              className="form-control "
            />
          </div>

          {/* 6 - price */}
          <div className="mb-4 w-100">
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
              className="form-control "
            />
          </div>

          {/* 7 - room */}
          <div className="mb-4 w-100">
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
              className="form-control "
            />
          </div>

          {/* 8 - image url (can be multiple) */}
          <div className="mb-4 w-100">
            <label
              htmlFor="image_url"
              className="form-label fw-semibold text-secondary"
            >
              Image URL
            </label>
            <input
              type="file"
              name="image_url"
              multiple
              accept="image/*"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  image_url: Array.from(e.target.files),
                }));
              }}
              className="form-control "
            />
          </div>

          {/* 9 - description */}
          <div className="mb-4 w-100">
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
              className="form-control "
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <div className="w-100 d-grid">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary fw-semibold"
            >
              <span className="m-1">Create Item</span>
              {/* <RotatingLines
                visible={spinner}
                height="36"
                width="36"
                strokeWidth="5"
                ariaLabel="rotating-lines-loading"
                strokeColor="#fa8128"
              /> */}
            </button>
          </div>
          <Link to="/home">Back home</Link>
        </form>
      </div>
    </div>
  );
};

export default CreateItemForm;
