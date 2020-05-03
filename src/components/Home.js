import React, { useContext } from 'react';
import Appbar from './Appbar';
import { AuthContext } from './auth/Auth';
import MangaCard from './MangaCard';

const Home = () =>  {
  const {currentUser} = useContext(AuthContext);

  return (
    <div>
      <Appbar currentUser={currentUser} />
      <MangaCard />
    </div>
  )
}

export default Home;