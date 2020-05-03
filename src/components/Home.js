import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';
import MangaCard from './MangaCard';
import { Grid } from '@material-ui/core';


const Home = (props) =>  {
  const {currentUser} = useContext(AuthContext);
  

  return (
    <div>

      <Appbar theme={props.theme} currentUser={currentUser} />
      <MangaCard />     
    </div>
  )
}

export default Home;