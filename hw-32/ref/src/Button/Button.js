import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
   handleClick = () => {
      this.props.onClick();
   }

   render() {
      const buttonText = this.props.buttonText;

      return (
         <div className='btn-wrap'>
            <button className='btn' onClick={this.handleClick}>{buttonText}</button>
         </div>
      )
   };
}

export default Button;