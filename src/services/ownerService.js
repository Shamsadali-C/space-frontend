//import axios from "axios";
//
//const API_URL = "http://localhost:8080";
//
//const getAuthConfig = () => {
//
//    const token = localStorage.getItem("token");
//
//    return {
//        headers: {
//            Authorization: `Bearer ${token}`
//        }
//    };
//};
//
//const addVenue = (venue) => {
//
//    return axios.post(
//        `${API_URL}/venue/add`,
//        venue,
//        getAuthConfig()
//    );
//};
//
//
//const getVenueById = (id) => {
//
//    return axios.get(
//        `${API_URL}/venue/${id}`,
//        getAuthConfig()
//    );
//};
//
//
//const updateVenue = (id, venue) => {
//
//    return axios.put(
//        `${API_URL}/venue/venues/${id}`,
//        venue,
//        getAuthConfig()
//    );
//};
//
//
//const deleteVenue = (id) => {
//
//    return axios.delete(
//        `${API_URL}/venue/${id}`,
//        getAuthConfig()
//    );
//};
//
//
//const setMaintenance = (id) => {
//
//    return axios.put(
//        `${API_URL}/venue/maintanence/${id}`,
//        {},
//        getAuthConfig()
//    );
//};
//
//
//const setHoliday = (id) => {
//
//    return axios.put(
//        `${API_URL}/venue/holiday/${id}`,
//        {},
//        getAuthConfig()
//    );
//};
//
//const approveBooking = (bookingId) => {
//
//    return axios.put(
//        `${API_URL}/booking/Approve/${bookingId}`,
//        {},
//        getAuthConfig()
//    );
//};
//
//
//const rejectBooking = (bookingId) => {
//
//    return axios.put(
//        `${API_URL}/booking/Reject/${bookingId}`,
//        {},
//        getAuthConfig()
//    );
//};
//
//
//const getBookingDetails = (bookingId, userId) => {
//
//    return axios.get(
//        `${API_URL}/booking/${bookingId}`,
//        {
//            ...getAuthConfig(),
//            params: {
//                userId: userId
//            }
//        }
//    );
//};
//
//
//const uploadImages = (venueId, files) => {
//
//    const formData = new FormData();
//
//    files.forEach((file) => {
//        formData.append("files", file);
//    });
//
//    return axios.post(
//        `${API_URL}/venue/venue_images/${venueId}/images`,
//        formData,
//        {
//            headers: {
//                Authorization:
//                    `Bearer ${localStorage.getItem("token")}`,
//                "Content-Type": "multipart/form-data"
//            }
//        }
//    );
//};
//
//
//const deleteImage = (id) => {
//
//    return axios.delete(
//        `${API_URL}/venue/venue_images/${id}`,
//        getAuthConfig()
//    );
//};
//
//
//export default {
//    addVenue,
//    getVenueById,
//    updateVenue,
//    deleteVenue,
//    setMaintenance,
//    setHoliday,
//    approveBooking,
//    rejectBooking,
//    getBookingDetails,
//    uploadImages,
//    deleteImage
//};


import api from "./api";




const addVenue = (venue) => {
    return api.post("/owner/add-venue", venue);
};


const setMaintenance = (venueId) => {
    return api.put(
        `/owner/maintenance/${venueId}`
    );
};


const setHoliday = (venueId) => {
    return api.put(
        `/owner/holiday/${venueId}`
    );
};



const uploadImages = (venueId, files) => {

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    return api.post(
        `/owner/${venueId}/images`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};


const deleteImage = (imageId) => {

    return api.delete(
        `/owner/images/${imageId}`
    );
};


const rejectBooking = (bookingId) => {

    return api.put(
        `/owner/reject/booking/${bookingId}`
    );
};


const deleteBooking = (bookingId) => {

    return api.delete(
        `/owner/booking/${bookingId}`
    );
};


const getBookingDetails = (
    bookingId,
    userId
) => {

    return api.get(
        `/owner/booking/${bookingId}`,
        {
            params: {
                userId: userId
            }
        }
    );
};
const approveBooking = (bookingId) => {

    return api.put(
        `/owner/approve/booking/${bookingId}`
    );
};


export default {

    addVenue,

    setMaintenance,
    setHoliday,

    uploadImages,
    deleteImage,
    approveBooking,
    rejectBooking,
    deleteBooking,
    getBookingDetails
};