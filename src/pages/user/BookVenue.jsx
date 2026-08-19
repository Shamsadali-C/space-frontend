// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import userService from "../../services/userService";
//
// const BookVenue = () => {
//
//     const location = useLocation();
//     const navigate = useNavigate();
//
//     const venue = location.state?.venue;
//
//     const [date, setDate] = useState("");
//     const [slots, setSlots] = useState([]);
//     const [loading, setLoading] = useState(false);
//
//     useEffect(() => {
//
//         if (!venue || !date) {
//             return;
//         }
//
//         loadSlots();
//
//     }, [date]);
//
//     const loadSlots = async () => {
//
//         try {
//
//             setLoading(true);
//
//             const response =
//                 await userService.getTimeSlots(
//                     venue.id,
//                     date
//                 );
//
//             setSlots(response.data);
//
//         } catch (error) {
//
//             console.error(error);
//
//         } finally {
//
//             setLoading(false);
//         }
//     };
//
//     const bookSlot = async (slotId) => {
//
//         try {
//
//             await userService.createBooking(slotId);
//
//             alert(
//                 "Booking request sent successfully"
//             );
//
//             loadSlots();
//
//         } catch (error) {
//
//             console.error(error);
//
//             alert(
//                 error.response?.data ||
//                 "Booking failed"
//             );
//         }
//     };
//
//     if (!venue) {
//
//         return (
//             <h2>
//                 Venue not found
//             </h2>
//         );
//     }
//
//     return (
//
//         <div>
//
//             <h1>
//                 Book {venue.venueName}
//             </h1>
//
//             <p>
//                 {venue.location}
//             </p>
//
//             <label>
//                 Select Date
//             </label>
//
//             <input
//                 type="date"
//                 value={date}
//                 onChange={(e) =>
//                     setDate(e.target.value)
//                 }
//             />
//
//             <h2>
//                 Time Slots
//             </h2>
//
//             {loading && (
//                 <p>
//                     Loading slots...
//                 </p>
//             )}
//
//             <div>
//
//                 {slots.map((slot) => (
//
//                     <div
//                         key={slot.id}
//                         style={{
//                             border: "1px solid #ccc",
//                             padding: "15px",
//                             margin: "10px"
//                         }}
//                     >
//
//                         <h3>
//                             {slot.startTime}
//                             {" - "}
//                             {slot.endTime}
//                         </h3>
//
//                         <p>
//                             {slot.status}
//                         </p>
//
//                         {slot.status === "AVAILABLE" && (
//
//                             <button
//                                 onClick={() =>
//                                     bookSlot(slot.id)
//                                 }
//                             >
//                                 Book This Slot
//                             </button>
//
//                         )}
//
//                     </div>
//
//                 ))}
//
//             </div>
//
//         </div>
//     );
// };
//
// export default BookVenue;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import "../../styles/BookVenue.css";

