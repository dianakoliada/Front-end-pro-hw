import React, { useState } from 'react';
import './App.css';
import FormInput from './FormInput/FormInput';

function App() {
   const [inputValues, setInputValues] = useState({
      userName: '',
      userEmail: '',
      userTel: ''
   });
   console.log(inputValues);

   const inputs = [
      {
         id: 1,
         name: 'userName',
         type: 'text',
         placeholder: 'User name',
         errorMessage: 'User name should be 3-16 characters and shouldn`t include any special character!',
         label: 'User Name',
         required: true,
         pattern: '^[A-Za-z0-9]{3,16}$'
      },
      {
         id: 2,
         name: 'userEmail',
         type: 'email',
         placeholder: 'User email',
         errorMessage: 'Email should be valid!',
         label: 'User Email',
         required: true,
      },
      {
         id: 3,
         name: 'userTel',
         type: 'tel',
         placeholder: 'User tel',
         errorMessage: 'User tel should be only digits and length 12!',
         label: 'User Tel',
         required: true,
         pattern: '^[0-9]{12}$'
      }
   ];

   const handleSubmit = (e) => {
      e.preventDefault();
   }

   const onChangeValue = (e) => {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
   }

   return (
      <div className="App">
         <form onSubmit={handleSubmit} className='form-wrapper'>
            <h1>Register</h1>
            {inputs.map((input) => (
               <FormInput
                  key={input.id}
                  {...input}
                  value={inputValues[input.name]}
                  onChangeValue={onChangeValue} />
            ))}
            <button>Submit</button>
         </form>
      </div>
   );
}

export default App;
