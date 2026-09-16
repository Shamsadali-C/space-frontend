import api from "./api";


/* =========================================
   GET OWNER VENUES
========================================= */

const getVenues = async () => {

    const response = await api.get(
        "/owner/venues"
    );

    return response.data;
};


/* =========================================
   ADD VENUE
========================================= */

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

const maintenance = async (venueId, date) => {
    const response = await api.put(
        `/owner/venue/maintenance/${venueId}`,
        null,
        { params: { date } }
    );

    return response.data;
};

const holiday = async (venueId, date) => {
    const response = await api.put(
        `/owner/venue/holiday/${venueId}`,
        null,
        { params: { date } }
    );

    return response.data;
};
const available = async (venueId) => {

    const response = await api.put(
        `/owner/venue/available/${venueId}`
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



const createTimeSlot = async (venueId, availability) => {

    const response = await api.post(
        `/owner/venue/${venueId}/slots`,
        availability
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


/* =========================================
   UPDATE IMAGE
========================================= */

const updateImage = async (imageId, file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.put(
        `/owner/venue/images/${imageId}`,
        formData
    );

    return response.data;
};
const getDurations = async () => {
    const response = await api.get("/owner/durations");
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

    createTimeSlot,
    getDurations,

    uploadImages,
    getImages,
    updateImage,
    deleteImage
};