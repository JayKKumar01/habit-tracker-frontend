import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");

            if (!token || !email) {
                setAuthorized(false);
                return;
            }

            try {
                const res = await fetch(`http://localhost:8080/api/users?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const user = await res.json();
                    setAuthorized(user);
                } else {
                    setAuthorized(false);
                }
            } catch {
                setAuthorized(false);
            }
        };

        verifyToken();
    }, []);

    if (authorized === null) return <p>Loading...</p>;
    if (authorized === false) return <Navigate to="/login" />;

    return children(authorized); // pass the user object to Dashboard
};

export default ProtectedRoute;
