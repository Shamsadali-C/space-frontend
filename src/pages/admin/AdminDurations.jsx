import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import "../../styles/AdminDurations.css";

const AdminDurations = () => {

    const [durations, setDurations] = useState([]);

    const [duration, setDuration] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadDurations();
    }, []);


    const loadDurations = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await adminService.getDurations();

            setDurations(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load durations:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load durations."
            );

        } finally {

            setLoading(false);
        }
    };


    const handleAddDuration = async (event) => {

        event.preventDefault();

        setError("");
        setMessage("");


        if (!duration) {

            setError(
                "Please enter a duration."
            );

            return;
        }


        const durationMinutes =
            Number(duration);


        if (
            !Number.isInteger(durationMinutes) ||
            durationMinutes <= 0
        ) {

            setError(
                "Duration must be a positive whole number."
            );

            return;
        }


        try {

            setSaving(true);


            await adminService.addDuration(
                durationMinutes
            );


            setMessage(
                "Duration added successfully."
            );


            setDuration("");

            await loadDurations();


        } catch (error) {

            console.error(
                "Failed to add duration:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to add duration."
            );

        } finally {

            setSaving(false);
        }
    };


    const handleToggle = async (id) => {

        try {

            setError("");
            setMessage("");

            await adminService.toggleDuration(id);

            setMessage(
                "Duration status updated."
            );

            await loadDurations();

        } catch (error) {

            console.error(
                "Failed to update duration:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update duration."
            );
        }
    };


    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this duration?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setMessage("");

            await adminService.deleteDuration(id);

            setMessage(
                "Duration deleted successfully."
            );

            await loadDurations();

        } catch (error) {

            console.error(
                "Failed to delete duration:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to delete duration."
            );
        }
    };


    const formatDuration = (minutes) => {

        if (minutes < 60) {

            return `${minutes} minutes`;
        }


        if (minutes % 60 === 0) {

            const hours =
                minutes / 60;

            return `${hours} ${
                hours === 1
                    ? "hour"
                    : "hours"
            }`;
        }


        const hours =
            Math.floor(minutes / 60);

        const remainingMinutes =
            minutes % 60;


        return `${hours}h ${remainingMinutes}m`;
    };


    if (loading) {

        return (

            <div className="admin-duration-page">

                <div className="admin-duration-loading">

                    <div className="duration-spinner"></div>

                    <p>
                        Loading duration settings...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="admin-duration-page">

            <div className="admin-duration-container">

                {/* HEADER */}

                <div className="admin-duration-header">

                    <div>

                        <span className="admin-duration-label">
                            ADMIN PANEL
                        </span>

                        <h1>
                            Slot Duration Control
                        </h1>

                        <p>
                            Manage the time durations that
                            venue owners can use when creating
                            time slots.
                        </p>

                    </div>

                </div>


                {/* MESSAGES */}

                {message && (

                    <div className="duration-success">
                        ✓ {message}
                    </div>

                )}


                {error && (

                    <div className="duration-error">
                        ⚠ {error}
                    </div>

                )}


                {/* ADD DURATION */}

                <div className="duration-card">

                    <div className="duration-card-header">

                        <div>

                            <div>

                                <h2>
                                    Add Duration
                                </h2>

                                <p>
                                    Create a new slot duration
                                    for venue owners.
                                </p>

                            </div>

                        </div>

                    </div>


                    <form
                        className="duration-form"
                        onSubmit={handleAddDuration}
                    >

                        <div className="duration-input-group">

                            <label htmlFor="duration">
                                Duration
                            </label>

                            <div className="duration-input-wrapper">

                                <input
                                    id="duration"

                                    placeholder="Enter duration "
                                    value={duration}
                                    onChange={(event) =>
                                        setDuration(
                                            event.target.value
                                        )
                                    }
                                />



                            </div>

                        </div>


                        <button
                            type="submit"
                            className="add-duration-btn"
                            disabled={saving}
                        >

                            {saving
                                ? "Adding..."
                                : "＋ Add Duration"}

                        </button>

                    </form>

                </div>


                {/* DURATIONS LIST */}

                <div className="duration-card">

                    <div className="duration-list-header">

                        <div>



                            <div>

                                <h2>
                                    Available Durations
                                </h2>

                                <p>
                                    Durations currently configured
                                    by the administrator.
                                </p>

                            </div>

                        </div>

                        <span className="duration-count">
                            {durations.length}
                        </span>

                    </div>


                    {durations.length === 0 ? (

                        <div className="duration-empty">

                            <div className="empty-duration-icon">
                                ⏱
                            </div>

                            <h3>
                                No durations configured
                            </h3>

                            <p>
                                Add a duration above to allow
                                owners to create time slots.
                            </p>

                        </div>

                    ) : (

                        <div className="duration-list">

                            {durations.map((item) => (

                                <div
                                    className="duration-item"
                                    key={item.id}
                                >

                                    <div className="duration-item-left">



                                        <div>

                                            <h3>
                                                {formatDuration(
                                                    item.durationMinutes
                                                )}
                                            </h3>

                                            <span>
                                                {item.durationMinutes}
                                                {" "}
                                                minutes per slot
                                            </span>

                                        </div>

                                    </div>


                                    <div className="duration-item-right">

                                        <span
                                            className={
                                                item.active
                                                    ? "duration-status active"
                                                    : "duration-status inactive"
                                            }
                                        >

                                            {item.active
                                                ? "ACTIVE"
                                                : "INACTIVE"}

                                        </span>


                                        <button
                                            type="button"
                                            className={
                                                item.active
                                                    ? "duration-toggle disable"
                                                    : "duration-toggle enable"
                                            }
                                            onClick={() =>
                                                handleToggle(
                                                    item.id
                                                )
                                            }
                                        >

                                            {item.active
                                                ? "Disable"
                                                : "Enable"}

                                        </button>


                                        <button
                                            type="button"
                                            className="duration-delete"
                                            onClick={() =>
                                                handleDelete(
                                                    item.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminDurations;