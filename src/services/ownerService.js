
import api from "./api";

// Get owner's venues
const getOwnerVenues = () => {
    return api.get("/owner/venues");
};

// Get owner's bookings
const getOwnerBookings = () => {
    return api.get("/owner/bookings");
};

// Approve booking
const approveBooking = (bookingId) => {
    return api.put(`/owner/Approve/${bookingId}`);
};

// Reject booking
const rejectBooking = (bookingId) => {
    return api.put(`/owner/reject/${bookingId}`);
};

// Add venue
const addVenue = (venueData) => {
    return api.post("/owner/add-venue", venueData);
};

// Maintenance
const setMaintenance = (venueId) => {
    return api.put(`/owner/venue/maintanence/${venueId}`);
};

// Holiday
const setHoliday = (venueId) => {
    return api.put(`/owner/venue/holiday/${venueId}`);
};

// Upload venue images
const uploadImages = (venueId, files) => {

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    return api.post(
        `/owner/venue/${venueId}/images`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};

export default {
    getOwnerVenues,
    getOwnerBookings,
    approveBooking,
    rejectBooking,
    addVenue,
    setMaintenance,
    setHoliday,
    uploadImages
};