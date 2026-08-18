import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import UserVenues from "./pages/user/UserVenues";
import OwnerRequestStatus from "./pages/user/OwnerRequestStatus";
import BookVenue from "./pages/user/BookVenue";
import UserBookings from "./pages/user/UserBookings";

import AdminDashboard from "./pages/admin/AdminDashboard";
import OwnerRequests from "./pages/admin/OwnerRequests";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminVenues from "./pages/admin/AdminVenues";


import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddVenue from "./pages/owner/AddVenue";
import OwnerBooking from "./pages/owner/OwnerBooking";
import OwnerVenues from "./pages/owner/OwnerVenues";

function App() {

    return (
        <BrowserRouter>

            <Routes>
                 <Route path="/"
                  element={<Home />}
                  />
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/user"
                    element={<UserDashboard />}
                />

                <Route
                    path="/user/profile"
                    element={<UserProfile />}
                />

                <Route
                    path="/user/venues"
                    element={<UserVenues />}
                />

                <Route
                    path="/user/owner-request"
                    element={<OwnerRequestStatus />}
                />
                <Route
                    path="/user/book/:venueId"
                    element={<BookVenue />}
                />
                <Route
                    path="/user/bookings"
                    element={<UserBookings />}
                />
                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/owner-requests"
                    element={<OwnerRequests />}
                />

                <Route
                    path="/admin/users"
                    element={<AdminUsers />}
                />
                <Route
                    path="/admin/bookings"
                    element={<AdminBookings />}
                />
                <Route
                    path="/admin/venues"
                    element={<AdminVenues />}
                />
                <Route
                    path="/owner"
                    element={<OwnerDashboard />}
                />
                <Route
                     path="/owner/add-venue"
                     element={<AddVenue />}
                />
                <Route
                     path="/owner/bookings"
                     element={<OwnerBooking />}
                />
                <Route
                    path="/owner/Venues"
                    element={<OwnerVenues />}
                />


            </Routes>

        </BrowserRouter>
    );
}

export default App;