import React from 'react';
import { Grid, ListItem, ListItemText, List } from '@material-ui/core';

function renderRows(animes) {
  let gridContentMap = new Map();
  let savedList = [];
  let recList = [];
  console.log(animes);
  animes.forEach((anime) => {    
    savedList.push(
      <ListItem button key={anime.mal_id}>
        <ListItemText primary={`${anime.title}`} />
      </ListItem>
    );
    anime.recommendations.forEach((rec) => {
      recList.push(
        <ListItem button key={rec.mal_id}>
          <ListItemText primary={`${rec.title}`} />
        </ListItem> 
      );
    });
  });
  gridContentMap.set("recs", recList);
  gridContentMap.set("saved", savedList);
  return gridContentMap;
}

function renderGridContent(animes) {
  let gridContent = [];
  let renderedContent = renderRows(animes);
  gridContent.push(
    <Grid item xs={12} s={8}>
      <div>RECOMMENDED ANIMES</div>
      <List>
        {renderedContent.get("recs")}
      </List>
    </Grid>
  );
  gridContent.push(
    <Grid item xs={12} s={4}>
      <div>SAVED ANIMES</div>
      <List>
        {renderedContent.get("saved")}
      </List>
    </Grid>
  );
  return gridContent;
}

const UserDashboard = (props) => {
  const animes = props.animes;
  if (animes.length === 0) return null;
  
  return (
    <Grid container>
      {renderGridContent(animes)} 
    </Grid> 
  )
}

export default UserDashboard;