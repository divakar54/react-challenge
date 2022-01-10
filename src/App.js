import './App.css';
import { useState, useEffect } from 'react';
import TodosListTable from './components/TodosListTable.js';
import TodosListComponent from './components/TodosListComponent';
import UserDetails from './components/UserDetails';
import SortedTable from './components/SortedTable.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [users, setUser] = useState([]);
  useEffect(() => {
    getTodosList();
    getUserList();
  }, [])

  const getTodosList = async() => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const TodoList = await response.json();
    setTodos(TodoList);
  }

  const getUserList =async() =>{
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const UserList = await response.json();  
    setUser(UserList);
  
  }
  return (
    <div className="App">
      <TodosListComponent todosList={todos} userList={users}/>
      {/* <UserDetails userId={}/> */}
      {/* <SortedTable todosList={todos}/> */}
    </div>
  );
}

export default App;
