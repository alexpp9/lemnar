import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../Utilities/Client';
import { RotatingLines } from 'react-loader-spinner';

const EmailForm = () => {
  // Instantiate useNavigate
  const navigate = useNavigate();
  //   Form fields state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [spinner, setSpinner] = useState(false);
  // Handles change on all fields at once instead of doing it for each input field
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
      // Send email
      await sendEmail(formData);
      // Redirect back
      navigate(`/contact`);
    } catch (error) {
      console.error('Error occured during sending the email:', error);
    } finally {
      setSpinner(false);
    }
  };

  // API call function using axios instance
  const sendEmail = (emailData) => {
    return client
      .post('/contact', emailData)
      .then((response) => {
        console.log('Email send successfully', response.data);
        window.flash('Email was successfully send!', 'success');
        // Reset the form fields after successful creation
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error('Error in sending the email API call!', error);
      });
  };
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
                name="name"
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
                name="email"
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
                name="subject"
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            {/* Send message */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleSubmit}
            >
              <span className="m-1">Send Message</span>
              {/* <RotatingLines
                visible={spinner}
                height="36"
                width="36"
                strokeWidth="5"
                ariaLabel="rotating-lines-loading"
                strokeColor="#fa8128"
              /> */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailForm;
