import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';
// render - login
const Enrollment = Loadable(lazy(() => import('../pages/organization/enrollment')));
const OrganizationList = Loadable(lazy(() => import('../pages/organization/list')));

// ==============================|| AUTH ROUTING ||============================== //

const OrganizationRoutes = {
  path: '/organization',
  element: <MainLayout />,
  children: [
    {
      path: '/organization/enrollment',
      element: <Enrollment />
    },
    {
      path: '/organization/list',
      element: <OrganizationList />
    }
  ]
};

export default OrganizationRoutes;
