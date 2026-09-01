//
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
//             console.log("VENUE RESPONSE:", response.data);
//
//             if (Array.isArray(response.data)) {
//
//                 setVenues(response.data);
//
//             } else {
//
//                 console.error(
//                     "Invalid venue response:",
//                     response.data
//                 );
//
//                 setVenues([]);
//
//                 setMessage("Invalid venue data received");
//             }
//
//         } catch (error) {
//
//             console.error("Venue error:", error);
//
//             setMessage(
//                 error.response?.data ||
//                 "Failed to load venues"
//             );
//
//         } finally {
//
//             setLoading(false);
//         }
//     };
//
//
//     if (loading) {
//
//         return (
//             <div className="venues-loading">
//                 <div className="venues-spinner"></div>
//
//                 <p>
//                     Loading venues...
//                 </p>
//             </div>
//         );
//     }
//
//
//     return (
//
//         <div className="venues-page">
//
//             <div className="venues-container">
//
//                 {/* HEADER */}
//
//                 <div className="venues-header">
//
//                     <h1>
//                         Available Venues
//                     </h1>
//
//                     <p>
//                         Find the perfect space for
//                         your next event.
//                     </p>
//
//                 </div>
//
//
//                 {/* ERROR */}
//
//                 {message && (
//
//                     <div className="venues-message">
//                         {message}
//                     </div>
//
//                 )}
//
//
//                 {/* NO VENUES */}
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
//                             There are currently no
//                             venues available.
//                         </p>
//
//                     </div>
//
//                 ) : (
//
//                     <div className="venue-grid">
//
//                         {venues.map((venue) => (
//
//                             <div
//                                 className="venue-card"
//                                 key={venue.id}
//                             >
//
//                                 {/* TOP */}
//
//                                 <div className="venue-card-top">
//
//                                     <div className="venue-icon">
//                                         🏢
//                                     </div>
//
//                                    <span
//                                        className={`venue-status ${
//                                            venue.venueStatus?.toUpperCase() === "AVAILABLE"
//                                                ? "available"
//                                                : "unavailable"
//                                        }`}
//                                    >
//                                        {venue.venueStatus}
//                                    </span>
//
//                                 </div>
//
//
//                                 {/* CONTENT */}
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
//                                         <span>
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
//                                         <span>
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
//                                     {/* BOOK */}
//
//                                     <button
//                                         className="book-btn"
//                                         disabled={
//                                             venue.venueStatus !== "AVAILABLE"
//                                         }
//                                         onClick={() => {
//
//                                             console.log(
//                                                 "SELECTED VENUE:",
//                                                 venue
//                                             );
//
//                                             navigate(
//                                                 `/user/book/${venue.id}`,
//                                                 {
//                                                     state: {
//                                                         venue: venue
//                                                     }
//                                                 }
//                                             );
//
//                                         }}
//                                     >
//
//                                         {venue.venueStatus === "AVAILABLE"
//                                             ? "Book Now"
//                                             : "Unavailable"}
//
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
//             </div>
//
//         </div>
//     );
// };
//
// export default UserVenues;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/userService";
import "../../styles/UserVenues.css";


