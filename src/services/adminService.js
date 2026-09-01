import axios from "axios";

const API_URL = "http://localhost:8080/admin";

const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};


const getDashboard = () => {
    return axios.get(
        `${API_URL}/dashboard`,
        getConfig()
    );
};


const getUsers = () => {
    return axios.get(
        `${API_URL}/users`,
        getConfig()
    );
};

const deleteUser = (id) => {
    return axios.delete(
        `${API_URL}/users/${id}`,
        getConfig()
    );
};

const makeOwner = (id) => {
    return axios.put(
        `${API_URL}/users/${id}/make-owner`,
        {},
        getConfig()
    );
};

const makeUser = (id) => {
    return axios.put(
        `${API_URL}/users/${id}/make-user`,
        {},
        getConfig()
    );
};


const getVenues = () => {
    return axios.get(
        `${API_URL}/venues`,
        getConfig()
    );
};

const deleteVenue = (id) => {
    return axios.delete(
        `${API_URL}/venues/${id}`,
        getConfig()
    );
};


const getBookings = () => {
    return axios.get(
        `${API_URL}/bookings`,
        getConfig()
    );
};

const deleteBooking = (id) => {
    return axios.delete(
        `${API_URL}/bookings/${id}`,
        getConfig()
    );
};


const getOwnerRequests = () => {
    return axios.get(
        `${API_URL}/owner-requests`,
        getConfig()
    );
};

const approveOwnerRequest = (id) => {
    return axios.put(
        `${API_URL}/owner-requests/${id}/approve`,
        {},
        getConfig()
    );
};

const rejectOwnerRequest = (id) => {
    return axios.put(
        `${API_URL}/owner-requests/${id}/reject`,
        {},
        getConfig()
    );
};


export default {
    getDashboard,

    getUsers,
    deleteUser,
    makeOwner,
    makeUser,

    getVenues,
    deleteVenue,

    getBookings,
    deleteBooking,

    getOwnerRequests,
    approveOwnerRequest,
    rejectOwnerRequest
};