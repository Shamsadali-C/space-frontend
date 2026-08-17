import api from "./api";

const createBooking = (venueId) => {
    return api.post(`/booking/${venueId}`);
};

export default {
    createBooking
};