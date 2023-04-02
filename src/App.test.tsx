import 'reflect-metadata';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import state from './store/index';

test.skip('renders learn react link', async () => {
  const result = render(
    <Provider store={state}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const app = result.container.getElementsByClassName('App');
  expect(app[0]).not.toBeNull();
});
