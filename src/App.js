import React from 'react';
import './App.css';
import { AuthProvider } from './components/auth/Auth';
import Home from './components/Home';

const App = () => {
  
  return (
    <div>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </div>
  );
};

export default App;