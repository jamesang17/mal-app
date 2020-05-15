import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { GenreIds, getAnimeInGenre } from '../../api/Jikan'; 

const GenreSearch = () => {

  const createGridItems = (GenreIds) => {
    let genres = Object.keys(GenreIds);
    let gridContainer = [];
    let colors = ["#ADDDCE", "#70AE98", "#E6B655", "#F0A35E", "#CA7E8D"];
    for(let i=0;i<genres.length;i++) {
      let color = colors[i % colors.length]
      gridContainer.push(
        <Grid item xs={6} sm={3} md={2} justify="center">
          <Paper style={{ backgroundColor: `${color}`, 
            color: "white", minHeight: "20vh", 
            display:"flex", alignItems:"center", justifyContent:"center" }} 
          elevation={5}>
            <Typography>{genres[i].replace(/_/g, " ")}</Typography>
          </Paper>
        </Grid>
      );
    }
    return gridContainer;
  }

  return (
    <Grid container xs={12} spacing={4}>
      {createGridItems(GenreIds)}
    </Grid>
  )
}

export default GenreSearch;