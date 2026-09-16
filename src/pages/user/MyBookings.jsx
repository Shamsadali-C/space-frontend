import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/userService";
import "../../styles/MyBookings.css";

const MyBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await userService.getMyBookings();

            console.log("My bookings:", data);

            setBookings(
                Array.isArray(data) ? data : []
            );

        } catch (error) {

            console.error(
                "Failed to load bookings:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load bookings."
            );

        } finally {

            setLoading(false);

        }
    };

    const formatDate = (date) => {

        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    const formatTime = (time) => {

        if (!time) return "N/A";

        const [hours, minutes] =
            time.split(":");

        const date = new Date();

        date.setHours(
            Number(hours),
            Number(minutes)
        );

        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }
        );
    };

    const formatCurrency = (amount) => {

        if (amount === null || amount === undefined) {
            return "₹0";
        }

        return `₹${Number(amount).toLocaleString("en-IN")}`;
    };

    if (loading) {

        return (

            <div className="user-loading">

                <div className="user-spinner"></div>

                <h2>
                    Loading your bookings...
                </h2>

            </div>
        );
    }

    return (

        <div className="user-layout">

            {/* SIDEBAR */}

            <aside className="user-sidebar">

                <div className="user-logo">
                    Book My Space
                </div>

                <div className="user-role">
                    USER PANEL
                </div>

                <nav>

                    <Link to="/user">
                         Dashboard
                    </Link>

                    <Link to="/user/venues">
                        Find Venues
                    </Link>

                    <Link
                        to="/user/bookings"
                        className="active"
                    >
                         My Bookings
                    </Link>

                    <Link to="/user/profile">
                         Profile
                    </Link>

                    <Link to="/user/owner-request">
                         Become an Owner
                    </Link>

                </nav>

            </aside>


            {/* MAIN CONTENT */}

            <main className="user-main">

                <div className="user-page-header">

{/*                     <span> */}
{/*                         BOOKING MANAGEMENT */}
{/*                     </span> */}

                    <h1>
                         Booking Details:
                    </h1>

{/*                     <p> */}
{/*                         View and manage all your venue */}
{/*                         bookings. */}
{/*                     </p> */}

                </div>


                {/* ERROR */}

                {error && (

                    <div className="user-error">
                        {error}
                    </div>

                )}


                {/* EMPTY */}

                {bookings.length === 0 ? (

                    <div className="user-empty">

                        <div className="empty-icon">
                            📅
                        </div>

                        <h2>
                            No bookings yet
                        </h2>

                        <p>
                            You haven't made any
                            venue bookings yet.
                        </p>

                        <Link
                            to="/user/venues"
                            className="browse-btn"
                        >
                            Find a Venue →
                        </Link>

                    </div>

                ) : (

                    <div className="booking-list">

                        {bookings.map(
                            (booking) => (

                                <div
                                    className="booking-card"
                                    key={booking.id}
                                >

                                    {/* TOP */}

                                    <div className="booking-top">

                                        <div>

                                            <span className="booking-number">
                                                BOOKING #
                                                {booking.id}
                                            </span>

                                            <h2>
                                                {booking.venue
                                                    ?.venueName ||
                                                    "Venue"}
                                            </h2>

                                        </div>

                                        <span
                                            className={
                                                `booking-status ${
                                                    booking.bookingStatus
                                                        ?.toLowerCase()
                                                }`
                                            }
                                        >
                                            {booking.bookingStatus ||
                                                "PENDING"}
                                        </span>

                                    </div>


                                    {/* VENUE */}

                                    <div className="booking-location">

                                        📍

                                        <span>
                                            {booking.venue
                                                ?.location ||
                                                "Location unavailable"}
                                        </span>

                                    </div>


                                    {/* BOOKING INFORMATION */}

                                    <div className="booking-info-grid">

                                        <div className="booking-info">

                                            <span>
                                                DATE
                                            </span>

                                            <strong>
                                                📅{" "}
                                                {formatDate(
                                                    booking.bookingDate
                                                )}
                                            </strong>

                                        </div>


                                        <div className="booking-info">

                                            <span>
                                                TIME
                                            </span>

                                            <strong>
                                                🕐{" "}
                                                {formatTime(
                                                    booking.startTime
                                                )}

                                                {" - "}

                                                {formatTime(
                                                    booking.endTime
                                                )}
                                            </strong>

                                        </div>


                                        <div className="booking-info">

                                            <span>
                                                DURATION
                                            </span>

                                            <strong>
                                                ⏱️{" "}
                                                {booking.durationHours ||
                                                    0}{" "}
                                                hour
                                                {booking.durationHours > 1
                                                    ? "s"
                                                    : ""}
                                            </strong>

                                        </div>


                                        <div className="booking-info">

                                            <span>
                                                HOURLY PRICE
                                            </span>

                                            <strong>
                                                {formatCurrency(
                                                    booking.hourlyPrice
                                                )}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* PAYMENT */}

                                    <div className="booking-payment">

                                        <div>

                                            <span>
                                                TOTAL PRICE
                                            </span>

                                            <strong>
                                                {formatCurrency(
                                                    booking.totalPrice
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                ADVANCE PAID
                                            </span>

                                            <strong className="advance-price">
                                                {formatCurrency(
                                                    booking.advanceAmount
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                PAYMENT
                                            </span>

                                            <strong
                                                className={
                                                    `payment-status ${
                                                        booking.paymentStatus
                                                            ?.toLowerCase()
                                                    }`
                                                }
                                            >
                                                {booking.paymentStatus ||
                                                    "N/A"}
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </main>

        </div>
    );
};

export default MyBookings;