import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
<<<<<<< HEAD
import thunk from 'redux-thunk';
=======
>>>>>>> change routes to app.js file
import ReactDOM from 'react-dom';
import Thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import App from './App';

<<<<<<< HEAD
const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));
=======
const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(Thunk))
);
>>>>>>> change routes to app.js file

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);