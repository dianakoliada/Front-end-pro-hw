import './App.css';
import React, { Component } from 'react';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         counter: 0,
      }
   }

   setIncrementHandler = () => {
      this.setState((prevState) => ({
         counter: prevState.counter + 1,
      }));
   };

   setDecrementHandler = () => {
      this.setState((prevState) => ({
         counter: prevState.counter - 1,
      }));
   };

   render() {
      return (
        <div className="App">
          <button className='btn' onClick={this.setIncrementHandler}>+</button>
          <p>{this.state.counter}</p>
          <button className='btn' onClick={this.setDecrementHandler}>-</button>
        </div>
      );
   }
}


export default App;
