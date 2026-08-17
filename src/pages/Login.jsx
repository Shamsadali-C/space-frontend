import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { getRoleFromToken } from "../utils/authUtils";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            // Login
            const response = await login(username, password);

            console.log("Login response:", response);

            // Backend returns JWT as String
            const token = response;

            if (!token) {
                throw new Error("Token not received");
            }

            // Save JWT
            localStorage.setItem("token", token);

            // Get role from JWT
            const role = getRoleFromToken(token);

            console.log("User role:", role);

            // Navigate based on role
            if (role === "ADMIN") {

                navigate("/admin/dashboard");

            } else if (role === "OWNER") {

                navigate("/owner");

            } else if (role === "USER") {

                navigate("/user");

            } else {

                setError("Unknown user role");

                localStorage.removeItem("token");
            }

        } catch (error) {

            console.error("Login error:", error);

            if (error.response) {

                setError(
                    error.response.data ||
                    "Invalid username or password"
                );

            } else {

                setError(
                    "Cannot connect to server"
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="auth-container">

            <div className="auth-box">

                <h1>Login</h1>

                <p>
                    Login to Book My Space
                </p>


                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>


                <p>
                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;