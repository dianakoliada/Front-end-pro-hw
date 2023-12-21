import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
   BrowserRouter as Router,
   Switch,
   Route
} from "react-router-dom";
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

function App() {
   const [usersList, setUsersList] = useState([]);

   const onUserDeleteHandler = (userId) => {
      const updatedUsersList = usersList.filter((user) => user.id !== userId);
      setUsersList(updatedUsersList);
   }

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
      <Router>
         <div className="container">
            <Switch>
               <Route path='/contactForm'>
                  <ContactForm
                     usersList={usersList}
                     setUsersList={setUsersList} />
               </Route>
               <Route path='/'>
                  <ContactList
                     usersList={usersList}
                     setUsersList={setUsersList}
                     onUserDeleteHandler={onUserDeleteHandler} />
               </Route>
            </Switch>
         </div>
      </Router>
   );
}

export default App;
