import React, { useEffect, useState } from "react";
import {
   Link,
   useParams
} from 'react-router-dom';
import './PhotosList.css';

const PhotosList = () => {
   const [photos, setPhotos] = useState([]);
   const { userName, userId, albumId } = useParams();

   useEffect(() => {
      const getPhotos = async () => {
         try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
            if (!response.ok) {
               throw new Error("Failed to fetch photos");
            }

            const data = await response.json();
            setPhotos(data);
         } catch (error) {
            console.error("Error fetching albums:", error.message);
         }
      };

      if (albumId) {
         getPhotos();
      }
   }, [albumId]);

   return (
      <>
         <h3 className="text">Photos of {userName.replace(/_/g, ' ')}'s {albumId.replace(/_/g, ' ')}</h3>
         <Link to={`/album/${userName}/${userId}`}>Back to albums</Link>
         <div className="img-list-holder">
            {photos.map((photo) => (
               <div key={photo.id} className="img-holder">
                  <p className="text">id: {photo.id}</p>
                  <img className="img" src={photo.thumbnailUrl} alt="" />
               </div>
            ))}
         </div>
      </>
   )
}

export default PhotosList;