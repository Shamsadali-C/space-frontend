import React, { useEffect, useState } from "react";
import ownerService from "../../services/ownerService";
import "../../styles/OwnerBookings.css";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await ownerService.getBookings();
      setBookings(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Failed to load bookings:", error);
      setBookings([]);
      setMessage(error.response?.data?.message || error.response?.data || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return "N/A";

    const [hours, minutes] = time.substring(0, 5).split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    } catch {
      return date;
    }
  };

  const getStatusClass = (status) => {
    return (status || "UNKNOWN").toLowerCase();
  };

  const getBookingDate = (booking) => {
    return booking.bookingDate || booking.timeSlot?.slotDate || booking.date || null;
  };

  const getStartTime = (booking) => {
    return booking.startTime || booking.timeSlot?.startTime || booking.bookingTime || booking.time || null;
  };

  const getEndTime = (booking) => {
    return booking.endTime || booking.timeSlot?.endTime || null;
  };

  const getHourlyPrice = (booking) => {
    return Number(booking.hourlyPrice ?? booking.venue?.price ?? 0);
  };

  const getTotalPrice = (booking) => {
    if (booking.totalPrice !== undefined) return Number(booking.totalPrice);
    return 0;
  };

  const getAdvance = (booking) => {
    if (booking.advanceAmount !== undefined) return Number(booking.advanceAmount);
    return 0;
  };

  if (loading) {
    return (
      <div className="owner-bookings-page">
        <div className="owner-bookings-loading">
          <div className="owner-bookings-spinner"></div>
          <p>Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="owner-bookings-page">
      <div className="owner-bookings-container">
        <div className="owner-bookings-header">
          <div>
            <h1>Booking Details</h1>
          </div>

          <div className="booking-count">
            <strong>{bookings.length}</strong>
            <span>Total Bookings</span>
          </div>
        </div>

        {message && <div className="owner-bookings-message">{message}</div>}

        {bookings.length === 0 ? (
          <div className="no-bookings">
            <div className="no-bookings-icon">📅</div>
            <h2>No Bookings Yet</h2>
            <p>When customers complete a booking and payment for your venue, it will appear here.</p>
          </div>
        ) : (
          <div className="owner-bookings-list">
            {bookings.map((booking) => {
              const status = booking.bookingStatus || booking.status || "UNKNOWN";
              const bookingDate = getBookingDate(booking);
              const startTime = getStartTime(booking);
              const endTime = getEndTime(booking);
              const hourlyPrice = getHourlyPrice(booking);
              const totalPrice = getTotalPrice(booking);
              const advance = getAdvance(booking);

              return (
                <div className="owner-booking-card" key={booking.id}>
                  <div className="booking-card-top">
                    <div>
                      <span className="booking-id">Booking #{booking.id}</span>
                      <h2>{booking.venue?.venueName || "Venue"}</h2>
                      <p className="booking-location">
                        📍 {booking.venue?.location || "Location unavailable"}
                      </p>
                    </div>

                    <span className={`booking-status ${getStatusClass(status)}`}>{status}</span>
                  </div>

                  <div className="booking-customer">
                    <div className="customer-icon">👤</div>
                    <div>
                      <small>Customer</small>
                      <strong>{booking.user?.username || booking.username || "Unknown User"}</strong>
                      {booking.user?.email && <span className="detail-sub">{booking.user.email}</span>}
                    </div>
                  </div>

                  <div className="booking-details">
                    <div className="booking-detail">
                      <span className="detail-icon">📅</span>
                      <div>
                        <small>Booking Date</small>
                        <strong>{formatDate(bookingDate)}</strong>
                      </div>
                    </div>

                    <div className="booking-detail">
                      <span className="detail-icon">🕒</span>
                      <div>
                        <small>Booking Time</small>
                        <strong>
                          {startTime ? formatTime(startTime) : "N/A"}
                          {" → "}
                          {endTime ? formatTime(endTime) : "N/A"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="booking-payment">
                    <div className="payment-row">
                      <span>Hourly Price</span>
                      <strong>₹{hourlyPrice.toLocaleString("en-IN")}/hr</strong>
                    </div>

                    <div className="payment-row">
                      <span>Total Booking</span>
                      <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
                    </div>

                    <div className="payment-row advance">
                      <span>Advance Amount (25%)</span>
                      <strong>₹{advance.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>

                  {(status === "CONFIRMED" || status === "PAID" || status === "BOOKED" || status === "ACCEPTED") && (
                    <div className="booking-confirmed">
                      <span>✓</span>
                      <div>
                        <strong>Booking Confirmed</strong>
                        <p>Payment has been successfully received.</p>
                      </div>
                    </div>
                  )}

                  {(status === "PENDING" || status === "PAYMENT_PENDING") && (
                    <div className="booking-pending">
                      <span>⏳</span>
                      <div>
                        <strong>Payment Pending</strong>
                        <p>Waiting for customer payment confirmation.</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerBookings;