import React from 'react';
import { TableRow, TableCell, CircularProgress } from '@mui/material';

export interface IProps {
  loading: boolean;
  colSpan: number;
}
const TableNoRecordFound = ({ loading, colSpan }: IProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        {loading ? <CircularProgress size={22} /> : 'No record found'}
      </TableCell>
    </TableRow>
  );
};
export default TableNoRecordFound;
