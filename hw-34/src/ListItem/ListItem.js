import './ListItem.css';

const ListItem = ({ todoList, setTodoList }) => {

   const onTaskDeleteHandler = (taskId) => {
      const updatedList = todoList.filter((task) => task.id !== taskId);
      setTodoList(updatedList);
   }

   return (
      todoList.map((item) => (
         <div className='list-item-wrap'>
            <li className='list-item' key={item.id}>{item.text}</li>
            <button className='btn btn-del' onClick={() => onTaskDeleteHandler(item.id)}>Delete</button>
         </div>
      ))
   )
};

export default ListItem;