import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ownerService from "../../services/ownerService";
import "../../styles/OwnerVenues.css";

const OwnerVenues = () => {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVenues();
    }, []);

    const loadVenues = async () => {

        try {

            const response = await ownerService.getOwnerVenues();

            console.log("Owner venues:", response.data);

            setVenues(response.data);

        } catch (error) {

            console.error("Failed to load venues:", error);

        } finally {

            setLoading(false);
        }
    };


    const handleMaintenance = async (venueId) => {

        if (!window.confirm(
            "Are you sure you want to put this venue under maintenance?"
        )) {
            return;
        }

        try {

            await ownerService.maintenanceVenue(venueId);

            alert("Venue is now under maintenance.");

            await loadVenues();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to update venue status."
            );
        }
    };


    const handleHoliday = async (venueId) => {

        if (!window.confirm(
            "Are you sure you want to mark this venue as holiday?"
        )) {
            return;
        }

        try {

            await ownerService.holidayVenue(venueId);

            alert("Venue marked as holiday.");

            await loadVenues();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to update venue status."
            );
        }
    };


    if (loading) {

        return (
            <div className="owner-loading">
                <h2>Loading venues...</h2>
            </div>
        );
    }


    return (

        <div className="owner-layout">

            {/* SIDEBAR */}

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

                    <Link to="/owner/add-venue">
                        Add Venue
                    </Link>

                </nav>

            </aside>


            {/* MAIN */}

            <main className="owner-main">

                <div className="owner-page-header">

                    <div>

                        <h1>
                            My Venues
                        </h1>

                        <p>
                            Manage your venues and their availability.
                        </p>

                    </div>

                </div>


                {/* NO VENUES */}

                {venues.length === 0 ? (

                    <div className="no-owner-venues">

                        <div className="empty-icon">
                            🏢
                        </div>

                        <h2>
                            No venues found
                        </h2>

                        <p>
                            Add a venue to start managing your spaces.
                        </p>

                    </div>

                ) : (

                    <div className="venue-grid">

                        {venues.map((venue) => (

                            <div
                                className="venue-card"
                                key={venue.id}
                            >

                                <div className="venue-card-header">

                                    <h2>
                                        {venue.venueName}
                                    </h2>

                                    <span
                                        className={
                                            `venue-status ${
                                                venue.status?.toLowerCase()
                                            }`
                                        }
                                    >
                                        {venue.status}
                                    </span>

                                </div>


                                <div className="venue-details">

                                    <p>
                                        <strong>
                                            Location:
                                        </strong>{" "}
                                        {venue.location}
                                    </p>

                                    <p>
                                        <strong>
                                            Capacity:
                                        </strong>{" "}
                                        {venue.capacity}
                                    </p>

                                    <p>
                                        <strong>
                                            Price:
                                        </strong>{" "}
                                        ₹{venue.price}
                                    </p>

                                </div>


                                <div className="venue-actions">

                                    <button
                                        className="maintenance-btn"
                                        onClick={() =>
                                            handleMaintenance(
                                                venue.id
                                            )
                                        }
                                        disabled={
                                            venue.status === "MAINTENANCE"
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
                                            venue.status === "HOLIDAY"
                                        }
                                    >
                                        Holiday
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
};

export default OwnerVenues;