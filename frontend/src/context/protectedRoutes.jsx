import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({allowedRoles, children}) => {
    const token = localStorage.getItem("token");
    if(!token) return <Navigate to="/login" />;

    const user = JSON.parse(atob(token.split(".")[1]));
    return allowedRoles.includes(user.role) && user.exp * 1000 > Date.now() ? children : <Navigate to="/" />;
}

export default RoleBasedRoute;