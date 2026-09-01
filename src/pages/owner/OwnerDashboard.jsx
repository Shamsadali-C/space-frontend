import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/OwnerDashboard.css";

const OwnerDashboard = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <div className="owner-layout">

            {/* SIDEBAR */}

            <aside className="owner-sidebar">

                <div className="owner-logo">
                    Book My Space
                </div>

                <div className="owner-role">
                    OWNER PANEL
                </div>

                <nav>

                    <Link to="/owner">
                        Dashboard
                    </Link>

                    <Link to="/owner/venues">
                        My Venues
                    </Link>

                    <Link to="/owner/bookings">
                        Bookings
                    </Link>
                    <Link
                            to="/owner/create-slot"
                            className="active"
                        >
                            Create Time Slot
                        </Link>

                    <Link to="/owner/add-venue">
                        Add Venue
                    </Link>

                </nav>

                <button
                    className="owner-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </aside>


            {/* MAIN CONTENT */}

            <main className="owner-main">

                <div className="owner-header">

                    <h1>
                        Owner Dashboard
                    </h1>

                    <p>
                        Manage your venues and bookings
                    </p>

                </div>


                {/* DASHBOARD CARDS */}

                <div className="owner-cards">


                    {/* MY VENUES */}

                    <Link
                        to="/owner/venues"
                        className="owner-card"
                    >

                        <div className="owner-card-icon">
                            🏢
                        </div>

                        <h2>
                            My Venues
                        </h2>

                        <p>
                            View, update and manage your
                            venues.
                        </p>

                    </Link>


                    {/* BOOKINGS */}

                    <Link
                        to="/owner/bookings"
                        className="owner-card"
                    >

                        <div className="owner-card-icon">
                            📅
                        </div>

                        <h2>
                            Bookings
                        </h2>

                        <p>
                            View and manage customer
                            booking requests.
                        </p>

                    </Link>
                    
                      {/* CREATE TIME SLOT */}

                        <div className="owner-dashboard-card slot-card">

                            <div className="dashboard-card-icon">
                                🕐
                            </div>

                            <div className="dashboard-card-content">

                                <h3>
                                    Create Time Slot
                                </h3>

                                <p>
                                    Create available date and time
                                    slots for your venues.
                                </p>

                                <Link
                                    to="/owner/create-slot"
                                    className="dashboard-card-btn"
                                >
                                    Create Slot →
                                </Link>

                            </div>

                        </div>


                    {/* ADD VENUE */}

                    <Link
                        to="/owner/add-venue"
                        className="owner-card"
                    >

                        <div className="owner-card-icon">
                            ➕
                        </div>

                        <h2>
                            Add Venue
                        </h2>

                        <p>
                            Register a new venue and make
                            it available for customers.
                        </p>

                    </Link>


                </div>

            </main>

        </div>
    );
};

export default OwnerDashboard;
//
// import React, { useEffect, useState } from "react";
// import ownerService from "../../services/ownerService";
//
// const OwnerDashboard = () => {
//
//     const [venues, setVenues] = useState([]);
//
//
//     useEffect(() => {
//
//         getVenues();
//
//     }, []);
//
//
//     const getVenues = async () => {
//
//         try {
//
//             const data =
//                 await ownerService.getVenues();
//
//             setVenues(data);
//
//         } catch (error) {
//
//             console.log(error);
//
//         }
//
//     };
//
//
//     // Maintenance
//
//     const makeMaintenance = async (id) => {
//
//         try {
//
//             await ownerService.maintenance(id);
//
//             getVenues();
//
//         } catch (error) {
//
//             console.log(error);
//
//         }
//
//     };
//
//
//     // Available
//
//     const makeAvailable = async (id) => {
//
//         try {
//
//             await ownerService.available(id);
//
//             getVenues();
//
//         } catch (error) {
//
//             console.log(error);
//
//         }
//
//     };
//
//
//     // Holiday
//
//     const makeHoliday = async (id) => {
//
//         try {
//
//             await ownerService.holiday(id);
//
//             getVenues();
//
//         } catch (error) {
//
//             console.log(error);
//
//         }
//
//     };
//
//
//     // Delete
//
//     const deleteVenue = async (id) => {
//
//         try {
//
//             await ownerService.deleteVenue(id);
//
//             getVenues();
//
//         } catch (error) {
//
//             console.log(error);
//
//         }
//
//     };
//
//
//     return (
//
//         <div>
//
//             <h1>Owner Dashboard</h1>
//
//             <h2>My Venues</h2>
//
//
//             {venues.map((venue) => (
//
//                 <div key={venue.id}>
//
//                     <h3>
//                         {venue.venueName}
//                     </h3>
//
//                     <p>
//                         Location: {venue.location}
//                     </p>
//
//                     <p>
//                         Capacity: {venue.capacity}
//                     </p>
//
//                     <p>
//                         Price: ₹{venue.price}
//                     </p>
//
//                     <p>
//                         Status: {venue.venueStatus}
//                     </p>
//
//
//                     <button
//                         onClick={() =>
//                             makeAvailable(venue.id)
//                         }
//                     >
//                         Available
//                     </button>
//
//
//                     <button
//                         onClick={() =>
//                             makeMaintenance(venue.id)
//                         }
//                     >
//                         Maintenance
//                     </button>
//
//
//                     <button
//                         onClick={() =>
//                             makeHoliday(venue.id)
//                         }
//                     >
//                         Holiday
//                     </button>
//
//
//                     <button
//                         onClick={() =>
//                             deleteVenue(venue.id)
//                         }
//                     >
//                         Delete
//                     </button>
//
//
//                     <hr />
//
//                 </div>
//
//             ))}
//
//         </div>
//     );
// };
//
// export default OwnerDashboard;