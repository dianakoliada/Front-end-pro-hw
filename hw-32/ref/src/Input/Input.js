import React, { Component } from 'react';
import './Input.css';


class Input extends Component {

   render() {
      const { inputRef } = this.props;

      return (
         <>
            <div className='input-wrap'>
               <input type='text' className='input' ref={inputRef} />
            </div>
         </>
      )
   };
}

export default Input;