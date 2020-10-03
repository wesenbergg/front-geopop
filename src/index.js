import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { SearchContextManager } from '@giphy/react-components';
import { StateProvider } from './state/state';
import { reducer } from './state/reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer}>
      <SearchContextManager apiKey={process.env.REACT_APP_GIPHY_API}>
        <App />
      </SearchContextManager>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
