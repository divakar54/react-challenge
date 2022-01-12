import {TableCell,TableHead,TableRow, Box} from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';

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
  
  export default function   EnhancedTableHead(props) {
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
  };
  