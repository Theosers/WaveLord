import { adminRoutes } from "./adminRoutes";
import { sellerRoutes } from "./sellerRoutes";
import { RouteObject } from 'react-router-dom';

export const privateRoutes: RouteObject[] = [
  ...adminRoutes,
  ...sellerRoutes
];
