import React from 'react';
import {useUser} from "./userContext";

const SignOutButton: React.FC = () => {
    const {logout} = useUser();

    const handleSignOut = () => {
        logout();
    };

    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    );
};

export default SignOutButton;
