// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import userService from "../../services/userService";
// import "../../styles/UserVenues.css";
//
// const UserVenues = () => {
//
//     const [venues, setVenues] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         loadVenues();
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
//     if (loading) {
//         return (
//             <div className="venues-loading">
//                 <div className="venues-spinner"></div>
//                 <p>Loading venues...</p>
//             </div>
//         );
//     }
//
//     return (
//
//         <div className="venues-page">
//
//             <div className="venues-container">
//
//                 {/* PAGE HEADER */}
//
//                 <div className="venues-header">
//
//                     <h1>
//                         Available Venues
//                     </h1>
//
//                     <p>
//                         Find the perfect space for your
//                         next event.
//                     </p>
//
//                 </div>
//
//
//                 {/* ERROR MESSAGE */}
//
//                 {message && (
//                     <div className="venues-message">
//                         {message}
//                     </div>
//                 )}
//
//
//                 {/* EMPTY */}
//
//                 {venues.length === 0 ? (
//
//                     <div className="no-venues">
//
//                         <div className="no-venues-icon">
//                             🏢
//                         </div>
//
//                         <h2>
//                             No venues available
//                         </h2>
//
//                         <p>
//                             There are currently no venues
//                             available for booking.
//                         </p>
//
//                     </div>
//
//                 ) : (
//
//                     /* VENUE GRID */
//
//                     <div className="venue-grid">
//
//                         {venues.map((venue) =>
//                             (
//                             <div
//                                 className="venue-card"
//                                 key={venue.id}
//                             >
//
//                                 {/* CARD TOP */}
//
//                                 <div className="venue-card-top">
//
//                                     <div className="venue-icon">
//                                         🏢
//                                     </div>
//
//                                     <span
//                                         className={`venue-status ${
//                                             venue.venueStatus === "AVAILABLE"
//                                                 ? "available"
//                                                 : "unavailable"
//                                         }`}
//                                     >
//                                         {venue.venueStatus}
//                                     </span>
//
//                                 </div>
//
//
//                                 {/* CARD CONTENT */}
//
//                                 <div className="venue-card-content">
//
//                                     <h2>
//                                         {venue.venueName}
//                                     </h2>
//
//
//                                     <div className="venue-info">
//
//                                         <span className="info-icon">
//                                             📍
//                                         </span>
//
//                                         <div>
//
//                                             <small>
//                                                 Location
//                                             </small>
//
//                                             <p>
//                                                 {venue.location}
//                                             </p>
//
//                                         </div>
//
//                                     </div>
//
//
//                                     <div className="venue-info">
//
//                                         <span className="info-icon">
//                                             👥
//                                         </span>
//
//                                         <div>
//
//                                             <small>
//                                                 Capacity
//                                             </small>
//
//                                             <p>
//                                                 {venue.capacity} people
//                                             </p>
//
//                                         </div>
//
//                                     </div>
//
//
//                                     {/* PRICE */}
//
//                                     <div className="venue-price-section">
//
//                                         <span>
//                                             Starting from
//                                         </span>
//
//                                         <strong>
//                                             ₹{venue.price}
//                                         </strong>
//
//                                     </div>
//
//
//                                     {/* BOOK BUTTON */}
//
//                                   <button
//                                       className="book-btn"
//                                       onClick={() =>
//                                           navigate(`/user/book/${venue.id}`, {
//                                               state: { venue }
//                                           })
//                                       }
//                                   >
//                                       Book Now
//                                   </button>
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
//             </div>
//
//         </div>
//     );
// };
//
// export default UserVenues;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import "../../styles/UserVenues.css";

const UserVenues = () => {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadVenues();
    }, []);

    const loadVenues = async () => {

        try {

            const response = await userService.getVenues();

            console.log("VENUE RESPONSE:", response.data);

            if (Array.isArray(response.data)) {

                setVenues(response.data);

            } else {

                console.error(
                    "Invalid venue response:",
                    response.data
                );

                setVenues([]);

                setMessage("Invalid venue data received");
            }

        } catch (error) {

            console.error("Venue error:", error);

            setMessage(
                error.response?.data ||
                "Failed to load venues"
            );

        } finally {

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <div className="venues-loading">
                <div className="venues-spinner"></div>

                <p>
                    Loading venues...
                </p>
            </div>
        );
    }


    return (

        <div className="venues-page">

            <div className="venues-container">

                {/* HEADER */}

                <div className="venues-header">

                    <h1>
                        Available Venues
                    </h1>

                    <p>
                        Find the perfect space for
                        your next event.
                    </p>

                </div>


                {/* ERROR */}

                {message && (

                    <div className="venues-message">
                        {message}
                    </div>

                )}


                {/* NO VENUES */}

                {venues.length === 0 ? (

                    <div className="no-venues">

                        <div className="no-venues-icon">
                            🏢
                        </div>

                        <h2>
                            No venues available
                        </h2>

                        <p>
                            There are currently no
                            venues available.
                        </p>

                    </div>

                ) : (

                    <div className="venue-grid">

                        {venues.map((venue) => (

                            <div
                                className="venue-card"
                                key={venue.id}
                            >

                                {/* TOP */}

                                <div className="venue-card-top">

                                    <div className="venue-icon">
                                        🏢
                                    </div>

                                   <span
                                       className={`venue-status ${
                                           venue.venueStatus?.toUpperCase() === "AVAILABLE"
                                               ? "available"
                                               : "unavailable"
                                       }`}
                                   >
                                       {venue.venueStatus}
                                   </span>

                                </div>


                                {/* CONTENT */}

                                <div className="venue-card-content">

                                    <h2>
                                        {venue.venueName}
                                    </h2>


                                    <div className="venue-info">

                                        <span>
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

                                        <span>
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


                                    <div className="venue-price-section">

                                        <span>
                                            Starting from
                                        </span>

                                        <strong>
                                            ₹{venue.price}
                                        </strong>

                                    </div>


                                    {/* BOOK */}

                                    <button
                                        className="book-btn"
                                        disabled={
                                            venue.venueStatus !== "AVAILABLE"
                                        }
                                        onClick={() => {

                                            console.log(
                                                "SELECTED VENUE:",
                                                venue
                                            );

                                            navigate(
                                                `/user/book/${venue.id}`,
                                                {
                                                    state: {
                                                        venue: venue
                                                    }
                                                }
                                            );

                                        }}
                                    >

                                        {venue.venueStatus === "AVAILABLE"
                                            ? "Book Now"
                                            : "Unavailable"}

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