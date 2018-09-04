import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Routes from './routes';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware());

it('renders the routes without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
