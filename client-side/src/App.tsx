import React from 'react';
import {
    BrowserRouter as Router, Route,
    Routes
} from 'react-router-dom';
import Landing from "./pages/Landing";
import {WeatherProvider} from "./context/WeatherContext";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import {UserProvider} from "./context/userContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyDashboard from "./pages/Dashboard";

function App() {
    return (
        <UserProvider>
            <WeatherProvider>
                <Router>
                    <Routes>
                        <Route path="/home" element={<ProtectedRoute element={<Home/>}/>}/>
                        <Route path="/" element={<Landing/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/myDashboard" element={<MyDashboard/>}/>
                    </Routes>
                </Router>
            </WeatherProvider>
        </UserProvider>
    );
}

export default App;
