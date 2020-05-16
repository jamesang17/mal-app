import React from 'react';
import { Card, CardActions, CardMedia, CardContent, Typography,  } from '@material-ui/core';
import FavButton from './FavButton';


export default function AnimeCard(props) {

  const cardMedia = {
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,'56.25%'
      cursor: "pointer"
    }
  };

  const createMetadataItem = (value) => {
    return (<Typography noWrap style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{value}</Typography>);
  }

  const getMetadata = (anime) => {
    let metadata = [];
    if (anime["start_date"]) {
      metadata.push(createMetadataItem("Start Date: " + anime["start_date"]))
    } else if (anime["start_date"] == null) {
      if (anime["airing_start"]) metadata.push(createMetadataItem("Start Date: " + (anime["airing_start"]).split("T")[0]));
    }    
    if (anime["rank"]) metadata.push(createMetadataItem("Rank: " + anime["rank"]));
    return metadata;
  }

  const handleClick = (event) => {
    props.getMalId(props.item.mal_id)
  }

  return (
    <React.Fragment>
      <Card 
        style={{ display: "flex", flexDirection: "column", padding: "2%", margin: "5%", height: "85%"}} 
        raised={true} 
        key={props.item.mal_id}>
        <CardMedia
          square="true"
          image={props.item.image_url}
          style={cardMedia.media}
          onClick={handleClick}
        />
        <CardContent>
          <Typography style={{ fontWeight: "bold" }}>{props.item["title"]}</Typography>
          {getMetadata(props.item)}
        </CardContent>
        <CardActions style={{ marginTop: "auto", alignSelf: "flex-end" }}>
          <FavButton
            malId={parseInt(props.item.mal_id)} 
            title={props.item.title}
            imageUrl={props.item.image_url}
          />
        </CardActions>
      </Card>
    </React.Fragment>
  )
}