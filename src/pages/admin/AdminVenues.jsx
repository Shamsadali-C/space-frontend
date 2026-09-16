import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminService from "../../services/adminService";
import "../../styles/AdminVenues.css";

function AdminVenues() {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadVenues();
    }, []);


    const loadVenues = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await adminService.getVenues();

            console.log("Venues:", response);

            // adminService already returns response.data
            setVenues(
                Array.isArray(response)
                    ? response
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load venues:",
                error
            );

            setVenues([]);

            setError(
                error.response?.data ||
                "Failed to load venues"
            );

        } finally {

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <div className="admin-venues-loading">
                Loading venues...
            </div>
        );
    }


    return (

        <div className="admin-venues-page">


            {/* SIDEBAR */}

            <aside className="admin-venues-sidebar">

                <h2 className="admin-venues-logo">
                    Book My Space
                </h2>

                <p className="admin-venues-role">
                    ADMIN PANEL
                </p>


                <nav>

                    <Link to="/admin/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/admin/users">
                        Users
                    </Link>

                    <Link
                        to="/admin/venues"
                        className="active"
                    >
                        Venues
                    </Link>

                    <Link to="/admin/bookings">
                        Bookings
                    </Link>

                    <Link to="/admin/durations">
                        Slot Durations
                    </Link>

                    <Link to="/admin/owner-requests">
                        Owner Requests
                    </Link>

                </nav>

            </aside>


            {/* MAIN CONTENT */}

            <main className="admin-venues-main">

                <div className="admin-venues-header">

                    <div>

                        <h1>
                            Venues
                        </h1>

                        <p>
                            View all registered venues
                        </p>

                    </div>


                    <div className="venue-count">

                        Total Venues:

                        <strong>
                            {venues.length}
                        </strong>

                    </div>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="admin-venues-error">
                        {typeof error === "string"
                            ? error
                            : "Failed to load venues"}
                    </div>

                )}


                {/* NO VENUES */}

                {venues.length === 0 ? (

                    <div className="no-venues">

                        <h2>
                            No Venues Found
                        </h2>

                        <p>
                            There are currently no venues
                            registered.
                        </p>

                    </div>

                ) : (

                    <div className="venues-table-container">

                        <table className="venues-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Venue Name</th>

                                    <th>Location</th>

                                    <th>Capacity</th>

                                    <th>Price</th>

                                    <th>Status</th>

                                    <th>Owner Name</th>

                                </tr>

                            </thead>


                            <tbody>

                                {Array.isArray(venues) &&
                                    venues.map((venue) => (

                                        <tr
                                            key={venue.id}
                                        >

                                            <td>
                                                {venue.id}
                                            </td>


                                            <td className="venue-name">
                                                {venue.venueName}
                                            </td>


                                            <td>
                                                {venue.location}
                                            </td>


                                            <td>
                                                {venue.capacity}
                                            </td>


                                            <td className="venue-price">
                                                ₹{venue.price}
                                            </td>


                                            <td>

                                                <span
                                                    className={`status ${
                                                        venue.venueStatus
                                                            ?.toLowerCase() || ""
                                                    }`}
                                                >
                                                    {venue.venueStatus ||
                                                        "N/A"}
                                                </span>

                                            </td>


                                            <td>
                                                {venue.owner?.username ||
                                                    "N/A"}
                                            </td>

                                        </tr>

                                    ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminVenues;