import api from "./api";

const createBooking = (userId, venueId) => {
    return api.post(`/user/${userId}/${venueId}`);
};

export default {
    createBooking,
};