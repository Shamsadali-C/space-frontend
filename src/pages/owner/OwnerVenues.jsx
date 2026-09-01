// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import ownerService from "../../services/ownerService";
// import "../../styles/OwnerVenues.css";
//
// const OwnerVenues = () => {
//
//     const [venues, setVenues] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         loadVenues();
//     }, []);
//
//     const loadVenues = async () => {
//
//         try {
//
//             const response = await ownerService.getVenues();
//
//             console.log(" venues:", response.data);
//
//             setVenues(response.data);
//
//         } catch (error) {
//
//             console.error("Failed to load venues:", error);
//
//         } finally {
//
//             setLoading(false);
//         }
//     };
//
//
//     const handleMaintenance = async (venueId) => {
//
//         if (!window.confirm(
//             "Are you sure you want to put this venue under maintenance?"
//         )) {
//             return;
//         }
//
//         try {
//
//             await ownerService.maintenanceVenue(venueId);
//
//             alert("Venue is now under maintenance.");
//
//             await loadVenues();
//
//         } catch (error) {
//
//             console.error(error);
//
//             alert(
//                 error.response?.data ||
//                 "Failed to update venue status."
//             );
//         }
//     };
//
//
//     const handleHoliday = async (venueId) => {
//
//         if (!window.confirm(
//             "Are you sure you want to mark this venue as holiday?"
//         )) {
//             return;
//         }
//
//         try {
//
//             await ownerService.holidayVenue(venueId);
//
//             alert("Venue marked as holiday.");
//
//             await loadVenues();
//
//         } catch (error) {
//
//             console.error(error);
//
//             alert(
//                 error.response?.data ||
//                 "Failed to update venue status."
//             );
//         }
//     };
//
//
//     if (loading) {
//
//         return (
//             <div className="owner-loading">
//                 <h2>Loading venues...</h2>
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
//                     <Link
//                         to="/owner/venues"
//                         className="active"
//                     >
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
//                             My Venues
//                         </h1>
//
//                         <p>
//                             Manage your venues and their availability.
//                         </p>
//
//                     </div>
//
//                 </div>
//
//
//                 {/* NO VENUES */}
//
//                 {venues.length === 0 ? (
//
//                     <div className="no-owner-venues">
//
//                         <div className="empty-icon">
//                             🏢
//                         </div>
//
//                         <h2>
//                             No venues found
//                         </h2>
//
//                         <p>
//                             Add a venue to start managing your spaces.
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
//                                 <div className="venue-card-header">
//
//                                     <h2>
//                                         {venue.venueName}
//                                     </h2>
//
//                                     <span
//                                         className={
//                                             `venue-status ${
//                                                 venue.status?.toLowerCase()
//                                             }`
//                                         }
//                                     >
//                                         {venue.status}
//                                     </span>
//
//                                 </div>
//
//
//                                 <div className="venue-details">
//
//                                     <p>
//                                         <strong>
//                                             Location:
//                                         </strong>{" "}
//                                         {venue.location}
//                                     </p>
//
//                                     <p>
//                                         <strong>
//                                             Capacity:
//                                         </strong>{" "}
//                                         {venue.capacity}
//                                     </p>
//
//                                     <p>
//                                         <strong>
//                                             Price:
//                                         </strong>{" "}
//                                         ₹{venue.price}
//                                     </p>
//
//                                 </div>
//
//
//                                 <div className="venue-actions">
//
//                                     <button
//                                         className="maintenance-btn"
//                                         onClick={() =>
//                                             handleMaintenance(
//                                                 venue.id
//                                             )
//                                         }
//                                         disabled={
//                                             venue.status === "MAINTENANCE"
//                                         }
//                                     >
//                                         Maintenance
//                                     </button>
//
//
//                                     <button
//                                         className="holiday-btn"
//                                         onClick={() =>
//                                             handleHoliday(
//                                                 venue.id
//                                             )
//                                         }
//                                         disabled={
//                                             venue.status === "HOLIDAY"
//                                         }
//                                     >
//                                         Holiday
//                                     </button>
//
//                                       <button
//                                         className="available-btn"
//                                         onClick={() =>
//                                             handleAvailable(
//                                                 venue.id
//                                             )
//                                         }
//                                         disabled={
//                                             venue.status === "AVAILABLE"
//                                         }
//                                     >
//                                         Available
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
// export default OwnerVenues;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ownerService from "../../services/ownerService";
import "../../styles/OwnerVenues.css";

