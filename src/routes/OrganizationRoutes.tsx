import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';
// render - login
const Enrollment = Loadable(lazy(() => import('../pages/organization/enrollment')));

// ==============================|| AUTH ROUTING ||============================== //

const OrganizationRoutes = {
  path: '/organization',
  element: <MainLayout />,
  children: [
    {
      path: '/organization/enrollment',
      element: <Enrollment />
    }
  ]
};

export default OrganizationRoutes;
