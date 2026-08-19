//import api from "./api";
//
//const getProfile = () => {
//    return api.get("/user/Profile");
//};
//
//const getVenues = () => {
//    return api.get("/user/venues");
//};
//
//const sendOwnerRequest = (requestData) => {
//    return api.post("/user/owner-request", requestData);
//};
//
//const getOwnerRequestStatus = () => {
//    return api.get("/user/owner-request/status");
//};
//
//const getVenueImages = (venueId) => {
//    return api.get(`/user/images/${venueId}`);
//};
//
//const deleteUser = (id) => {
//    return api.delete(`/user/${id}`);
//};
//
//const updateUser = (userData) => {
//    return api.put("/user/profile", userData);
//};
////const createBooking = (venueId, bookingDate, bookingTime) => {
////    return api.post(
////        `/user/booking/${venueId}`,
////        null,
////        {
////            params: {
////                bookingDate,
////                bookingTime
////            }
////        }
////    );
////};
//const getMyBookings = () => {
//    return api.get("/user/bookings");
//};
//const getTimeSlots = (venueId, date) => {
//
//    return api.get(
//        `/user/venues/${venueId}/slots`,
//        {
//            params: {
//                date
//            }
//        }
//    );
//};
//
//const createBooking = (slotId) => {
//
//    return api.post(
//        `/user/booking/${slotId}`
//    );
//};
//export default {
//    getProfile,
//    getVenues,
//    sendOwnerRequest,
//    getOwnerRequestStatus,
//    getVenueImages,
//    deleteUser,
//    updateUser,
//    createBooking,
//    getTimeSlots
//};

import api from "./api";

// ===============================
// PROFILE
// ===============================

const getProfile = () => {
    return api.get("/user/Profile");
};

const updateUser = (userData) => {
    return api.put("/user/profile", userData);
};

const deleteUser = (id) => {
    return api.delete(`/user/${id}`);
};


// ===============================
// VENUES
// ===============================

const getVenues = () => {
    return api.get("/user/venues");
};

const getVenueImages = (venueId) => {
    return api.get(`/user/images/${venueId}`);
};


// ===============================
// OWNER REQUEST
// ===============================

const sendOwnerRequest = (requestData) => {
    return api.post("/user/owner-request", requestData);
};

const getOwnerRequestStatus = () => {
    return api.get("/user/owner-request/status");
};


// ===============================
// TIME SLOTS
// ===============================

const getTimeSlots = (venueId, date) => {

    return api.get(
        `/user/venues/${venueId}/slots`,
        {
            params: {
                date: date
            }
        }
    );
};


// ===============================
// BOOKING
// ===============================

const createBooking = (slotId) => {

    return api.post(
        `/user/booking/${slotId}`
    );
};

const getMyBookings = () => {

    return api.get("/user/bookings");
};


export default {
    getProfile,
    updateUser,
    deleteUser,

    getVenues,
    getVenueImages,

    sendOwnerRequest,
    getOwnerRequestStatus,

    getTimeSlots,

    createBooking,
    getMyBookings
};