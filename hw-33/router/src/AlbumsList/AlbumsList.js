import React, { useEffect } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import './AlbumsList.css';
import PhotosList from '../PhotosList/PhotosList';

const AlbumsList = (
   {
      albums,
      setAlbums,
      photos,
      setPhotos,
      selectedAlbumId,
      setSelectedAlbumId,
      selectedUserId
   }) => {
   const { path } = useRouteMatch();

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
         {albums.map((album) => (
            (
               <div key={album.id} className="album-holder">
                  <p className="text"> {album.id} </p>
                  <p className="text"> {album.title} </p>
                  <Link
                     className='to-photo-link'
                     to={`${path}/photos/${album.id}`}
                     onClick={() => setSelectedAlbumId(album.id)}> Photos
                  </Link>
                  {selectedAlbumId === album.id && (
                     <Route path={`${path}/photos`}>
                        <PhotosList
                           photos={photos}
                           setPhotos={setPhotos}
                           selectedAlbumId={selectedAlbumId} />
                     </Route>
                  )}
               </div>
            )
         ))}
      </>
   )

}

export default AlbumsList;
