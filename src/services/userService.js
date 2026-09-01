//
//import api from "./api";
//
//const getProfile = () => {
//    return api.get("/user/Profile");
//};
//
//const updateUser = (userData) => {
//    return api.put("/user/profile", userData);
//};
//
//const deleteUser = (id) => {
//    return api.delete(`/user/${id}`);
//};
//
//
//const getVenues = () => {
//    return api.get("/user/venues");
//};
//
//const getVenueImages = (venueId) => {
//    return api.get(`/user/images/${venueId}`);
//};
//
//
//const sendOwnerRequest = (requestData) => {
//    return api.post("/user/owner-request", requestData);
//};
//
//const getOwnerRequestStatus = () => {
//    return api.get("/user/owner-request/status");
//};
//
//
//const getTimeSlots = (venueId, date) => {
//
//    return api.get( `/user/venues/${venueId}/slots`,
//        {
//         params: { date: date }
//        }
//    );
//};
//
//
//
//const createBooking = (slotId) => {
//
//    return api.post(
//        `/user/booking/${slotId}`
//    );
//};
//
//const getMyBookings = () => {
//    return api.get("/user/bookings");
//};
//
//
//export default {
//    getProfile,
//    updateUser,
//    deleteUser,
//
//    getVenues,
//    getVenueImages,
//
//    sendOwnerRequest,
//    getOwnerRequestStatus,
//
//    getTimeSlots,
//
//    createBooking,
//    getMyBookings
//};


import api from "./api";



const getProfile = async () => {

    const response = await api.get(
        "/user/Profile"
    );

    return response.data;
};


const updateUser = async (userData) => {

    const response = await api.put(
        "/user/profile",
        userData
    );

    return response.data;
};


/*
=========================================================
VENUES
=========================================================
*/

const getVenues = async () => {

    const response = await api.get(
        "/user/venues"
    );

    return response.data;
};


/*
=========================================================
VENUE IMAGES
=========================================================
*/

const getVenueImages = async (venueId) => {

    const response = await api.get( `/user/images/${venueId}` );

    return response.data;
};


/*
=========================================================
TIME SLOTS
=========================================================
*/

const getTimeSlots = async (
    venueId,
    date
) => {

    const response = await api.get(
        `/user/venues/${venueId}/slots`,
        {
            params: {
                date: date
            }
        }
    );

    return response.data;
};


/*
=========================================================
CREATE BOOKING
=========================================================
*/

const createBooking = async (slotId) => {

    const response = await api.post(
        `/user/booking/${slotId}`
    );

    return response.data;
};


/*
=========================================================
MY BOOKINGS
=========================================================
*/

const getMyBookings = async () => {

    const response = await api.get(
        "/user/bookings"
    );

    return response.data;
};


/*
=========================================================
OWNER REQUEST
=========================================================
*/

const sendOwnerRequest = async (
    requestData
) => {

    const response = await api.post(
        "/user/owner-request",
        requestData
    );

    return response.data;
};


/*
=========================================================
OWNER REQUEST STATUS
=========================================================
*/

const getOwnerRequestStatus = async () => {

    const response = await api.get(
        "/user/owner-request/status"
    );

    return response.data;
};



export default {

    getProfile,
    updateUser,

    getVenues,
    getVenueImages,

    getTimeSlots,

    createBooking,

    getMyBookings,

    sendOwnerRequest,
    getOwnerRequestStatus
};

