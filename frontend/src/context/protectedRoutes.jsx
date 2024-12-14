import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext";

const RoleBasedRoute = ({ allowedRoles, children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) return <div>Loading...</div>;

    if (!user) {
        console.log("Hello")
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

    return children;
};

export default RoleBasedRoute;
