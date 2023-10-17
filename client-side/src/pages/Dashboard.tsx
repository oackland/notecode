import {UserProvider, useUser} from "../context/userContext.tsx";
import React from "react";

const Dashboard: React.FC = () => {
    const {username} = useUser();

    return (
        <div>
            {username ? <p>Welcome, {username}!</p> : <p>Please log in</p>}
        </div>
    );
}

const MyDashboard: React.FC = () => {

    return (
        <UserProvider>
            <Dashboard/>
        </UserProvider>
    );
}

export default MyDashboard;
