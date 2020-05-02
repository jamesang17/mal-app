import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';

const Home = (props) =>  {
  const {currentUser} = useContext(AuthContext);

  return (
    <div>
      <Appbar theme={props.theme} currentUser={currentUser} />
    </div>
  )
}

export default Home;