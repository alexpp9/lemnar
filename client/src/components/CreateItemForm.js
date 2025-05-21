import React, { useState } from 'react';
import axios from 'axios';

const CreateItemForm = () => {
  // Axios instance
  const client = axios.create({
    baseURL: 'http://localhost:3000',
  });

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
  // Handles change on all fields at once instead of doing it for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Upload to cloudinary and get back URLs
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

    try {
      const uploadedImageUrls = await uploadImagesToCloudinary(
        formData.image_url || []
      );

      const itemData = {
        ...formData,
        image_url: uploadedImageUrls,
      };

      createItem(itemData);
    } catch (error) {
      console.error('Error during submit:', error);
    }
  };

  // API call function using axios instance
  const createItem = (itemData) => {
    client
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
    <form>
      {/* 1 */}
      <label htmlFor="name">Name</label>
      <input name="name" value={formData.name} onChange={handleChange} />
      {/* 2 */}
      <label htmlFor="type">Type</label>
      <input name="type" value={formData.type} onChange={handleChange} />
      {/* 3 */}
      <label htmlFor="material">Material</label>
      <input
        name="material"
        value={formData.material}
        onChange={handleChange}
      />
      {/* 4 */}
      <label htmlFor="colour">Colour</label>
      <input name="colour" value={formData.colour} onChange={handleChange} />
      {/* 5 */}
      <label htmlFor="weight">Weight</label>
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
      />
      {/* 6 */}
      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      {/* 7 */}
      <label htmlFor="room">Room</label>
      <input name="room" value={formData.room} onChange={handleChange} />
      {/* 8 - special case */}
      <label htmlFor="image_url">Image URL</label>
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
      />
      {/* 9 */}
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Create Item
      </button>
    </form>
  );
};

export default CreateItemForm;
