import { useState } from 'react';
import auth from '../Utilities/PrivateRoute';

const EmailForm = () => {
  //   Form fields state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // Handles change on all fields at once instead of doing it for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Handles the submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const uploadedImageUrls = await uploadImagesToCloudinary(
  //       // if no data is returned to Cloudinary, set uploadedImagesUrls to empty array
  //       formData.image_url || []
  //     );

  //     // Put together data
  //     const itemData = {
  //       ...formData,
  //       image_url: uploadedImageUrls,
  //     };
  //     // make new item
  //     createItem(itemData);

  //     navigate(`/`);
  //   } catch (error) {
  //     console.error('Error during submit:', error);
  //   }
  // };
  return (
    <>
      <div className="col-12 col-md-6">
        <div className="p-4 shadow-sm bg-white border rounded">
          <h5 className="mb-3">Request a Quote</h5>
          <form>
            {/* Full name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email */}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Subject */}
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            {/* Message */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            {/* Send message */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              // onClick={handleSubmit}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailForm;
