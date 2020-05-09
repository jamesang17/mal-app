import React, { useState, useEffect } from 'react';
import {IconButton, Dialog, CircularProgress} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Anime, getAnimeRecommendations } from '../../api/Jikan';
import firebase from '../../firebase';

export default function FavButton(props) {

  const [fav, setFav] = useState(false);
  const [color, setColor] = useState("grey");
  const [backdrop, setBackdrop] = useState(false);

  useEffect(() => {
    if (props.userAnimeList.size > 0) {
      if (props.userAnimeList.has(props.malId)) {
        setFav(true);
        setColor("red");
      }
    }
  },[]);
  
  const handleClick = (event, malId, title, imageUrl, fav) => {
    setBackdrop(true);
    let animeObj = new Anime(malId, imageUrl, title);
    if (fav) {
      handleRemove(animeObj);
    } else {
      handleAdd(animeObj);
    }
  }

  const handleRemove = async (animeObj) => {
    const animeOnDelete = firebase.functions().httpsCallable('dbUsersAnimesOnDelete');
    await animeOnDelete({
      anime: animeObj
    }).then(res => {
      setFav(false);
      setColor("grey");
    }).catch(error => alert(error));
    setBackdrop(false);
  }

  const handleAdd = async (animeObj) => {
    const animeOnCreate = firebase.functions().httpsCallable('dbUsersAnimesOnCreate');
    let recs = await getAnimeRecommendations(animeObj.mal_id).then(res => {
      return res.splice(0, 5); // get top 5 recs
    }).catch(error => console.log(error));
    animeObj.setRecommendations(recs);
    await animeOnCreate({
      anime: animeObj
    }).then(res => {
      setFav(true);
      setColor("red");
    }).catch(error => alert(error));
    setBackdrop(false);
  }

  return (
    <React.Fragment>
      <Dialog open={backdrop} style={{ zIndex: 999, color: "#fff" }} 
        PaperProps={{ style: {background: "transparent", boxShadow: "none"}}} >
        <CircularProgress style={{color: "white"}} />
      </Dialog>
      <IconButton onClick={e => handleClick(e, props.malId, props.title, props.imageUrl, fav)}>
        <FavoriteIcon style={{ color: color }} />
      </IconButton>
    </React.Fragment>
  )
}