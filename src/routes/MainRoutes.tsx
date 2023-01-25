import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
const ShoppingCart = Loadable(lazy(() => import('../pages/shopping-cart')));
const Checkout = Loadable(lazy(() => import('../pages/checkout')));
const Orders = Loadable(lazy(() => import('../pages/order/list')));
const About = Loadable(lazy(() => import('../pages/footer/about')));
const BilgiToplumuHizmetleri = Loadable(
  lazy(() => import('../pages/footer/bilgi-toplumu-hizmetleri'))
);
const Contact = Loadable(lazy(() => import('../pages/footer/contact')));

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
    },
    {
      path: '/orders',
      element: <Orders />
    },
    {
      path: '/bilgi-toplumu-hizmetleri',
      element: <BilgiToplumuHizmetleri />
    },
    {
      path: '/contact',
      element: <Contact />
    }
  ]
};

export default MainRoutes;
