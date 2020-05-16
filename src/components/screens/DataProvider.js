import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/Auth';
import { topAnime, getAnimeInGenre, GenreIds } from '../../api/Jikan';
import { getSavedAnimeIds, getSavedAnimes } from '../../api/firestore';

const moment = require('moment-timezone');

export const DataContext = React.createContext();

export const DataProvider = ({children}) => {
  const { currentUser } = useContext(AuthContext)
  const [animeResMap, setAnimeResMap] = useState(new Map());
  const [userAnimeIdsSet, setUserAnimeIdsSet] = useState(new Set());
  const [userAnimes, setUserAnimes] = useState([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      const tempAnimeResMap = new Map();
      await topAnime().then(res => {
        tempAnimeResMap.set("TOP AIRING", res);
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

  return (
    <DataContext.Provider
      value={{
        animeResMap,
        userAnimeIdsSet,
        userAnimes
      }}
    >
      {children}
    </DataContext.Provider>
  )
}