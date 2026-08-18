// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import ownerService from "../../services/ownerService";
// import "../../styles/OwnerBookings.css";
//
// const OwnerBookings = () => {
//
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//
//     useEffect(() => {
//         loadBookings();
//     }, []);
//
//
//     const loadBookings = async () => {
//
//         try {
//
//             const response =
//                 await ownerService.getOwnerBookings();
//
//             console.log(
//                 "Owner bookings:",
//                 response.data
//             );
//
//             setBookings(response.data);
//
//         } catch (error) {
//
//             console.error(
//                 "Failed to load bookings:",
//                 error
//             );
//
//         } finally {
//
//             setLoading(false);
//         }
//     };
//
//     const handleApprove = async (bookingId) => {
//
//         if (
//             !window.confirm(
//                 "Accept this booking?"
//             )
//         ) {
//             return;
//         }
//
//
//         try {
//
//             await ownerService.approveBooking(
//                 bookingId
//             );
//
//             alert(
//                 "Booking accepted successfully"
//             );
//
//             await loadBookings();
//
//         } catch (error) {
//
//             console.error(error);
//
//             alert(
//                 error.response?.data ||
//                 "Failed to accept booking"
//             );
//         }
//     };
//
//
//     const handleReject = async (bookingId) => {
//
//         if (
//             !window.confirm(
//                 "Are you sure you want to reject this booking?"
//             )
//         ) {
//             return;
//         }
//
//
//         try {
//
//             await ownerService.rejectBooking(
//                 bookingId
//             );
//
//             alert(
//                 "Booking rejected successfully"
//             );
//
//             await loadBookings();
//
//         } catch (error) {
//
//             console.error(error);
//
//             alert(
//                 error.response?.data ||
//                 "Failed to reject booking"
//             );
//         }
//     };
//
//
//     const handleDelete = async (bookingId) => {
//
//         if (
//             !window.confirm(
//                 "Delete this booking?"
//             )
//         ) {
//             return;
//         }
//
//
//         try {
//
//             await ownerService.deleteBooking(
//                 bookingId
//             );
//
//             alert(
//                 "Booking deleted successfully"
//             );
//
//             await loadBookings();
//
//         } catch (error) {
//
//             console.error(error);
//
//             alert(
//                 error.response?.data ||
//                 "Failed to delete booking"
//             );
//         }
//     };
//
//     if (loading) {
//
//         return (
//             <div className="owner-loading">
//
//                 <h2>
//                     Loading bookings...
//                 </h2>
//
//             </div>
//         );
//     }
//
//
//     return (
//
//         <div className="owner-layout">
//
//             {/* SIDEBAR */}
//
//             <aside className="owner-sidebar">
//
//                 <div className="owner-logo">
//                     Book My Space
//                 </div>
//
//                 <div className="owner-role">
//                     OWNER PANEL
//                 </div>
//
//                 <nav>
//
//                     <Link to="/owner">
//                         Dashboard
//                     </Link>
//
//                     <Link to="/owner/venues">
//                         My Venues
//                     </Link>
//
//                     <Link to="/owner/bookings">
//                         Bookings
//                     </Link>
//
//                     <Link to="/owner/add-venue">
//                         Add Venue
//                     </Link>
//
//                 </nav>
//
//             </aside>
//
//
//             {/* MAIN */}
//
//             <main className="owner-main">
//
//                 <div className="owner-page-header">
//
//                     <div>
//
//                         <h1>
//                             Bookings
//                         </h1>
//
//                         <p>
//                             Manage customer bookings.
//                         </p>
//
//                     </div>
//
//                 </div>
//
//
//                 {/* NO BOOKINGS */}
//
//                 {bookings.length === 0 ? (
//
//                     <div className="no-owner-bookings">
//
//                         <div>
//                             📅
//                         </div>
//
//                         <h2>
//                             No bookings found
//                         </h2>
//
//                         <p>
//                             Customer bookings will
//                             appear here.
//                         </p>
//
//                     </div>
//
//                 ) : (
//
//                     <div className="booking-grid">
//
//                         {bookings.map((booking) => (
//
//                             <div
//                                 className="booking-card"
//                                 key={booking.id}
//                             >
//
//                                 <h2>
//                                     Booking #{booking.id}
//                                 </h2>
//
//
//                                 <p>
//                                     <strong>
//                                         Venue:
//                                     </strong>{" "}
//                                     {booking.venue?.venueName}
//                                 </p>
//
//
//                                 <p>
//                                     <strong>
//                                         User:
//                                     </strong>{" "}
//                                     {booking.user?.username}
//                                 </p>
//
//
//                                 <p>
//                                     <strong>
//                                         Date:
//                                     </strong>{" "}
//                                     {booking.date}
//                                 </p>
//
//
//                                 <p>
//                                     <strong>
//                                         Time:
//                                     </strong>{" "}
//                                     {booking.time}
//                                 </p>
//
//
//                                 <p>
//
//                                     <strong>
//                                         Status:
//                                     </strong>{" "}
//
//                                     <span
//                                         className={
//                                             `booking-status ${
//                                                 booking.bookingStatus
//                                                     ?.toLowerCase()
//                                             }`
//                                         }
//                                     >
//                                         {booking.bookingStatus}
//                                     </span>
//
//                                 </p>
//
//
//                                 {/* ACTIONS */}
//
//                                 <div className="booking-actions">
//
//                                     {booking.bookingStatus?.toUpperCase() === "PENDING" && (
//                                         <>
//                                             <button
//                                                 className="approve-btn"
//                                                 onClick={() => handleApprove(booking.id)}
//                                             >
//                                                 Accept
//                                             </button>
//
//                                             <button
//                                                 className="reject-btn"
//                                                 onClick={() => handleReject(booking.id)}
//                                             >
//                                                 Reject
//                                             </button>
//                                         </>
//                                     )}
//
//
//                                     <button
//                                         className="delete-btn"
//                                         onClick={() =>
//                                             handleDelete(
//                                                 booking.id
//                                             )
//                                         }
//                                     >
//                                         Delete
//                                     </button>
//
//                                 </div>
//
//                             </div>
//
//                         ))}
//
//                     </div>
//
//                 )}
//
//             </main>
//
//         </div>
//     );
// };
//
// export default OwnerBookings;

