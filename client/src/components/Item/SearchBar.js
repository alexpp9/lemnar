import { useState } from 'react';

const SearchBar = (props) => {
  // Keeps track of search value
  const [search, setSearch] = useState('');

  // Handles changes in the state of the search bar
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Used to send the data to parent.
    // Props triggers a getSearchTermData function
    props.handleSubmit(search.toLowerCase());
    setSearch('');
  };

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
              value={search}
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
