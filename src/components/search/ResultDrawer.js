import React, { useState } from 'react';
import { Drawer, Typography, GridList, GridListTile, GridListTileBar, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AnimeDialog from '../carousel/AnimeDialog';


const useStyles = makeStyles({
  paper: {
    background: '#586473',
    color: 'white'
  }
});

const ResultDrawer = (props) => {

  const [malIdFocus, setIdFocus] = useState(null);
  const styles = useStyles();
  const desktop = useMediaQuery('(min-width:600px)');
  const cols = desktop ? 4.25 : 1.5;

  const handleClose = (event) => {
    console.log("Anime card closed");
    setIdFocus(null)
  }

  function createGridTiles(results) {
    let tiles = [];
    results.forEach((res, index) => {
      tiles.push(
        <GridListTile key={`${res["mal_id"]}+${index}`}
          onClick={(e) => setIdFocus(res.mal_id)}
        >
          <img src={res["image_url"]} alt={res["mal_id"]} /> 
          <GridListTileBar title={`${res["title"]}`} />
        </GridListTile>);
    });
    return tiles;
  }

  return (

    <Drawer anchor="top" open={props.shouldOpen} 
      onClose={e => props.setDrawer(false)} classes={{ paper: styles.paper }}>
      <div style={{ padding: "2%"}}>
        <Typography variant="h6">Results for:
          <span style={{ color: "#62d9d5" }}> {props.query}</span>
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', 
          justifyContent: 'space-around', overflow: 'hidden', padding:"0" }}>
          <GridList cols={cols} cellHeight={300} spacing={10} style={{ flexWrap: 'nowrap' }} >
            {createGridTiles(props.results)}
          </GridList>
        </div>
      </div>
      <AnimeDialog
        closeFunction={handleClose}
        openState={Boolean(malIdFocus)}
        malId={malIdFocus}
      />
    </Drawer>
  )
}

export default ResultDrawer;