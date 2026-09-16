import api from "./api";

// =========================
// DASHBOARD
// =========================

const getDashboard = async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
};


// =========================
// USERS
// =========================

const getUsers = async () => {
    const response = await api.get("/admin/users");
    return response.data;
};

const deleteUser = async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
};

const makeOwner = async (id) => {
    const response = await api.put(`/admin/users/${id}/make-owner`);
    return response.data;
};

const makeUser = async (id) => {
    const response = await api.put(`/admin/users/${id}/make-user`);
    return response.data;
};


// =========================
// VENUES
// =========================

const getVenues = async () => {
    const response = await api.get("/admin/venues");
    return response.data;
};

const deleteVenue = async (id) => {
    const response = await api.delete(`/admin/venues/${id}`);
    return response.data;
};


// =========================
// BOOKINGS
// =========================

const getBookings = async () => {
    const response = await api.get("/admin/bookings");
    return response.data;
};

const deleteBooking = async (id) => {
    const response = await api.delete(`/admin/bookings/${id}`);
    return response.data;
};


// =========================
// OWNER REQUESTS
// =========================

const getOwnerRequests = async () => {
    const response = await api.get("/admin/owner-requests");
    return response.data;
};

const approveOwnerRequest = async (id) => {
    const response = await api.put(
        `/admin/owner-requests/${id}/approve`
    );

    return response.data;
};

const rejectOwnerRequest = async (id) => {
    const response = await api.put(
        `/admin/owner-requests/${id}/reject`
    );

    return response.data;
};


// =========================
// DURATIONS
// =========================

const getDurations = async () => {
    const response = await api.get("/admin/durations");
    return response.data;
};

const addDuration = async (durationMinutes) => {
    const response = await api.post(
        "/admin/durations/add",
        null,
        {
            params: {
                durationMinutes: durationMinutes
            }
        }
    );

    return response.data;
};

const toggleDuration = async (id) => {
    const response = await api.put(
        `/admin/durations/${id}/toggle`
    );

    return response.data;
};

const deleteDuration = async (id) => {
    const response = await api.delete(
        `/admin/duration/${id}`
    );

    return response.data;
};


const adminService = {
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
    rejectOwnerRequest,

    getDurations,
    addDuration,
    toggleDuration,
    deleteDuration
};

export default adminService;