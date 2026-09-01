// import React, { useEffect, useState } from "react";
// import userService from "../../services/userService";
// import "../../styles/UserBookings.css";
//
// const UserBookings = () => {
//
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//
//     useEffect(() => {
//         loadBookings();
//     }, []);
//
//     const loadBookings = async () => {
//
//         try {
//
//             const response =
//                 await userService.getMyBookings();
//
//             setBookings(response.data);
//
//         } catch (error) {
//
//             console.error("Failed to load bookings:", error);
//
//             setMessage(
//                 error.response?.data?.message ||
//                 error.response?.data ||
//                 "Failed to load bookings"
//             );
//
//         } finally {
//
//             setLoading(false);
//         }
//     };
//
//     if (loading) {
//         return (
//             <div className="user-bookings-loading">
//                 <div className="user-bookings-spinner"></div>
//                 <p>Loading your bookings...</p>
//             </div>
//         );
//     }
//
//     return (
//
//         <div className="user-bookings-page">
//
//             <div className="user-bookings-container">
//
//                 <div className="user-bookings-header">
//
//                     <h1>
//                         My Bookings
//                     </h1>
//
//                     <p>
//                         View your venue booking requests
//                         and their status.
//                     </p>
//
//                 </div>
//
//                 {message && (
//                     <div className="user-bookings-message">
//                         {message}
//                     </div>
//                 )}
//
//                 {bookings.length === 0 ? (
//
//                     <div className="no-user-bookings">
//
//                         <div className="no-bookings-icon">
//                             📅
//                         </div>
//
//                         <h2>
//                             No bookings yet
//                         </h2>
//
//                         <p>
//                             You haven't booked any venues yet.
//                         </p>
//
//                     </div>
//
//                 ) : (
//
//                     <div className="user-bookings-list">
//
//                         {bookings.map((booking) => (
//
//                             <div
//                                 className="user-booking-card"
//                                 key={booking.id}
//                             >
//
//                                 <div className="user-booking-top">
//
//                                     <div>
//
//                                         <h2>
//                                             {booking.venue?.venueName ||
//                                                 "Venue"}
//                                         </h2>
//
//                                         <p>
//                                             📍{" "}
//                                             {booking.venue?.location ||
//                                                 "Location unavailable"}
//                                         </p>
//
//                                     </div>
//
//                                     <span
//                                         className={`user-booking-status ${
//                                             booking.bookingStatus
//                                                 ?.toLowerCase()
//                                         }`}
//                                     >
//                                         {booking.bookingStatus}
//                                     </span>
//
//                                 </div>
//
//
//                                 <div className="user-booking-details">
//
//                                     <div>
//                                         <small>
//                                             Booking Date
//                                         </small>
//
//                                         <strong>
//                                             📅 {booking.date}
//                                         </strong>
//                                     </div>
//
//                                     <div>
//                                         <small>
//                                             Booking Time
//                                         </small>
//
//                                         <strong>
//                                             🕒 {booking.time}
//                                         </strong>
//                                     </div>
//
//                                 </div>
//
//
//                                 {/* STATUS MESSAGE */}
//
//                                 {booking.bookingStatus ===
//                                     "PENDING" && (
//
//                                     <div className="status-message pending-message">
//
//                                         ⏳ Waiting for owner
//                                         approval.
//
//                                     </div>
//                                 )}
//
//                                 {booking.bookingStatus ===
//                                     "ACCEPTED" && (
//
//                                     <div className="status-message accepted-message">
//
//                                         ✅ Your booking has
//                                         been accepted by the
//                                         owner.
//
//                                     </div>
//                                 )}
//
//                                 {booking.bookingStatus ===
//                                     "REJECTED" && (
//
//                                     <div className="status-message rejected-message">
//
//                                         ❌ Your booking has
//                                         been rejected by the
//                                         owner.
//
//                                     </div>
//                                 )}
//
//                             </div>
//
//                         ))}
//
//                     </div>
//
//                 )}
//
//             </div>
//
//         </div>
//     );
// };
//
// export default UserBookings;

import React, {  useEffect,  useState} from "react";
import {  Link} from "react-router-dom";
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


            const data =
                await userService.getMyBookings();


            console.log(
                "My bookings:",
                data
            );


            setBookings(
                Array.isArray(data)
                    ? data
                    : []
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

                    <Link to="/home">
                        🏠 Dashboard
                    </Link>

                    <Link to="/user/venues">
                        🏢 Find Venues
                    </Link>

                    <Link
                        to="/user/bookings"
                        className="active"
                    >
                        📅 My Bookings
                    </Link>

                    <Link to="/user/profile">
                        👤 Profile
                    </Link>

                    <Link to="/user/owner-request">
                        ⭐ Become an Owner
                    </Link>

                </nav>

            </aside>


            {/* MAIN */}

            <main className="user-main">

                <div className="user-page-header">

                    <span>
                        BOOKING MANAGEMENT
                    </span>

                    <h1>
                        My Bookings
                    </h1>

                    <p>
                        Track all your venue booking
                        requests.
                    </p>

                </div>


                {error && (

                    <div className="user-error">
                        {error}
                    </div>

                )}


                {bookings.length === 0 ? (

                    <div className="user-empty">

                        <div>
                            📅
                        </div>

                        <h2>
                            No bookings yet
                        </h2>

                        <p>
                            You haven't made any
                            booking requests.
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
                                    key={
                                        booking.id
                                    }
                                >

                                    <div className="booking-top">

                                        <div>

                                            <span>
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
                                            {
                                                booking.bookingStatus ||
                                                "PENDING"
                                            }
                                        </span>

                                    </div>


                                    <div className="booking-details">

                                        <p>
                                            📍{" "}
                                            {booking.venue
                                                ?.location ||
                                                "N/A"}
                                        </p>


                                        <p>
                                            📅{" "}
                                            {booking.timeSlot
                                                ?.slotDate ||
                                                booking.bookingDate ||
                                                "N/A"}
                                        </p>


                                        <p>
                                            🕐{" "}

                                            {booking.timeSlot
                                                ?.startTime ||
                                                booking.startTime ||
                                                "N/A"}

                                            {" - "}

                                            {booking.timeSlot
                                                ?.endTime ||
                                                booking.endTime ||
                                                "N/A"}

                                        </p>

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
