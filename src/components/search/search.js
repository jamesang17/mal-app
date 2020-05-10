import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { searchAnime, SearchObj } from '../../api/Jikan';
import ResultDrawer from './ResultDrawer';
import CustomBackdrop from '../CustomBackdrop';

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
  const [input, setInput] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (input.toString().length >= 3) {
      setBackdrop(true);
      await searchAnime(new SearchObj(input))
        .then((res) => {
          setSearchResults(res);
          setDrawer(true);
          setBackdrop(false);
        });
    }
  }

  return (
    <div>
      <div style={{position: 'relative',marginRight: "5%",marginLeft: 0,width: "50%",}}>
        <form onSubmit={e => handleSearch(e)}>
          <TextField id="search" placeholder="Search..." variant="outlined" fullWidth={true}
            onChange={e => setInput(e.currentTarget.value)}
            InputProps={{
              classes,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              )
            }}
          />
        </form>
      </div>
      <CustomBackdrop shouldOpen={backdrop} />
      <ResultDrawer results={searchResults} shouldOpen={drawer} setDrawer={setDrawer} query={input}/>
    </div>
  )
}

export default Search;