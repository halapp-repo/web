import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
const ShoppingCart = Loadable(lazy(() => import('../pages/shopping-cart')));
const Checkout = Loadable(lazy(() => import('../pages/checkout')));

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
      path: '/shopping-cart',
      element: <ShoppingCart />
    },
    {
      path: '/checkout',
      element: <Checkout />
    }
  ]
};

export default MainRoutes;
