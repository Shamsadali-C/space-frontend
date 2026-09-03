
import api from "./api";



const getVenues = async () => {

    const response = await api.get(
        "/owner/venues"
    );

    return response.data;
};


const addVenue = async (venue) => {

    const response = await api.post(
        "/owner/add-venue",
        venue
    );

    return response.data;
};


/* =========================================
   VENUE STATUS
========================================= */

const maintenance = async (venueId) => {

    const response = await api.put(
        `/owner/venue/maintanence/${venueId}`
    );

    return response.data;
};


const available = async (venueId) => {

    const response = await api.put(
        `/owner/venue/available/${venueId}`
    );

    return response.data;
};


const holiday = async (venueId) => {

    const response = await api.put(
        `/owner/venue/holiday/${venueId}`
    );

    return response.data;
};


const deleteVenue = async (venueId) => {

    const response = await api.delete(
        `/owner/venue/${venueId}`
    );

    return response.data;
};


/* =========================================
   GET OWNER BOOKINGS
========================================= */

const getBookings = async () => {

    const response = await api.get(
        "/owner/bookings"
    );

    return response.data;
};


/* =========================================
   APPROVE BOOKING
========================================= */

const approveBooking = async (bookingId) => {

    const response = await api.put(
        `/owner/Approve/${bookingId}`
    );

    return response.data;
};



const rejectBooking = async (bookingId) => {

    const response = await api.put(
        `/owner/reject/${bookingId}`
    );

    return response.data;
};



const createTimeSlot = async (venueId, slot) => {

    const response = await api.post(
        `/owner/venue/${venueId}/slots`,
        slot
    );

    return response.data;
};


/* =========================================
   UPLOAD VENUE IMAGES
========================================= */

const uploadImages = async (venueId, files) => {

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    const response = await api.post(
        `/owner/venue/${venueId}/images`,
        formData
    );

    return response.data;
};


/* =========================================
   GET VENUE IMAGES
========================================= */

const getImages = async (venueId) => {

    const response = await api.get(
        `/owner/venue/${venueId}/images`
    );

    return response.data;
};


/* =========================================
   DELETE IMAGE
========================================= */

const deleteImage = async (id) => {

    const response = await api.delete(
        `/owner/venue/images/${id}`
    );

    return response.data;
};
const updateImage = async (imageId, file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.put(
        `/owner/venue/images/${imageId}`,
        formData
    );

    return response.data;
};


/* =========================================
   EXPORT
========================================= */

export default {

    getVenues,
    addVenue,

    maintenance,
    available,
    holiday,
    deleteVenue,

    getBookings,
    approveBooking,
    rejectBooking,

    createTimeSlot,

    uploadImages,
    getImages,
    updateImage,
    deleteImage
};

