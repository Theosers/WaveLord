import React from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';

interface RouterProps {
  allRoutes: RouteObject[];
}

const Router: React.FC<RouterProps> = ({ allRoutes }) => {
  console.log('Router');
  const routes = useRoutes([...allRoutes]);
  return routes;
};

export default Router;
