import './UsersList.css';
import { useEffect } from 'react';
import { Link, Route, useRouteMatch } from "react-router-dom";
import AlbumsList from '../AlbumsList/AlbumsList';

const UsersList = (
   {
      users,
      setUsers,
      selectedUserId,
      setSelectedUserId,
      albums,
      setAlbums,
      photos,
      setPhotos,
      selectedAlbumId,
      setSelectedAlbumId
   }) => {
   const { path } = useRouteMatch();

   useEffect(() => {
      const getUsers = async () => {
         try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
               throw new Error('failed fetch users list!');
            }

            const data = await response.json();
            setUsers(data);
         } catch (error) {
            console.log("failed fetch users list: ", error.message);
         }
      };

      getUsers();
   }, [setUsers]);

   return (
      <div className='users-holder'>
         {users.map((user) => (
            <div className='user-holder' key={user.id}>
               <p className='title'>{user.name}</p>
               <Link
                  className='to-album-link'
                  to={`${path}/albums/${user.id}`}
                  onClick={() => setSelectedUserId(user.id)}>Albums
               </Link>
               {selectedUserId === user.id && (
                  <Route path={`${path}/albums/:id`}>
                     <AlbumsList
                        albums={albums}
                        setAlbums={setAlbums}
                        photos={photos}
                        setPhotos={setPhotos}
                        selectedAlbumId={selectedAlbumId}
                        setSelectedAlbumId={setSelectedAlbumId}
                        selectedUserId={selectedUserId} />
                  </Route>
               )}
            </div>
         ))}
      </div>
   )
}

export default UsersList;

