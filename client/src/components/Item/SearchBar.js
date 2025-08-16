const SearchBar = () => {
  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-3">Search by key words</h2>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search items..."
              name="searchKeyWords"
            />
            <button className="btn btn-outline-primary" type="button">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
