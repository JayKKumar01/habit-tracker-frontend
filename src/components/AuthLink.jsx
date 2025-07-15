import React from "react";
import { Link } from "react-router-dom";
import "../styles/AuthLink.css";

const AuthLink = ({ type }) => {
    return (
        <p className="auth-link">
            {type === "login" ? (
                <>
                    Already have an account? <Link to="/login">Log in</Link>
                </>
            ) : (
                <>
                    Don't have an account? <Link to="/">Sign up</Link>
                </>
            )}
        </p>
    );
};

export default AuthLink;
