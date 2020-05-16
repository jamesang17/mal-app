import React, { useEffect, useState } from 'react';
import { getSavedAnimes } from '../../api/firestore';
import { Grid, Typography, Avatar } from '@material-ui/core';
import AnimeCard from '../carousel/AnimeCard';
import CustomBackdrop from '../CustomBackdrop';
import AvatarImage from '../../assets/default-avatar.png';
import AnimeDialog from '../carousel/AnimeDialog';

const MyAccount = (props) => {
  const user = props.currentUser;
  const [userAnimes, setUserAnimes] = useState(null);
  const [malIdFocus, setIdFocus] = useState(null);

  useEffect(() => {
    const fetchUserAnimes = async (user) => {
      if (user !== null) {
        await getSavedAnimes(user.uid).then(res => {
          setUserAnimes(res);
        });
      } else {
        setUserAnimes([]);
      }
    }
    fetchUserAnimes(user);
  }, [user, userAnimes]);

  const createGrid = (animes) => {
    let gridContainer = [];
    // display 3 cards per row
    animes.forEach((value) => {
      gridContainer.push(
        <Grid item xs={12} sm={4} >
          <AnimeCard item={value} getMalId={e => setIdFocus(value.mal_id)}/>
        </Grid>
      );
    });
    return gridContainer;
  }

  const noAnimesNotice = () => {
    return (
      <Typography variant="body1" style={{ color: "#62d9d5", padding: "1.5%" }}>You have no saved animes. Go and save some!</Typography> 
    )
  }

  const userInfoItem = (label, text) => {
    return (
      <Typography variant="body1" style={{ color: "white", padding: "1.5%" }}><span style={{ color: "#62d9d5" }}>{label}</span> {text}</Typography> 
    )
  }

  if (userAnimes == null) {
    return <CustomBackdrop shouldOpen={true}/>
  }
  return (
    <Grid container >
      <AnimeDialog
        closeFunction={e => setIdFocus(null) }
        openState={Boolean(malIdFocus)}
        malId={malIdFocus}
        userAnimeList={userAnimes}
      />
      <Grid item xs={12} sm={3} style={{padding: "1.5%"}} >
        <Typography variant="h5" style={{ color: "white" }} >Acount Information</Typography>
        <Avatar src={AvatarImage} style={{height: "10vh", width: "10vh", margin: "5%"}}/>
        {userInfoItem("Email:", user.email)}
        {userInfoItem("Member Since:", user.metadata.creationTime)}
      </Grid>
      <Grid item xs={12} sm={9} style={{paddingTop: "1.5%"}}>
        <Typography variant="h5" style={{ color:"white" }}>Saved Animes</Typography>
        <Grid container justify="center" space={0}>
          {userAnimes.length === 0 ? noAnimesNotice() : createGrid(userAnimes)}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MyAccount;