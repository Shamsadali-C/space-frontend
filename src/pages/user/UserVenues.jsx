import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/userService";
import "../../styles/UserVenues.css";
import VenueImageSlider from "../../components/VenueImageSlider";


const UserVenues = () => {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedVenue, setSelectedVenue] =
        useState(null);

    const [selectedDate, setSelectedDate] =
        useState("");

    const [slots, setSlots] =
        useState([]);

    const [loadingSlots, setLoadingSlots] =
        useState(false);

    const [bookingLoading, setBookingLoading] =
        useState(null);

    const [message, setMessage] =
        useState("");


    /* =========================================
       LOAD VENUES
    ========================================= */

    useEffect(() => {
        loadVenues();
    }, []);


    const loadVenues = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await userService.getVenues();

            console.log(
                "User venues:",
                data
            );

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

            setVenues([]);

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load venues."
            );

        } finally {

            setLoading(false);
        }
    };


    /* =========================================
       SELECT VENUE
    ========================================= */

    const handleSelectVenue = (venue) => {

        setSelectedVenue(venue);

        setSelectedDate("");

        setSlots([]);

        setMessage("");

    };


    /* =========================================
       DATE CHANGE
    ========================================= */

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

            setSlots([]);

            setMessage(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load time slots."
            );

        } finally {

            setLoadingSlots(false);
        }
    };


    /* =========================================
       BOOKING
    ========================================= */

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


            await userService.createBooking(
                slotId
            );


            setMessage(
                "Booking request sent successfully!"
            );


            /*
             * Reload slots after booking.
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


    /* =========================================
       CLOSE SLOT SECTION
    ========================================= */

    const closeSlotSection = () => {

        setSelectedVenue(null);

        setSelectedDate("");

        setSlots([]);

        setMessage("");

    };


    /* =========================================
       LOADING
    ========================================= */

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


    /* =========================================
       PAGE
    ========================================= */

    return (

        <div className="user-layout">


            {/* =====================================
                SIDEBAR
            ===================================== */}

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



            {/* =====================================
                MAIN
            ===================================== */}

            <main className="user-main">


                <div className="user-page-header">

                    <div>

                        <span className="user-page-label">
                            FIND YOUR SPACE
                        </span>


{/*                         <h1> */}
{/*                             Available Venues */}
{/*                         </h1> */}


{/*                         <p> */}
{/*                             Discover the perfect venue */}
{/*                             for your next event. */}
{/*                         </p> */}

                    </div>

                </div>



                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="user-error">

                        <strong>
                            Unable to load venues
                        </strong>

                        <p>
                            {error}
                        </p>


                        <button
                            type="button"
                            onClick={loadVenues}
                        >
                            Try Again
                        </button>

                    </div>

                )}



                {/* =================================
                    MESSAGE
                ================================= */}

                {message && (

                    <div className="user-message">

                        ✓ {message}

                    </div>

                )}



                {/* =================================
                    NO VENUES
                ================================= */}

                {!error &&
                venues.length === 0 ? (

                    <div className="user-empty">

                        <div className="user-empty-icon">
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


                    /* =================================
                       VENUE GRID
                    ================================= */

                    !error && (

                        <div className="user-venue-grid">

                            {venues.map((venue) => (

                                <VenueCard
                                    key={venue.id}
                                    venue={venue}
                                    onSelect={
                                        handleSelectVenue
                                    }
                                />

                            ))}

                        </div>

                    )

                )}




                {selectedVenue && (

                    <div className="slot-modal-overlay">

                        <div className="slot-modal">



                            <div className="slot-modal-header">

                                <div>

                                    <span className="slot-modal-label">
                                        BOOK YOUR SPACE
                                    </span>

                                    <h2>
                                        {selectedVenue.venueName}
                                    </h2>

                                    <p>
                                        📍 {selectedVenue.location || "Location not specified"}
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="close-slot-btn"
                                    onClick={closeSlotSection}
                                >
                                    ✕
                                </button>

                            </div>


                            {/* DATE */}

                            <div className="slot-date-section">

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
                                    onChange={handleDateChange}
                                />

                            </div>


                            {/* SLOTS */}

                            <div className="popup-slots-section">

                                {!selectedDate ? (

                                    <div className="popup-empty">

                                        <div className="popup-empty-icon">
                                            📅
                                        </div>

                                        <h3>
                                            Select a date
                                        </h3>

                                        <p>
                                            Choose a date to see available
                                            time slots.
                                        </p>

                                    </div>

                                ) : loadingSlots ? (

                                    <div className="popup-loading">

                                        <div className="user-spinner"></div>

                                        <p>
                                            Finding available slots...
                                        </p>

                                    </div>

                                ) : slots.length === 0 ? (

                                    <div className="popup-empty">

                                        <div className="popup-empty-icon">
                                            🕐
                                        </div>

                                        <h3>
                                            No time slots available
                                        </h3>

                                        <p>
                                            Try selecting another date.
                                        </p>

                                    </div>

                                ) : (

                                    <>

                                        <div className="slots-title">

                                            <div>
                                                Available Time Slots
                                            </div>

                                            <span>
                                                {slots.length} slots
                                            </span>

                                        </div>


                                        <div className="popup-slot-grid">

                                            {slots.map((slot) => {

                                                const slotStatus =
                                                    slot.status?.toUpperCase();

                                                const isUnavailable =
                                                    slotStatus === "UNAVAILABLE" ||
                                                    slotStatus === "BOOKED" ||
                                                    slotStatus === "PENDING";

                                                return (

                                                    <div
                                                        key={slot.id}
                                                        className={
                                                            `popup-slot-card ${
                                                                isUnavailable
                                                                    ? "popup-slot-unavailable"
                                                                    : ""
                                                            }`
                                                        }
                                                    >

                                                        <div className="popup-slot-time">

                                                            <span className="clock-icon">
                                                                🕐
                                                            </span>

                                                            <div>

                                                                <strong>
                                                                    {slot.startTime}
                                                                </strong>

                                                                <span>
                                                                    to
                                                                </span>

                                                                <strong>
                                                                    {slot.endTime}
                                                                </strong>

                                                            </div>

                                                        </div>


                                                        <span
                                                            className={
                                                                isUnavailable
                                                                    ? "popup-slot-status unavailable"
                                                                    : "popup-slot-status available"
                                                            }
                                                        >
                                                            {isUnavailable
                                                                ? "UNAVAILABLE"
                                                                : "AVAILABLE"}
                                                        </span>


                                                        <button
                                                            type="button"
                                                            className="popup-book-btn"
                                                            onClick={() =>
                                                                handleBooking(slot.id)
                                                            }
                                                            disabled={
                                                                isUnavailable ||
                                                                bookingLoading === slot.id
                                                            }
                                                        >

                                                            {bookingLoading === slot.id
                                                                ? "Sending..."
                                                                : isUnavailable
                                                                    ? "Unavailable"
                                                                    : "Book Now"
                                                            }

                                                        </button>

                                                    </div>

                                                );

                                            })}

                                        </div>

                                    </>

                                )}

                            </div>


                            {/* FOOTER */}

                            <div className="slot-modal-footer">

                                <span>
                                    🔒 Your booking request will be sent to the owner.
                                </span>

                                <button
                                    type="button"
                                    onClick={closeSlotSection}
                                    className="modal-cancel-btn"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                )}



            </main>

        </div>

    );
};