const OwnerVenues = () => {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    /* =========================================
       LOAD OWNER VENUES
    ========================================= */

    useEffect(() => {
        loadVenues();
    }, []);


    const loadVenues = async () => {

        try {

            setLoading(true);
            setError("");



            const data = await ownerService.getVenues();

            console.log("Owner venues:", data);



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
                "Failed to load your venues."
            );

        } finally {

            setLoading(false);
        }
    };


    /* =========================================
       MAINTENANCE
    ========================================= */

    const handleMaintenance = async (venueId) => {

        const confirmAction = window.confirm(
            "Are you sure you want to put this venue under maintenance?"
        );

        if (!confirmAction) {
            return;
        }


        try {

            await ownerService.maintenance(venueId);

            alert(
                "Venue is now under maintenance."
            );

            await loadVenues();

        } catch (error) {

            console.error(
                "Maintenance error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update venue status."
            );
        }
    };


    /* =========================================
       HOLIDAY
    ========================================= */

    const handleHoliday = async (venueId) => {

        const confirmAction = window.confirm(
            "Are you sure you want to mark this venue as holiday?"
        );

        if (!confirmAction) {
            return;
        }


        try {

            await ownerService.holiday(venueId);

            alert(
                "Venue marked as holiday."
            );

            await loadVenues();

        } catch (error) {

            console.error(
                "Holiday error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update venue status."
            );
        }
    };


    /* =========================================
       AVAILABLE
    ========================================= */

    const handleAvailable = async (venueId) => {

        const confirmAction = window.confirm(
            "Make this venue available again?"
        );

        if (!confirmAction) {
            return;
        }


        try {

            await ownerService.available(venueId);

            alert(
                "Venue is now available."
            );

            await loadVenues();

        } catch (error) {

            console.error(
                "Available error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update venue status."
            );
        }
    };


    /* =========================================
       DELETE VENUE
    ========================================= */

    const handleDelete = async (venueId) => {

        const confirmAction = window.confirm(
            "Are you sure you want to delete this venue?"
        );

        if (!confirmAction) {
            return;
        }


        try {

            await ownerService.deleteVenue(venueId);

            alert(
                "Venue deleted successfully."
            );

            await loadVenues();

        } catch (error) {

            console.error(
                "Delete venue error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to delete venue."
            );
        }
    };


    /* =========================================
       LOADING
    ========================================= */

    if (loading) {

        return (

            <div className="owner-loading">

                <div className="owner-spinner"></div>

                <h2>
                    Loading your venues...
                </h2>

            </div>
        );
    }


    /* =========================================
       PAGE
    ========================================= */

    return (

        <div className="owner-layout">


            {/* =================================
                SIDEBAR
            ================================= */}

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

                    <Link
                        to="/owner/venues"
                        className="active"
                    >
                        My Venues
                    </Link>

                    <Link to="/owner/bookings">
                        Bookings
                    </Link>

                    <Link to="/owner/create-slot">
                        Create Time Slot
                    </Link>

                    <Link to="/owner/add-venue">
                        Add Venue
                    </Link>

                </nav>

            </aside>


            {/* =================================
                MAIN CONTENT
            ================================= */}

            <main className="owner-main">


                {/* HEADER */}

                <div className="owner-page-header">

                    <div>

                        <span className="owner-page-label">
                            VENUE MANAGEMENT
                        </span>

                        <h1>
                            My Venues
                        </h1>

                        <p>
                            Manage your venues and their
                            availability.
                        </p>

                    </div>


                    <Link
                        to="/owner/add-venue"
                        className="add-venue-btn"
                    >
                        + Add Venue
                    </Link>

                </div>


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="owner-error">

                        <strong>
                            Unable to load venues
                        </strong>

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={loadVenues}
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* =================================
                    NO VENUES
                ================================= */}

                {!error && venues.length === 0 ? (

                    <div className="no-owner-venues">

                        <div className="empty-icon">
                            🏢
                        </div>

                        <h2>
                            No venues found
                        </h2>

                        <p>
                            You haven't added any venues yet.
                            Add your first venue to start
                            accepting bookings.
                        </p>

                        <Link
                            to="/owner/add-venue"
                            className="empty-add-btn"
                        >
                            + Add Your First Venue
                        </Link>

                    </div>

                ) : (


                    /* =================================
                       VENUE GRID
                    ================================= */

                    !error && (

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
                                            className={
                                                `venue-status ${
                                                    venue.status
                                                        ?.toLowerCase()
                                                        || "available"
                                                }`
                                            }
                                        >
                                            {venue.status ||
                                                "AVAILABLE"}
                                        </span>

                                    </div>


                                    {/* VENUE NAME */}

                                    <h2>
                                        {venue.venueName}
                                    </h2>


                                    {/* VENUE DETAILS */}

                                    <div className="venue-details">

                                        <div className="detail-item">

                                            <span>
                                                📍
                                            </span>

                                            <div>

                                                <small>
                                                    Location
                                                </small>

                                                <p>
                                                    {venue.location ||
                                                        "Not specified"}
                                                </p>

                                            </div>

                                        </div>


                                        <div className="detail-item">

                                            <span>
                                                👥
                                            </span>

                                            <div>

                                                <small>
                                                    Capacity
                                                </small>

                                                <p>
                                                    {venue.capacity ||
                                                        "N/A"}
                                                </p>

                                            </div>

                                        </div>


                                        <div className="detail-item">

                                            <span>
                                                ₹
                                            </span>

                                            <div>

                                                <small>
                                                    Price
                                                </small>

                                                <p>
                                                    ₹{venue.price || 0}
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ACTIONS */}

                                    <div className="venue-actions">


                                        <button
                                            className="maintenance-btn"
                                            onClick={() =>
                                                handleMaintenance(
                                                    venue.id
                                                )
                                            }
                                            disabled={
                                                venue.status ===
                                                "MAINTENANCE"
                                            }
                                        >
                                            Maintenance
                                        </button>


                                        <button
                                            className="holiday-btn"
                                            onClick={() =>
                                                handleHoliday(
                                                    venue.id
                                                )
                                            }
                                            disabled={
                                                venue.status ===
                                                "HOLIDAY"
                                            }
                                        >
                                            Holiday
                                        </button>


                                        <button
                                            className="available-btn"
                                            onClick={() =>
                                                handleAvailable(
                                                    venue.id
                                                )
                                            }
                                            disabled={
                                                venue.status ===
                                                "AVAILABLE"
                                            }
                                        >
                                            Available
                                        </button>

                                    </div>


                                    {/* DELETE */}

                                    <button
                                        className="delete-venue-btn"
                                        onClick={() =>
                                            handleDelete(
                                                venue.id
                                            )
                                        }
                                    >
                                        🗑 Delete Venue
                                    </button>


                                </div>

                            ))}

                        </div>

                    )

                )}

            </main>

        </div>
    );
};

export default OwnerVenues;
