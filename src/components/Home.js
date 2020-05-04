import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';
import CardCarousel from './CardCarousel';
import {topAnime} from '../api/functions/top';


const Home = (props) =>  {
  const {currentUser} = useContext(AuthContext);
  
  let results = topAnime(1);
  console.log(typeof results);

  return (
    <div>
      <Appbar theme={props.theme} currentUser={currentUser} />
      <CardCarousel />     
    </div>
  )
}

export default Home;