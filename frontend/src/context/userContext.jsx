import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(undefined);

const fetchDataFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload || payload.exp * 1000 <= Date.now()) {
        localStorage.removeItem('token');
        return null;
    }
    
    else {
        return payload;
    }
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedUser = fetchDataFromLocalStorage();
        setUser(fetchedUser);
        setLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
