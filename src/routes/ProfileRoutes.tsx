import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';

// render - login
const Profile = Loadable(lazy(() => import('../pages/profile')));

// ==============================|| AUTH ROUTING ||============================== //

const ProfileRoutes = {
  path: '/profile',
  element: <MainLayout />,
  children: [
    {
      path: '/profile/:userId',
      element: <Profile />
    }
  ]
};

export default ProfileRoutes;
