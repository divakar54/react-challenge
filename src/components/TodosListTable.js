import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TablePagination, Typography, Box} from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Button } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { useState} from 'react';
import PropTypes from 'prop-types';
import UserDetails from './UserDetails';
import SearchBar from 'material-ui-search-bar';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'todoid',
    numeric: false,
    disablePadding: true,
    label: 'ToDo Id',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'completed',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function TodosListTable({todosList, userList}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('todoid');
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
        <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={todosList.length}
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
