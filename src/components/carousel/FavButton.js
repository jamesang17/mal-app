import React, { useState, useEffect, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Anime, getAnimeRecommendations } from '../../api/Jikan';
import firebase from '../../firebase';
import CustomBackdrop from '../CustomBackdrop';
import { DataContext } from '../screens/DataProvider';

export default function FavButton(props) {
  const { userAnimeIdsSet } = useContext(DataContext);
  const [fav, setFav] = useState(false);
  const [color, setColor] = useState("grey");
  const [backdrop, setBackdrop] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userAnimeIdsSet.size > 0) {
      if (userAnimeIdsSet.has(props.malId)) {
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
      setMessage("Removed anime!");
      setOpenSnack(true);
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
      setMessage("Saved Anime!");
      setOpenSnack(true);
    }).catch(error => {
      setMessage(error.message);
      setOpenSnack(true);
    });
    setBackdrop(false);
  }

  return (
    <React.Fragment>
      <CustomBackdrop shouldOpen={backdrop} />
      <IconButton onClick={e => handleClick(e, props.malId, props.title, props.imageUrl, fav)}>
        <FavoriteIcon style={{ color: color }} />
      </IconButton>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={e => setOpenSnack(false)} message={message} />
    </React.Fragment>
  )
}