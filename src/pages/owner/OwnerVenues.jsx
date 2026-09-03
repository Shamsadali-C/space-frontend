import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ownerService from "../../services/ownerService";
import "../../styles/OwnerVenues.css";
import VenueImageSlider from "../../components/VenueImageSlider";

const OwnerVenues = () => {

    const [venues, setVenues] = useState([]);
    const [venueImages, setVenueImages] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Image management states
    const [selectedVenueForImages, setSelectedVenueForImages] =
        useState(null);

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [imageUploading, setImageUploading] =
        useState(false);


    /* =========================================
       LOAD OWNER VENUES + IMAGES
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

            const venueList = Array.isArray(data)
                ? data
                : [];

            setVenues(venueList);


            /* Load images for every venue */

            const imageData = {};

            for (const venue of venueList) {

                try {

                    const images =
                        await ownerService.getImages(venue.id);

                    imageData[venue.id] =
                        Array.isArray(images)
                            ? images
                            : [];

                } catch (imageError) {

                    console.error(
                        `Failed to load images for venue ${venue.id}:`,
                        imageError
                    );

                    imageData[venue.id] = [];
                }
            }

            setVenueImages(imageData);

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

        if (!window.confirm(
            "Are you sure you want to put this venue under maintenance?"
        )) {
            return;
        }

        try {

            await ownerService.maintenance(venueId);

            alert("Venue is now under maintenance.");

            await loadVenues();

        } catch (error) {

            console.error("Maintenance error:", error);

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

        if (!window.confirm(
            "Are you sure you want to mark this venue as holiday?"
        )) {
            return;
        }

        try {

            await ownerService.holiday(venueId);

            alert("Venue marked as holiday.");

            await loadVenues();

        } catch (error) {

            console.error("Holiday error:", error);

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

        if (!window.confirm(
            "Make this venue available again?"
        )) {
            return;
        }

        try {

            await ownerService.available(venueId);

            alert("Venue is now available.");

            await loadVenues();

        } catch (error) {

            console.error("Available error:", error);

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

        if (!window.confirm(
            "Are you sure you want to delete this venue?"
        )) {
            return;
        }

        try {

            await ownerService.deleteVenue(venueId);

            alert("Venue deleted successfully.");

            await loadVenues();

        } catch (error) {

            console.error("Delete venue error:", error);

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to delete venue."
            );
        }
    };


    /* =========================================
       OPEN IMAGE MANAGER
    ========================================= */

    const handleManageImages = (venue) => {

        setSelectedVenueForImages(venue);

        setSelectedFiles([]);
    };


    /* =========================================
       CLOSE IMAGE MANAGER
    ========================================= */

    const closeImageManager = () => {

        setSelectedVenueForImages(null);

        setSelectedFiles([]);
    };


    /* =========================================
       SELECT IMAGES
    ========================================= */

    const handleImageSelect = (event) => {

        const files = Array.from(event.target.files);

        if (!selectedVenueForImages) {
            return;
        }


        const currentImages =
            venueImages[selectedVenueForImages.id] || [];


        const remainingSlots =
            3 - currentImages.length;


        if (remainingSlots <= 0) {

            alert(
                "Maximum 3 images are already uploaded."
            );

            return;
        }


        if (files.length > remainingSlots) {

            alert(
                `You can upload only ${remainingSlots} more image(s).`
            );

            return;
        }


        setSelectedFiles(files);
    };


    /* =========================================
       UPLOAD IMAGES
    ========================================= */

    const handleUploadImages = async () => {

        if (!selectedVenueForImages) {
            return;
        }


        if (selectedFiles.length === 0) {

            alert("Please select image(s).");

            return;
        }


        try {

            setImageUploading(true);


            await ownerService.uploadImages(
                selectedVenueForImages.id,
                selectedFiles
            );


            alert("Images uploaded successfully.");


            setSelectedFiles([]);


            // Reload venues and images
            await loadVenues();


        } catch (error) {

            console.error(
                "Image upload error:",
                error
            );


            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to upload images."
            );


        } finally {

            setImageUploading(false);
        }
    };


    /* =========================================
       DELETE IMAGE
    ========================================= */

    const handleDeleteImage = async (imageId) => {

        if (!window.confirm(
            "Are you sure you want to delete this image?"
        )) {
            return;
        }


        try {

            await ownerService.deleteImage(imageId);

            alert("Image deleted successfully.");

            await loadVenues();

        } catch (error) {

            console.error(
                "Delete image error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to delete image."
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
                MAIN
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
                            Manage your venues and their availability.
                        </p>

                    </div>


                    <Link
                        to="/owner/add-venue"
                        className="add-venue-btn"
                    >
                        + Add Venue
                    </Link>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="owner-error">

                        <strong>
                            Unable to load venues
                        </strong>

                        <p>
                            {error}
                        </p>

                        <button onClick={loadVenues}>
                            Try Again
                        </button>

                    </div>
                )}


                {/* NO VENUES */}

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

                    !error && (

                        <div className="venue-grid">

                            {venues.map((venue) => {

                                const images =
                                    venueImages[venue.id] || [];


                                return (

                                    <div
                                        className="venue-card"
                                        key={venue.id}
                                    >


                                        {/* CARD TOP */}

                                        <div className="venue-card-top">

                                            <VenueImageSlider
                                                images={images}
                                                venueName={venue.venueName}
                                            />


{/*                                             <span */}
{/*                                                 className={ */}
{/*                                                     `venue-status ${ */}
{/*                                                         venue.status */}
{/*                                                             ?.toLowerCase() */}
{/*                                                         || "available" */}
{/*                                                     }` */}
{/*                                                 } */}
{/*                                             > */}
{/*                                                 {venue.status || */}
{/*                                                     "AVAILABLE"} */}
{/*                                             </span> */}

                                        </div>


                                        {/* VENUE NAME */}

                                        <h2>
                                            {venue.venueName}
                                        </h2>


                                        {/* DETAILS */}

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


                                            {/* IMAGE MANAGEMENT */}

                                            <button
                                                className="manage-images-btn"
                                                onClick={() =>
                                                    handleManageImages(
                                                        venue
                                                    )
                                                }
                                            >
                                                📷 Manage Images
                                            </button>


                                            {/* MAINTENANCE */}

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


                                            {/* HOLIDAY */}

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


                                            {/* AVAILABLE */}

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


                                        {/* DELETE VENUE */}

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

                                );

                            })}

                        </div>

                    )
                )}


                {/* =========================================
                    IMAGE MANAGEMENT MODAL
                ========================================= */}

                {selectedVenueForImages && (

                    <div className="image-manager-overlay">

                        <div className="image-manager">


                            {/* HEADER */}

                            <div className="image-manager-header">

                                <div>

                                    <h2>
                                        Manage Images
                                    </h2>

                                    <p>
                                        {
                                            selectedVenueForImages.venueName
                                        }
                                    </p>

                                </div>


                                <button
                                    className="close-image-manager"
                                    onClick={closeImageManager}
                                >
                                    ✕
                                </button>

                            </div>


                            {/* CURRENT IMAGES */}

                            <div className="current-images">

                                <h3>
                                    Current Images
                                </h3>


                                <div className="image-manager-grid">

                                    {(venueImages[
                                        selectedVenueForImages.id
                                    ] || []).length === 0 ? (

                                        <p>
                                            No images uploaded yet.
                                        </p>

                                    ) : (

                                        (
                                            venueImages[
                                                selectedVenueForImages.id
                                            ] || []
                                        ).map((image) => (

                                            <div
                                                className="managed-image"
                                                key={image.id}
                                            >

                                                <img
                                                    src={
                                                        `http://localhost:8080/uploads/` +
                                                        image.imageUrl
                                                    }
                                                    alt="Venue"
                                                />


                                                <button
                                                    className="delete-image-btn"
                                                    onClick={() =>
                                                        handleDeleteImage(
                                                            image.id
                                                        )
                                                    }
                                                >
                                                    🗑 Delete
                                                </button>

                                            </div>

                                        ))
                                    )}

                                </div>

                            </div>


                            {/* UPLOAD SECTION */}

                            {(
                                venueImages[
                                    selectedVenueForImages.id
                                ] || []
                            ).length < 3 && (

                                <div className="upload-images-section">

                                    <h3>
                                        Add Images
                                    </h3>

                                    <p>
                                        You can upload up to 3
                                        images per venue.
                                    </p>


                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageSelect}
                                    />


                                    {selectedFiles.length > 0 && (

                                        <p>
                                            {selectedFiles.length}
                                            {" "}
                                            image(s) selected
                                        </p>

                                    )}


                                    <button
                                        className="upload-images-btn"
                                        onClick={
                                            handleUploadImages
                                        }
                                        disabled={
                                            imageUploading ||
                                            selectedFiles.length === 0
                                        }
                                    >

                                        {imageUploading
                                            ? "Uploading..."
                                            : "📤 Upload Images"
                                        }

                                    </button>

                                </div>

                            )}


                            {/* MAXIMUM MESSAGE */}

                            {(
                                venueImages[
                                    selectedVenueForImages.id
                                ] || []
                            ).length >= 3 && (

                                <p className="max-images-message">
                                    Maximum 3 images reached.
                                    Delete an image if you want
                                    to upload another one.
                                </p>

                            )}

                        </div>

                    </div>

                )}

            </main>

        </div>
    );
};

export default OwnerVenues;