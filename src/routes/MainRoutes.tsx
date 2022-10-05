import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
const Statistics = Loadable(lazy(() => import('../pages/statistics')));
const NotFound = Loadable(lazy(() => import('../pages/404')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/dashboard" />
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      default: true
    },
    {
      path: '/statistics',
      element: <Statistics />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
};

export default MainRoutes;
