import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layouts/MinimalLayout';
// render - login
const SignUp = Loadable(lazy(() => import('../pages/auth/signup')));
const SignIn = Loadable(lazy(() => import('../pages/auth/signin')));

// ==============================|| AUTH ROUTING ||============================== //

const AuthRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/signin',
      element: <SignIn />
    }
  ]
};

export default AuthRoutes;
