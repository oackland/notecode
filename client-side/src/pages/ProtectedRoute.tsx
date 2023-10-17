import React from 'react';
import {useUser} from "../context/userContext";
import {Navigate} from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({element}) => {
    const {isLoggedIn} = useUser();

    if (!isLoggedIn) {
        return <Navigate to="/login"/>;
    }
    return element;
}

export default ProtectedRoute;
