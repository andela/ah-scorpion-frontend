import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import Thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import App from './App';

const store = createStore(reducers, {}, applyMiddleware(Thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
