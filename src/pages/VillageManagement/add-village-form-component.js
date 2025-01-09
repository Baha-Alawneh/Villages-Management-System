import React, { useState } from 'react';
import './village-management.css';
import imageCompression from 'browser-image-compression';  // Import the library
import { useMutation } from '@apollo/client';
import { ADD_VILLAGE } from '../../grqphql/villages-queries';
function AddVillageForm({ setShowPopup }) {
  const [image, setImage] = useState(null);
  const [addVillage, { loading, error, data }] = useMutation(ADD_VILLAGE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // Handle image upload and compression
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];  // Get the file selected by the user
    if (file) {
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,  // Max size in MB (you can adjust this)
          maxWidthOrHeight: 800,  // Max width or height of the image (you can adjust this)
        });
        
      // Convert compressed file to Base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        setImage(reader.result); // Save Base64 string to state
        console.log('Base64 string:', reader.result); // Optional
      };
     }catch (error) {
        console.error('Error compressing image:', error);  // Handle any errors
      }
    }
  };

  const handleSubmit = async() => {
    // Prepare the data and send the image along with the form submission
    const villageData = {
      villageName: document.getElementById('village-name').value,
      region: document.getElementById('region').value,
      landArea: document.getElementById('land-area').value,
      latitude: parseFloat(document.getElementById('latitude').value),
      longitude: parseFloat(document.getElementById('longitude').value),
      categories: document.getElementById('categories').value,
      imageBase64: image,  // This is the compressed image
    };

    
    // Call your GraphQL mutation here to add the village
    try{
      const response = await addVillage({ variables: {  villageData: villageData }, });
    setShowPopup(false);  // Close the popup after successful submission
    window.location.reload(); // Reload the page


    } catch(error){
      console.error('Error adding village:', error);
      
    }
    // Make sure to send the compressed image as part of the village data
  };

  return (
    <div className="add-container" id="add-container">
      <div id="add-new-village-container" className="add-new-village-container">
        <div className="close-add-container">
          <button className="close-popup" id="close-add" value="" onClick={() => setShowPopup(false)}></button>
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
        <input type="file" id="upload-file" onChange={handleImageUpload} />

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
          onClick={handleSubmit}  // Handle form submission
        />
      </div>
    </div>
  );
}

export default AddVillageForm;
