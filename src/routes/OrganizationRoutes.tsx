import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';
// render - login
const PreSignup = Loadable(lazy(() => import('../pages/organization/presignup')));

// ==============================|| AUTH ROUTING ||============================== //

const OrganizationRoutes = {
  path: '/organization',
  element: <MainLayout />,
  children: [
    {
      path: '/organization/presignup',
      element: <PreSignup />
    }
  ]
};

export default OrganizationRoutes;
