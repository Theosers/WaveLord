import { adminRoutes } from "./adminRoutes";
import { sellerRoutes } from "./sellerRoutes";
import { CustomRouteObject } from './index';

export const privateRoutes: CustomRouteObject[] = [
  ...adminRoutes,
  ...sellerRoutes
];
