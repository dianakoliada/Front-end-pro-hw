import React, { Component } from 'react';
import './App.css';
import './Input/Input';
// import Input from './Input/Input';
import Button from './Button/Button.js';

class App extends Component {
   constructor(props) {
      super(props);
      this.myInputRef = React.createRef();
   }

   componentDidMount() {
      if (this.myInputRef.current) {
         console.log("<Input /> компонент вже був доданий до DOM.");
      }
   }

   handleBtnClick = () => {
      this.myInputRef.current.focus();
   }

   render() {
      return (
         <div className="App" >
            {/* <Input ref={this.myInputRef} /> */}
            <input className='input' ref={this.myInputRef} />
            <Button buttonText={'Focus input'} onClick={this.handleBtnClick} />
         </div>
      );
   }
}

export default App;
