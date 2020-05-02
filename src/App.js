import React from 'react';
import './App.css';
import { AuthProvider } from './components/auth/Auth';
import Home from './components/Home';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themes/Theme';

const App = () => {
  
  return (
    <div>
      <ThemeProvider theme={theme} >
        <AuthProvider>
          <Home theme={theme} />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;