import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';
import MangaCard from './MangaCard';
import { Grid } from '@material-ui/core';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const Home = (props) =>  {
  const {currentUser} = useContext(AuthContext);
  

  return (
    <div>

      <Appbar theme={props.theme} currentUser={currentUser} />
      
      <Grid container>
        <MangaCard />
      </Grid>
      

    </div>
  )
}

export default Home;