import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { GenreIds, getAnimeInGenre } from '../../api/Jikan'; 
import CustomBackdrop from '../CustomBackdrop';
import ResultDrawer from './ResultDrawer';

const GenreSearch = () => {

  const [backdrop, setBackdrop] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  

  const handleGenreSearch = async (e, genre) => {
    console.log("Clicked on " + genre);
    setQuery(genre);
    setBackdrop(true);
    genre = genre.replace(/ /g, "_");
    await getAnimeInGenre(GenreIds[genre]).then((res) => {
      setSearchResults(res.slice(0, 100));
      setBackdrop(false);
      setDrawer(true);
    });
  }

  const createGridItems = (GenreIds) => {
    let genres = Object.keys(GenreIds);
    let gridContainer = [];
    let colors = ["#ADDDCE", "#70AE98", "#E6B655", "#F0A35E", "#CA7E8D"];
    for(let i=0;i<genres.length;i++) {
      let color = colors[i % colors.length]
      gridContainer.push(
        <Grid item xs={6} sm={3} md={2} key={genres[i]}>
          <Button style={{ backgroundColor: `${color}`, 
            color: "white", minHeight: "20vh", width: "100%",
            display:"flex", alignItems:"center", justifyContent:"center" }} 
            elevation={5}
            onClick={e => handleGenreSearch(e,genres[i])}>
            <Typography>{genres[i].replace(/_/g, " ")}</Typography>
          </Button>
        </Grid>
      );
    }
    return gridContainer;
  }

  return (
    <div style={{ justifyContent: "center", padding: "1%" }}>
      <CustomBackdrop shouldOpen={backdrop} />
      <Typography variant="h3" style={{color:"white"}}>GENRES</Typography>
      <Grid container spacing={4} justify="center">
        {createGridItems(GenreIds)}
      </Grid>
      <ResultDrawer results={searchResults} shouldOpen={drawer} setDrawer={setDrawer} query={query} />
    </div>
  )
}

export default GenreSearch;