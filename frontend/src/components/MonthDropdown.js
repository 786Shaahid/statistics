// MonthDropdown.js
import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const MonthDropdown = ({ selectedMonth, onChange }) => {
  return (
    <FormControl>
      <Select
        value={selectedMonth}
        onChange={onChange}
      >
        {/* Options for month dropdown */}
          <MenuItem value="1">January</MenuItem>
          <MenuItem value="2">February</MenuItem>
          <MenuItem value="3">March</MenuItem>
          <MenuItem value="4">April</MenuItem>
          <MenuItem value="5">May</MenuItem>
          <MenuItem value="6">June</MenuItem>
          <MenuItem value="7">July</MenuItem>
          <MenuItem value="8">August</MenuItem>
          <MenuItem value="9">September</MenuItem>
          <MenuItem value="10">October</MenuItem>
          <MenuItem value="11">November</MenuItem>
          <MenuItem value="12">December</MenuItem>
        {/* Add other months */}
      </Select>
    </FormControl>
  );
};

export default MonthDropdown;

