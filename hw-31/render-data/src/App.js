import './App.css';
import React, { Component } from 'react';

class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         daysList: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      }
   }

   render() {
      return (
        <>
            <ul className='list-items'>
               {this.state.daysList.map((el) => (
                  <li className='list-item'>{el}</li>
               ))}
            </ul>
        </>
      );
   }
}

export default App;