const BookVenue = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const venue = location.state?.venue;

    const [date, setDate] = useState("");
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookingSlot, setBookingSlot] = useState(null);
    const [message, setMessage] = useState("");


    // ===============================
    // DEBUG
    // ===============================

    console.log("BOOKING PAGE VENUE:", venue);

    console.log(
        "VENUE ID:",
        venue?.id
    );


    // ===============================
    // LOAD SLOTS
    // ===============================

    useEffect(() => {

        if (!venue?.id || !date) {
            return;
        }

        loadSlots();

    }, [venue, date]);


    const loadSlots = async () => {

        try {

            setLoading(true);

            setMessage("");

            console.log(
                "Loading slots:",
                venue.id,
                date
            );

            const response =
                await userService.getTimeSlots(
                    venue.id,
                    date
                );

            console.log(
                "SLOT RESPONSE:",
                response.data
            );


            if (Array.isArray(response.data)) {

                setSlots(response.data);

            } else {

                setSlots([]);

                setMessage(
                    "Invalid slot data received"
                );
            }

        } catch (error) {

            console.error(
                "Slot loading error:",
                error
            );

            setSlots([]);

            setMessage(
                error.response?.data ||
                "Failed to load time slots"
            );

        } finally {

            setLoading(false);
        }
    };


    // ===============================
    // BOOK SLOT
    // ===============================

    const bookSlot = async (slotId) => {

        try {

            setBookingSlot(slotId);

            await userService.createBooking(
                slotId
            );

            alert(
                "Booking request sent successfully!"
            );

            // Reload slots
            await loadSlots();

        } catch (error) {

            console.error(
                "Booking error:",
                error
            );

            alert(
                error.response?.data ||
                "Booking failed"
            );

        } finally {

            setBookingSlot(null);
        }
    };


    // ===============================
    // INVALID VENUE
    // ===============================

    if (!venue || !venue.id) {

        return (

            <div className="booking-error">

                <h2>
                    Invalid venue data received
                </h2>

                <button
                    onClick={() =>
                        navigate("/user/venues")
                    }
                >
                    Back to Venues
                </button>

            </div>

        );
    }


    return (

        <div className="book-venue-page">

            <div className="book-venue-container">


                {/* HEADER */}

                <div className="booking-header">

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate("/user/venues")
                        }
                    >
                        ← Back
                    </button>


                    <h1>
                        Book {venue.venueName}
                    </h1>

                    <p>
                        📍 {venue.location}
                    </p>

                </div>


                {/* VENUE DETAILS */}

                <div className="booking-venue-info">

                    <div>

                        <span>
                            Capacity
                        </span>

                        <strong>
                            👥 {venue.capacity}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Price
                        </span>

                        <strong>
                            ₹{venue.price}
                        </strong>

                    </div>

                </div>


                {/* DATE */}

                <div className="date-section">

                    <label>
                        Select Booking Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        min={
                            new Date()
                                .toISOString()
                                .split("T")[0]
                        }
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                    />

                </div>


                {/* SLOTS */}

                {date && (

                    <div className="slots-section">

                        <h2>
                            Available Time Slots
                        </h2>


                        {loading && (

                            <div className="slot-loading">
                                Loading time slots...
                            </div>

                        )}


                        {message && !loading && (

                            <div className="slot-message">
                                {message}
                            </div>

                        )}


                        {!loading &&
                            !message &&
                            slots.length === 0 && (

                                <div className="no-slots">

                                    <h3>
                                        No time slots available
                                    </h3>

                                    <p>
                                        No slots have been
                                        created for this date.
                                    </p>

                                </div>

                            )}


                        <div className="slots-grid">

                            {slots.map((slot) => (

                                <div
                                    className={`slot-card ${
                                        slot.status === "AVAILABLE"
                                            ? "slot-available"
                                            : "slot-booked"
                                    }`}
                                    key={slot.id}
                                >

                                    <div className="slot-time">

                                        <span>
                                            🕐
                                        </span>

                                        <strong>

                                            {slot.startTime}

                                            {" - "}

                                            {slot.endTime}

                                        </strong>

                                    </div>


                                    <div className="slot-status">

                                        {slot.status}

                                    </div>


                                    {slot.status ===
                                        "AVAILABLE" && (

                                        <button
                                            className="slot-book-btn"
                                            disabled={
                                                bookingSlot ===
                                                slot.id
                                            }
                                            onClick={() =>
                                                bookSlot(
                                                    slot.id
                                                )
                                            }
                                        >

                                            {bookingSlot === slot.id
                                                ? "Booking..."
                                                : "Book This Slot"}

                                        </button>

                                    )}


                                    {slot.status ===
                                        "BOOKED" && (

                                        <button
                                            className="slot-disabled-btn"
                                            disabled
                                        >
                                            Already Booked
                                        </button>

                                    )}

                                </div>

                            ))}

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default BookVenue;