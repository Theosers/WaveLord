import { lazy } from "react";
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../../views/Home'));
const Login = lazy(() => import('../../views/auth/Login'));
const Register = lazy(() => import('../../views/auth/Register'));
const AdminLogin = lazy(() => import('../../views/auth/AdminLogin'));
const UnAuthorized = lazy(() => import('../../views/UnAuthorized'));
const Success = lazy(() => import('../../views/Success'));

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/unauthorized',
    element: <UnAuthorized />
  },
  {
    path: '/success',
    element: <Success />
  }
];

export default publicRoutes;