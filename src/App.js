import './App.css';
import { useState, useEffect } from 'react';
import TodosListTable from './components/TodosListTable.js';
import TodosListComponent from './components/TodosListComponent';
import UserDetails from './components/UserDetails';
import SortedTable from './components/SortedTable.js';
import Counter from './components/Counter';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodosList();
  }, [])

  const getTodosList = async() => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const TodoList = await response.json();
    setTodos(TodoList);
  }

  return (
    <div className="App">
      {/* <Counter /> */}
      <TodosListComponent todosList={todos}/>
      {/* <UserDetails userId={}/> */}
      {/* <SortedTable todosList={todos}/> */}
    </div>
  );
}

export default App;
