const FilterForm = () => {
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
                  id="other"
                  name="other"
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
                />
                <label className="form-check-label" htmlFor="highPrice">
                  $150+
                </label>
              </div>
            </div>

            <button className="btn btn-primary w-100">Apply Filters</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FilterForm;
