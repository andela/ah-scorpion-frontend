import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configreMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import App from '../../App';

const middleware = [thunk];
const mockStore = configreMockStore(middleware);
const store = mockStore({});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