const UserVenues = () => {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedVenue, setSelectedVenue] =
        useState(null);

    const [selectedDate, setSelectedDate] =
        useState("");

    const [slots, setSlots] = useState([]);

    const [loadingSlots, setLoadingSlots] =
        useState(false);

    const [bookingLoading, setBookingLoading] =
        useState(null);

    const [message, setMessage] = useState("");


    /*
    =====================================================
    LOAD VENUES
    =====================================================
    */

    useEffect(() => {
        loadVenues();
    }, []);


    const loadVenues = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await userService.getVenues();

            console.log("User venues:", data);

            setVenues(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load venues:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load venues."
            );

        } finally {

            setLoading(false);
        }
    };


    /*
    =====================================================
    SELECT VENUE
    =====================================================
    */

    const handleSelectVenue = (venue) => {

        setSelectedVenue(venue);
        setSelectedDate("");
        setSlots([]);
        setMessage("");
    };


    /*
    =====================================================
    DATE CHANGE
    =====================================================
    */

    const handleDateChange = async (e) => {

        const date = e.target.value;

        setSelectedDate(date);
        setSlots([]);
        setMessage("");

        if (!date || !selectedVenue) {
            return;
        }


        try {

            setLoadingSlots(true);

            const data =
                await userService.getTimeSlots(
                    selectedVenue.id,
                    date
                );

            console.log(
                "Time slots:",
                data
            );

            setSlots(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load slots:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load time slots."
            );

        } finally {

            setLoadingSlots(false);
        }
    };


    /*
    =====================================================
    BOOK SLOT
    =====================================================
    */

    const handleBooking = async (slotId) => {

        const confirmBooking =
            window.confirm(
                "Do you want to request this time slot?"
            );

        if (!confirmBooking) {
            return;
        }


        try {

            setBookingLoading(slotId);
            setMessage("");

            await userService.createBooking(slotId);


            /*
            =============================================
            BOOKING SUCCESS
            =============================================
            */

            setMessage(
                "Booking request sent successfully!"
            );


            /*
            =============================================
            RELOAD SLOTS
            =============================================
            */

            if (
                selectedDate &&
                selectedVenue
            ) {

                const updatedSlots =
                    await userService.getTimeSlots(
                        selectedVenue.id,
                        selectedDate
                    );

                setSlots(
                    Array.isArray(updatedSlots)
                        ? updatedSlots
                        : []
                );
            }


        } catch (error) {

            console.error(
                "Booking error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to create booking."
            );

        } finally {

            setBookingLoading(null);
        }
    };


    /*
    =====================================================
    LOADING
    =====================================================
    */

    if (loading) {

        return (

            <div className="user-loading">

                <div className="user-spinner"></div>

                <h2>
                    Finding available spaces...
                </h2>

            </div>
        );
    }


    /*
    =====================================================
    PAGE
    =====================================================
    */

    return (

        <div className="user-layout">


            {/* =========================================
                SIDEBAR
            ========================================= */}

            <aside className="user-sidebar">

                <div className="user-logo">
                    Book My Space
                </div>

                <div className="user-role">
                    USER PANEL
                </div>


                <nav>

                    <Link to="/user">
                        🏠 Dashboard
                    </Link>

                    <Link
                        to="/user/venues"
                        className="active"
                    >
                        🏢 Find Venues
                    </Link>

                    <Link to="/user/bookings">
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


            {/* =========================================
                MAIN
            ========================================= */}

            <main className="user-main">


                {/* PAGE HEADER */}

{/*                 <div className="user-page-header"> */}

{/*                     <div> */}

{/*                         <span> */}
{/*                             FIND YOUR SPACE */}
{/*                         </span> */}

{/*                         <h1> */}
{/*                             Available Venues */}
{/*                         </h1> */}

{/*                         <p> */}
{/*                             Discover the perfect venue */}
{/*                             for your next event. */}
{/*                         </p> */}

{/*                     </div> */}

{/*                 </div> */}


                {/* ERROR */}

                {error && (

                    <div className="user-error">
                        {error}
                    </div>

                )}


                {/* MESSAGE */}

                {message && (

                    <div className="user-message">
                        ✓ {message}
                    </div>

                )}


                {/* =====================================
                    VENUES
                ===================================== */}

                {venues.length === 0 ? (

                    <div className="user-empty">

                        <div>
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

                    <div className="user-venue-grid">

                        {venues.map((venue) => (

                            <VenueCard
                                key={venue.id}
                                venue={venue}
                                onSelect={handleSelectVenue}
                            />

                        ))}

                    </div>

                )}


                {/* =====================================
                    SLOT SECTION
                ===================================== */}

                {selectedVenue && (

                    <section className="slot-section">


                        {/* SLOT HEADER */}

                        <div className="slot-header">

                            <div>

                                <span>
                                    BOOK YOUR SPACE
                                </span>

                                <h2>
                                    {selectedVenue.venueName}
                                </h2>

                                <p>
                                    📍{" "}
                                    {selectedVenue.location}
                                </p>

                            </div>


                            <button
                                type="button"
                                className="close-slot-btn"
                                onClick={() => {

                                    setSelectedVenue(null);
                                    setSlots([]);
                                    setSelectedDate("");
                                    setMessage("");

                                }}
                            >
                                ✕
                            </button>

                        </div>


                        {/* =================================
                            DATE SELECTOR
                        ================================= */}

                        <div className="date-selector">

                            <label>
                                Select Booking Date
                            </label>

                            <input
                                type="date"
                                value={selectedDate}
                                min={
                                    new Date()
                                        .toISOString()
                                        .split("T")[0]
                                }
                                onChange={
                                    handleDateChange
                                }
                            />

                        </div>


                        {/* =================================
                            LOADING SLOTS
                        ================================= */}

                        {loadingSlots ? (

                            <div className="slot-loading">

                                <div className="user-spinner"></div>

                                <p>
                                    Loading available
                                    time slots...
                                </p>

                            </div>


                        ) : selectedDate &&
                          slots.length === 0 ? (


                            /* =================================
                               NO SLOTS
                            ================================= */

                            <div className="no-slots">

                                <div>
                                    🕐
                                </div>

                                <h3>
                                    No time slots available
                                </h3>

                                <p>
                                    There are no slots
                                    available for this date.
                                </p>

                            </div>


                        ) : (


                            /* =================================
                               SLOT GRID
                            ================================= */

                            <div className="slot-grid">

                                {slots.map((slot) => {


                                    /*
                                    =========================================
                                    CHECK SLOT AVAILABILITY
                                    =========================================
                                    */

                                    const slotStatus =
                                        slot.status?.toUpperCase();


                                    const isUnavailable =
                                        slotStatus === "UNAVAILABLE" ||
                                        slotStatus === "BOOKED" ||
                                        slotStatus === "PENDING";


                                    return (

                                        <div
                                            className={`slot-card ${
                                                isUnavailable
                                                    ? "slot-unavailable"
                                                    : ""
                                            }`}
                                            key={slot.id}
                                        >


                                            {/* SLOT ICON */}

                                            <div className="slot-icon">
                                                🕐
                                            </div>


                                            {/* SLOT INFORMATION */}

                                            <div className="slot-info">

                                                <h3>
                                                    {slot.startTime}
                                                    {" - "}
                                                    {slot.endTime}
                                                </h3>


                                                <span
                                                    className={
                                                        isUnavailable
                                                            ? "status-unavailable"
                                                            : "status-available"
                                                    }
                                                >
                                                    {isUnavailable
                                                        ? "UNAVAILABLE"
                                                        : "AVAILABLE"}
                                                </span>

                                            </div>


                                            {/* BOOK BUTTON */}

                                            <button
                                                type="button"
                                                className={`book-slot-btn ${
                                                    isUnavailable
                                                        ? "unavailable-btn"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleBooking(
                                                        slot.id
                                                    )
                                                }
                                                disabled={
                                                    isUnavailable ||
                                                    bookingLoading ===
                                                        slot.id
                                                }
                                            >

                                                {bookingLoading ===
                                                slot.id

                                                    ? "Booking..."

                                                    : isUnavailable

                                                        ? "Unavailable"

                                                        : "Book Now"}

                                            </button>

                                        </div>

                                    );

                                })}

                            </div>

                        )}

                    </section>

                )}

            </main>

        </div>
    );
};


/*
=========================================================
VENUE CARD
=========================================================
*/

const VenueCard = ({
    venue,
    onSelect
}) => {

    const [image, setImage] =
        useState(null);


    useEffect(() => {

        loadImage();

    }, [venue.id]);


    const loadImage = async () => {

        try {

            const images =
                await userService.getVenueImages(
                    venue.id
                );


            if (
                Array.isArray(images) &&
                images.length > 0
            ) {

                setImage(
                    images[0].imageUrl ||
                    images[0].imagePath ||
                    images[0].url ||
                    null
                );
            }

        } catch (error) {

            console.error(
                "Failed to load venue image:",
                error
            );
        }
    };


    return (

        <div className="user-venue-card">


            {/* IMAGE */}

            <div className="venue-image">

                {image ? (

                    <img
                        src={image}
                        alt={venue.venueName}
                    />

                ) : (

                    <div className="venue-image-placeholder">
                        🏢
                    </div>

                )}

            </div>


            {/* CONTENT */}

            <div className="venue-card-content">


                <div className="venue-card-top">

                    <span className="venue-available">

                        {venue.venueStatus ||
                            venue.status ||
                            "AVAILABLE"}

                    </span>

                </div>


                <h2>
                    {venue.venueName}
                </h2>


                <p className="venue-location">
                    📍 {venue.location}
                </p>


                <div className="venue-meta">

                    <span>
                        👥 {venue.capacity}
                    </span>

                    <strong>
                        ₹{venue.price}
                    </strong>

                </div>


                <button
                    type="button"
                    className="view-slots-btn"
                    onClick={() =>
                        onSelect(venue)
                    }
                >
                    View Time Slots →
                </button>

            </div>

        </div>
    );
};


export default UserVenues;
