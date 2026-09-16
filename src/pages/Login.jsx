import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { getRoleFromToken } from "../utils/authUtils";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setUsernameError("");
        setPasswordError("");
        setGeneralError("");

        setLoading(true);

        try {

            const response = await login(username, password);

            console.log("Login response:", response);

            const token = response;

            if (!token) {
                throw new Error("Token not received");
            }

            localStorage.setItem("token", token);

            const role = getRoleFromToken(token);

            console.log("User role:", role);

            if (role === "ADMIN") {

                navigate("/admin/dashboard");

            } else if (role === "OWNER") {

                navigate("/owner");

            } else if (role === "USER") {

                navigate("/user");

            } else {

                setGeneralError("Unknown user role");

                localStorage.removeItem("token");
            }

        } catch (error) {

            console.error("Login error:", error);

            if (error.response) {

                const message =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    error.response.data ||
                    "Login failed";

                if (
                    message.toLowerCase().includes("username")
                ) {

                    setUsernameError(message);

                } else if (
                    message.toLowerCase().includes("password")
                ) {

                    setPasswordError(message);

                } else {

                    setGeneralError(message);
                }

            } else {

                setGeneralError("Cannot connect to server");
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

                {generalError && (
                    <div className="general-error">
                        ⚠ {generalError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* USERNAME */}

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setUsernameError("");
                        }}
                        required
                    />

                    {usernameError && (
                        <div className="field-error">
                            ⚠ {usernameError}
                        </div>
                    )}


                    {/* PASSWORD */}

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                        }}
                        required
                    />

                    {passwordError && (
                        <div className="field-error">
                            ⚠ {passwordError}
                        </div>
                    )}


                    {/* LOGIN BUTTON */}

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