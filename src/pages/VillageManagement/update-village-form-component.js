// UpdateVillageForm.js
import React,{useState,useEffect} from 'react';
import './village-management.css'
import { UPDATE_VILLAGE } from '../../grqphql/villages-queries';
import { useMutation } from '@apollo/client';
import imageCompression from 'browser-image-compression';  // Import the library

function UpdateVillageForm({onClose, village}) {
    const [image, setImage] = useState("");

    const [updateVillage,{loading, error, data}] = useMutation (UPDATE_VILLAGE);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const handleImageUpload = async (e) => {
    const file = e.target.files[0]; 
    console.log(file);
    if (file) {
        try {
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,  
            maxWidthOrHeight: 800, 
        });
        
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
        setImage(reader.result); 
        console.log('Base64 string:', reader.result); 
        };
        }catch (error) {
        console.error('Error compressing image:', error);
        }
    }
    else setImage("");

};


    const handleSubmit = async() => {
        const villageData = {
          villageName: document.getElementById('village-name').value,
          region: document.getElementById('region').value,
          landArea: document.getElementById('land-area').value,
          latitude: parseFloat(document.getElementById('latitude').value),
          longitude: parseFloat(document.getElementById('longitude').value),
          categories: document.getElementById('categories').value,
          imageBase64: image,
        };
        
        try{
          const response = await updateVillage({ variables: {  villageData: villageData }, });
          onClose()    
          window.location.reload(); 

        } catch(error){
          console.error('Error adding village:', error);
          
        }
      };
    


    return (
        <div className="update-container" id="update-container">
            <div id="update-village-container" className="update-village-container">
                <div className="close-update-container">
                    <button className="close-popup" id="close-update" value="" onClick={()=>onClose()}></button>
                </div>
                <h1>Update Village</h1>
                <label htmlFor="village-name">Village Name: </label>
                <input type="text" id="village-name" required value={village.village_name} disabled  />

                <label htmlFor="region">Region/District </label>
                <input type="text" id="region" required defaultValue={village.region}/>

                <label htmlFor="land-area">Land Area: </label>
                <input type="text" id="land-area" required defaultValue={village.land_area} />

                <label htmlFor="latitude">Latitude: </label>
                <input type="text" id="latitude" required  defaultValue={village.latitude}/>

                <label htmlFor="longitude">Longitude: </label>
                <input type="text" id="longitude" required defaultValue ={village.longitude}/>

                <label htmlFor="upload-file">Upload Image: </label>
                <input type="file" id="upload-file" onChange={handleImageUpload}  />

                <label htmlFor="categories">Categories/Tags </label>
                <input
                    type="text"
                    id="categories"
                    required
                    placeholder="e.g., rural, urban"
                    value={village.categories}
                />

                <input
                    type="button"
                    id="update-village-btn"
                    className="update-village-btn"
                    value="Update Village"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
}

export default UpdateVillageForm;
