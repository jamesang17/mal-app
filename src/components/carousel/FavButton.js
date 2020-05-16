import React, { useState, useEffect, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Anime } from '../../api/Jikan';

import { DataContext } from '../screens/DataProvider';

export default function FavButton(props) {
  const { userAnimeIdsSet, addFavorite, 
    removeFavorite } = useContext(DataContext);
  const [fav, setFav] = useState(false);
  const [color, setColor] = useState("grey");

  useEffect(() => {
    if (userAnimeIdsSet.size > 0) {
      if (userAnimeIdsSet.has(props.malId)) {
        setFav(true);
        setColor("red");
      }
    }
  }, [userAnimeIdsSet]);

  const handleClick = async (event, malId, title, imageUrl, fav) => {
    let animeObj = new Anime(malId, imageUrl, title);
    if (fav) {
      await removeFavorite(animeObj).then(res => {
        console.log(res);
        if (res === "success") {
          setFav(false);
          setColor("grey");
        }
      });
    } else {
      await addFavorite(animeObj).then(res => {
        console.log(res);
        if (res === "success") {
          setFav(true);
          setColor("red");
        }
      });
    }
  }

  return (
    <React.Fragment>
      <IconButton onClick={e => handleClick(e, props.malId, props.title, props.imageUrl, fav)}>
        <FavoriteIcon style={{ color: color }} />
      </IconButton>

    </React.Fragment>
  )
}