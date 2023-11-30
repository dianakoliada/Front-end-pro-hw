import './App.css';
import React, { Component } from 'react';

class App extends Component {
   constructor(props) {
      super(props);

      // initial value of id
      this.idCounter = 1;
   }

   state = {
      todoList: [],
   }

   onSubmitHandler = (e) => {
      e.preventDefault();
      const todoText = e.target.elements.input.value;

      // make an unique id
      const id = this.idCounter++;

      this.setState({
         todoList: [...this.state.todoList, { id, text: todoText}],
      });
      e.target.reset();
   }

   setItemDone = (e) => {
      let el = e.target;
      el.classList.toggle('done');
   }

   render() {
      return (
         <>
            <ul className='list-items'>
               {this.state.todoList.map((el) => (
                  <li className='list-item' key={el.id} onClick={this.setItemDone}>{el.text}</li>
               ))}
            </ul>
            <form className="input-group" onSubmit={this.onSubmitHandler}>
               <input type="text" id="input" className="input" required autoComplete="off" name="input" />
               <label htmlFor="text" className="label">Enter task</label>
               <button className="btn" type="submit">Add</button>
            </form>
         </>
      );
   }
}

export default App;
