import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Anime, getAnimeRecommendations } from '../../api/Jikan';
import firebase from '../../firebase';

export default function FavButton(props) {

  const [fav, setFav] = useState(false);
  const [color, setColor] = useState("grey");
  
  const handleClick = (event, malId, title, imageUrl, fav) => {
    let animeObj = new Anime(malId, imageUrl, title);
    if (fav) {
      console.log("Removing favorite!");
//      handleRemove(animeObj);
      setFav(false);
      setColor("grey");
    } else {
      console.log("Favoriting!");
//      handleAdd(animeObj);
      setFav(true);
      setColor("red");
    }
  }

  const handleRemove = async (animeObj) => {
    props.showBackdrop(true);
    console.log("handling remove");
    const animeOnDelete = firebase.functions().httpsCallable('dbUsersAnimesOnDelete');
    await animeOnDelete({
      anime: animeObj
    }).then(res => {
      console.log("Success");
      props.showBackdrop(false);
    }).catch(error => alert(error));
  }

  const handleAdd = async (animeObj) => {
    props.showBackdrop(true);
    console.log("handling add"); 
    const animeOnCreate = firebase.functions().httpsCallable('dbUsersAnimesOnCreate');
    let recs = await getAnimeRecommendations(animeObj.malId).then(res => {
      return res.splice(0, 5); // get top 5 recs
    }).catch(error => console.log(error));
    animeObj.setRecommendations(recs);
    await animeOnCreate({
      anime: animeObj
    }).then(res => {
      console.log("Success");
      props.showBackdrop(false);
    }).catch(error => alert(error));
  }

  if (props.userAnimeList.size > 0) {
    if (props.userAnimeList.has(props.malId)) {
      return (
        <IconButton onClick={e => handleClick(e, props.malId, props.title, props.imageUrl, true)}>
          <FavoriteIcon style={{ color: "red" }} />
        </IconButton>
      )
    }
  }
  return (
    <IconButton onClick={e => handleClick(e, props.malId, props.title, props.imageUrl, fav)}>
      <FavoriteIcon style={{ color: color }} />
    </IconButton>
  )
}