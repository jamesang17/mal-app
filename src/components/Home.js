import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';
import Dashboard from './screens/Dashboard';


const Home = (props) =>  {
  const {currentUser} = useContext(AuthContext);

  return (
    <div style={{ background: "#586473"}}>
      <Appbar theme={props.theme} currentUser={currentUser} />
      <Dashboard currentUser={currentUser} />     
    </div>
  )
}

export default Home;