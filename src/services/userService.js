

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

//const createBooking = async (slotIds) => {
//
//    const response = await api.post(
//        "/user/booking",
//        {
//            slotIds: slotIds
//        }
//    );
//
//    return response.data;
//};


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

const createPaymentOrder = async (slotIds) => {
      const response = await api.post( "/user/payment/create-order",
           { slotIds: slotIds }
           );
      return response.data; };

const verifyPayment = async (paymentData) => {
   const response = await api.post( "/user/payment/verify",
         paymentData );
   return response.data; };

const paymentFailure = async (bookingId) => {

    const response = await api.post(
        `/user/payment/failure/${bookingId}`
    );

    return response.data;
};


export default {

    getProfile,
    updateUser,

    getVenues,
    getVenueImages,

    getTimeSlots,

    createPaymentOrder,
    verifyPayment,
    paymentFailure,
    getMyBookings,

    sendOwnerRequest,
    getOwnerRequestStatus
};

