import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/Auth';
import { topAnime, getAnimeInGenre, GenreIds, getAnimeRecommendations } from '../../api/Jikan';
import { getSavedAnimeIds, getSavedAnimes } from '../../api/firestore';
import firebase from '../../firebase';
import CustomBackdrop from '../CustomBackdrop';
import Snackbar from '@material-ui/core/Snackbar';

const moment = require('moment-timezone');

export const DataContext = React.createContext();

export const DataProvider = ({children}) => {
  const { currentUser } = useContext(AuthContext)
  const [animeResMap, setAnimeResMap] = useState(new Map());
  const [userAnimeIdsSet, setUserAnimeIdsSet] = useState(new Set());
  const [userAnimes, setUserAnimes] = useState([]);
  const [backdrop, setBackdrop] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    const fetchAnimes = async () => {
      const tempAnimeResMap = new Map();
      await topAnime().then(res => {
        tempAnimeResMap.set("TOP AIRING", res.slice(0, 15));
      });
      await getAnimeInGenre(GenreIds.ACTION).then(res => {
        tempAnimeResMap.set("ACTION", res.slice(0, 15));
      });
      await getAnimeInGenre(GenreIds.COMEDY).then(res => {
        tempAnimeResMap.set("COMEDY", res.slice(0, 15));
      });
      await getAnimeInGenre(GenreIds.ROMANCE).then(res => {
        tempAnimeResMap.set("ROMANCE", res.slice(0, 15));
      });
      setAnimeResMap(tempAnimeResMap);
      localStorage.setItem("day", JSON.stringify(moment().dayOfYear()));
      localStorage.setItem("animes", JSON.stringify(Array.from(tempAnimeResMap.entries())));
    }

    const fetchUserAnimes = async (user) => {
      if (user == null) {
        setUserAnimeIdsSet(new Set());
        setUserAnimes([]);
      } else {
        await getSavedAnimeIds(user.uid).then(res => {
          setUserAnimeIdsSet(new Set(res));
        });
        await getSavedAnimes(user.uid).then(res => {
          setUserAnimes(res);
        });
      }
    }

    const hydrateFromLocalStorage = () => {
      let animes = localStorage.getItem("animes");
      try {
        animes = new Map(JSON.parse(animes));
        setAnimeResMap(animes);
      } catch(e) {
        console.info(e);
      }
    }

    if (localStorage.hasOwnProperty("animes") && localStorage.hasOwnProperty("day")) {
      let day = JSON.parse(localStorage.getItem("day"));
      if (day === moment().dayOfYear()) {
        console.log("using cached data!");
        hydrateFromLocalStorage();
      } else {
        fetchAnimes();
      }
    } else {
      console.log("getting new data!");
      fetchAnimes();
    }
    fetchUserAnimes(currentUser);
  }, [currentUser]);

  /**
   * Favorite button on click event handlers
   * 
   */
  const removeFavorite = async (animeObj) => {
    setBackdrop(true);
    const animeOnDelete = firebase.functions().httpsCallable('dbUsersAnimesOnDelete');
    return await animeOnDelete({ anime: animeObj })
      .then(() => { 
        userAnimeIdsSet.delete(animeObj.mal_id)
        setUserAnimeIdsSet(userAnimeIdsSet);
        setBackdrop(false);
        setSnackMessage("Removed anime!");
        setOpenSnack(true);
        return "success"; })
      .catch(error => { 
        setBackdrop(false);
        alert(error.message);
        return error.message });
  }

  const addFavorite = async (animeObj) => {
    setBackdrop(true);
    const animeOnCreate = firebase.functions().httpsCallable('dbUsersAnimesOnCreate');
    let recs = await getAnimeRecommendations(animeObj.mal_id).then(res => {
      return res.splice(0, 5); // get top 5 recs
    }).catch(error => console.log(error));
    animeObj.setRecommendations(recs);
    return await animeOnCreate({ anime: animeObj })
      .then(() => { 
        userAnimeIdsSet.add(animeObj.mal_id)
        setUserAnimeIdsSet(userAnimeIdsSet);
        setBackdrop(false);
        setSnackMessage("Saved Anime!");
        setOpenSnack(true);
        return "success"; })
      .catch(error => { 
        setBackdrop(false);
        setSnackMessage(error.message);
        setOpenSnack(true); 
        return error.message });
  }

  return (
    <DataContext.Provider
      value={{
        animeResMap,
        userAnimeIdsSet,
        userAnimes,
        removeFavorite,
        addFavorite,
        setSnackMessage,
        setOpenSnack
      }}
    >
      {children}
      <CustomBackdrop shouldOpen={backdrop} />
      <Snackbar anchorOrigin={{vertical: "top", horizontal: "right"}} open={openSnack} autoHideDuration={3000} style={{ zIndex: 999 }}
        onClose={e => setOpenSnack(false)} message={snackMessage} />
    </DataContext.Provider>
  )
}