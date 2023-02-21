import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';

// render - login
const AdminOrderList = Loadable(lazy(() => import('../pages/order/admin')));
const AdminOrganizationList = Loadable(lazy(() => import('../pages/organization/admin')));

// ==============================|| AUTH ROUTING ||============================== //

const AdminRoutes = {
  path: '/admin',
  element: <MainLayout />,
  children: [
    {
      path: '/admin/orders',
      element: <AdminOrderList />
    },
    {
      path: '/admin/organizations',
      element: <AdminOrganizationList />
    }
  ]
};

export default AdminRoutes;
