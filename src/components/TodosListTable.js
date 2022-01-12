import {Table,TableBody,TableCell,TableContainer,TableRow,TablePagination, Typography} from '@mui/material';
import { Button } from "@mui/material";
import { useState, useEffect} from 'react';
import UserDetails from './UserDetails';
import SearchBar from 'material-ui-search-bar';
import getComparator from '../services/getComparator';
import EnhancedTableHead from './EnhancedTableHead';
import { useQuery } from 'react-query';
import { getUserData } from '../data/fetchData';

export default function TodosListTable({todosList}) {

  //states for sorting the columns
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('todoid');

  //states for searching and setting rows
  const [searched, setSearched] = useState('');
  const [rows, setRows] = useState(todosList);

  useEffect(() => {
    setRows(todosList);
  }, [todosList])

  //states used in pagination
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  //for sending data to UserDetail comp
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
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const getUserList = async(id) =>{
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await response.json();  
    return user;
  }

  const onViewUserClick = async(title, todoId, userId) =>{
    const newUser = await getUserList(userId);
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
        <SearchBar onChange={(searchedVal) => requestSearch(searchedVal)} onCancelSearch={() => cancelSearch()} />
      </div>
    <TableContainer>
      <Table sx={{ width: 800, margin:2, border:1, marginTop: 0 }} aria-label="simple table">
        <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
        <TableBody>
          {rows.slice().sort(getComparator(order, orderBy))
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((todos) => (
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
