import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await adminService.getDashboard();

            console.log("Dashboard response:", response);

            // adminService already returns response.data
            setData(response);

        } catch (error) {

            console.error("Dashboard error:", error);

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load dashboard."
            );

        } finally {

            setLoading(false);
        }
    };


    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };


    if (loading) {
        return (
            <div className="admin-loading">
                Loading dashboard...
            </div>
        );
    }


    return (

        <div className="admin-dashboard">

            {/* NAVBAR */}

            <header className="admin-navbar">

                <div className="admin-logo">
                    Book My Space - Admin
                </div>

                <button
                    className="admin-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </header>


            {/* CONTENT */}

            <main className="admin-content">

                <h1>
                    Admin Dashboard
                </h1>

                <p className="admin-subtitle">
                    Manage users, venues, bookings and owner requests.
                </p>


                {/* ERROR */}

                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}


                {/* STATISTICS */}

                {data && (

                    <div className="admin-stats">

                        <div className="admin-stat-card">
                            <h3>Total Venues</h3>

                            <strong>
                                {data.totalVenues ?? 0}
                            </strong>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Total Bookings</h3>

                            <strong>
                                {data.totalBookings ?? 0}
                            </strong>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Users</h3>

                            <strong>
                                {data.users ?? 0}
                            </strong>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Owners</h3>

                            <strong>
                                {data.owners ?? 0}
                            </strong>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Booked</h3>

                            <strong>
                                {data.booked ?? 0}
                            </strong>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Pending</h3>

                            <strong>
                                {data.pendingBookings ?? 0}
                            </strong>
                        </div>


                        <div className="admin-stat-card">
                            <h3>Cancelled</h3>

                            <strong>
                                {data.cancelledBookings ?? 0}
                            </strong>
                        </div>

                    </div>
                )}


                {/* MANAGEMENT */}

                <div className="admin-menu">

                    <Link
                        to="/admin/users"
                        className="admin-menu-card"
                    >
                        👥

                        <h2>
                            Users
                        </h2>

                        <p>
                            Manage users and roles.
                        </p>

                    </Link>


                    <Link
                        to="/admin/venues"
                        className="admin-menu-card"
                    >
                        🏢

                        <h2>
                            Venues
                        </h2>

                        <p>
                            View and manage venues.
                        </p>

                    </Link>


                    <Link
                        to="/admin/bookings"
                        className="admin-menu-card"
                    >
                        📅

                        <h2>
                            Bookings
                        </h2>

                        <p>
                            View all bookings.
                        </p>

                    </Link>


                    <Link
                        to="/admin/durations"
                        className="admin-menu-card"
                    >
                        ⏱️

                        <h2>
                            Slot Durations
                        </h2>

                        <p>
                            Manage available booking durations.
                        </p>

                    </Link>


                    <Link
                        to="/admin/owner-requests"
                        className="admin-menu-card"
                    >
                        ⭐

                        <h2>
                            Owner Requests
                        </h2>

                        <p>
                            Approve or reject owner requests.
                        </p>

                    </Link>

                </div>

            </main>

        </div>
    );
};

export default AdminDashboard;