import { RouteObject } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import ProtectRoute from './ProtectRoute';
import { privateRoutes } from './privateRoutes';

export type CustomRouteObject = RouteObject & {
  role?: string;
  status?: string;
  ability?: string | string[];
  visibility?: string[];
};


export const getRoutes = (): CustomRouteObject => {
  const protectedRoutes: CustomRouteObject[] = privateRoutes.map((r) => ({
    ...r,
    element: <ProtectRoute route={r}>{r.element}</ProtectRoute>,
  }));

  return {
    path: '/',
    element: <MainLayout />,
    children: protectedRoutes,
  } as CustomRouteObject;  
};
