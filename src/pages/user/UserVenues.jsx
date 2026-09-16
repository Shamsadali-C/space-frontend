import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import "../../styles/UserVenues.css";
import VenueImageSlider from "../../components/VenueImageSlider";

const UserVenues = () => {
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await userService.getVenues();
      setVenues(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load venues:", error);
      setVenues([]);
      setError(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load venues."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVenue = (venue) => {
    setSelectedVenue(venue);
    setSelectedDate("");
    setSlots([]);
    setSelectedSlots([]);
    setMessage("");
  };

  const handleDateChange = async (e) => {
    const date = e.target.value;

    setSelectedDate(date);
    setSlots([]);
    setSelectedSlots([]);
    setMessage("");

    if (!date || !selectedVenue) {
      return;
    }

    try {
      setLoadingSlots(true);

      const data = await userService.getTimeSlots(
        selectedVenue.id,
        date
      );

      setSlots(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load slots:", error);
      setSlots([]);
      setMessage(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load time slots."
      );
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSlotSelect = (slot) => {
    const slotStatus = slot.status?.toUpperCase();

    const unavailable =
      slotStatus === "BOOKED" ||
      slotStatus === "UNAVAILABLE" ||
      slotStatus === "PENDING";

    if (unavailable) {
      return;
    }

    const alreadySelected = selectedSlots.some(
      (selected) => selected.id === slot.id
    );

    if (alreadySelected) {
      setSelectedSlots(
        selectedSlots.filter((selected) => selected.id !== slot.id)
      );
      setMessage("");
      return;
    }

    if (selectedSlots.length === 0) {
      setSelectedSlots([slot]);
      setMessage("");
      return;
    }

    const sortedSelected = [...selectedSlots].sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );

    const firstSelected = sortedSelected[0];
    const lastSelected = sortedSelected[sortedSelected.length - 1];

    const canAddBefore =
      slot.endTime === firstSelected.startTime;

    const canAddAfter =
      slot.startTime === lastSelected.endTime;

    if (canAddBefore || canAddAfter) {
      setSelectedSlots(
        [...selectedSlots, slot].sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        )
      );
      setMessage("");
    } else {
      setMessage("Please select a consecutive time slot.");
    }
  };

  const sortedSelectedSlots = [...selectedSlots].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  const getStartTime = () => {
    if (sortedSelectedSlots.length === 0) {
      return "";
    }

    return sortedSelectedSlots[0].startTime;
  };

  const getEndTime = () => {
    if (sortedSelectedSlots.length === 0) {
      return "";
    }

    return sortedSelectedSlots[sortedSelectedSlots.length - 1].endTime;
  };

  const getDuration = () => {
    if (sortedSelectedSlots.length === 0) {
      return 0;
    }

    const start = sortedSelectedSlots[0].startTime;
    const end =
      sortedSelectedSlots[sortedSelectedSlots.length - 1].endTime;

    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    return (endMinutes - startMinutes) / 60;
  };

  const handleBooking = () => {
    setMessage("");

    if (selectedSlots.length === 0) {
      setMessage("Please select at least one time slot.");
      return;
    }

    const sorted = [...selectedSlots].sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );

    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].endTime !== sorted[i + 1].startTime) {
        setMessage(
          "Please select consecutive time slots. You cannot skip a time slot."
        );
        return;
      }
    }

    setShowPaymentModal(true);
  };

