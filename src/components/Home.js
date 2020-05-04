import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';
import CardCarousel from './CardCarousel';


const Home = (props) =>  {
  const {currentUser} = useContext(AuthContext);
  

  return (
    <div>
      <Appbar theme={props.theme} currentUser={currentUser} />
      <CardCarousel />     
    </div>
  )
}

export default Home;