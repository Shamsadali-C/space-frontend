import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <aside className="admin-sidebar">

            <div className="admin-logo">
                Book My Space
            </div>

            <div className="admin-role">
                ADMIN PANEL
            </div>

            <nav>

                <Link to="/admin/dashboard">
                    Dashboard
                </Link>

                <Link to="/admin/users">
                    Users
                </Link>

                <Link to="/admin/venues">
                    Venues
                </Link>

                <Link to="/admin/bookings">
                    Bookings
                </Link>

                <Link to="/admin/owner-requests">
                    Owner Requests
                </Link>

            </nav>

            <button
                className="admin-logout"
                onClick={logout}
            >
                Logout
            </button>

        </aside>
    );
};

export default AdminSidebar;