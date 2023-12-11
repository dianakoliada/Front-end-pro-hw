import './List.css';
import ListItem from '../ListItem/ListItem';

const List = ({ todoList, setTodoList }) => {
   return (
      <ul className='list-items'>
         <ListItem todoList={todoList} setTodoList={setTodoList} />
      </ul>
   )
};

export default List;