import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';

// render - login
const OrderList = Loadable(lazy(() => import('../pages/order/list')));
const Order = Loadable(lazy(() => import('../pages/order/edit')));

// ==============================|| AUTH ROUTING ||============================== //

const OrdersRoutes = {
  path: '/orders',
  element: <MainLayout />,
  children: [
    {
      path: '/orders',
      element: <OrderList />
    },
    {
      path: '/orders/:orderId',
      element: <Order />
    }
  ]
};

export default OrdersRoutes;
