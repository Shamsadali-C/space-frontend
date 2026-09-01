import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import "../../styles/AdminBookings.css";

const AdminBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const response = await adminService.getBookings();

            console.log("Bookings:", response.data);

            setBookings(response.data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data ||
                "Failed to load bookings"
            );

        } finally {

            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="admin-bookings-page">
                <h2>Loading bookings...</h2>
            </div>
        );
    }


    return (

        <div className="admin-bookings-page">

            <div className="bookings-header">

                <div>
                    <h1>Manage Bookings</h1>

                    <p>
                        View all venue bookings
                    </p>
                </div>


                <div className="booking-count">
                    {bookings.length} Bookings
                </div>

            </div>


            {error && (
                <div className="booking-error">
                    {error}
                </div>
            )}


            {bookings.length === 0 ? (

                <div className="no-bookings">
                    <h2>No Bookings Found</h2>

                    <p>
                        There are currently no bookings.
                    </p>
                </div>

            ) : (

                <div className="bookings-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>User</th>

                                <th>Venue</th>

                                <th>Status</th>

                                <th>Details</th>

                            </tr>

                        </thead>


                        <tbody>

                            {bookings.map((booking) => (

                                <tr key={booking.id}>

                                    <td>
                                        #{booking.id}
                                    </td>


                                    <td>

                                        {booking.user ? (
                                            <>
                                                <strong>
                                                    {booking.user.username}
                                                </strong>

                                                <br />

                                                <small>
                                                    {booking.user.email}
                                                </small>
                                            </>
                                        ) : (
                                            "N/A"
                                        )}

                                    </td>


                                    <td>

                                        {booking.venue ? (
                                            <>
                                                <strong>
                                                    {booking.venue.venueName}
                                                </strong>

                                                <br />

                                                <small>
                                                    {booking.venue.location}
                                                </small>
                                            </>
                                        ) : (
                                            "N/A"
                                        )}

                                    </td>


                                    <td>

                                        <span
                                            className={`booking-status ${
                                                booking.bookingStatus
                                                    ?.toLowerCase()
                                            }`}
                                        >
                                            {booking.bookingStatus}
                                        </span>

                                    </td>


                                    <td>

                                        <div className="booking-details">

                                            {booking.bookingDate && (
                                                <p>
                                                    <strong>
                                                        Date:
                                                    </strong>{" "}
                                                    {booking.bookingDate}
                                                </p>
                                            )}

                                            {booking.startTime && (
                                                <p>
                                                    <strong>
                                                        Start:
                                                    </strong>{" "}
                                                    {booking.startTime}
                                                </p>
                                            )}

                                            {booking.endTime && (
                                                <p>
                                                    <strong>
                                                        End:
                                                    </strong>{" "}
                                                    {booking.endTime}
                                                </p>
                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default AdminBookings;