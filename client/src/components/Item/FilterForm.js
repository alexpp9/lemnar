import { useState } from 'react';

const FilterForm = (props) => {
  const [filterFormData, setFilterFormData] = useState({
    kitchen: false,
    bedroom: false,
    livingRoom: false,
    diningRoom: false,
    outdoor: false,
    office: false,
    other: false,
    lowPrice: false,
    mediumPrice: false,
    highPrice: false,
  });

  // Handles change on all fields at once instead of doing it for each input field
  const handleChange = (e) => {
    const { name } = e.target;
    setFilterFormData((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Used to send the data to parent.
    // Props triggers a getSearchTermData function
    props.handleSubmit(filterFormData);
    setFilterFormData({
      kitchen: false,
      bedroom: false,
      livingRoom: false,
      diningRoom: false,
      outdoor: false,
      office: false,
      other: false,
      lowPrice: false,
      mediumPrice: false,
      highPrice: false,
    });
  };
  return (
    <>
      {/*         'kitchen',
        'living room',
        'bedroom',
        'dining room',
        'office',
        'outdoor',
        'other', */}
      {/* Sidebar form */}
      <div className="col-12 col-md-3 mb-4">
        <div className="p-3 border rounded bg-light">
          <h5 className="mb-3">Filter Items</h5>
          <form>
            {/* Category filter */}
            <div className="mb-3">
              <label className="form-label d-block">Category</label>
              {/* Category 1 */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="kitchen"
                  name="kitchen"
                  checked={filterFormData.kitchen}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="kitchen">
                  Kitchen
                </label>
              </div>
              {/* Category 2 */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="livingRoom"
                  name="livingRoom"
                  checked={filterFormData.livingRoom}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="livingRoom">
                  Living Room
                </label>
              </div>
              {/* Category 3 */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="diningRoom"
                  name="diningRoom"
                  checked={filterFormData.diningRoom}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="diningRoom">
                  Dining Room
                </label>
              </div>
              {/* Category 4 */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="office"
                  name="office"
                  checked={filterFormData.office}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="office">
                  Office
                </label>
              </div>
              {/* Category 5 */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="outdoor"
                  name="outdoor"
                  checked={filterFormData.outdoor}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="outdoor">
                  Outdoor
                </label>
              </div>
              {/* Category 6 */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="bedroom"
                  name="bedroom"
                  checked={filterFormData.bedroom}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="bedroom">
                  Bedroom
                </label>
              </div>
              {/* Category 7 */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="other"
                  name="other"
                  checked={filterFormData.other}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>
            </div>

            {/* Price filter */}
            <div className="mb-3">
              <label className="form-label d-block">Price Range</label>
              {/* Low price */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="lowPrice"
                  name="lowPrice"
                  checked={filterFormData.lowPrice}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="lowPrice">
                  $0 - $50
                </label>
              </div>
              {/* Medium price */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="mediumPrice"
                  name="mediumPrice"
                  checked={filterFormData.mediumPrice}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="mediumPrice">
                  $50 - $150
                </label>
              </div>
              {/* Medium price */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="highPrice"
                  name="highPrice"
                  checked={filterFormData.highPrice}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="highPrice">
                  $150+
                </label>
              </div>
            </div>

            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              Apply Filters
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FilterForm;
