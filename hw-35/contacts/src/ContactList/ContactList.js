import './ContactList.css';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ContactList = ({ usersList, setUsersList, onUserDeleteHandler }) => {

   useEffect(() => {
      if (usersList.length === 0) {
         fetchData();
      }
   });

   const fetchData = async () => {
      try {
         const response = await axios.get('https://jsonplaceholder.typicode.com/users');

         setUsersList(response.data);
      } catch (error) {
         console.error('error:', error);
      }
   };

   return (
      <>
         <h1 className='title'>Contacts</h1>
         <table>
            <thead>
               <tr>
                  <th className='text'>Name:</th>
                  <th className='text'>User name:</th>
                  <th className='text'>Telephone:</th>
               </tr>
            </thead>
            {Array.isArray(usersList) ? (
               usersList.map((user) => (
                  <tbody key={user.id}>
                     <tr className='contact-list-hold'>
                        <th className='text text-normal'>{user.name}</th>
                        <th className='text text-normal'>{user.username}</th>
                        <th className='text text-normal'>
                           {user.address && user.address.zipcode ? user.address.zipcode : user.tel}
                        </th>
                        <th>
                           <button
                              className='btn btn-del'
                              onClick={() => onUserDeleteHandler(user.id)}>Delete</button>
                        </th>
                     </tr>
                  </tbody>
               ))
            ) : (
               <p>Loading...</p>
            )}
         </table>
         <Link to='/contactForm' className='link d-flex-center'>Add a new contact</Link>
      </>
   );
}

export default ContactList;