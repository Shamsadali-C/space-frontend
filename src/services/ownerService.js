import axios from "axios";

const API_URL = "http://localhost:8080";

const getAuthConfig = () => {

    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const addVenue = (venue) => {

    return axios.post(
        `${API_URL}/venue/add`,
        venue,
        getAuthConfig()
    );
};


const getVenueById = (id) => {

    return axios.get(
        `${API_URL}/venue/${id}`,
        getAuthConfig()
    );
};


const updateVenue = (id, venue) => {

    return axios.put(
        `${API_URL}/venue/venues/${id}`,
        venue,
        getAuthConfig()
    );
};


const deleteVenue = (id) => {

    return axios.delete(
        `${API_URL}/venue/${id}`,
        getAuthConfig()
    );
};


const setMaintenance = (id) => {

    return axios.put(
        `${API_URL}/venue/maintanence/${id}`,
        {},
        getAuthConfig()
    );
};


const setHoliday = (id) => {

    return axios.put(
        `${API_URL}/venue/holiday/${id}`,
        {},
        getAuthConfig()
    );
};

const approveBooking = (bookingId) => {

    return axios.put(
        `${API_URL}/booking/Approve/${bookingId}`,
        {},
        getAuthConfig()
    );
};


const rejectBooking = (bookingId) => {

    return axios.put(
        `${API_URL}/booking/Reject/${bookingId}`,
        {},
        getAuthConfig()
    );
};


const getBookingDetails = (bookingId, userId) => {

    return axios.get(
        `${API_URL}/booking/${bookingId}`,
        {
            ...getAuthConfig(),
            params: {
                userId: userId
            }
        }
    );
};


const uploadImages = (venueId, files) => {

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    return axios.post(
        `${API_URL}/venue/venue_images/${venueId}/images`,
        formData,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );
};


const deleteImage = (id) => {

    return axios.delete(
        `${API_URL}/venue/venue_images/${id}`,
        getAuthConfig()
    );
};


export default {
    addVenue,
    getVenueById,
    updateVenue,
    deleteVenue,
    setMaintenance,
    setHoliday,
    approveBooking,
    rejectBooking,
    getBookingDetails,
    uploadImages,
    deleteImage
};
