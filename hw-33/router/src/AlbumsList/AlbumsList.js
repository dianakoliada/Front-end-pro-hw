import React, { useEffect } from "react";
import { Link, Route, useRouteMatch, useParams } from "react-router-dom";
import './AlbumsList.css';
import PhotosList from '../PhotosList/PhotosList';

const AlbumsList = ({ albums, setAlbums, photos, setPhotos, selectedAlbumId, setSelectedAlbumId }) => {
   const { id } = useParams();
   const { path } = useRouteMatch();

   useEffect(() => {
      const getAlbums = async () => {
         try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
            if (!response.ok) {
               throw new Error("Failed to fetch albums");
            }

            const data = await response.json();
            setAlbums(data);
         } catch (error) {
            console.error("Error fetching albums:", error.message);
         }
      };

      if (id) {
         getAlbums();
      }
   }, [id]);

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
                     onClick={() => setSelectedAlbumId(album.id)}> Photos {album.id}
                  </Link>
                  {selectedAlbumId === album.id && (
                     <Route path={`${path}/photos/:id`}>
                        <PhotosList photos={photos} setPhotos={setPhotos} />
                     </Route>
                  )}
               </div>
            )
         ))}
      </>
   )

}

export default AlbumsList;
