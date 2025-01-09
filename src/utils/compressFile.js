
import imageCompression from 'browser-image-compression';  // Import the library

  export const compressImage = async (file)=>{
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
          return(reader.result); // Save Base64 string to state
        };
       }catch (error) {
          console.error('Error compressing image:', error);  // Handle any errors
        }
      }
  }