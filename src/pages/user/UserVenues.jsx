// import React, { useEffect, useState } from "react";
// import userService from "../../services/userService";
// import bookingService from "../../services/bookingService";
//
//
// const UserVenues = () => {
//
//     const [venues, setVenues] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//
//     useEffect(() => {
//
//         loadVenues();
//
//     }, []);
//
//     const loadVenues = async () => {
//
//         try {
//
//             const response = await userService.getVenues();
//
//             setVenues(response.data);
//
//         } catch (error) {
//
//             console.error(error);
//
//             setMessage("Failed to load venues");
//
//         } finally {
//
//             setLoading(false);
//         }
//     };
//
//     const handleBooking = async (venueId) => {
//
//         try {
//
//             const profileResponse =
//                 await userService.getProfile();
//
//             const userId = profileResponse.data.id;
//
//             await bookingService.createBooking(
//                 userId,
//                 venueId
//             );
//
//             alert("Booking created successfully");
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
//     if (loading) {
//         return <h2>Loading venues...</h2>;
//     }
//
//     return (
//         <div>
//
//             <h1>Available Venues</h1>
//
//             {message && <p>{message}</p>}
//
//             {venues.length === 0 ? (
//
//                 <p>No venues available.</p>
//
//             ) : (
//
//                 venues.map((venue) => (
//
//                   <div className="venue-grid">
//
//                       {venues.map((venue) => (
//
//                           <div
//                               className="venue-card"
//                               key={venue.id}
//                           >
//
//                               <div className="venue-card-content">
//
//                                   <h2>{venue.venueName}</h2>
//
//                                   <p className="venue-info">
//                                       <strong>Location:</strong>{" "}
//                                       {venue.location}
//                                   </p>
//
//                                   <p className="venue-info">
//                                       <strong>Capacity:</strong>{" "}
//                                       {venue.capacity}
//                                   </p>
//
//                                   <p className="venue-price">
//                                       ₹{venue.price}
//                                   </p>
//
//                                   <span className="venue-status">
//                                       {venue.venueStatus}
//                                   </span>
//
//                                   <button
//                                       className="book-button"
//                                       onClick={() =>
//                                           handleBooking(venue.id)
//                                       }
//                                       disabled={
//                                           venue.venueStatus !== "AVAILABLE"
//                                       }
//                                   >
//                                       {venue.venueStatus === "AVAILABLE"
//                                           ? "Book Now"
//                                           : "Not Available"}
//                                   </button>
//
//                               </div>
//
//                           </div>
//
//                       ))}
//
//                   </div>
//                 ))
//             )}
//
//         </div>
//     );
// };
//
// export default UserVenues;

import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import bookingService from "../../services/bookingService";
import "../../styles/UserVenues.css";

const UserVenues = () => {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadVenues();
    }, []);

    const loadVenues = async () => {

        try {

            const response = await userService.getVenues();

            setVenues(response.data);

        } catch (error) {

            console.error(error);

            setMessage("Failed to load venues");

        } finally {

            setLoading(false);
        }
    };

    const handleBooking = async (venueId) => {

        try {

            const profileResponse =
                await userService.getProfile();

            const userId = profileResponse.data.id;

            await bookingService.createBooking(
                userId,
                venueId
            );

            alert("Booking created successfully");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Booking failed"
            );
        }
    };

    if (loading) {
        return (
            <div className="venues-loading">
                <div className="venues-spinner"></div>
                <p>Loading venues...</p>
            </div>
        );
    }

    return (

        <div className="venues-page">

            <div className="venues-container">

                {/* PAGE HEADER */}

                <div className="venues-header">

                    <h1>
                        Available Venues
                    </h1>

                    <p>
                        Find the perfect space for your
                        next event.
                    </p>

                </div>


                {/* ERROR MESSAGE */}

                {message && (
                    <div className="venues-message">
                        {message}
                    </div>
                )}


                {/* EMPTY */}

                {venues.length === 0 ? (

                    <div className="no-venues">

                        <div className="no-venues-icon">
                            🏢
                        </div>

                        <h2>
                            No venues available
                        </h2>

                        <p>
                            There are currently no venues
                            available for booking.
                        </p>

                    </div>

                ) : (

                    /* VENUE GRID */

                    <div className="venue-grid">

                        {venues.map((venue) => (

                            <div
                                className="venue-card"
                                key={venue.id}
                            >

                                {/* CARD TOP */}

                                <div className="venue-card-top">

                                    <div className="venue-icon">
                                        🏢
                                    </div>

                                    <span
                                        className={`venue-status ${
                                            venue.venueStatus === "AVAILABLE"
                                                ? "available"
                                                : "unavailable"
                                        }`}
                                    >
                                        {venue.venueStatus}
                                    </span>

                                </div>


                                {/* CARD CONTENT */}

                                <div className="venue-card-content">

                                    <h2>
                                        {venue.venueName}
                                    </h2>


                                    <div className="venue-info">

                                        <span className="info-icon">
                                            📍
                                        </span>

                                        <div>

                                            <small>
                                                Location
                                            </small>

                                            <p>
                                                {venue.location}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="venue-info">

                                        <span className="info-icon">
                                            👥
                                        </span>

                                        <div>

                                            <small>
                                                Capacity
                                            </small>

                                            <p>
                                                {venue.capacity} people
                                            </p>

                                        </div>

                                    </div>


                                    {/* PRICE */}

                                    <div className="venue-price-section">

                                        <span>
                                            Starting from
                                        </span>

                                        <strong>
                                            ₹{venue.price}
                                        </strong>

                                    </div>


                                    {/* BOOK BUTTON */}

                                    <button
                                        className="book-button"
                                        onClick={() =>
                                            handleBooking(
                                                venue.id
                                            )
                                        }
                                        disabled={
                                            venue.venueStatus !==
                                            "AVAILABLE"
                                        }
                                    >

                                        {venue.venueStatus ===
                                        "AVAILABLE"
                                            ? "Book Now"
                                            : "Not Available"}

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default UserVenues;
