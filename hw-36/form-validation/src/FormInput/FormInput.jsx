import './FormInput.css';
import { useState } from 'react';

const handleDigitsOnly = (e) => {
   if (!(e.key >= '0' && e.key <= '9')) {
      e.preventDefault();
    }
};

const FormInput = (props) => {
   const [focused, setFocused] = useState(false);
   const {label, onChangeValue, id, errorMessage, ...inputProps} = props;

   const handleFocus = (e) => {
      setFocused(true);
   }

   return (
      <div className='form-input'>
         <label>{label}</label>
         <input 
            {...inputProps}
            onChange={onChangeValue}
            onBlur={handleFocus}
            onFocus={() => inputProps.name === 'userTel' && setFocused(true)}
            focused={focused.toString()}
            onKeyDown={(e) => inputProps.name === 'userTel' && handleDigitsOnly(e)}/>
         <span className='error'>{errorMessage}</span>
      </div>
   )
}

export default FormInput;