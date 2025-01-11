
import imageCompression from 'browser-image-compression';

  export const compressImage = async (file)=>{
    if (file) {
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1, 
            maxWidthOrHeight: 800,
          });
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          return(reader.result);
        };
       }catch (error) {
          console.error('Error compressing image:', error);
        }
      }
  }