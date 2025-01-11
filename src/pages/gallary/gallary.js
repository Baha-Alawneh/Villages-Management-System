import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import {useQuery} from '@apollo/client'; 
import { useMutation } from '@apollo/client';
import "./gallary.css";
import {GET_IMAGES,ADD_IMAGE} from '../../grqphql/gallery'
import imageCompression from 'browser-image-compression';

const Gallery = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);

    const { loading : loadingGet, error : errorGet,data: dataGet } = useQuery(GET_IMAGES);
    const [AddImage, { loading : loadingAdd, error : errorAdd,data: dataAdd }] = useMutation(ADD_IMAGE);


  useEffect(() => {
    if (dataGet && dataGet.getAllImages) {
      setImages(dataGet.getAllImages);
    }
  }, [dataGet]);


  const handleAddNewImageClick = () => {
    setOverlayVisible(true);
  };

  const handleClosePopup = () => {
    setOverlayVisible(false);
  };

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];  
      if (file) {
        try {
          // Compress the image
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
    };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const description = document.getElementById("description").value;

    const gData = {
      description: description,
      imageBase64: image,
    }

  
    try{
      console.log(gData);
      const response = await AddImage({ variables: {  galleryData: gData }, });

    } catch(error){
      console.error('Error adding village:', error);
      
    }

      setOverlayVisible(false);
    }
  

  return (
    <Layout>
      <div>
      
        <div className="gallery-unique-container">
          <input
            type="button"
            id="add-new-image"
            className="gallery-unique-add-new-image"
            value="Add New Image"
            onClick={handleAddNewImageClick}
          />
          <div className="gallery-unique-images-container">
            {images.map((image, index) => (
              <div key={index} className="image">
             
                <img
                  src={image.image_url}
                  alt={image.description}
                  className="gallery-unique-image"
                />
                <p className="gallery-unique-description">{image.description}</p>
              </div>
            ))}
          </div>
        </div>

      
        {isOverlayVisible && (
          <div className="gallery-unique-overlay">
            <div className="gallery-unique-popup">
              <div className="gallery-unique-close">
                <button
                  className="gallery-unique-close-popup"
                  id="close-popup"
                  onClick={handleClosePopup}
                >
                  X
                </button>
              </div>
              <h2>Add New Image</h2>
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="upload-image">Upload Image:</label>
                <input
                  type="file"
                  id="upload-image"
                  name="upload-image"
                  onChange = {handleImageUpload}
                  required
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description of the image."
                  required
                />
                <button type="submit" id="submitButton">
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
