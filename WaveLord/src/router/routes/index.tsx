import { privateRoutes } from "./privateRoutes";
import MainLayout from "../../layouts/MainLayout";
import ProtectRoute from "./ProtectRoute";
import { RouteObject } from 'react-router-dom';

export const getRoutes = (): RouteObject => {
  const protectedRoutes = privateRoutes.map(r => ({
    ...r,
    element: <ProtectRoute route={r}>{r.element}</ProtectRoute>
  }));

  return {
    path: '/',
    element: <MainLayout />,
    children: protectedRoutes
  };
};
