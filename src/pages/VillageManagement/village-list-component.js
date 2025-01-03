// VillageList.js
import React, { useState, useEffect } from 'react';
import './village-management.css'
import { villagesStaticList } from '../../utils/info';
import Popup from './popup-component';

function VillageList() {
    const [currentPage, setCurrentPage] = useState(0);
    const [villages, setVillages] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedVillage, setSelectedVillage] = useState(null);
    const VILLAGES_PER_PAGE = 5;

    useEffect(() => {
        // Simulating fetching villages from an API
        setVillages(villagesStaticList);
    }, []); // Only run on initial render

    useEffect(() => {
        console.log(currentPage);

    }, [currentPage]);
    const totalVillages = villages.length;
    const totalPages = Math.ceil(totalVillages / VILLAGES_PER_PAGE);

    // Get the villages for the current page
    const currentVillages = villages.slice(currentPage * VILLAGES_PER_PAGE, (currentPage + 1) * VILLAGES_PER_PAGE);

    const handleShowPopup = (village) => {
        setPopupVisible(true);
        setSelectedVillage(village);
        console.log(selectedVillage);
    };

    const handleDeleteVillage = (name) => {
        setVillages((prevVillages) =>
            prevVillages.filter((village) => village.name !== name)
        );
    };

    const handleUpdateVillage = (village) => {
        alert(`Update details for ${village.name}`);
    };

    const handleUpdateDemographic = (name) => {
        alert(`Update demographic data for ${name}`);
    };

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
                    <input type="button" id="prev" value="Prev" className="prev" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0} />
                    <input type="button" id="next" value="Next" className="next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages - 1} />
                </div>
            </div>

            <div className="list">

            {currentVillages.map((village) => (
                    <div key={village.name} className="component-container">
                        <div className="name-container">{village.name}- {village.region}</div>
                        <div className="btns-container">
                            <input
                                type="button"
                                className="view"
                                value="View"
                                onClick={() => handleShowPopup(village)}
                            />
                            <input
                                type="button"
                                className="update-village"
                                value="Update Village"
                                onClick={() => handleUpdateVillage(village)}
                            />
                            <input
                                type="button"
                                className="delete-village"
                                value="Delete Village"
                                onClick={() => handleDeleteVillage(village.name)}
                            />
                            <input
                                type="button"
                                className="update-demographic-village"
                                value="Update Demographic Data"
                                onClick={() => handleUpdateDemographic(village.name)}
                            />
                        </div>
                    </div>
                ))}

            </div>
            {isPopupVisible && <Popup onClose={setPopupVisible} village={selectedVillage}/>}
        </div>
    );
}

export default VillageList;
