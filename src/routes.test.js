import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { MemoryRouter } from 'react-router-dom';

it('renders the routes without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Routes/>
    </MemoryRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);

});
