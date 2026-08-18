import api from "./api";

const getProfile = () => {
    return api.get("/user/Profile");
};

const getVenues = () => {
    return api.get("/user/venues");
};

const sendOwnerRequest = (requestData) => {
    return api.post("/user/owner-request", requestData);
};

const getOwnerRequestStatus = () => {
    return api.get("/user/owner-request/status");
};

const getVenueImages = (venueId) => {
    return api.get(`/user/images/${venueId}`);
};

const deleteUser = (id) => {
    return api.delete(`/user/${id}`);
};

const updateUser = (userData) => {
    return api.put("/user/profile", userData);
};
const createBooking = (venueId, bookingDate, bookingTime) => {
    return api.post(
        `/user/booking/${venueId}`,
        null,
        {
            params: {
                bookingDate,
                bookingTime
            }
        }
    );
};
const getMyBookings = () => {
    return api.get("/user/bookings");
};

export default {
    getProfile,
    getVenues,
    sendOwnerRequest,
    getOwnerRequestStatus,
    getVenueImages,
    deleteUser,
    updateUser,
    createBooking,
    getMyBookings
};