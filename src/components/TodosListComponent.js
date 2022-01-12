import React from 'react'
import TodosListTable from './TodosListTable'
import { useQuery } from 'react-query'
import axios from 'axios'
// import TableSearchBar from './TableSearchBar'
// import SortedTable from './SortedTable';

const TodosListComponent = () => {

    const { isLoading, isError, data, error } = useQuery('todos', () => { return axios.get('https://jsonplaceholder.typicode.com/todos/')})
    
    if (isLoading) {
        return <span>Loading...</span>
    }
    if (isError) {
    return <span>Error: {error.message}</span>
    }
    return (
        <div className='TodoTable'>
            {
                isLoading ? <div>Loading...</div> : <TodosListTable todosList={data.data}/>
            }
            {/* <SortedTable todosList={todosList} /> */}
        </div>
    )
}

export default TodosListComponent