/* =====================================================
   VENUE CARD
===================================================== */

const VenueCard = ({
    venue,
    onSelect
}) => {

    const [venueImages, setVenueImages] =
        useState([]);

    const [imagesLoading, setImagesLoading] =
        useState(true);


    /* =========================================
       LOAD VENUE IMAGES
    ========================================= */

    useEffect(() => {

        loadImages();

    }, [venue.id]);


    const loadImages = async () => {

        try {

            setImagesLoading(true);


            const images =
                await userService.getVenueImages(
                    venue.id
                );


            console.log(
                `Images for venue ${venue.id}:`,
                images
            );


            if (Array.isArray(images)) {

                setVenueImages(images);

            } else {

                setVenueImages([]);

            }

        } catch (error) {

            console.error(
                `Failed to load images for venue ${venue.id}:`,
                error
            );


            setVenueImages([]);

        } finally {

            setImagesLoading(false);
        }
    };


    /* =========================================
       CARD
    ========================================= */

    return (

        <div className="user-venue-card">


            {/* =================================
                IMAGE + STATUS
            ================================= */}

            <div className="venue-card-top">


                {/* IMAGE */}

                {imagesLoading ? (

                    <div className="venue-image-placeholder">

                        <div className="user-spinner"></div>

                    </div>

                ) : venueImages.length > 0 ? (

                    <VenueImageSlider
                        images={venueImages}
                        venueName={
                            venue.venueName
                        }
                    />

                ) : (

                    <div className="venue-image-placeholder">

                        🏢

                    </div>

                )}



                {/* STATUS */}

{/*                 <span className="venue-available"> */}

{/*                     { */}
{/*                         venue.venueStatus || */}
{/*                         venue.status || */}
{/*                         "AVAILABLE" */}
{/*                     } */}

{/*                 </span> */}

            </div>



            {/* =================================
                CONTENT
            ================================= */}

            <div className="venue-card-content">


                {/* NAME */}

                <h2>
                    {venue.venueName}
                </h2>



                {/* LOCATION */}

                <p className="venue-location">

                    📍{" "}

                    {
                        venue.location ||
                        "Location not specified"
                    }

                </p>



                {/* META */}

                <div className="venue-meta">

                    <span>

                        👥{" "}

                        {
                            venue.capacity ||
                            "N/A"
                        }

                    </span>


                    <strong>

                        ₹
                        {
                            venue.price ||
                            0
                        }

                    </strong>

                </div>



                {/* BUTTON */}

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