import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ownerService from "../../services/ownerService";
import "../../styles/OwnerBookings.css";

const OwnerBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        loadBookings();
    }, []);


    const loadBookings = async () => {

        try {

            const response =
                await ownerService.getOwnerBookings();

            console.log(
                "Owner bookings:",
                response.data
            );

            setBookings(response.data);

        } catch (error) {

            console.error(
                "Failed to load bookings:",
                error
            );

        } finally {

            setLoading(false);
        }
    };

    const handleApprove = async (bookingId) => {

        if (
            !window.confirm(
                "Accept this booking?"
            )
        ) {
            return;
        }


        try {

            await ownerService.approveBooking(
                bookingId
            );

            alert(
                "Booking accepted successfully"
            );

            await loadBookings();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to accept booking"
            );
        }
    };


    const handleReject = async (bookingId) => {

        if (
            !window.confirm(
                "Are you sure you want to reject this booking?"
            )
        ) {
            return;
        }


        try {

            await ownerService.rejectBooking(
                bookingId
            );

            alert(
                "Booking rejected successfully"
            );

            await loadBookings();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to reject booking"
            );
        }
    };


    const handleDelete = async (bookingId) => {

        if (
            !window.confirm(
                "Delete this booking?"
            )
        ) {
            return;
        }


        try {

            await ownerService.deleteBooking(
                bookingId
            );

            alert(
                "Booking deleted successfully"
            );

            await loadBookings();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to delete booking"
            );
        }
    };

    if (loading) {

        return (
            <div className="owner-loading">

                <h2>
                    Loading bookings...
                </h2>

            </div>
        );
    }


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

            </aside>


            {/* MAIN */}

            <main className="owner-main">

                <div className="owner-page-header">

                    <div>

                        <h1>
                            Bookings
                        </h1>

                        <p>
                            Manage customer bookings.
                        </p>

                    </div>

                </div>


                {/* NO BOOKINGS */}

                {bookings.length === 0 ? (

                    <div className="no-owner-bookings">

                        <div>
                            📅
                        </div>

                        <h2>
                            No bookings found
                        </h2>

                        <p>
                            Customer bookings will
                            appear here.
                        </p>

                    </div>

                ) : (

                    <div className="booking-grid">

                        {bookings.map((booking) => (

                            <div
                                className="booking-card"
                                key={booking.id}
                            >

                                <h2>
                                    Booking #{booking.id}
                                </h2>


                                <p>
                                    <strong>
                                        Venue:
                                    </strong>{" "}
                                    {booking.venue?.venueName}
                                </p>


                                <p>
                                    <strong>
                                        User:
                                    </strong>{" "}
                                    {booking.user?.username}
                                </p>


                                <p>
                                    <strong>
                                        Date:
                                    </strong>{" "}
                                    {booking.date}
                                </p>


                                <p>
                                    <strong>
                                        Time:
                                    </strong>{" "}
                                    {booking.time}
                                </p>


                                <p>

                                    <strong>
                                        Status:
                                    </strong>{" "}

                                    <span
                                        className={
                                            `booking-status ${
                                                booking.bookingStatus
                                                    ?.toLowerCase()
                                            }`
                                        }
                                    >
                                        {booking.bookingStatus}
                                    </span>

                                </p>


                                {/* ACTIONS */}

                                <div className="booking-actions">

                                    {booking.bookingStatus?.toUpperCase() === "PENDING" && (
                                        <>
                                            <button
                                                className="approve-btn"
                                                onClick={() => handleApprove(booking.id)}
                                            >
                                                Accept
                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() => handleReject(booking.id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}


                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(
                                                booking.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
};

export default OwnerBookings;