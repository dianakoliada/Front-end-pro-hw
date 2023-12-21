import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './AlbumsList.css';

const AlbumsList = () => {
   const [albums, setAlbums] = useState([]);
   const { userName, userId } = useParams();

   useEffect(() => {
      const getAlbums = async () => {
         try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
            if (!response.ok) {
               throw new Error("Failed to fetch albums");
            }

            const data = await response.json();
            setAlbums(data);
         } catch (error) {
            console.error("Error fetching albums:", error.message);
         }
      };

      if (userId) {
         getAlbums();
      }
   }, [userId]);

   return (
      <>
         <h2 className="title">{userName.replace(/_/, ' ')}'s albums:</h2>
         <Link to="/users">Back to users</Link>
         {albums.map((album) => (
            (
               <div key={album.id} className="album-holder">
                  <Link
                     className='to-photo-link'
                     to={`/album/${userName}/${userId}/${album.title.replace(/ /g, '_')}/${album.id}`}>{album.title}</Link>
               </div>
            )
         ))}
      </>
   )
}

export default AlbumsList;
