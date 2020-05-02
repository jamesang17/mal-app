import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';

const Home = () =>  {
  const {currentUser} = useContext(AuthContext);

  return (
    <div>
      <Appbar currentUser={currentUser} />
    </div>
  )
}

export default Home;