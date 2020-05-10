import React, { useState } from 'react';
import { Card, CardActions, CardMedia, CardContent, Typography,  } from '@material-ui/core';
import FavButton from './FavButton';

import AnimeDialog from './AnimeDialog';


export default function AnimeCard(props) {

  const [animeDialogState, setDialogState] = useState(false);

  const cardMedia = {
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,'56.25%'
    }
  };

  const handleClick = (event) => {
    console.log("Anime card clicked")
    setDialogState(true)
  }

  const handleClose = (event) => {
    console.log("Anime card closed")
    setDialogState(false)
  }

  return (
    <React.Fragment>
      <AnimeDialog 
        closeFunction={handleClose}
        openState={animeDialogState}
        malID={props.item["mal_id"]}
      />
      <Card 
        style={{ padding: "2%", margin: "5%", height: "85%", cursor: "pointer"}} 
        raised={true} 
        key={props.item["mal_id"]}
        onClick={handleClick}>
        <CardMedia
          square="true"
          image={props.item["image_url"]}
          style={cardMedia.media}
        />
        <CardContent>
          <Typography style={{ fontWeight: "bold" }}>{props.item["title"]}</Typography>
          <Typography>Start Date: {props.item["start_date"] ? props.item["start_date"] : (props.item["airing_start"]).split("T")[0]}</Typography>
          <Typography noWrap style={{overflow: "hidden", textOverflow: "ellipsis"}}>{props.item["rank"] ? "Rank: " + props.item["rank"] : null}</Typography>
        </CardContent>
        <CardActions>
          <FavButton
            userAnimeList={props.userAnimeList}
            malId={props.item["mal_id"]} 
            title={props.item["title"]}
            imageUrl={props.item["image_url"]}
          />
        </CardActions>
      </Card>
    </React.Fragment>
  )
}