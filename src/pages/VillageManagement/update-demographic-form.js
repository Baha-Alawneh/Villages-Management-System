// UpdateDemographicForm.js
import React from 'react';
import './village-management.css'
import {CREATE_DEMOGRAPHIC_DATA } from '../../grqphql/demographics-queries'
import { useMutation } from '@apollo/client';
function UpdateDemographicForm({onClose,village,demographics}) {
    const [createDemographic,{loading,error,data}] = useMutation(CREATE_DEMOGRAPHIC_DATA);
    const handleSubmit = async () => {

        const data = {
            village_id: village.village_id,
            population_size: document.getElementById('population-size').value,
            age_distribution: document.getElementById('age-distribution').value,
            gender_ratios: document.getElementById('gender-ratios').value,
            population_growth_rate: document.getElementById('population-growth-rate').value,
        };
        console.log(data);
        try{
            await createDemographic({variables: { data: data }});
            console.log('Data added successfully', data);
            onClose();
        }
        catch(error){
            console.error('Error adding data:', error);
        }
    }


    return (
        <div className="update-demographic-container" id="update-demographic-container">
            <div id="update-village-demographic-container" className="update-village-demographic-container">
                <div className="close-update-demographic-container">
                    <button className="close-popup" id="close-update-demographic" value="" onClick={()=>onClose()}></button>
                </div>
                <h2 id="demographic-header"> Add demographic data for {village.village_name}</h2>
                <label htmlFor="population-size">Population Size: </label>
                <input type="text" id="population-size" required defaultValue={demographics.population_size} />

                <label htmlFor="age-distribution">Age Distribution: </label>
                <input type="text" id="age-distribution" required defaultValue={demographics.age_distribution} />

                <label htmlFor="gender-ratios">Gender Ratios: </label>
                <input type="text" id="gender-ratios" required defaultValue={demographics.gender_ratios} />

                <label htmlFor="population-growth-rate">Population Growth Rate: </label>
                <input type="text" id="population-growth-rate" required defaultValue={demographics.population_growth_rate} />

                <input
                    type="button"
                    id="update-demographic-btn"
                    className="update-demographic-btn"
                    value="Add Demographic Data"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
}

export default UpdateDemographicForm;
