import React, { useEffect } from "react";
import './PhotosList.css';

const PhotosList = ({ photos, setPhotos, selectedAlbumId }) => {

   useEffect(() => {
      const getPhotos = async () => {
         try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId}`);
            if (!response.ok) {
               throw new Error("Failed to fetch photos");
            }

            const data = await response.json();
            setPhotos(data);
         } catch (error) {
            console.error("Error fetching albums:", error.message);
         }
      };

      if (selectedAlbumId) {
         getPhotos();
      }
   }, [selectedAlbumId]);

   return (
      <div className="img-list-holder">
         {photos.map((photo) => (
            <div key={photo.id} className="img-holder">
               <p className="text">id: {photo.id}</p>
               <img className="img" src={photo.thumbnailUrl} alt="" />
            </div>
         ))}
      </div>
   )
}

export default PhotosList;