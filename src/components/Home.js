import React, { useContext, useState } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';
import Dashboard from './screens/Dashboard';
import MyAccount from './screens/MyAccount';
import { DataProvider } from './screens/DataProvider';


const Home = (props) =>  {
  const {currentUser} = useContext(AuthContext);
  const [screen, setScreen] = useState("");

  const renderScreen = (screen) => {
    if (screen === "myaccount") {
      return <MyAccount currentUser={currentUser} /> 
    }
  }

  return (
    <div style={{ background: "#586473", minHeight: "100vh"}}>
      <DataProvider>
        <Appbar theme={props.theme} currentUser={currentUser} setScreen={setScreen} />
        {screen === "" ? <Dashboard /> : renderScreen(screen)}
      </DataProvider>
    </div>
  )
}

export default Home;