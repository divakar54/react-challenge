import React from 'react'
import TodosListTable from './TodosListTable'
import TableSearchBar from './TableSearchBar'
import SortedTable from './SortedTable';

const TodosListComponent = ({todosList, userList}) => {
    return (
        <div className='TodoTable'>
            <TodosListTable todosList={todosList} userList={userList}/>
            {/* <SortedTable todosList={todosList} /> */}
        </div>
    )
}

export default TodosListComponent
