import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Suspense } from 'react';


const ProtectRoute = ({ route, children }) => {

    
    const { role, userInfo } = useSelector(state => state.auth);
    console.log(role, userInfo)

    if(role) {
        console.log('il y a bien un role', role)
        if (userInfo) {
            console.log(('il y a bien un userInfo', userInfo)
            if (userInfo.role === route.role) {
                return <Suspense fallback={null}>{children}</Suspense>
            }
            else {
                console.log(user.role, route.role)
                return <Navigate to='/unauthorized' replace />
            }
        }
        
    } else {
        console.log('final else, pas de role')
        return <Navigate to='/login' replace />
    }
};

export default ProtectRoute;
