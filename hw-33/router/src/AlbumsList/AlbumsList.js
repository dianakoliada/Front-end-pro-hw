import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './AlbumsList.css';

const AlbumsList = ({ selectedUserId, setSelectedAlbumId }) => {
   const [albums, setAlbums] = useState([]);
   const { userName } = useParams();

   useEffect(() => {
      const getAlbums = async () => {
         try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${selectedUserId}`);
            if (!response.ok) {
               throw new Error("Failed to fetch albums");
            }

            const data = await response.json();
            setAlbums(data);
         } catch (error) {
            console.error("Error fetching albums:", error.message);
         }
      };

      if (selectedUserId) {
         getAlbums();
      }
   }, [selectedUserId]);

   return (
      <>
         <h2 className="title">{userName.replace(/_/, ' ')}'s albums:</h2>
         <Link to="/users">Back to users</Link>
         {albums.map((album) => (
            (
               <div key={album.id} className="album-holder">
                  <Link
                     className='to-photo-link'
                     onClick={() => setSelectedAlbumId(album.id)}
                     to={`/album/${userName}/${album.title.replace(/ /g, '_')}`}>{album.title}</Link>
               </div>
            )
         ))}
      </>
   )
}

export default AlbumsList;
