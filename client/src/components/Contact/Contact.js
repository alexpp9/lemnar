import Map from './Map';
import EmailForm from './EmailForm';
import ContactDetails from './ContactDetails';
const Contact = () => {
  return (
    <div className="container mt-5">
      {/* Title */}
      <h2 className="mb-4 text-center fw-bold">Get in Touch</h2>

      {/* Contact Form + Map*/}
      <div className="row g-4">
        {/* Contact Form */}
        <EmailForm />
        {/* Map */}
        <Map />
      </div>

      {/* Contact Info Section */}
      <div className="row mt-5 mb-3">
        <ContactDetails />
      </div>
    </div>
  );
};

export default Contact;
