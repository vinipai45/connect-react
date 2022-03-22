import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import state from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <>
    <Provider store={state}>
      <App />
    </Provider>
  </>
  ,
  document.getElementById('root')
);
