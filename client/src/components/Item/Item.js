// ====================
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FilterForm from './FilterForm';
import SearchBar from './SearchBar';

const Item = ({ data }) => {
  // Sets filterSearchTerm
  const [filterSearchTerm, setFilterSearchTerm] = useState();
  // Sets filters
  const [filters, setFilters] = useState();
  // Gets data from child
  const getSearchTermData = (childData) => {
    setFilterSearchTerm(childData);
  };
  // Gets data from child
  const getFiltersData = (chilData) => {
    setFilters(chilData);
  };
  console.log(filters);
  // To reset the search
  // Reset handler
  const handleReset = () => setFilterSearchTerm('');

  return (
    <div className="container mt-5">
      {/* Search bar row */}
      {/* HandleSubmit is props for child, sending getSearchTermData */}
      <SearchBar handleSubmit={getSearchTermData} />
      {/* Main layout row */}
      <div className="row">
        {/* Filtering Form */}
        <FilterForm handleSubmit={getFiltersData} />
        {/* Items list */}
        <div className="col-12 col-md-9">
          {data
            .filter((item) => {
              return !filterSearchTerm
                ? item
                : item.type.includes(filterSearchTerm) ||
                    item.room.includes(filterSearchTerm);
            })
            .map((item) => (
              <div
                key={item.id || item.name}
                className="d-flex justify-content-center mb-4"
                style={{ width: '100%' }}
              >
                {/* Image container */}
                <div style={{ width: '30%' }}>
                  <img
                    src={item.image_url[0]}
                    className="img-thumbnail w-100"
                    alt={item.name}
                  />
                </div>

                {/* Card container */}
                <div style={{ width: '70%' }}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>

                      <Link
                        to={`/details/${item._id}`}
                        className="btn btn-primary mt-2"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mb-3 d-flex">
        <button className="btn btn-secondary ms-auto" onClick={handleReset}>
          Reset Search
        </button>
      </div>
    </div>
  );
};

export default Item;
