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

import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import "../../styles/MyBookings.css";

const MyBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    useEffect(() => {  loadBookings(); }, []);


    const loadBookings = async () => {

        try {

            setLoading(true);

            const response =
                await userService.getMyBookings();

            console.log(
                "MY BOOKINGS:",
                response.data
            );

            if (Array.isArray(response.data)) {

                setBookings(response.data);

            } else {

                setBookings([]);

                setMessage(
                    "Invalid booking data received"
                );
            }

        } catch (error) {

            console.error(
                "Booking loading error:",
                error
            );

            setMessage(
                error.response?.data ||
                "Failed to load bookings"
            );

        } finally {

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <div className="bookings-loading">
                Loading your bookings...
            </div>
        );
    }


    return (

        <div className="my-bookings-page">

            <div className="my-bookings-container">

                <div className="bookings-header">

                    <h1>
                        My Bookings
                    </h1>

                    <p>
                        View your booking requests
                        and their current status.
                    </p>

                </div>


                {message && (

                    <div className="booking-message">
                        {message}
                    </div>

                )}


                {bookings.length === 0 ? (

                    <div className="no-bookings">

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

                    </div>

                ) : (

                    <div className="bookings-list">

                        {bookings.map((booking) => (

                            <div
                                className="booking-card"
                                key={booking.id}
                            >

                                <div className="booking-info">

                                    <h2>
                                        {booking.venue?.venueName ||
                                            "Venue"}
                                    </h2>

                                    <p>
                                        📍{" "}
                                        {booking.venue?.location ||
                                            "Location not available"}
                                    </p>

                                    {booking.timeSlot && (

                                        <p>

                                            🕐{" "}

                                            {booking.timeSlot.startTime}

                                            {" - "}

                                            {booking.timeSlot.endTime}

                                        </p>

                                    )}

                                    {booking.timeSlot && (

                                        <p>

                                            📅{" "}

                                            {booking.timeSlot.slotDate}

                                        </p>

                                    )}

                                </div>


                                <div className="booking-status-container">

                                    <span
                                        className={`booking-status ${
                                            booking.bookingStatus
                                                ?.toLowerCase()
                                        }`}
                                    >

                                        {booking.bookingStatus}

                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default MyBookings;