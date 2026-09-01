// import React, { useEffect, useState } from "react";
// import ownerService from "../../services/ownerService";
// import "../../styles/OwnerBookings.css";
//
// const OwnerBookings = () => {
//
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//     const [processingId, setProcessingId] = useState(null);
//
//     useEffect(() => {
//         loadBookings();
//     }, []);
//
//     const loadBookings = async () => {
//
//         try {
//
//             setLoading(true);
//             setMessage("");
//
//             const response =
//                 await ownerService.getOwnerBookings();
//
//             setBookings(response.data);
//
//         } catch (error) {
//
//             console.error("Failed to load bookings:", error);
//
//             setMessage(
//                 error.response?.data?.message ||
//                 "Failed to load bookings"
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
//         try {
//
//             setProcessingId(bookingId);
//             setMessage("");
//
//             await ownerService.approveBooking(bookingId);
//
//             setMessage(
//                 "Booking approved successfully"
//             );
//
//             await loadBookings();
//
//         } catch (error) {
//
//             console.error(
//                 "Approve booking error:",
//                 error
//             );
//
//             setMessage(
//                 error.response?.data?.message ||
//                 error.response?.data ||
//                 "Failed to approve booking"
//             );
//
//         } finally {
//
//             setProcessingId(null);
//         }
//     };
//
//     const handleReject = async (bookingId) => {
//
//         try {
//
//             setProcessingId(bookingId);
//             setMessage("");
//
//             await ownerService.rejectBooking(bookingId);
//
//             setMessage(
//                 "Booking rejected successfully"
//             );
//
//             await loadBookings();
//
//         } catch (error) {
//
//             console.error(
//                 "Reject booking error:",
//                 error
//             );
//
//             setMessage(
//                 error.response?.data?.message ||
//                 error.response?.data ||
//                 "Failed to reject booking"
//             );
//
//         } finally {
//
//             setProcessingId(null);
//         }
//     };
//
//     if (loading) {
//
//         return (
//             <div className="owner-bookings-loading">
//
//                 <div className="owner-bookings-spinner"></div>
//
//                 <p>
//                     Loading bookings...
//                 </p>
//
//             </div>
//         );
//     }
//
//     return (
//
//         <div className="owner-bookings-page">
//
//             <div className="owner-bookings-container">
//
//                 {/* HEADER */}
//
//                 <div className="owner-bookings-header">
//
//                     <div>
//
//                         <h1>
//                             Booking Requests
//                         </h1>
//
//                         <p>
//                             Manage booking requests for
//                             your venues.
//                         </p>
//
//                     </div>
//
//                     <div className="booking-count">
//
//                         {bookings.length}
//
//                         <span>
//                             Bookings
//                         </span>
//
//                     </div>
//
//                 </div>
//
//
//                 {/* MESSAGE */}
//
//                 {message && (
//
//                     <div className="owner-bookings-message">
//
//                         {message}
//
//                     </div>
//
//                 )}
//
//
//                 {/* EMPTY */}
//
//                 {bookings.length === 0 ? (
//
//                     <div className="no-bookings">
//
//                         <div className="no-bookings-icon">
//                             📅
//                         </div>
//
//                         <h2>
//                             No Booking Requests
//                         </h2>
//
//                         <p>
//                             You don't have any booking
//                             requests yet.
//                         </p>
//
//                     </div>
//
//                 ) : (
//
//                     <div className="owner-bookings-list">
//
//                         {bookings.map((booking) => (
//
//                             <div
//                                 className="owner-booking-card"
//                                 key={booking.id}
//                             >
//
//                                 {/* TOP */}
//
//                                 <div className="booking-card-top">
//
//                                     <div>
//
//                                         <h2>
//                                             {booking.venue?.venueName ||
//                                                 "Venue"}
//                                         </h2>
//
//                                         <p className="booking-location">
//
//                                             📍{" "}
//
//                                             {booking.venue?.location ||
//                                                 "Location unavailable"}
//
//                                         </p>
//
//                                     </div>
//
//
//                                     <span
//                                         className={`booking-status ${
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
//                                 {/* DETAILS */}
//
//                                 <div className="booking-details">
//
//                                     <div className="booking-detail">
//
//                                         <span className="detail-icon">
//                                             👤
//                                         </span>
//
//                                         <div>
//
//                                             <small>
//                                                 Customer
//                                             </small>
//
//                                             <strong>
//                                                 {booking.user?.username ||
//                                                     "Unknown User"}
//                                             </strong>
//
//                                         </div>
//
//                                     </div>
//
//
//                                     <div className="booking-detail">
//
//                                         <span className="detail-icon">
//                                             📅
//                                         </span>
//
//                                         <div>
//
//                                             <small>
//                                                 Booking Date
//                                             </small>
//
//                                             <strong>
//                                                 {booking.date}
//                                             </strong>
//
//                                         </div>
//
//                                     </div>
//
//
//                                     <div className="booking-detail">
//
//                                         <span className="detail-icon">
//                                             🕒
//                                         </span>
//
//                                         <div>
//
//                                             <small>
//                                                 Booking Time
//                                             </small>
//
//                                             <strong>
//                                                 {booking.time}
//                                             </strong>
//
//                                         </div>
//
//                                     </div>
//
//                                 </div>
//
//
//                                 {/* ACTIONS */}
//
//                                 {booking.bookingStatus ===
//                                     "PENDING" && (
//
//                                     <div className="booking-actions">
//
//                                         <button
//                                             className="approve-btn"
//                                             disabled={
//                                                 processingId ===
//                                                 booking.id
//                                             }
//                                             onClick={() =>
//                                                 handleApprove(
//                                                     booking.id
//                                                 )
//                                             }
//                                         >
//
//                                             {processingId ===
//                                             booking.id
//                                                 ? "Processing..."
//                                                 : "✓ Accept"}
//
//                                         </button>
//
//
//                                         <button
//                                             className="reject-btn"
//                                             disabled={
//                                                 processingId ===
//                                                 booking.id
//                                             }
//                                             onClick={() =>
//                                                 handleReject(
//                                                     booking.id
//                                                 )
//                                             }
//                                         >
//
//                                             {processingId ===
//                                             booking.id
//                                                 ? "Processing..."
//                                                 : "✕ Reject"}
//
//                                         </button>
//
//                                     </div>
//
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
// export default OwnerBookings;


