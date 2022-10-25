import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layouts/MainLayout';
import MinimalLayout from '../layouts/MinimalLayout';
// render - login
const SignUp = Loadable(lazy(() => import('../pages/auth/signup')));
const SignIn = Loadable(lazy(() => import('../pages/auth/signin')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/reset-password')));

// ==============================|| AUTH ROUTING ||============================== //

const AuthRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/signin',
      element: <SignIn />
    },
    {
      path: '/resetpassword',
      element: <ResetPassword />
    }
  ]
};

export default AuthRoutes;
