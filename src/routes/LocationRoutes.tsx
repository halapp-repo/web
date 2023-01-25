import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';

// render - login
const Locations = Loadable(lazy(() => import('../pages/footer/locations')));
const City = Loadable(lazy(() => import('../pages/footer/locations/City')));
const Office = Loadable(lazy(() => import('../pages/footer/locations/Office')));

// ==============================|| AUTH ROUTING ||============================== //

const OrganizationRoutes = {
  path: '/locations',
  element: <MainLayout />,
  children: [
    {
      path: '/locations',
      element: <Locations />
    },
    {
      path: '/locations/:city',
      element: <City />
    },
    {
      path: '/locations/:city/:office',
      element: <Office />
    }
  ]
};

export default OrganizationRoutes;
