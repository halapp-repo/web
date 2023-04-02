import { useRoutes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import AuthRoutes from './AuthRoutes';
import LocationsRoutes from './LocationRoutes';
// project import
import MainRoutes from './MainRoutes';
import NotFoundRoutes from './NotFoundRoutes';
import OrdersRoutes from './OrdersRouter';
import OrganizationRoutes from './OrganizationRoutes';
import ProfileRoutes from './ProfileRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  return useRoutes([
    MainRoutes,
    AuthRoutes,
    OrganizationRoutes,
    LocationsRoutes,
    OrdersRoutes,
    NotFoundRoutes,
    AdminRoutes,
    ProfileRoutes
  ]);
}
