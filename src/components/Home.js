import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';
import AnimeRow from './AnimeRow';


const Home = (props) =>  {
  const {currentUser} = useContext(AuthContext);

  return (
    <div>
      <Appbar theme={props.theme} currentUser={currentUser} />
      <AnimeRow />     
    </div>
  )
}

export default Home;