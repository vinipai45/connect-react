import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import state from './redux/store';
import { Provider } from 'react-redux';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  spacing: 10,
  palette: {
    mode: "light"
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
        <App />
      </ThemeProvider>
    </Provider>
  </>
  ,
  document.getElementById('root')
);
