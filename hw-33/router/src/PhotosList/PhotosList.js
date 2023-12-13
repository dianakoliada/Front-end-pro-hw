import React, { useEffect } from "react";
import {
   useParams
} from "react-router-dom";
import './PhotosList.css';

const PhotosList = ({ photos, setPhotos }) => {
   const { id } = useParams();

   useEffect(() => {
      const getPhotos = async () => {
         try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
            if (!response.ok) {
               throw new Error("Failed to fetch photos");
            }

            const data = await response.json();
            setPhotos(data);
         } catch (error) {
            console.error("Error fetching albums:", error.message);
         }
      };

      if (id) {
         getPhotos();
      }
   }, [id]);

   return (
      <>
         <h1>Test</h1>
         {/* {photos.map((photo) => (
            <div key={photo.id} className="img-holder">
               <h2>{photo.id}</h2>
               <img className="img" src={photo.url} alt="photo" />
            </div>
         ))} */}
      </>
   )
}

export default PhotosList;