import { useRoutes } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import NotFoundRoutes from './NotFoundRoutes';
import OrganizationRoutes from './OrganizationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  return useRoutes([MainRoutes, AuthRoutes, OrganizationRoutes, NotFoundRoutes]);
}
