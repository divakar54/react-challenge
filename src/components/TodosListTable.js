import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TablePagination, TableFooter, Input, Typography} from '@mui/material';
import { Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import SearchBar from 'material-ui-search-bar';

const useStyles = makeStyles({

})

export default function TodosListTable({todosList, userList}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [searched, setSearched] = useState('');
  const [rows, setRows] = useState(todosList);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewUser, setViewUser] = useState(false);
  const [userDetail, setUserDetail] = useState(
    {
      TodoId: '',
      TodoTitle: '',
      UserId: '',
      Name: '',
      email: ''
    }
  );
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onViewUserClick = (title, todoId, userId) =>{
    const newUser = userList.find(user => user.id === userId );
    setUserDetail({
      ...userDetail,
      TodoId: todoId,
      TodoTitle: title,
      UserId: userId,
      Name: newUser.name,
      email: newUser.email
    })
    setViewUser(true);
  }

  const requestSearch = (searchedVal) => {
    const filteredRow = todosList.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase())
    });
    setRows(filteredRow);
  }

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  }
  return (
    <div className='TodoListTable'>
      <div className='TableHeader'>
        <Typography ml={2} >Todo</Typography>
        {/* <Input value={searched} sx={{}} placeholder='Search...' type='search' onChange={e => requestSearch(e)}/> */}
        <SearchBar value='searched' onChange={(searchedVal) => requestSearch(searchedVal)} onCancelSearch={() => cancelSearch()} />

      </div>
    <TableContainer>
      <Table sx={{ width: 800, margin:2, border:1, marginTop: 0 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ToDo ID</TableCell>
            <TableCell >Title</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Action</TableCell>   
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((todos) => (
            <TableRow
              key={todos.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {todos.id}
              </TableCell>
              <TableCell >{todos.title}</TableCell>
              <TableCell >{String(todos.completed)}</TableCell>
              <TableCell ><Button onClick={(e) => onViewUserClick(todos.title, todos.id, todos.userId, e)} sx={{color: 'black'}} variant="outlined">View User</Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
            sx={{width:700}}
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={todosList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableContainer>
    {
      viewUser ? <UserDetails userDetail={userDetail}/> : <div>No user selected</div>
    }
    </div>
  );
}
