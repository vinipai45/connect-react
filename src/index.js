import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import state from './redux/store';
import { Provider } from 'react-redux';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  spacing: 10,
  palette: {
    mode: "light",
    primary: {
      main: '#4ECDC4'
    },
    secondary: {
      main: '#FC5C65'
    },
    dark: {
      main: '#252837'
    }
  },
  typography: {
    fontFamily: "Work Sans",
    button: {
      fontFamily: "Work Sans",
      textTransform: "lowercase"
    }
  }
});

ReactDOM.render(
  <>
    <Provider store={state}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </>
  ,
  document.getElementById('root')
);
