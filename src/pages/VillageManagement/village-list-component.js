    // VillageList.js
    import React, { useState, useEffect } from 'react';
    import './village-management.css'
    import Popup from './popup-component';
    import UpdateVillageForm from './update-village-form-component'
    import UpdateDemographicForm from './update-demographic-form';
    import {DELETE_VILLAGE} from '../../grqphql/villages-queries'
    import { useMutation,useQuery } from '@apollo/client';
    import { GET_DEMOGRAPHICS } from "../../grqphql/demographics-queries";

    function VillageList({villagesList}) {
        const [currentPage, setCurrentPage] = useState(0);
        const [villages, setVillages] = useState([]);
        const [filteredVillages, setFilteredVillages] = useState([]);
        const [isSorted, setSort] = useState(false);
        const [searchInput,setSearchInput] = useState('');
        const [isPopupVisible, setPopups] = useState({
            view: false,
            updateVillage: false,
            updateDemographic: false,
        });
        const [selectedVillage, setSelectedVillage] = useState(null);
        const [selectedDemographic, setSelectedDemographic] = useState(null);
        const VILLAGES_PER_PAGE = 5;
        const token = localStorage.getItem('authToken');
        const tokenParts = token.split('.');
        const decodedToken = JSON.parse(atob(tokenParts[1]));
        const userId = decodedToken.id;
        const role = decodedToken.role;
        useEffect(() => {
            setVillages(villagesList);
            setFilteredVillages(villagesList);
        }, []); 
        
        
        useEffect(() => {
            let sortedVillages = [...filteredVillages];
            console.log(isSorted);
            if (isSorted) {
                sortedVillages.sort((a, b) => a.village_name.localeCompare(b.village_name));
            }
            setVillages(sortedVillages);
        }, [isSorted,filteredVillages]);
        
        useEffect(()=>{
            const filteredList =[...villagesList].filter((e)=>e.village_name.toLowerCase().includes(searchInput.toLowerCase()));
            setFilteredVillages(filteredList);
        },[searchInput])
        const totalVillages = villages.length;
        const totalPages = Math.ceil(totalVillages / VILLAGES_PER_PAGE);
       
        const currentVillages = villages.slice(currentPage * VILLAGES_PER_PAGE, (currentPage + 1) * VILLAGES_PER_PAGE);
        const [deleteVillage, {loading: loadingDeleteVillage,error: errorDeletingVillage, data: dataDelteVillage}] = useMutation(DELETE_VILLAGE);
        const { loading: loadingDemographics, error: errorDemographics, data: dataDemographics } = useQuery(GET_DEMOGRAPHICS);
        
        if(loadingDeleteVillage || loadingDemographics) 
            return <p>Loading...</p>;
        if (errorDeletingVillage )return <p>Error: {errorDeletingVillage.message}</p>;
        if ( errorDemographics )return <p>Error: {errorDemographics.message}</p>;


        const handleShowPopup = (village) => {
            setPopups(prevState => ({
                ...prevState,
                view: true,
            }));
            setSelectedVillage(village);
            console.log(isPopupVisible.view);
        };

        const handleDeleteVillage = async (name) =>  {
            try {
                // Call the deleteVillage mutation with the correct variable structure
                await deleteVillage({
                    variables: {
                        villageName: name,
                    },
                });
            setVillages((prevVillages) =>
                prevVillages.filter((village) => village.village_name !== name)
            );
        }
         catch (error) {
            console.error('Error deleting village:', error);
        }
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
            const matchedItem = dataDemographics?.demographics.find(
                dataDemographicsItem => dataDemographicsItem.village_id === village.village_id
              );
        
              if (!matchedItem) {
                setSelectedDemographic({
                  demographic_id: "",
                  age_distribution: "{\"0-18\": \"%\", \"19-35\": \"%\", \"36-50\": \"%\", \"51-65\": \"%\", \"65+\": \"%\"}",
                  gender_ratios: "{\"male\": \"%\", \"female\": \"%\"}",
                  population_growth_rate: "",
                  population_size: "",
                  village_id: ""
                });
              } else {
                setSelectedDemographic(matchedItem);
              }
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
                        <div key={village.village_name} className="component-container">
                            <div className="name-container">{village.village_name}- {village.region}</div>
                            <div className="btns-container">
                                <input
                                    type="button"
                                    className="view"
                                    value="View"
                                    onClick={() => handleShowPopup(village)}
                                />
                                  {role === 'admin' && (<>
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
                                    onClick={() => handleDeleteVillage(village.village_name)}
                                />
                                <input
                                    type="button"
                                    className="update-demographic-village"
                                    value="Update Demographic Data"
                                    onClick={() => handleUpdateDemographic(village)}
                                />
                                  </>)}
                            </div>
                        </div>
                    ))}

                </div>
                {isPopupVisible.view && <Popup onClose={()=> setPopups(prevState=>({...prevState,view:false}))} village={selectedVillage}/>}
                {isPopupVisible.updateVillage && <UpdateVillageForm onClose={()=>setPopups(prevState=>({...prevState,updateVillage:false}))} village={selectedVillage}/>}
                {isPopupVisible.updateDemographic && <UpdateDemographicForm onClose={()=>setPopups(prevState=>({...prevState,updateDemographic:false}))} village={selectedVillage} demographics= {selectedDemographic}/>}
            </div>
        );
    }

    export default VillageList;
