import React from 'react';
import { Grow, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    border: '1px solid #ffffff',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.25)',
    },
    '&$focused': {
      backgroundColor: 'rgba(255,255,255,0.25)',
      borderColor: theme.palette.primary
    },
    '& .MuiInputBase-input': {
      padding: "3%"
    }
  },
  focused: {},
}));

const Search = (props) => {
  const classes = useStyles();

  const handleSearch = (event) => {
    console.log("Searching!");
  }

  return (
    <div style={{
      position: 'relative',
      marginRight: "5%",
      marginLeft: 0,
      width: "50%",
    }}>
      <TextField id="search" placeholder="Search..." variant="outlined" fullWidth={true}
        InputProps={{
          classes,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{color: "white"}}/>
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

export default Search;