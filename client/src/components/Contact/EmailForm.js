const EmailForm = () => {
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
              <input type="text" className="form-control" id="name" required />
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
                required
              />
            </div>
            {/* Subject */}
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input type="text" className="form-control" id="subject" />
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
                required
              />
            </div>
            {/* Send message */}
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailForm;