const handlePayment = async () => {
  try {
    setBookingLoading(true);
    setMessage("");

    const slotIds = sortedSelectedSlots.map((slot) => slot.id);

    if (slotIds.length === 0) {
      setMessage("Please select at least one time slot.");
      setBookingLoading(false);
      return;
    }

    const order = await userService.createPaymentOrder(slotIds);

    if (!window.Razorpay) {
      throw new Error("Razorpay Checkout failed to load.");
    }

    let paymentProcessing = false;

    const releaseBooking = async (failureMessage) => {
      if (paymentProcessing) {
        return;
      }

      paymentProcessing = true;

      try {
        await userService.paymentFailure(order.bookingId);

        setShowPaymentModal(false);
        setSelectedSlots([]);
        setMessage(failureMessage);

        if (selectedVenue && selectedDate) {
          const updatedSlots = await userService.getTimeSlots(
            selectedVenue.id,
            selectedDate
          );

          setSlots(
            Array.isArray(updatedSlots)
              ? updatedSlots
              : []
          );
        }
      } catch (error) {
        console.error(
          "Failed to update booking:",
          error
        );

        setMessage(
          "We couldn't update the booking status. Please refresh the page."
        );
      } finally {
        setBookingLoading(false);
      }
    };

    const options = {
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: "Book My Space",
      description: "Venue Booking Advance",
      order_id: order.orderId,

      handler: async function (response) {
        try {
          setBookingLoading(true);

          const paymentData = {
            bookingId: order.bookingId,
            razorpayOrderId:
              response.razorpay_order_id,
            razorpayPaymentId:
              response.razorpay_payment_id,
            razorpaySignature:
              response.razorpay_signature
          };

          await userService.verifyPayment(paymentData);

          setShowPaymentModal(false);
          setSelectedSlots([]);
          setShowBookingSuccess(true);

          setTimeout(() => {
            setShowBookingSuccess(false);
            navigate("/user/bookings");
          }, 2000);

        } catch (error) {
          console.error(
            "Payment verification error:",
            error
          );

          setMessage(
            error.response?.data ||
              "Payment verification failed. Please check your booking before trying again."
          );

        } finally {
          setBookingLoading(false);
        }
      },

      modal: {
        ondismiss: async function () {
          await releaseBooking(
            "Payment cancelled. The selected time slots are available again."
          );
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on(
      "payment.failed",
      async function (response) {
        console.error(
          "Razorpay payment failed:",
          response.error
        );

        await releaseBooking(
          response.error?.description ||
            "Payment failed. The selected time slots are available again."
        );
      }
    );

    razorpay.open();

  } catch (error) {
    console.error(
      "Payment order creation failed:",
      error
    );

    setBookingLoading(false);

    setMessage(
      error.response?.data ||
        error.message ||
        "Unable to start payment. Please try again."
    );
  }
};

  const closeSlotSection = () => {
    setSelectedVenue(null);
    setSelectedDate("");
    setSlots([]);
    setSelectedSlots([]);
    setMessage("");
  };

  const closePaymentModal = () => {
    if (bookingLoading) {
      return;
    }

    setShowPaymentModal(false);
  };

  const hourlyPrice = Number(selectedVenue?.price || 0);
  const duration = getDuration();
  const totalPrice = hourlyPrice * duration;
  const advancePerHour = hourlyPrice * 0.25;
  const advanceAmount = advancePerHour * duration;

  if (loading) {
    return (
      <div className="user-loading">
        <div className="user-spinner"></div>
        <h2>Finding available spaces...</h2>
      </div>
    );
  }

  return (
    <div className="user-layout">
      <aside className="user-sidebar">
        <div className="user-logo">Book My Space</div>
        <div className="user-role">USER PANEL</div>

        <nav>
          <Link to="/user"> Dashboard</Link>
          <Link to="/user/venues" className="active">
             Find Venues
          </Link>
          <Link to="/user/bookings"> My Bookings</Link>
          <Link to="/user/profile"> Profile</Link>
          <Link to="/user/owner-request">
             Become an Owner
          </Link>
        </nav>
      </aside>

      <main className="user-main">
        <div className="user-page-header">
          <div>
            <span className="user-page-label">
              FIND YOUR SPACE
            </span>
          </div>
        </div>

        {error && (
          <div className="user-error">
            <strong>Unable to load venues</strong>
            <p>{error}</p>

            <button type="button" onClick={loadVenues}>
              Try Again
            </button>
          </div>
        )}

        {message && (
          <div className="user-message">
            ✓ {message}
          </div>
        )}

        {!error && venues.length === 0 ? (
          <div className="user-empty">
            <div className="user-empty-icon">🏢</div>
            <h2>No venues available</h2>
            <p>
              There are currently no venues available.
            </p>
          </div>
        ) : (
          !error && (
            <div className="user-venue-grid">
              {venues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  onSelect={handleSelectVenue}
                />
              ))}
            </div>
          )
        )}

        {selectedVenue && (
          <div className="slot-modal-overlay">
            <div className="slot-modal">
              <div className="slot-modal-header">
                <div>
                  <span className="slot-modal-label">
                    BOOK YOUR SPACE
                  </span>

                  <h2>{selectedVenue.venueName}</h2>

                  <p>
                    📍{" "}
                    {selectedVenue.location ||
                      "Location not specified"}
                  </p>
                </div>

                <button
                  type="button"
                  className="close-slot-btn"
                  onClick={closeSlotSection}
                >
                  ✕
                </button>
              </div>

              <div className="slot-date-section">
                <label>Select Booking Date</label>

                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleDateChange}
                />
              </div>

              <div className="popup-slots-section">
                {!selectedDate ? (
                  <div className="popup-empty">
                    <div className="popup-empty-icon">
                      📅
                    </div>

                    <h3>Select a date</h3>

                    <p>
                      Choose a date to see available time
                      slots.
                    </p>
                  </div>
                ) : loadingSlots ? (
                  <div className="popup-loading">
                    <div className="user-spinner"></div>
                    <p>Finding available slots...</p>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="popup-empty">
                    <div className="popup-empty-icon">
                      🕐
                    </div>

                    <h3>No time slots available</h3>

                    <p>
                      Try selecting another date.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="slots-title">
                      <div>Available Time Slots</div>
                      <span>{slots.length} slots</span>
                    </div>

                    <div className="popup-slot-grid">
                      {slots.map((slot) => {
                        const slotStatus =
                          slot.status?.toUpperCase();

                        const isUnavailable =
                          slotStatus === "UNAVAILABLE" ||
                          slotStatus === "BOOKED" ||
                          slotStatus === "PENDING";

                        const isSelected =
                          selectedSlots.some(
                            (selected) =>
                              selected.id === slot.id
                          );

                        return (
                          <div
                            key={slot.id}
                            className={`popup-slot-card ${
                              isUnavailable
                                ? "popup-slot-unavailable"
                                : ""
                            } ${
                              isSelected
                                ? "popup-slot-selected"
                                : ""
                            }`}
                            onClick={() => {
                              if (!isUnavailable) {
                                handleSlotSelect(slot);
                              }
                            }}
                          >
                            <div className="popup-slot-time">
                              <span className="clock-icon">
                                🕐
                              </span>

                              <div>
                                <strong>
                                  {slot.startTime}
                                </strong>

                                <span>to</span>

                                <strong>
                                  {slot.endTime}
                                </strong>
                              </div>
                            </div>

                            <span
                              className={
                                isUnavailable
                                  ? "popup-slot-status unavailable"
                                  : isSelected
                                    ? "popup-slot-status selected"
                                    : "popup-slot-status available"
                              }
                            >
                              {isUnavailable
                                ? "UNAVAILABLE"
                                : isSelected
                                  ? "SELECTED ✓"
                                  : "AVAILABLE"}
                            </span>

                            <button
                              type="button"
                              className={
                                isSelected
                                  ? "popup-book-btn selected"
                                  : "popup-book-btn"
                              }
                              disabled={isUnavailable}
                              onClick={(e) => {
                                e.stopPropagation();

                                if (!isUnavailable) {
                                  handleSlotSelect(slot);
                                }
                              }}
                            >
                              {isSelected
                                ? "Selected ✓"
                                : "Select"}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {selectedSlots.length > 0 && (
                      <div className="selected-booking-summary">
                        <div className="selected-summary-title">
                          Selected Time
                        </div>

                        <div className="selected-summary-time">
                          {getStartTime()} → {getEndTime()}
                        </div>

                        <div className="selected-summary-duration">
                          Duration: {duration}{" "}
                          {duration === 1 ? "hour" : "hours"}
                        </div>

                        <button
                          type="button"
                          className="popup-main-book-btn"
                          onClick={handleBooking}
                        >
                          Book Now
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="slot-modal-footer">
                <span>
                  Select consecutive time slots.
                </span>

                <button
                  type="button"
                  onClick={closeSlotSection}
                  className="modal-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showPaymentModal && selectedVenue && (
          <div className="payment-modal-overlay">
            <div className="payment-modal">
              <div className="payment-modal-header">
                <div>
                  <span>BOOKING SUMMARY</span>
                  <h2>Confirm Your Booking</h2>
                </div>

                <button
                  type="button"
                  onClick={closePaymentModal}
                  disabled={bookingLoading}
                >
                  ❌
                </button>
              </div>

              <div className="payment-venue">
                <h3>{selectedVenue.venueName}</h3>
                <p>{selectedVenue.location}</p>
              </div>

              <div className="payment-details">
                <div className="payment-detail-row">
                  <span>Date</span>
                  <strong>{selectedDate}</strong>
                </div>

                <div className="payment-detail-row">
                  <span>Time</span>
                  <strong>
                    {getStartTime()} → {getEndTime()}
                  </strong>
                </div>

                <div className="payment-detail-row">
                  <span>Duration</span>
                  <strong>
                    {duration}{" "}
                    {duration === 1 ? "hour" : "hours"}
                  </strong>
                </div>
              </div>

              <div className="payment-price-section">
                <div className="payment-price-row">
                  <span>Hourly Price</span>
                  <strong>₹{hourlyPrice}</strong>
                </div>

                <div className="payment-price-row">
                  <span>Duration</span>
                  <strong>× {duration}</strong>
                </div>

                <div className="payment-price-row total">
                  <span>Total Price</span>
                  <strong>₹{totalPrice}</strong>
                </div>

                <div className="payment-price-row advance">
                  <span>Advance Payment (25%)</span>
                  <strong>₹{advanceAmount}</strong>
                </div>
              </div>

              <div className="payment-action">
                <p>
                  You need to pay 25% advance to confirm this
                  booking.
                </p>

                <button
                  type="button"
                  className="pay-now-btn"
                  onClick={handlePayment}
                  disabled={bookingLoading}
                >
                  {bookingLoading
                    ? "Processing Payment..."
                    : `Pay ₹${advanceAmount}`}
                </button>
              </div>
            </div>
          </div>
        )}

        {showBookingSuccess && (
          <div className="booking-success-overlay">
            <div className="booking-success-popup">
              <div className="booking-success-icon">
                ✓
              </div>

              <h2>Venue Booked!</h2>

              <p>
                The venue has been booked successfully.
              </p>

              <span>
                Redirecting to your bookings...
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const VenueCard = ({ venue, onSelect }) => {
  const [venueImages, setVenueImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  const venueStatus = (
    venue.venueStatus ||
    venue.status ||
    "AVAILABLE"
  ).toUpperCase();

  const isUnavailable =
    venueStatus === "MAINTENANCE" ||
    venueStatus === "HOLIDAY";

  useEffect(() => {
    loadImages();
  }, [venue.id]);

  const loadImages = async () => {
    try {
      setImagesLoading(true);

      const images = await userService.getVenueImages(
        venue.id
      );

      setVenueImages(
        Array.isArray(images) ? images : []
      );
    } catch (error) {
      console.error(
        `Failed to load images for venue ${venue.id}:`,
        error
      );

      setVenueImages([]);
    } finally {
      setImagesLoading(false);
    }
  };

  return (
    <div className="user-venue-card">
      <div className="venue-card-top">
        {imagesLoading ? (
          <div className="venue-image-placeholder">
            <div className="user-spinner"></div>
          </div>
        ) : venueImages.length > 0 ? (
          <VenueImageSlider
            images={venueImages}
            venueName={venue.venueName}
          />
        ) : (
          <div className="venue-image-placeholder">
            🏢
          </div>
        )}

        <div
          className={`venue-status-badge ${venueStatus.toLowerCase()}`}
        >
          {venueStatus === "AVAILABLE" && "Available"}
          {venueStatus === "MAINTENANCE" && "Maintenance"}
          {venueStatus === "HOLIDAY" && "Holiday"}
        </div>
      </div>

      <div className="venue-card-content">
        <h2>{venue.venueName}</h2>

        <p className="venue-location">
          {venue.location || "Location not specified"}
        </p>

        <div className="venue-meta">
          <span>{venue.capacity || "N/A"}</span>

          <strong>
            ₹{venue.price || 0}
            <small>/hour</small>
          </strong>
        </div>

        <button
          type="button"
          className={`view-slots-btn ${
            isUnavailable
              ? "venue-unavailable-btn"
              : ""
          }`}
          onClick={() => {
            if (!isUnavailable) {
              onSelect(venue);
            }
          }}
          disabled={isUnavailable}
        >
          {isUnavailable
            ? "Unavailable"
            : "View Time Slots →"}
        </button>
      </div>
    </div>
  );
};

export default UserVenues;