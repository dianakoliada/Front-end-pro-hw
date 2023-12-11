import { useState } from 'react';
import './App.css';
import List from './List/List';
import Form from './Form/Form';

function App() {
   const [todoList, setTodoList] = useState([]);

   return (
      <div className="App">
         <List todoList={todoList} setTodoList={setTodoList} />
         <Form setTodoList={setTodoList} />
      </div>
   );
}

export default App;
