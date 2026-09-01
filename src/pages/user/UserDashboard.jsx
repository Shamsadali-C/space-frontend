
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/UserDashboard.css";

const UserDashboard = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="user-dashboard">



            <header className="user-navbar">

                <div className="user-logo">
                    Book My Space
                </div>

                <button
                    className="user-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </header>



            <main className="user-content">

                <div className="user-welcome">

                    <h1>
                        Welcome to User Dashboard
                    </h1>

                    <p>
                        Manage your profile, explore venues,
                        and book your perfect space.
                    </p>

                </div>




                <div className="user-cards">

                    {/* PROFILE */}

                    <Link
                        to="/user/profile"
                        className="user-card"
                    >

                        <div className="user-card-icon">
                            👤
                        </div>

                        <h2>
                            My Profile
                        </h2>

                        <p>
                            View your account information
                            and profile details.
                        </p>

                        <span>
                            View Profile →
                        </span>

                    </Link>


                    {/* VENUES */}

                    <Link
                        to="/user/venues"
                        className="user-card"
                    >

                        <div className="user-card-icon">
                            🏢
                        </div>

                        <h2>
                            View Venues
                        </h2>

                        <p>
                            Browse available venues and
                            book your preferred space.
                        </p>

                        <span>
                            Explore Venues →
                        </span>

                    </Link>

                       <Link
                              to="/user/bookings"
                              className="user-card"
                          >

                              <div className="user-card-icon">
                                  📅
                              </div>

                              <h2>
                                  My Bookings
                              </h2>

                              <p>
                                  View your booking requests
                                  and check their status.
                              </p>

                              <span>
                                  View Bookings →
                              </span>

                          </Link>

                    {/* OWNER */}

                    <Link
                        to="/user/owner-request"
                        className="user-card"
                    >

                        <div className="user-card-icon">
                            ⭐
                        </div>

                        <h2>
                            Become an Owner
                        </h2>

                        <p>
                            Submit a request to become
                            a venue owner.
                        </p>

                        <span>
                            Become Owner →
                        </span>

                    </Link>

                </div>

            </main>

        </div>
    );
};

export default UserDashboard;