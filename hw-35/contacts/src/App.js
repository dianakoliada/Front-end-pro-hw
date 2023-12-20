import './App.css';
import { useState } from 'react';
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
