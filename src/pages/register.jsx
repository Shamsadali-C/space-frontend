import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/Login.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "username") {
            setError("");
        }

        if (e.target.name === "password") {
            setPasswordError("");
        }
        if (e.target.value.length > 0 && e.target.value.length < 8) {
                setPasswordError("Password must be at least 8 characters");
            }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setPasswordError("");

        if (formData.password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {

            const response = await register(formData);

            console.log("Register response:", response);

            alert("Registration successful!");

            navigate("/login");

        } catch (error) {

            console.log("Registration error:", error);

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.response.data||
                "Registration failed";

            setError(message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h1>Create Account</h1>

                <p>Register for Book My Space</p>

                <form onSubmit={handleSubmit}>
                    <label>Username</label>

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <div className="field-error">
                            ⚠ {error}
                        </div>
                    )}

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {passwordError && (
                        <div className="field-error">
                            ⚠ {passwordError}
                        </div>
                    )}



                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Register"}
                    </button>

                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;