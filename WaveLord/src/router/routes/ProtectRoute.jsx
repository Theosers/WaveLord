import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Suspense } from 'react';


const ProtectRoute = ({ route, children }) => {

    
    const { role, user } = useSelector(state => state.auth);
    console.log(role, user)
    console.log('user et infos : ',user, user.role)

    if(role) {
        if (user) {
            console.log(user.role, route.role)
            if (user.role === route.role) {
                return <Suspense fallback={null}>{children}</Suspense>
            }
            else {
                console.log(user.role, route.role)
                return <Navigate to='/unauthorized' replace />
            }
        }
        
    } else {
        console.log(user.role, route.role)
        return <Navigate to='/login' replace />
    }
};

export default ProtectRoute;