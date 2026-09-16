// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import ownerService from "../../services/ownerService";
// import "../../styles/OwnerVenues.css";
// import VenueImageSlider from "../../components/VenueImageSlider";
//
// const OwnerVenues = () => {
//   const [venues, setVenues] = useState([]);
//   const [venueImages, setVenueImages] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//
//   const [selectedVenueForImages, setSelectedVenueForImages] = useState(null);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [imageUploading, setImageUploading] = useState(false);
//
//   useEffect(() => {
//     loadVenues();
//   }, []);
//
//   const loadVenues = async () => {
//     try {
//       setLoading(true);
//       setError("");
//
//       const data = await ownerService.getVenues();
//       const venueList = Array.isArray(data) ? data : [];
//       setVenues(venueList);
//
//       const imageData = {};
//       for (const venue of venueList) {
//         try {
//           const images = await ownerService.getImages(venue.id);
//           imageData[venue.id] = Array.isArray(images) ? images : [];
//         } catch (imageError) {
//           console.error(`Failed to load images for venue ${venue.id}:`, imageError);
//           imageData[venue.id] = [];
//         }
//       }
//       setVenueImages(imageData);
//
//     } catch (error) {
//       console.error("Failed to load venues:", error);
//       setVenues([]);
//       setError(error.response?.data?.message || error.response?.data || "Failed to load your venues.");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleMaintenance = async (venueId) => {
//     if (!window.confirm("Are you sure you want to put this venue under maintenance?")) return;
//
//     try {
//       await ownerService.maintenance(venueId);
//       alert("Venue is now under maintenance.");
//       await loadVenues();
//     } catch (error) {
//       console.error("Maintenance error:", error);
//       alert(error.response?.data?.message || error.response?.data || "Failed to update venue status.");
//     }
//   };
//
//   const handleHoliday = async (venueId) => {
//     if (!window.confirm("Are you sure you want to mark this venue as holiday?")) return;
//
//     try {
//       await ownerService.holiday(venueId);
//       alert("Venue marked as holiday.");
//       await loadVenues();
//     } catch (error) {
//       console.error("Holiday error:", error);
//       alert(error.response?.data?.message || error.response?.data || "Failed to update venue status.");
//     }
//   };
//
//   const handleAvailable = async (venueId) => {
//     if (!window.confirm("Make this venue available again?")) return;
//
//     try {
//       await ownerService.available(venueId);
//       alert("Venue is now available.");
//       await loadVenues();
//     } catch (error) {
//       console.error("Available error:", error);
//       alert(error.response?.data?.message || error.response?.data || "Failed to update venue status.");
//     }
//   };
//
//   const handleDelete = async (venueId) => {
//     if (!window.confirm("Are you sure you want to delete this venue?")) return;
//
//     try {
//       await ownerService.deleteVenue(venueId);
//       alert("Venue deleted successfully.");
//       await loadVenues();
//     } catch (error) {
//       console.error("Delete venue error:", error);
//       alert(error.response?.data?.message || error.response?.data || "Failed to delete venue.");
//     }
//   };
//
//   const handleManageImages = (venue) => {
//     setSelectedVenueForImages(venue);
//     setSelectedFiles([]);
//   };
//
//   const closeImageManager = () => {
//     setSelectedVenueForImages(null);
//     setSelectedFiles([]);
//   };
//
//   const handleImageSelect = (event) => {
//     const files = Array.from(event.target.files);
//     if (!selectedVenueForImages) return;
//
//     const currentImages = venueImages[selectedVenueForImages.id] || [];
//     const remainingSlots = 3 - currentImages.length;
//
//     if (remainingSlots <= 0) {
//       alert("Maximum 3 images are already uploaded.");
//       return;
//     }
//
//     if (files.length > remainingSlots) {
//       alert(`You can upload only ${remainingSlots} more image(s).`);
//       return;
//     }
//
//     setSelectedFiles(files);
//   };
//
//   const handleUploadImages = async () => {
//     if (!selectedVenueForImages) return;
//
//     if (selectedFiles.length === 0) {
//       alert("Please select image(s).");
//       return;
//     }
//
//     try {
//       setImageUploading(true);
//       await ownerService.uploadImages(selectedVenueForImages.id, selectedFiles);
//       alert("Images uploaded successfully.");
//       setSelectedFiles([]);
//       await loadVenues();
//     } catch (error) {
//       console.error("Image upload error:", error);
//       alert(error.response?.data?.message || error.response?.data || "Failed to upload images.");
//     } finally {
//       setImageUploading(false);
//     }
//   };
//
//   const handleDeleteImage = async (imageId) => {
//     if (!window.confirm("Are you sure you want to delete this image?")) return;
//
//     try {
//       await ownerService.deleteImage(imageId);
//       alert("Image deleted successfully.");
//       await loadVenues();
//     } catch (error) {
//       console.error("Delete image error:", error);
//       alert(error.response?.data?.message || error.response?.data || "Failed to delete image.");
//     }
//   };
//
//   if (loading) {
//     return (
//       <div className="owner-loading">
//         <div className="owner-spinner"></div>
//         <h2>Loading your venues...</h2>
//       </div>
//     );
//   }
//
//   return (
//     <div className="owner-layout">
//       <aside className="owner-sidebar">
//         <div className="owner-logo">Book My Space</div>
//         <div className="owner-role">OWNER PANEL</div>
//
//         <nav>
//           <Link to="/owner">Dashboard</Link>
//           <Link to="/owner/venues" className="active">My Venues</Link>
//           <Link to="/owner/bookings">Bookings</Link>
//           <Link to="/owner/create-slot">Create Time Slot</Link>
//           <Link to="/owner/add-venue">Add Venue</Link>
//         </nav>
//       </aside>
//
//       <main className="owner-main">
//         <div className="owner-page-header">
//           <div>
//             <span className="owner-page-label">VENUE MANAGEMENT</span>
//             <h1>My Venues</h1>
//             <p>Manage your venues and their availability.</p>
//           </div>
//
//           <Link to="/owner/add-venue" className="add-venue-btn">
//             + Add Venue
//           </Link>
//         </div>
//
//         {error && (
//           <div className="owner-error">
//             <strong>Unable to load venues</strong>
//             <p>{error}</p>
//             <button onClick={loadVenues}>Try Again</button>
//           </div>
//         )}
//
//         {!error && venues.length === 0 ? (
//           <div className="no-owner-venues">
//             <div className="empty-icon">🏢</div>
//             <h2>No venues found</h2>
//             <p>You haven't added any venues yet. Add your first venue to start accepting bookings.</p>
//             <Link to="/owner/add-venue" className="empty-add-btn">
//               + Add Your First Venue
//             </Link>
//           </div>
//         ) : (
//           !error && (
//             <div className="venue-grid">
//               {venues.map((venue) => {
//                 const images = venueImages[venue.id] || [];
//
//                 return (
//                   <div className="venue-card" key={venue.id}>
//                     <div className="venue-card-top">
//                       <VenueImageSlider images={images} venueName={venue.venueName} />
//
//                       <span className={`venue-status ${venue.status?.toLowerCase() || "available"}`}>
//                         {venue.status || "AVAILABLE"}
//                       </span>
//                     </div>
//
//                     <h2>{venue.venueName}</h2>
//
//                     <div className="venue-details">
//                       <div className="detail-item">
//                         <span>📍</span>
//                         <div>
//                           <small>Location</small>
//                           <p>{venue.location || "Not specified"}</p>
//                         </div>
//                       </div>
//
//                       <div className="detail-item">
//                         <span>👥</span>
//                         <div>
//                           <small>Capacity</small>
//                           <p>{venue.capacity || "N/A"}</p>
//                         </div>
//                       </div>
//
//                       <div className="detail-item">
//                         <span>₹</span>
//                         <div>
//                           <small>Price</small>
//                           <p>₹{venue.price || 0}</p>
//                         </div>
//                       </div>
//                     </div>
//
//                     <div className="venue-actions">
//                       <button className="manage-images-btn" onClick={() => handleManageImages(venue)}>
//                           Manage Images
//                       </button>
//
//                       <button
//                         className="maintenance-btn"
//                         onClick={() => handleMaintenance(venue.id)}
//                         disabled={venue.status === "MAINTENANCE"}
//                       >
//                         Maintenance
//                       </button>
//
//                       <button
//                         className="holiday-btn"
//                         onClick={() => handleHoliday(venue.id)}
//                         disabled={venue.status === "HOLIDAY"}
//                       >
//                         Holiday
//                       </button>
//
//                       <button
//                         className="available-btn"
//                         onClick={() => handleAvailable(venue.id)}
//                         disabled={venue.status === "AVAILABLE"}
//                       >
//                         Available
//                       </button>
//                     </div>
//
//                     <button className="delete-venue-btn" onClick={() => handleDelete(venue.id)}>
//                        Delete Venue
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )
//         )}
//
//         {selectedVenueForImages && (
//           <div className="image-manager-overlay">
//             <div className="image-manager">
//               <div className="image-manager-header">
//                 <div>
//                   <h2>Manage Images</h2>
//                   <p>{selectedVenueForImages.venueName}</p>
//                 </div>
//
//                 <button className="close-image-manager" onClick={closeImageManager}>
//                   ✕
//                 </button>
//               </div>
//
//               <div className="current-images">
//                 <h3>Current Images</h3>
//
//                 <div className="image-manager-grid">
//                   {(venueImages[selectedVenueForImages.id] || []).length === 0 ? (
//                     <p>No images uploaded yet.</p>
//                   ) : (
//                     (venueImages[selectedVenueForImages.id] || []).map((image) => (
//                       <div className="managed-image" key={image.id}>
//                         <img src={`http://localhost:8080/uploads/` + image.imageUrl} alt="Venue" />
//
//                         <button className="delete-image-btn" onClick={() => handleDeleteImage(image.id)}>
//                            Delete
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//
//               {(venueImages[selectedVenueForImages.id] || []).length < 3 && (
//                 <div className="upload-images-section">
//                   <h3>Add Images</h3>
//                   <p>You can upload up to 3 images per venue.</p>
//
//                   <input type="file" accept="image/*" multiple onChange={handleImageSelect} />
//
//                   {selectedFiles.length > 0 && <p>{selectedFiles.length} image(s) selected</p>}
//
//                   <button
//                     className="upload-images-btn"
//                     onClick={handleUploadImages}
//                     disabled={imageUploading || selectedFiles.length === 0}
//                   >
//                     {imageUploading ? "Uploading..." : " Upload Images"}
//                   </button>
//                 </div>
//               )}
//
//               {(venueImages[selectedVenueForImages.id] || []).length >= 3 && (
//                 <p className="max-images-message">
//                   Maximum 3 images reached. Delete an image if you want to upload another one.
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };
//
// export default OwnerVenues;


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

  // Image management
  const [selectedVenueForImages, setSelectedVenueForImages] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);

  // Maintenance / Holiday modal
  const [statusModal, setStatusModal] = useState({
    open: false,
    venueId: null,
    type: null,
  });

  const [statusDate, setStatusDate] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    loadVenues();
  }, []);

  // ==============================
  // LOAD VENUES + IMAGES
  // ==============================

  const loadVenues = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await ownerService.getVenues();

      const venueList = Array.isArray(data) ? data : [];

      setVenues(venueList);

      const imageData = {};

      for (const venue of venueList) {
        try {
          const images = await ownerService.getImages(venue.id);

          imageData[venue.id] = Array.isArray(images)
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
      console.error("Failed to load venues:", error);

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

  // ==============================
  // STATUS MODAL
  // ==============================

  const openStatusModal = (venueId, type) => {
    setStatusModal({
      open: true,
      venueId: venueId,
      type: type,
    });

    setStatusDate("");
  };

  const closeStatusModal = () => {
    if (statusUpdating) {
      return;
    }

    setStatusModal({
      open: false,
      venueId: null,
      type: null,
    });

    setStatusDate("");
  };

  // ==============================
  // CONFIRM MAINTENANCE / HOLIDAY
  // ==============================

  const handleConfirmStatus = async () => {
    if (!statusModal.venueId) {
      alert("Venue not found.");
      return;
    }

    if (!statusDate) {
      alert("Please select a date.");
      return;
    }

    const statusName =
      statusModal.type === "MAINTENANCE"
        ? "maintenance"
        : "holiday";

    const confirmed = window.confirm(
      `Are you sure you want to mark this venue as ${statusName} on ${statusDate}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setStatusUpdating(true);

      if (statusModal.type === "MAINTENANCE") {
        await ownerService.maintenance(
          statusModal.venueId,
          statusDate
        );
      } else if (statusModal.type === "HOLIDAY") {
        await ownerService.holiday(
          statusModal.venueId,
          statusDate
        );
      }

      alert(
        `Venue ${statusName} status updated successfully for ${statusDate}.`
      );

      setStatusModal({
        open: false,
        venueId: null,
        type: null,
      });

      setStatusDate("");

      await loadVenues();

    } catch (error) {
      console.error(
        `Failed to update ${statusName} status:`,
        error
      );

      alert(
        error.response?.data?.message ||
        error.response?.data ||
        `Failed to update venue ${statusName} status.`
      );
    } finally {
      setStatusUpdating(false);
    }
  };

  // ==============================
  // AVAILABLE
  // ==============================

  const handleAvailable = async (venueId) => {
    const confirmed = window.confirm(
      "Make this venue available again?"
    );

    if (!confirmed) {
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

  // ==============================
  // DELETE VENUE
  // ==============================

  const handleDelete = async (venueId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );

    if (!confirmed) {
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

  // ==============================
  // IMAGE MANAGEMENT
  // ==============================

  const handleManageImages = (venue) => {
    setSelectedVenueForImages(venue);
    setSelectedFiles([]);
  };

  const closeImageManager = () => {
    setSelectedVenueForImages(null);
    setSelectedFiles([]);
  };

  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files);

    if (!selectedVenueForImages) {
      return;
    }

    const currentImages =
      venueImages[selectedVenueForImages.id] || [];

    const remainingSlots = 3 - currentImages.length;

    if (remainingSlots <= 0) {
      alert("Maximum 3 images are already uploaded.");

      event.target.value = "";
      return;
    }

    if (files.length > remainingSlots) {
      alert(
        `You can upload only ${remainingSlots} more image(s).`
      );

      event.target.value = "";
      return;
    }

    setSelectedFiles(files);
  };

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

      await loadVenues();

    } catch (error) {
      console.error("Image upload error:", error);

      alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to upload images."
      );
    } finally {
      setImageUploading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await ownerService.deleteImage(imageId);

      alert("Image deleted successfully.");

      await loadVenues();

    } catch (error) {
      console.error("Delete image error:", error);

      alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to delete image."
      );
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="owner-loading">
        <div className="owner-spinner"></div>

        <h2>Loading your venues...</h2>
      </div>
    );
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div className="owner-layout">

      {/* ==========================
          SIDEBAR
      =========================== */}

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

      {/* ==========================
          MAIN CONTENT
      =========================== */}

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

        {/* EMPTY */}

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
              Add your first venue to start accepting bookings.
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

                    {/* VENUE IMAGE */}

                    <div className="venue-card-top">

                      <VenueImageSlider
                        images={images}
                        venueName={venue.venueName}
                      />

                      <span
                        className={`venue-status ${
                          venue.status?.toLowerCase() ||
                          "available"
                        }`}
                      >
                        {venue.status || "AVAILABLE"}
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
                            {venue.capacity || "N/A"}
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

                    {/* ACTION BUTTONS */}

                    <div className="venue-actions">

                      {/* MANAGE IMAGES */}

                      <button
                        className="manage-images-btn"
                        onClick={() =>
                          handleManageImages(venue)
                        }
                      >
                        Manage Images
                      </button>

                      {/* MAINTENANCE */}

                      <button
                        className="maintenance-btn"
                        onClick={() =>
                          openStatusModal(
                            venue.id,
                            "MAINTENANCE"
                          )
                        }
                        disabled={
                          venue.status === "MAINTENANCE"
                        }
                      >
                        Maintenance
                      </button>

                      {/* HOLIDAY */}

                      <button
                        className="holiday-btn"
                        onClick={() =>
                          openStatusModal(
                            venue.id,
                            "HOLIDAY"
                          )
                        }
                        disabled={
                          venue.status === "HOLIDAY"
                        }
                      >
                        Holiday
                      </button>

                      {/* AVAILABLE */}

                      <button
                        className="available-btn"
                        onClick={() =>
                          handleAvailable(venue.id)
                        }
                        disabled={
                          venue.status === "AVAILABLE"
                        }
                      >
                        Available
                      </button>

                    </div>

                    {/* DELETE */}

                    <button
                      className="delete-venue-btn"
                      onClick={() =>
                        handleDelete(venue.id)
                      }
                    >
                      Delete Venue
                    </button>

                  </div>

                );
              })}

            </div>

          )
        )}

        {/* ==================================================
            MAINTENANCE / HOLIDAY DATE MODAL
        =================================================== */}

        {statusModal.open && (

          <div className="status-modal-overlay">

            <div className="status-modal">

              {/* CLOSE */}

              <button
                className="status-modal-close"
                onClick={closeStatusModal}
                disabled={statusUpdating}
              >
                ✕
              </button>

              {/* ICON */}

              <div className="status-modal-icon">

                {statusModal.type === "MAINTENANCE"
                  ? "🔧"
                  : "📅"}

              </div>

              {/* TITLE */}

              <h2>

                {statusModal.type === "MAINTENANCE"
                  ? "Schedule Maintenance"
                  : "Mark Holiday"}

              </h2>

              {/* DESCRIPTION */}

              <p>

                Select the date when you want this venue to{" "}

                {statusModal.type === "MAINTENANCE"
                  ? "be under maintenance."
                  : "be unavailable for holiday."}

              </p>

              {/* DATE */}

              <div className="status-date-field">

                <label htmlFor="statusDate">
                  Select Date
                </label>

                <input
                  id="statusDate"
                  type="date"
                  value={statusDate}
                  min={getTodayDate()}
                  onChange={(e) =>
                    setStatusDate(e.target.value)
                  }
                  disabled={statusUpdating}
                />

              </div>

              {/* ACTIONS */}

              <div className="status-modal-actions">

                <button
                  className="status-cancel-btn"
                  onClick={closeStatusModal}
                  disabled={statusUpdating}
                >
                  Cancel
                </button>

                <button
                  className={
                    statusModal.type === "MAINTENANCE"
                      ? "confirm-maintenance-btn"
                      : "confirm-holiday-btn"
                  }
                  onClick={handleConfirmStatus}
                  disabled={
                    statusUpdating ||
                    !statusDate
                  }
                >

                  {statusUpdating
                    ? "Updating..."
                    : statusModal.type === "MAINTENANCE"
                    ? "Confirm Maintenance"
                    : "Confirm Holiday"}

                </button>

              </div>

            </div>

          </div>

        )}

        {/* ==================================================
            IMAGE MANAGEMENT MODAL
        =================================================== */}

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
                    {selectedVenueForImages.venueName}
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

                    (venueImages[
                      selectedVenueForImages.id
                    ] || []).map((image) => (

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
                          Delete
                        </button>

                      </div>

                    ))

                  )}

                </div>

              </div>

              {/* UPLOAD */}

              {(venueImages[
                selectedVenueForImages.id
              ] || []).length < 3 && (

                <div className="upload-images-section">

                  <h3>
                    Add Images
                  </h3>

                  <p>
                    You can upload up to 3 images per venue.
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                  />

                  {selectedFiles.length > 0 && (

                    <p>
                      {selectedFiles.length} image(s) selected
                    </p>

                  )}

                  <button
                    className="upload-images-btn"
                    onClick={handleUploadImages}
                    disabled={
                      imageUploading ||
                      selectedFiles.length === 0
                    }
                  >

                    {imageUploading
                      ? "Uploading..."
                      : "Upload Images"}

                  </button>

                </div>

              )}

              {/* MAXIMUM */}

              {(venueImages[
                selectedVenueForImages.id
              ] || []).length >= 3 && (

                <p className="max-images-message">

                  Maximum 3 images reached.
                  Delete an image if you want to upload another one.

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
