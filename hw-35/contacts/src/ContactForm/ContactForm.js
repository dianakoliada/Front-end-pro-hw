import './ContactForm.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

const ContactForm = ({ usersList, setUsersList }) => {
   const [inputValues, setInputValues] = useState({
      id: usersList.length + 2,
      name: '',
      username: '',
      tel: ''
   });

   const handleInputChange = (e) => {
      const { name, value } = e.target;

      setInputValues(prevValues => ({
         ...prevValues,
         [name]: value
      }));
   };

   const onInputValSave = (e) => {
      if (inputValues.name && inputValues.username && inputValues.tel) {
         setUsersList(prevValues => [...prevValues, inputValues]);
      } else {
         e.preventDefault();
         alert("Please fill in all required fields.");
      }
   };

   return (
      <>
         <h1 className='title'>Fill in the form</h1>
         <form className='input-form'>
            <label htmlFor="name">Enter your name</label>
            <input
               type="text"
               id="name"
               name="name"
               required
               value={inputValues.name}
               onChange={handleInputChange} />
            <label htmlFor="username">Enter your user name</label>
            <input
               type='text'
               id="username"
               name="username"
               required
               value={inputValues.username}
               onChange={handleInputChange} />
            <label htmlFor="tel">Enter your telephone</label>
            <input
               type='tel'
               id="tel"
               name="tel"
               required
               value={inputValues.tel}
               onChange={handleInputChange} />
            <div className='btn-form-hold d-flex-center'>
               <Link
                  to='/'
                  className='btn btn-link d-flex-center'
                  onClick={onInputValSave}>Save
               </Link>
               <Link to='/' className='btn btn-link d-flex-center'>Cancel</Link>
            </div>
         </form>
      </>
   )
}

export default ContactForm;