import React, { useEffect, useState } from "react";
import ownerService from "../../services/ownerService";
import "../../styles/OwnerBookings.css";

const OwnerBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [processingId, setProcessingId] = useState(null);


    /* =========================================
       LOAD BOOKINGS
    ========================================= */

    useEffect(() => {
        loadBookings();
    }, []);


    const loadBookings = async () => {

        try {

            setLoading(true);
            setMessage("");

            const data =
                await ownerService.getBookings();

            console.log(
                "Owner bookings:",
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

            setBookings([]);

            setMessage(
                error.response?.data?.message ||
                error.response?.data ||
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

            await ownerService.approveBooking(
                bookingId
            );

            setMessage(
                "Booking approved successfully."
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
                "Failed to approve booking."
            );

        } finally {

            setProcessingId(null);
        }
    };


    /* =========================================
       REJECT BOOKING
    ========================================= */

    const handleReject = async (bookingId) => {

        try {

            setProcessingId(bookingId);
            setMessage("");

            await ownerService.rejectBooking(
                bookingId
            );

            setMessage(
                "Booking rejected successfully."
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
                "Failed to reject booking."
            );

        } finally {

            setProcessingId(null);
        }
    };


    /* =========================================
       FORMAT TIME
    ========================================= */

    const formatTime = (time) => {

        if (!time) {
            return "N/A";
        }

        return time.substring(0, 5);
    };


    /* =========================================
       LOADING
    ========================================= */

    if (loading) {

        return (

            <div className="owner-bookings-page">

                <div className="owner-bookings-loading">

                    <div className="owner-bookings-spinner"></div>

                    <p>
                        Loading booking requests...
                    </p>

                </div>

            </div>
        );
    }


    /* =========================================
       PAGE
    ========================================= */

    return (

        <div className="owner-bookings-page">

            <div className="owner-bookings-container">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="owner-bookings-header">

                    <div>

                        <span className="page-label">
                            OWNER DASHBOARD
                        </span>

                        <h1>
                            Booking Requests
                        </h1>

                        <p>
                            Review and manage booking
                            requests for your venues.
                        </p>

                    </div>


                    <div className="booking-count">

                        <strong>
                            {bookings.length}
                        </strong>

                        <span>
                            Total Bookings
                        </span>

                    </div>

                </div>


                {/* =================================
                    MESSAGE
                ================================= */}

                {message && (

                    <div className="owner-bookings-message">

                        {message}

                    </div>

                )}


                {/* =================================
                    EMPTY STATE
                ================================= */}

                {bookings.length === 0 ? (

                    <div className="no-bookings">

                        <div className="no-bookings-icon">
                            📅
                        </div>

                        <h2>
                            No Booking Requests
                        </h2>

                        <p>
                            When customers book one of
                            your venues, their requests
                            will appear here.
                        </p>

                    </div>

                ) : (


                    /* =================================
                       BOOKINGS
                    ================================= */

                    <div className="owner-bookings-list">

                        {bookings.map((booking) => {

                            const slot =
                                booking.timeSlot;

                            const status =
                                booking.bookingStatus ||
                                "UNKNOWN";


                            return (

                                <div
                                    className="owner-booking-card"
                                    key={booking.id}
                                >


                                    {/* CARD HEADER */}

                                    <div className="booking-card-top">

                                        <div>

                                            <span className="booking-id">
                                                Booking #{booking.id}
                                            </span>

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
                                            className={`booking-status ${status.toLowerCase()}`}
                                        >
                                            {status}
                                        </span>

                                    </div>


                                    {/* DETAILS */}

                                    <div className="booking-details">


                                        {/* CUSTOMER */}

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

                                                {booking.user?.email && (

                                                    <span className="detail-sub">
                                                        {booking.user.email}
                                                    </span>

                                                )}

                                            </div>

                                        </div>


                                        {/* DATE */}

                                        <div className="booking-detail">

                                            <span className="detail-icon">
                                                📅
                                            </span>

                                            <div>

                                                <small>
                                                    Booking Date
                                                </small>

                                                <strong>

                                                    {slot?.slotDate ||
                                                        booking.bookingDate ||
                                                        booking.date ||
                                                        "N/A"}

                                                </strong>

                                            </div>

                                        </div>


                                        {/* TIME */}

                                        <div className="booking-detail">

                                            <span className="detail-icon">
                                                🕒
                                            </span>

                                            <div>

                                                <small>
                                                    Time Slot
                                                </small>

                                                <strong>

                                                    {slot ? (

                                                        <>
                                                            {formatTime(
                                                                slot.startTime
                                                            )}

                                                            {" - "}

                                                            {formatTime(
                                                                slot.endTime
                                                            )}
                                                        </>

                                                    ) : (

                                                        booking.bookingTime ||
                                                        booking.time ||
                                                        "N/A"

                                                    )}

                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ACTIONS */}

                                    {status === "PENDING" && (

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


                                    {/* ACCEPTED */}

                                    {status === "ACCEPTED" && (

                                        <div className="booking-approved">

                                            ✓ This booking has been
                                            accepted.

                                        </div>

                                    )}


                                    {/* REJECTED */}

                                    {status === "REJECTED" && (

                                        <div className="booking-rejected">

                                            ✕ This booking has been
                                            rejected.

                                        </div>

                                    )}

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>
    );
};

export default OwnerBookings;