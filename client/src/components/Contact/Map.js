const Map = () => {
  return (
    <>
      <div className="col-12 col-md-6">
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!..." // <-- Replace with your actual location embed
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
