import React from 'react';
import { Grid, GridList, GridListTile, GridListTileBar, Typography } from '@material-ui/core';


class UserDashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      myState: 0,
      animes: props.animes,
      animeDialogState: false,
    }
  }

  createGridTile(malId, index, imageUrl, title) {
    return (
        <GridListTile 
          key={`${malId}+${index}`}
        >
          <img src={imageUrl} alt={malId} />
          <GridListTileBar title={`${title}`} />
        </GridListTile>)
  }

  createGridList(title, content) {
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

  getTop10RecList(savedIds, recs) {
    let result = [];
    recs.sort((a, b) => b.recommendation_count - a.recommendation_count);

    let index = 0;
    while (result.length < 10) {
      let rec = recs[index];
      if (!savedIds.has(rec.mal_id)) {
        result.push(this.createGridTile(rec.mal_id, index, rec.image_url, rec.title))
        savedIds.add(rec.mal_id); // avoid any duplicate recommended animes
      }
      index += 1;
    }
    return result;
  }

  renderRows(animes) {
    let gridContentMap = new Map();
    let recList = [];
    let ids = new Set();
    animes.forEach((anime) => {  
      ids.add(parseInt(anime.mal_id));
      recList = recList.concat(anime.recommendations);
    });
    let recObjs = this.getTop10RecList(ids, recList);
    gridContentMap.set("recs", recObjs);
    return gridContentMap;
  }

  renderGridContent(animes) {
    let gridContent = [];
    let renderedContent = this.renderRows(animes);
    gridContent.push(
      this.createGridList("Top 10 Recommended", renderedContent.get("recs"))
    );
    return gridContent;
  }
  
  render() {
    if (this.state.animes.length === 0) {
      return null;
    } else {
      return (
        <Grid container style={{ padding: "2%" }}>
          {this.renderGridContent(this.state.animes)} 
        </Grid> 
      )
    } 
  }
}

export default UserDashboard;