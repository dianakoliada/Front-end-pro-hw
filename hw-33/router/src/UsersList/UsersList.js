import './UsersList.css';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const UsersList = ({ setSelectedUserId }) => {
   const [users, setUsers] = useState([]);

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
                  to={`/album/${user.name.replace(/ /g, '_')}`}
                  onClick={() => setSelectedUserId(user.id)}
               >
                  album</Link>
            </div>
         ))}
      </div>
   )
}

export default UsersList;

