
import React, { useEffect, useState } from "react";
import ownerService from "../../services/ownerService";
import "../../styles/CreateTimeSlot.css";

const CreateTimeSlot = () => {

    const [venues, setVenues] = useState([]);

    const [selectedVenue, setSelectedVenue] = useState("");

    const [slotDate, setSlotDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const [message, setMessage] = useState("");
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

            const data =
                await ownerService.getVenues();

            console.log(
                "Owner venues:",
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
       CREATE TIME SLOT
    ========================================= */

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");


        /* -------------------------------
           VALIDATION
        ------------------------------- */

        if (!selectedVenue) {

            setError(
                "Please select a venue."
            );

            return;
        }


        if (!slotDate) {

            setError(
                "Please select a date."
            );

            return;
        }


        if (!startTime) {

            setError(
                "Please select a start time."
            );

            return;
        }


        if (!endTime) {

            setError(
                "Please select an end time."
            );

            return;
        }


        if (startTime >= endTime) {

            setError(
                "End time must be later than start time."
            );

            return;
        }


        try {

            setCreating(true);

            const slot = {

                slotDate: slotDate,

                startTime: startTime,

                endTime: endTime

            };


            console.log(
                "Creating time slot:",
                {
                    venueId: selectedVenue,
                    slot
                }
            );


            await ownerService.createTimeSlot(
                selectedVenue,
                slot
            );


            setMessage(
                "Time slot created successfully!"
            );


            /* -------------------------------
               CLEAR FORM
            ------------------------------- */

            setSlotDate("");
            setStartTime("");
            setEndTime("");

        } catch (error) {

            console.error(
                "Create time slot error:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to create time slot."
            );

        } finally {

            setCreating(false);
        }
    };


    /* =========================================
       TODAY
       Prevent selecting previous dates
    ========================================= */

    const today =
        new Date().toISOString().split("T")[0];


    /* =========================================
       LOADING
    ========================================= */

    if (loading) {

        return (

            <div className="create-slot-page">

                <div className="create-slot-loading">

                    <div className="slot-spinner"></div>

                    <p>
                        Loading your venues...
                    </p>

                </div>

            </div>
        );
    }


    /* =========================================
       PAGE
    ========================================= */

    return (

        <div className="create-slot-page">

            <div className="create-slot-container">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="create-slot-header">

                    <span className="slot-label">
                        OWNER DASHBOARD
                    </span>

                    <h1>
                        Create Time Slot
                    </h1>

                    <p>
                        Add available booking times
                        for your venue.
                    </p>

                </div>


                {/* =================================
                    NO VENUES
                ================================= */}

                {venues.length === 0 ? (

                    <div className="no-venues">

                        <div className="no-venues-icon">
                            🏢
                        </div>

                        <h2>
                            No Venues Found
                        </h2>

                        <p>
                            You need to create a venue
                            before you can add time slots.
                        </p>

                    </div>

                ) : (


                    /* =================================
                       FORM
                    ================================= */

                    <form
                        className="create-slot-form"
                        onSubmit={handleSubmit}
                    >


                        {/* =================================
                            VENUE
                        ================================= */}

                        <div className="form-group">

                            <label htmlFor="venue">
                                Select Venue
                            </label>

                            <select
                                id="venue"
                                value={selectedVenue}
                                onChange={(event) =>
                                    setSelectedVenue(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="">
                                    -- Select a venue --
                                </option>


                                {venues.map((venue) => (

                                    <option
                                        key={venue.id}
                                        value={venue.id}
                                    >

                                        {venue.venueName}

                                        {venue.location
                                            ? ` — ${venue.location}`
                                            : ""}

                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* =================================
                            DATE
                        ================================= */}

                        <div className="form-group">

                            <label htmlFor="slotDate">
                                Booking Date
                            </label>

                            <input
                                id="slotDate"
                                type="date"
                                min={today}
                                value={slotDate}
                                onChange={(event) =>
                                    setSlotDate(
                                        event.target.value
                                    )
                                }
                            />

                        </div>


                        {/* =================================
                            TIME
                        ================================= */}

                        <div className="time-row">


                            {/* START TIME */}

                            <div className="form-group">

                                <label htmlFor="startTime">
                                    Start Time
                                </label>

                                <input
                                    id="startTime"
                                    type="time"
                                    value={startTime}
                                    onChange={(event) =>
                                        setStartTime(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="time-arrow">
                                →
                            </div>


                            {/* END TIME */}

                            <div className="form-group">

                                <label htmlFor="endTime">
                                    End Time
                                </label>

                                <input
                                    id="endTime"
                                    type="time"
                                    value={endTime}
                                    onChange={(event) =>
                                        setEndTime(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* =================================
                            PREVIEW
                        ================================= */}

                        {(selectedVenue ||
                            slotDate ||
                            startTime ||
                            endTime) && (

                            <div className="slot-preview">

                                <div className="preview-title">
                                    Slot Preview
                                </div>


                                <div className="preview-content">

                                    <div className="preview-icon">
                                        📅
                                    </div>

                                    <div>

                                        <strong>
                                            {slotDate ||
                                                "Select a date"}
                                        </strong>

                                        <span>

                                            {startTime
                                                ? startTime
                                                : "--:--"}

                                            {"  →  "}

                                            {endTime
                                                ? endTime
                                                : "--:--"}

                                        </span>

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* =================================
                            SUCCESS MESSAGE
                        ================================= */}

                        {message && (

                            <div className="slot-success">

                                ✓ {message}

                            </div>

                        )}


                        {/* =================================
                            ERROR MESSAGE
                        ================================= */}

                        {error && (

                            <div className="slot-error">

                                ⚠ {error}

                            </div>

                        )}


                        {/* =================================
                            SUBMIT
                        ================================= */}

                        <button
                            type="submit"
                            className="create-slot-btn"
                            disabled={creating}
                        >

                            {creating
                                ? "Creating..."
                                : "＋ Create Time Slot"}

                        </button>

                    </form>

                )}

            </div>

        </div>
    );
};

export default CreateTimeSlot;

