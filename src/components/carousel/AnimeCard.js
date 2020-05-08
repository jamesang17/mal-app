import React from 'react';
import { Card, CardActions, CardMedia, CardContent, Typography } from '@material-ui/core';
import FavButton from './FavButton';


export default function AnimeCard(props) {

  const cardMedia = {
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,'56.25%'
    }
  };

  return (
    <Card style={{ padding: "2%", margin: "5%", height: "85%" }} raised={true} key={props.item["mal_id"]}>
      <CardMedia
        square="true"
        image={props.item["image_url"]}
        style={cardMedia.media}
      />
      <CardContent>
        <Typography style={{ fontWeight: "bold" }}>{props.item["title"]}</Typography>
        <Typography>{"Start Date: " + props.item["start_date"]}</Typography>
                        Rank: {props.item["rank"]}
      </CardContent>
      <CardActions>
        <FavButton
          userAnimeList={props.userAnimeList}
          currentUser={props.currentUser}
          malId={props.item["mal_id"]} 
          title={props.item["title"]}
          imageUrl={props.item["image_url"]}
          showBackdrop={props.showBackdrop}
        />
      </CardActions>
    </Card>
  )
}