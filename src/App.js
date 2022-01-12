import './App.css';
import { useState, useEffect } from 'react';
import TodosListComponent from './components/TodosListComponent';
import {QueryClient, QueryClientProvider }from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <div className="App">
        {/* <Counter /> */}
        <TodosListComponent todosList={todos}/>
        {/* <UserDetails userId={}/> */}
        {/* <SortedTable todosList={todos}/> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
