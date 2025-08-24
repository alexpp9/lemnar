// ====================
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FilterForm from './FilterForm';
import SearchBar from './SearchBar';

const Item = ({ data }) => {
  // Sets filterSearchTerm
  const [filterSearchTerm, setFilterSearchTerm] = useState('');
  // Sets filters
  const [filters, setFilters] = useState('');
  // Gets data from child
  const getSearchTermData = (childData) => {
    setFilterSearchTerm(childData);
  };

  // Gets data from child

  const getFiltersData = (childData) => {
    setFilters(childData);
  };

  // To reset the search
  const handleReset = () => {
    setFilters('');
    setFilterSearchTerm('');
  };

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
            // This filtering function was done using AI
            .filter((item) => {
              // For the case that no filter is active
              if (!filters) return item;

              // Category filter (room)
              const categoryKeys = [
                'kitchen',
                'bedroom',
                'livingRoom',
                'diningRoom',
                'outdoor',
                'office',
                'other',
              ];
              // Makes an array of rooms that are check boxed
              const categoryChecked = categoryKeys.filter(
                (key) => filters[key]
              );
              const categoryMatch =
                categoryChecked.length === 0
                  ? // if no room is checked, return true or the item
                    true
                  : // if there are, return those that are included in the room list of the item
                    categoryChecked.some((key) =>
                      item.room.toLowerCase().includes(key.toLowerCase())
                    );

              // Price filter
              let priceMatch = true;
              if (
                filters.lowPrice ||
                filters.mediumPrice ||
                filters.highPrice
              ) {
                // the array of prices
                const price = item.price;
                // array of those items with prices in this range
                // if lowPrice and highPrice are selected, only those will appear.
                priceMatch =
                  (filters.lowPrice && price <= 50) ||
                  (filters.mediumPrice && price > 50 && price <= 150) ||
                  (filters.highPrice && price > 150);
              }
              // Returns the matched items with the criteria.
              return categoryMatch && priceMatch;
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
