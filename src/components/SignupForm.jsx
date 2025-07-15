import React, { useState } from "react";
import { signupUser, loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        try {
            const signupData = await signupUser(formData);
            console.log("✅ Created User:", signupData);

            const loginData = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("token", loginData.token);
            localStorage.setItem("email", formData.email);

            setMessage({ type: "success", text: "✅ Signup and login successful!" });
            setFormData({ name: "", email: "", password: "" });

            navigate("/dashboard");
        } catch (err) {
            setMessage({ type: "error", text: `❌ ${err.message}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
                <label>Name</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
            </div>

            <div className="input-group">
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
            </div>

            <div className="input-group">
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
            </div>

            <button type="submit" className="btn" disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
            </button>

            {message && (
                <p
                    style={{
                        color: message.type === "error" ? "red" : "green",
                        marginTop: "10px",
                    }}
                >
                    {message.text}
                </p>
            )}
        </form>
    );
};

export default SignupForm;
