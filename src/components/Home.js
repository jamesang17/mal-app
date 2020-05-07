import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';
import Dashboard from './Dashboard';


const Home = (props) =>  {
  const {currentUser} = useContext(AuthContext);

  return (
    <div>
      <Appbar theme={props.theme} currentUser={currentUser} />
      <Dashboard />     
    </div>
  )
}

export default Home;