import React, { useEffect, useState } from "react";
import ownerService from "../../services/ownerService";
import "../../styles/OwnerBookings.css";

const OwnerBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            setLoading(true);
            setMessage("");

            const response =
                await ownerService.getOwnerBookings();

            setBookings(response.data);

        } catch (error) {

            console.error("Failed to load bookings:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to load bookings"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleApprove = async (bookingId) => {

        try {

            setProcessingId(bookingId);
            setMessage("");

            await ownerService.approveBooking(bookingId);

            setMessage(
                "Booking approved successfully"
            );

            await loadBookings();

        } catch (error) {

            console.error(
                "Approve booking error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to approve booking"
            );

        } finally {

            setProcessingId(null);
        }
    };

    const handleReject = async (bookingId) => {

        try {

            setProcessingId(bookingId);
            setMessage("");

            await ownerService.rejectBooking(bookingId);

            setMessage(
                "Booking rejected successfully"
            );

            await loadBookings();

        } catch (error) {

            console.error(
                "Reject booking error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to reject booking"
            );

        } finally {

            setProcessingId(null);
        }
    };

    if (loading) {

        return (
            <div className="owner-bookings-loading">

                <div className="owner-bookings-spinner"></div>

                <p>
                    Loading bookings...
                </p>

            </div>
        );
    }

    return (

        <div className="owner-bookings-page">

            <div className="owner-bookings-container">

                {/* HEADER */}

                <div className="owner-bookings-header">

                    <div>

                        <h1>
                            Booking Requests
                        </h1>

                        <p>
                            Manage booking requests for
                            your venues.
                        </p>

                    </div>

                    <div className="booking-count">

                        {bookings.length}

                        <span>
                            Bookings
                        </span>

                    </div>

                </div>


                {/* MESSAGE */}

                {message && (

                    <div className="owner-bookings-message">

                        {message}

                    </div>

                )}


                {/* EMPTY */}

                {bookings.length === 0 ? (

                    <div className="no-bookings">

                        <div className="no-bookings-icon">
                            📅
                        </div>

                        <h2>
                            No Booking Requests
                        </h2>

                        <p>
                            You don't have any booking
                            requests yet.
                        </p>

                    </div>

                ) : (

                    <div className="owner-bookings-list">

                        {bookings.map((booking) => (

                            <div
                                className="owner-booking-card"
                                key={booking.id}
                            >

                                {/* TOP */}

                                <div className="booking-card-top">

                                    <div>

                                        <h2>
                                            {booking.venue?.venueName ||
                                                "Venue"}
                                        </h2>

                                        <p className="booking-location">

                                            📍{" "}

                                            {booking.venue?.location ||
                                                "Location unavailable"}

                                        </p>

                                    </div>


                                    <span
                                        className={`booking-status ${
                                            booking.bookingStatus
                                                ?.toLowerCase()
                                        }`}
                                    >
                                        {booking.bookingStatus}
                                    </span>

                                </div>


                                {/* DETAILS */}

                                <div className="booking-details">

                                    <div className="booking-detail">

                                        <span className="detail-icon">
                                            👤
                                        </span>

                                        <div>

                                            <small>
                                                Customer
                                            </small>

                                            <strong>
                                                {booking.user?.username ||
                                                    "Unknown User"}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="booking-detail">

                                        <span className="detail-icon">
                                            📅
                                        </span>

                                        <div>

                                            <small>
                                                Booking Date
                                            </small>

                                            <strong>
                                                {booking.date}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="booking-detail">

                                        <span className="detail-icon">
                                            🕒
                                        </span>

                                        <div>

                                            <small>
                                                Booking Time
                                            </small>

                                            <strong>
                                                {booking.time}
                                            </strong>

                                        </div>

                                    </div>

                                </div>


                                {/* ACTIONS */}

                                {booking.bookingStatus ===
                                    "PENDING" && (

                                    <div className="booking-actions">

                                        <button
                                            className="approve-btn"
                                            disabled={
                                                processingId ===
                                                booking.id
                                            }
                                            onClick={() =>
                                                handleApprove(
                                                    booking.id
                                                )
                                            }
                                        >

                                            {processingId ===
                                            booking.id
                                                ? "Processing..."
                                                : "✓ Accept"}

                                        </button>


                                        <button
                                            className="reject-btn"
                                            disabled={
                                                processingId ===
                                                booking.id
                                            }
                                            onClick={() =>
                                                handleReject(
                                                    booking.id
                                                )
                                            }
                                        >

                                            {processingId ===
                                            booking.id
                                                ? "Processing..."
                                                : "✕ Reject"}

                                        </button>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default OwnerBookings;