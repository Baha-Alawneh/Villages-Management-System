    // VillageList.js
    import React, { useState, useEffect } from 'react';
    import './village-management.css'
    import { villagesStaticList } from '../../utils/info';
    import Popup from './popup-component';
    import UpdateVillageForm from './update-village-form-component'
    import UpdateDemographicForm from './update-demographic-form';
    function VillageList() {
        const [currentPage, setCurrentPage] = useState(0);
        const [villages, setVillages] = useState([]);
        const [filteredVillages, setFilteredVillages] = useState([]);
        const [isSorted,setSort] = useState(false);
        const [searchInput,setSearchInput] = useState('');
        const [isPopupVisible, setPopups] = useState({
            view: false,
            updateVillage: false,
            updateDemographic: false,
        });
        const [selectedVillage, setSelectedVillage] = useState(null);
        const VILLAGES_PER_PAGE = 5;

        useEffect(() => {
            setVillages(villagesStaticList);
            setFilteredVillages(villagesStaticList);
        }, []); 

        // Handle sorting and showing villages list
        useEffect(() => {
            let sortedVillages = [...filteredVillages]; 
            console.log(isSorted);
            if (isSorted) {
            sortedVillages.sort((a, b) => a.name.localeCompare(b.name));
            }
            setVillages(sortedVillages);
        }, [isSorted,filteredVillages]);

        useEffect(()=>{
            const filteredList =[...villagesStaticList].filter((e)=>e.name.toLowerCase().includes(searchInput.toLowerCase()));
            setFilteredVillages(filteredList);
        },[searchInput])
        const totalVillages = villages.length;
        const totalPages = Math.ceil(totalVillages / VILLAGES_PER_PAGE);
        // Get the villages for the current page
        const currentVillages = villages.slice(currentPage * VILLAGES_PER_PAGE, (currentPage + 1) * VILLAGES_PER_PAGE);

        const handleShowPopup = (village) => {
            setPopups(prevState => ({
                ...prevState,
                view: true, // Update the specific popup
            }));
            setSelectedVillage(village);
            console.log(isPopupVisible.view);
        };

        const handleDeleteVillage = (name) => {
            setVillages((prevVillages) =>
                prevVillages.filter((village) => village.name !== name)
            );
        };

        const handleUpdateVillage = (village) => {
            setPopups(prevState => ({
                ...prevState,
                updateVillage: true,
            }));
            setSelectedVillage(village);

        };

        const handleUpdateDemographic = (village) => {
            setPopups(prevState =>({
                ...prevState,
                updateDemographic: true
            }));
            setSelectedVillage(village);

            alert(`Update demographic data for ${village.name}`);
        };

        const handleSortBy = (event)=>{
            const selectedOption = event.target.value;
            
            if(selectedOption === 'alphabetical'){
                setSort(true);
            }else if(selectedOption === 'default'){
                setSort(false);
            }
        }

        const handleSearch = (event) => {
            setSearchInput(event.target.value);
        };
        return (
            <div className="list-container">
                <h1 className="list-title">View Village List</h1>

                <input
                    type="text"
                    required
                    placeholder="Search villages..."
                    className="search"
                    onChange={handleSearch}
                />

                <div className="list-header">
                    <div className="sort-container">
                        <label htmlFor="search-by" className="sort-label">Sort by: </label>
                        <select className="sort-select" id="sort-by" onChange={handleSortBy}>
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
                                    onClick={() => handleUpdateDemographic(village)}
                                />
                            </div>
                        </div>
                    ))}

                </div>
                {isPopupVisible.view && <Popup onClose={()=> setPopups(prevState=>({...prevState,view:false}))} village={selectedVillage}/>}
                {isPopupVisible.updateVillage && <UpdateVillageForm onClose={()=>setPopups(prevState=>({...prevState,updateVillage:false}))} village={selectedVillage}/>}
                {isPopupVisible.updateDemographic && <UpdateDemographicForm onClose={()=>setPopups(prevState=>({...prevState,updateDemographic:false}))} village={selectedVillage}/>}
            </div>
        );
    }

    export default VillageList;
