import React, { useState } from 'react';
import { Grid, GridList, GridListTile, GridListTileBar, Typography } from '@material-ui/core';
import AnimeDialog from '../carousel/AnimeDialog';


const UserDashboard = (props) => {
  
  const [malIdFocus, setIdFocus] = useState(null);
  const animes = props.animes;
  
  const handleClose = (event) => {
    console.log("Anime card closed");
    setIdFocus(null)
  }

  function createGridTile(malId, index, imageUrl, title) {
    return (
    <GridListTile key={`${malId}+${index}`}
      onClick={(e) => setIdFocus(malId)}
    >
      <img src={imageUrl} alt={malId} />
      <GridListTileBar title={`${title}`} />
    </GridListTile>)
  }
  
  function createGridList(title, content) {
    return (
      <div key={title}>
        <Typography variant="h5" style={{ color: "white"}}>{title}</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden' }}>
          <GridList cols={5.25} cellHeight={230} spacing={10} style={{ flexWrap: 'nowrap' }} >
            {content}
          </GridList>
        </div>
      </div>
    )
  }
  
  function getTop10RecList(savedIds, recs) {
    let result = [];
    recs.sort((a, b) => b.recommendation_count - a.recommendation_count);
    if (recs.length < 10) {
      recs.forEach((rec,index) => {
        if (!savedIds.has(rec.mal_id)) {
          result.push(createGridTile(rec.mal_id, index, rec.image_url, rec.title))
          savedIds.add(rec.mal_id); // avoid any duplicate recommended animes
        }
      });
    } else {
      let index = 0;
      while (result.length < 10) {
        let rec = recs[index];
        if (!savedIds.has(rec.mal_id)) {
          result.push(createGridTile(rec.mal_id, index, rec.image_url, rec.title))
          savedIds.add(rec.mal_id); // avoid any duplicate recommended animes
        }
        index += 1;
      }
    }
    return result;
  }
  
  function renderRows(animes) {
    let gridContentMap = new Map();
    let recList = [];
    let ids = new Set();
    animes.forEach((anime) => {  
      ids.add(parseInt(anime.mal_id));
      recList = recList.concat(anime.recommendations);
    });
    let recObjs = getTop10RecList(ids, recList);
    gridContentMap.set("recs", recObjs);
    return gridContentMap;
  }
  
  function renderGridContent(animes) {
    let gridContent = [];
    let renderedContent = renderRows(animes);
    gridContent.push(
      createGridList("Top 10 Recommended", renderedContent.get("recs"))
    );
    return gridContent;
  }


  if (animes.length === 0) return null;
  
  return (
    
    <Grid container style={{ padding: "2%" }}>
      <AnimeDialog
        closeFunction={handleClose}
        openState={Boolean(malIdFocus)}
        malId={malIdFocus}
        userAnimeList={props.userAnimeList}
      />
      {renderGridContent(animes)} 
    </Grid> 
  )
}

export default UserDashboard;