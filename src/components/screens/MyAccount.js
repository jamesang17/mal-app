import React, { useEffect, useState } from 'react';
import { getSavedAnimes } from '../../api/firestore';
import { Grid, Typography } from '@material-ui/core';
import AnimeCard from '../carousel/AnimeCard';
import CustomBackdrop from '../CustomBackdrop';

const MyAccount = (props) => {
  const user = props.currentUser;
  const [userAnimes, setUserAnimes] = useState(null);

  useEffect(() => {
    const fetchUserAnimes = async (user) => {
      if (user == null) {
        setUserAnimes([]);
      } else {
        await getSavedAnimes(user.uid).then(res => {
          setUserAnimes(res);
        });
      }
    }
    fetchUserAnimes(user);
  }, [user, userAnimes]);

  const createGrid = (animes) => {
    let gridContainer = [];
    // display 3 cards per row
    animes.forEach((value) => {
      let s = new Set();
      s.add(value["mal_id"]);
      gridContainer.push(
        <Grid item xs={4}>
          <AnimeCard item={value} userAnimeList={s} />
        </Grid>
      );
    });
    return gridContainer;
  }

  if (userAnimes == null) {
    return <CustomBackdrop shouldOpen={true}/>
  }
  return (
    <Grid container>
      <Grid item xs={12} sm={3}>
        <Typography variant="h5" style={{ color: "white" }}>USER INFO</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Typography variant="h5" style={{ color:"white" }}>Saved Animes</Typography>
        <Grid container>
          {createGrid(userAnimes)}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MyAccount;