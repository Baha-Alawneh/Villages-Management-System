// VillageList.js
import React from 'react';
import './village-management.css'
function VillageList() {
    return (
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
    );
}

export default VillageList;
