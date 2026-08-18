import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import "../../styles/BookVenue.css";

const BookVenue = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Venue can be passed from UserVenues page
    const venue = location.state?.venue;

    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    if (!venue) {
        return (
            <div className="book-venue-page">
                <div className="booking-error">
                    <h2>Venue not found</h2>
                    <button onClick={() => navigate("/user/venues")}>
                        Back to Venues
                    </button>
                </div>
            </div>
        );
    }

    const handleBooking = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!bookingDate || !bookingTime) {
            setError("Please select booking date and time.");
            return;
        }

        try {
            setLoading(true);

            const response = await userService.createBooking(
                venue.id,
                bookingDate,
                bookingTime
            );

            setMessage(
                response.data?.message ||
                "Booking request sent successfully."
            );

            setBookingDate("");
            setBookingTime("");

        } catch (err) {
            console.error("Booking error:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Failed to create booking."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="book-venue-page">

            <div className="book-venue-container">

                <button
                    className="back-button"
                    onClick={() => navigate("/user/venues")}
                >
                    ← Back to Venues
                </button>

                <div className="booking-card">

                    <div className="booking-header">
                        <h1>Book Venue</h1>
                        <p>Choose your preferred date and time</p>
                    </div>

                    <div className="venue-info">

                        <div className="venue-image">
                            🏢
                        </div>

                        <div>
                            <h2>{venue.venueName}</h2>

                            <p>
                                📍 {venue.location}
                            </p>

                            <p>
                                👥 Capacity: {venue.capacity}
                            </p>

                            <p>
                                💰 ₹{venue.price}
                            </p>
                        </div>

                    </div>

                    <form onSubmit={handleBooking}>

                        <div className="form-group">
                            <label>Booking Date</label>

                            <input
                                type="date"
                                value={bookingDate}
                                min={
                                    new Date()
                                        .toISOString()
                                        .split("T")[0]
                                }
                                onChange={(e) =>
                                    setBookingDate(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Booking Time</label>

                            <input
                                type="time"
                                value={bookingTime}
                                onChange={(e) =>
                                    setBookingTime(e.target.value)
                                }
                                required
                            />
                        </div>

                        {message && (
                            <div className="success-message">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="book-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Booking..."
                                : "Book Now"}
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookVenue;