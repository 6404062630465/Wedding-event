import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

function Search({ setSearchTerm }) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <TextField
        sx={{
          marginTop: 10,
          marginRight:5
        }}
        label="Search…"
        variant="outlined"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default Search;
