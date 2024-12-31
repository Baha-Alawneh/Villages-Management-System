
import './village-management.css'


function VillageManagement() {
    return (
      <>
        <div className="village-container">
          <input
            type="button"
            id="add-new-village"
            className="add-new-village"
            value="Add New Village"
          />
          <div className="list-container">
            <h1 className="list-title">View Village List</h1>
  
            <input
              type="text"
              required
              placeholder="Search villages..."
              className="search"
            />
  
            <div className="list-header">
              <div className="sort-container">
                <label htmlFor="search-by" className="sort-label">Sort by: </label>
                <select className="sort-select" id="sort-by">
                  <option value="default" selected>Default</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
              <div className="page-container">
                <label htmlFor="prev">Page: </label>
                <input type="button" id="prev" value="Prev" className="prev" />
                <input type="button" id="next" value="Next" className="next" />
              </div>
            </div>
  
            <div className="list"></div>
          </div>
        </div>
  
        <div className="popup-container" id="popup">
          <div className="popup-content">
            <button className="close-popup" id="close-popup" value=""></button>
            <h2>Village Details</h2>
            <p id="popup-details"></p>
          </div>
        </div>
  
        <div className="add-container" id="add-container">
          <div id="add-new-village-container" className="add-new-village-container">
            <div className="close-add-container">
              <button className="close-popup" id="close-add" value=""></button>
            </div>
            <h1>Add New Village</h1>
            <label htmlFor="village-name">Village Name: </label>
            <input type="text" id="village-name" required />
  
            <label htmlFor="region">Region/District </label>
            <input type="text" id="region" required />
  
            <label htmlFor="land-area">Land Area: </label>
            <input type="text" id="land-area" required />
  
            <label htmlFor="latitude">Latitude: </label>
            <input type="text" id="latitude" required />
  
            <label htmlFor="longitude">Longitude: </label>
            <input type="text" id="longitude" required />
  
            <label htmlFor="upload-file">Upload Image: </label>
            <input type="file" id="upload-file" />
  
            <label htmlFor="categories">Categories/Tags </label>
            <input
              type="text"
              id="categories"
              required
              placeholder="e.g., rural, urban"
            />
  
            <input
              type="button"
              id="add-village"
              className="add-village"
              value="Add Village"
            />
          </div>
        </div>
  
        <div className="update-container" id="update-container">
          <div id="update-village-container" className="update-village-container">
            <div className="close-update-container">
              <button className="close-popup" id="close-update" value=""></button>
            </div>
            <h1>Update Village</h1>
            <label htmlFor="village-name">Village Name: </label>
            <input type="text" id="village-name" required />
  
            <label htmlFor="region">Region/District </label>
            <input type="text" id="region" required />
  
            <label htmlFor="land-area">Land Area: </label>
            <input type="text" id="land-area" required />
  
            <label htmlFor="latitude">Latitude: </label>
            <input type="text" id="latitude" required />
  
            <label htmlFor="longitude">Longitude: </label>
            <input type="text" id="longitude" required />
  
            <label htmlFor="upload-file">Upload Image: </label>
            <input type="file" id="upload-file" />
  
            <label htmlFor="categories">Categories/Tags </label>
            <input
              type="text"
              id="categories"
              required
              placeholder="e.g., rural, urban"
            />
  
            <input
              type="button"
              id="update-village-btn"
              className="update-village-btn"
              value="Update Village"
            />
          </div>
        </div>
  
        <div className="update-demographic-container" id="update-demographic-container">
          <div id="update-village-demographic-container" className="update-village-demographic-container">
            <div className="close-update-demographic-container">
              <button className="close-popup" id="close-update-demographic" value=""></button>
            </div>
            <h1 id="demographic-header"></h1>
            <label htmlFor="population-size">Population Size: </label>
            <input type="text" id="population-size" required />
  
            <label htmlFor="age-distribution">Age Distribution: </label>
            <input type="text" id="age-distribution" required />
  
            <label htmlFor="gender-ratios">Gender Ratios: </label>
            <input type="text" id="gender-ratios" required />
  
            <label htmlFor="population-growth-rate">Population Growth Rate: </label>
            <input type="text" id="population-growth-rate" required />
  
            <input
              type="button"
              id="update-demographic-btn"
              className="update-demographic-btn"
              value="Add Demographic Data"
            />
          </div>
        </div>
      </>
    );
  }

  export default VillageManagement;