import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/Auth';
import { topAnime, getAnimeInGenre, GenreIds } from '../../api/Jikan';
import { getSavedAnimeIds, getSavedAnimes } from '../../api/firestore';

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
        tempAnimeResMap.set("ACTION", res);
      });
      // await getAnimeInGenre(GenreIds.COMEDY).then(res => {
      //     tempAnimeResMap.set("COMEDY", res);
      // });
      // await getAnimeInGenre(GenreIds.ROMANCE).then(res => {
      //     tempAnimeResMap.set("ROMANCE", res);
      //  });
      // await getAnimeInGenre(GenreIds.MECHA).then(res => {
      //     tempAnimeResMap.set("MECHA", res);
      // });
      // await getAnimeInGenre(GenreIds.SPORTS).then(res => {
      //     tempAnimeResMap.set("SPORTS", res);
      // });
      setAnimeResMap(tempAnimeResMap);
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

    fetchUserAnimes(currentUser);
    fetchAnimes();
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