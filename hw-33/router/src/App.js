import { useState } from 'react';
import React from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";
import UsersList from './UsersList/UsersList';
import './App.css';

function App() {
   const [users, setUsers] = useState([]);
   const [albums, setAlbums] = useState([]);
   const [photos, setPhotos] = useState([]);
   const [selectedUserId, setSelectedUserId] = useState(null);
   const [selectedAlbumId, setSelectedAlbumId] = useState(null);

   return (
      <Router>
         <div className='container'>
            <div className='nav-items-holder'>
               <ul className='nav-items'>
                  <li className='nav-item'>
                     <Link to='/' className='nav-link'>Home</Link>
                  </li>
                  <li className='nav-item'>
                     <Link to='/about' className='nav-link'>About</Link>
                  </li>
                  <li className='nav-item'>
                     <Link to='/users' className='nav-link'>Users</Link>
                  </li>
               </ul>
            </div>

            <Switch>
               <Route path='/users'>
                  <UsersList
                     users={users}
                     setUsers={setUsers}
                     selectedUserId={selectedUserId}
                     setSelectedUserId={setSelectedUserId}
                     selectedAlbumId={selectedAlbumId}
                     setSelectedAlbumId={setSelectedAlbumId}
                     albums={albums}
                     setAlbums={setAlbums}
                     photos={photos}
                     setPhotos={setPhotos} />
               </Route>
               <Route path='/about'>
                  <About />
               </Route>
               <Route path='/'>
                  <Home />
               </Route>
            </Switch>
         </div>
      </Router>
   );
}

function Home() {
   return <h1 className='title'>Home</h1>;
}

function About() {
   return (
      <>
         <h1 className='title'>About</h1>
         <p className='text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
         </p>
      </>
   )
}

export default App;