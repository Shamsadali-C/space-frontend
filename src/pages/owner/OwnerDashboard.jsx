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

            {/* SIDEBAR */}

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


            {/* MAIN CONTENT */}

            <main className="owner-main">

                <div className="owner-header">

                    <h1>
                        Owner Dashboard
                    </h1>

                    <p>
                        Manage your venues and bookings
                    </p>

                </div>


                {/* DASHBOARD CARDS */}

                <div className="owner-cards">


                    {/* MY VENUES */}

                    <Link
                        to="/owner/venues"
                        className="owner-card"
                    >

                        <div className="owner-card-icon">
                            🏢
                        </div>

                        <h2>
                            My Venues
                        </h2>

                        <p>
                            View, update and manage your
                            venues.
                        </p>

                    </Link>


                    {/* BOOKINGS */}

                    <Link
                        to="/owner/bookings"
                        className="owner-card"
                    >

                        <div className="owner-card-icon">
                            📅
                        </div>

                        <h2>
                            Bookings
                        </h2>

                        <p>
                            View and manage customer
                            booking requests.
                        </p>

                    </Link>


                    {/* ADD VENUE */}

                    <Link
                        to="/owner/add-venue"
                        className="owner-card"
                    >

                        <div className="owner-card-icon">
                            ➕
                        </div>

                        <h2>
                            Add Venue
                        </h2>

                        <p>
                            Register a new venue and make
                            it available for customers.
                        </p>

                    </Link>


                </div>

            </main>

        </div>
    );
};

export default OwnerDashboard;