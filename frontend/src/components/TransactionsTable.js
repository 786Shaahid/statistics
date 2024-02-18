// TransactionsTable.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, Select, MenuItem, Button, TextField } from '@mui/material';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March'); // Default selected month
  const [searchText, setSearchText] = useState('');

  // Fetch transactions data from API based on selected month and search criteria

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Fetch transactions data for the selected month
  };

  const handleSearch = () => {
    // Fetch transactions data based on search criteria
  };

  return (
    <div>
      {/* <Button variant="contained" onClick={handleSearch}>Search</Button> */}
      
      {/* Table to display transactions */}
      <TableContainer component={Paper}>
        <Table>
          {/* Table headers */}
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              {/* Add more table headers if needed */}
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.price}</TableCell>
                {/* Add more table cells if needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionsTable;
