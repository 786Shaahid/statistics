// SearchButton.js
import React from 'react';
import { Button } from '@mui/material';

const SearchButton = ({ onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>Search</Button>
  );
};

export default SearchButton;
