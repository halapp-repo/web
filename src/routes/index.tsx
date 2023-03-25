import { useRoutes } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import NotFoundRoutes from './NotFoundRoutes';
import OrganizationRoutes from './OrganizationRoutes';
import LocationsRoutes from './LocationRoutes';
import OrdersRoutes from './OrdersRouter';
import AdminRoutes from './AdminRoutes';
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
