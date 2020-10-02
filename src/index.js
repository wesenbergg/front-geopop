import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { SearchContextManager } from '@giphy/react-components';

ReactDOM.render(
  <React.StrictMode>
    <SearchContextManager apiKey={process.env.REACT_APP_GIPHY_API}>
      <App />
    </SearchContextManager>
  </React.StrictMode>,
  document.getElementById('root')
);
