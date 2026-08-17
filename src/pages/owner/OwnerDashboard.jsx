import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/OwnerDashboard.css";

const OwnerDashboard = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="owner-layout">

            <aside className="owner-sidebar">

                <div className="owner-logo">
                    Book My Space
                </div>

                <div className="owner-role">
                    OWNER PANEL
                </div>

                <nav>

                    <Link to="/owner">
                        Dashboard
                    </Link>

                    <Link to="/owner/venues">
                        My Venues
                    </Link>

                    <Link to="/owner/bookings">
                        Bookings
                    </Link>

                    <Link to="/owner/add-venue">
                        Add Venue
                    </Link>

                </nav>

                <button
                    className="owner-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </aside>

            <main className="owner-main">

                <div className="owner-header">

                    <h1>Owner Dashboard</h1>

                    <p>
                        Manage your venues and bookings
                    </p>

                </div>

                <div className="owner-cards">

                    <Link to="/owner/venues" className="owner-card">
                        <h2>My Venues</h2>
                        <p>
                            Add, update and manage your venues.
                        </p>
                    </Link>

                    <Link to="/owner/bookings" className="owner-card">
                        <h2>Bookings</h2>
                        <p>
                            View and manage customer bookings.
                        </p>
                    </Link>

                    <Link to="/owner/add-venue" className="owner-card">
                        <h2>Add Venue</h2>
                        <p>
                            Register a new venue.
                        </p>
                    </Link>

                </div>

            </main>

        </div>
    );
};

export default OwnerDashboard;