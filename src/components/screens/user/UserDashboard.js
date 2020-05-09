import React from 'react';
import { Grid, GridList, GridListTile, GridListTileBar, Typography } from '@material-ui/core';

function renderRows(animes) {
  let gridContentMap = new Map();
  let savedList = [];
  let recList = [];
  let ids = new Set();
  animes.forEach((anime, index) => {  
    savedList.push(
      <GridListTile key={`${anime.mal_id}+${index}`}>
        <img src={anime.image_url} alt={anime.mal_id} />
        <GridListTileBar title={`${anime.title}`} />
      </GridListTile>
    );
    ids.add(parseInt(anime.mal_id));
    recList = recList.concat(anime.recommendations);
  });
  let recObjs = [];
  recList.forEach((rec, index) => {
    if (!ids.has(rec.mal_id)) {
      recObjs.push(
        <GridListTile key={`${rec.mal_id}+${index}`}>
          <img src={rec.image_url} alt={rec.mal_id} />
          <GridListTileBar title={`${rec.title}`} />
        </GridListTile>
      );
    }
  });
  gridContentMap.set("recs", recObjs);
  gridContentMap.set("saved", savedList);
  return gridContentMap;
}

function renderGridContent(animes) {
  let gridContent = [];
  let renderedContent = renderRows(animes);
  gridContent.push(
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden'}}>
      <Typography variant="h5">RECOMMENDED ANIMES</Typography>
      <GridList cols={4.5} cellHeight={230} style={{ flexWrap: 'nowrap' }} >
        {renderedContent.get("recs")}
      </GridList>
    </div>
  );
  gridContent.push(
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden' }}>
      <Typography variant="h5">SAVED ANIMES</Typography>
      <GridList cols={4.5} cellHeight={230} style={{ flexWrap: 'nowrap' }} >
        {renderedContent.get("saved")}
      </GridList>
    </div>
  );
  return gridContent;
}

const UserDashboard = (props) => {
  const animes = props.animes;
  if (animes.length === 0) return null;
  
  return (
    <Grid container style={{ background: "#F0BBA4", padding: "2%" }}>
      {renderGridContent(animes)} 
    </Grid> 
  )
}

export default UserDashboard;