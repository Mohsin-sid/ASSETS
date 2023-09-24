import React, { useEffect, useState } from "react";
import './App.css'

function App() {
    const [todos, setTodos] = useState([])
    const [task, setTask] = useState('');
    const [completedTasks, setCompletedTasks] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const [test, testing] = useState("");
    const [idList, setIdList] = useState([]);
  
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users/1/todos')
        .then((response) => response.json())
        .then((data) => {
          setTodos(data);
          
        });
    }, []);
    
    const addTask = () => {
      if (task.trim() === '') return;
      const newTodo = {
        id: todos.length +1,
        title: task,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      // const x=todos.slice(0,4);
      // console.log(todos);
      setTask('');
    };
  
    const toggleComplete = (id) => {
      console.log("===== id");
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    
      
      const completedTask = updatedTodos.find((todo) => todo.id === id);
      if (completedTask && completedTask.completed) {
        setCompletedTasks(prev => [...prev, completedTask]);
      } else {
       
        setCompletedTasks(completedTasks.filter((task) => task.id !== id));
        console.log("=====", task);
      }
    };
    
  
    const editTask = (id, newTitle) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      setTodos(updatedTodos);
      // console.log(todos.slice(0,4)) 
    };
  
    // const deleteTask = (id) => {
    //   const updatedTodos = todos.filter((todo) => todo.id !== id);
    //   setTodos(updatedTodos);
    //   setCompletedTasks(completedTasks)
    // };
    const deleteTask = (id) => {
      
  // Check if the task to delete is in the completedTasks array
  const isCompletedTask = completedTasks.some((task) => task.id === id);
    
  if (isCompletedTask) {
    // If the task is in completedTasks, remove it from there
    const updatedCompletedTasks = completedTasks.filter((task) => task.id !== id);
    setCompletedTasks(updatedCompletedTasks);
  }

  // Remove the task from the main todos array
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  setTodos(updatedTodos);
 
};

const storingId = (id) => {
  if(idList.includes(id)){
    const removedIds = idList.filter(listId => listId !== id)
    setIdList(removedIds)
  }else{
    setIdList(prev => [...prev, id])
  }
}


return (
  <div className="App">
    <h1>Todo App</h1>
    <div className='add'>
      <input
        type="text"
        placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>
      

        <div className="completed">
  <label>Show Completed Tasks</label>
  <input
    type="checkbox"
    checked={showCompleted}
    onChange={() => setShowCompleted(!showCompleted)}
  />
</div>

{showCompleted && completedTasks.length >= 0 && (
  <div className="completed-tasks">
    <h2>Completed Tasks</h2>
    
    <ul>
      {completedTasks.map((task) => (
        <li key={task.id}>
        <span style={{ textDecoration: 'line-through' }}></span>
          {task.title}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
         
        </li>
          
      ))}
    </ul>
</div>
)}

        <div className='main_data_div'>
        <ul>
          
          {todos.map((todo) => (
  <li
    key={todo.id}
    className={!(showCompleted && idList.includes(todo.id)) ? 'main_section' : 'main_section red'}
  >
    <div className={!(showCompleted && todo.id === test) ? "main_section" : "main_section red"}>
      <span onClick={() => toggleComplete(todo.id)}>{todo.title}</span>
      <div className='button-div'>
        <button
          className="complete"
          onClick={() => {
            storingId(todo.id)
            toggleComplete(todo.id)}}
        >
          Mark as Completed
        </button>
        <button disabled={idList.includes(todo.id)} className="edit" onClick={() => editTask(todo.id, prompt('Edit task:', todo.title))}>
          Edit
        </button>
        <button onClick={() => deleteTask(todo.id)}>Delete</button>
      </div>
    </div>
  </li>
))}

        </ul>
</div>
      </div>
    );
  }
  
  export default App;