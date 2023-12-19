import React from "react";
import { useState } from 'react';
import './App.css';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";
import UsersList from './UsersList/UsersList';
import AlbumsList from './AlbumsList/AlbumsList';
import PhotosList from './PhotosList/PhotosList';

function App() {
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
               <Route path='/about'>
                  <About />
               </Route>
               <Route path='/users'>
                  <UsersList setSelectedUserId={setSelectedUserId} />
               </Route>
               <Route path='/album/:userName/:albumId'>
                  <PhotosList
                     selectedAlbumId={selectedAlbumId} />
               </Route>
               <Route path='/album/:userName/'>
                  <AlbumsList
                     selectedUserId={selectedUserId}
                     setSelectedAlbumId={setSelectedAlbumId}
                  />
               </Route>
               <Route path='/'>
                  <Home />
               </Route>
            </Switch>
         </div>
      </Router>
   );
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

function Home() {
   return <h1 className='title'>Home</h1>;
}

export default App;