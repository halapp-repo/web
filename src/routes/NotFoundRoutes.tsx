import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layouts/MinimalLayout';
// render - login
const NotFound = Loadable(lazy(() => import('../pages/404')));

// ==============================|| AUTH ROUTING ||============================== //

const NotFoundRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '*',
      element: <NotFound />
    }
  ]
};

export default NotFoundRoutes;
