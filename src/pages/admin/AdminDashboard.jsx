import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await adminService.getDashboard();

            setData(response.data);

        } catch (error) {

            console.error(error);

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


                {/* STATISTICS */}

                {data && (

                    <div className="admin-stats">

{/*                         <div className="admin-stat-card"> */}
{/*                             <h3>Total Users</h3> */}
{/*                             <strong>{data.totalUsers}</strong> */}
{/*                         </div> */}

                        <div className="admin-stat-card">
                            <h3>Total Venues</h3>
                            <strong>{data.totalVenues}</strong>
                        </div>

                        <div className="admin-stat-card">
                            <h3>Total Bookings</h3>
                            <strong>{data.totalBookings}</strong>
                        </div>

                        <div className="admin-stat-card">
                            <h3>Users</h3>
                            <strong>{data.users}</strong>
                        </div>

                        <div className="admin-stat-card">
                            <h3>Owners</h3>
                            <strong>{data.owners}</strong>
                        </div>

{/*                         <div className="admin-stat-card"> */}
{/*                             <h3>Admins</h3> */}
{/*                             <strong>{data.admins}</strong> */}
{/*                         </div> */}

                    </div>
                )}


                {/* MANAGEMENT */}

                <div className="admin-menu">

                    <Link
                        to="/admin/users"
                        className="admin-menu-card"
                    >
                        👥
                        <h2>Users</h2>
                        <p>Manage users and roles.</p>
                    </Link>


                    <Link
                        to="/admin/venues"
                        className="admin-menu-card"
                    >
                        🏢
                        <h2>Venues</h2>
                        <p>View and manage venues.</p>
                    </Link>


                    <Link
                        to="/admin/bookings"
                        className="admin-menu-card"
                    >
                        📅
                        <h2>Bookings</h2>
                        <p>View all bookings.</p>
                    </Link>


                    <Link
                        to="/admin/owner-requests"
                        className="admin-menu-card"
                    >
                        ⭐
                        <h2>Owner Requests</h2>
                        <p>Approve or reject owner requests.</p>
                    </Link>

                </div>

            </main>

        </div>
    );
};

export default AdminDashboard;