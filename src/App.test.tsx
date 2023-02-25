import 'reflect-metadata';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
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
