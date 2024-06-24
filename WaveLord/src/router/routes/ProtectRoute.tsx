import React, { Suspense, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectRouteProps {
  route: {
    role?: string;
    status?: string;
    ability?: string;
    visibility?: string[];
  };
  children: ReactNode;
}

interface RootState {
  auth: {
    role: string;
    userInfo: {
      role: string;
      status: string;
      [key: string]: any;
    } | null;
  };
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ route, children }) => {
  const { role, userInfo } = useSelector((state: RootState) => state.auth);

  console.log('userInfo', userInfo);

  if (role) {
    if (route.role) {
      if (userInfo) {
        if (userInfo.role === route.role) {
          if (route.status) {
            if (route.status === userInfo.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              if (userInfo.status === 'pending') {
                return <Navigate to='/seller/account-pending' replace />;
              } else {
                return <Navigate to='/seller/account-deactive' replace />;
              }
            }
          } else {
            if (route.visibility) {
              if (route.visibility.some((r) => r === userInfo.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                return <Navigate to='/seller/account-pending' replace />;
              }
            } else {
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
        } else {
          return <Navigate to='/unauthorized' replace />;
        }
      }
    } else {
      if (route.ability === 'seller') {
        return <Suspense fallback={null}>{children}</Suspense>;
      }
    }
  } else {
    return <Navigate to='/login' replace />;
  }

  return null; // Default return statement in case no conditions are met
};

export default ProtectRoute;
