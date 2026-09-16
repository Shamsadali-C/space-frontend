import React, { useEffect, useState } from "react";
import ownerService from "../../services/ownerService";
import "../../styles/CreateTimeSlot.css";

const CreateTimeSlot = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");

  const [durations, setDurations] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("");

  const [slotDate, setSlotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [loadingDurations, setLoadingDurations] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [venueData, durationData] = await Promise.all([
        ownerService.getVenues(),
        ownerService.getDurations(),
      ]);

      setVenues(Array.isArray(venueData) ? venueData : []);
      setDurations(Array.isArray(durationData) ? durationData : []);
    } catch (error) {
      console.error("Failed to load data:", error);

      setError(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to load venues and durations."
      );
    } finally {
      setLoading(false);
      setLoadingDurations(false);
    }
  };

  const toMinutes = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  };

  const formatDuration = (minutes) => {
    if (minutes < 60 || minutes % 60 !== 0) {
      return `${minutes} minutes`;
    }

    const hours = minutes / 60;
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!selectedVenue) {
      setError("Please select a venue.");
      return;
    }

    if (!slotDate) {
      setError("Please select a date.");
      return;
    }

    if (!startTime) {
      setError("Please select a start time.");
      return;
    }

    if (!endTime) {
      setError("Please select an end time.");
      return;
    }

    if (!selectedDuration) {
      setError("Please select a slot duration.");
      return;
    }

    if (startTime >= endTime) {
      setError("End time must be later than start time.");
      return;
    }

    const durationMinutes = Number(selectedDuration);
    const totalMinutes = toMinutes(endTime) - toMinutes(startTime);

    if (totalMinutes % durationMinutes !== 0) {
      setError(
        `The selected availability cannot be divided into ${durationMinutes}-minute slots.`
      );
      return;
    }

    try {
      setCreating(true);

      const availability = {
        slotDate,
        startTime,
        endTime,
        duration: durationMinutes,
      };

      await ownerService.createTimeSlot(selectedVenue, availability);

      const createdSlots = totalMinutes / durationMinutes;

      setMessage(
        `Availability added successfully. ${createdSlots} time slot${
          createdSlots > 1 ? "s" : ""
        } created.`
      );

      setSlotDate("");
      setStartTime("");
      setEndTime("");
      setSelectedDuration("");
    } catch (error) {
      console.error("Create availability error:", error);

      setError(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to add availability."
      );
    } finally {
      setCreating(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const getTotalMinutes = () => {
    if (!startTime || !endTime) {
      return 0;
    }

    const minutes = toMinutes(endTime) - toMinutes(startTime);
    return minutes > 0 ? minutes : 0;
  };

  const totalMinutes = getTotalMinutes();
  const durationMinutes = Number(selectedDuration || 0);

  const isDivisible =
    durationMinutes > 0 &&
    totalMinutes > 0 &&
    totalMinutes % durationMinutes === 0;

  const numberOfSlots = isDivisible ? totalMinutes / durationMinutes : 0;

  if (loading) {
    return (
      <div className="create-slot-page">
        <div className="create-slot-loading">
          <div className="slot-spinner"></div>
          <p>Loading your venues and durations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-slot-page">
      <div className="create-slot-container">
        <div className="create-slot-header">
          <span className="slot-label">OWNER DASHBOARD</span>
          <h1>Add Availability</h1>
          <p>
            Set the date, available hours and slot duration for your venue.
          </p>
        </div>

        {venues.length === 0 ? (
          <div className="no-venues">
            <div className="no-venues-icon">🏢</div>
            <h2>No Venues Found</h2>
            <p>
              You need to create a venue before you can add availability.
            </p>
          </div>
        ) : (
          <form className="create-slot-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="venue">Select Venue</label>
              <select
                id="venue"
                value={selectedVenue}
                onChange={(event) => setSelectedVenue(event.target.value)}
              >
                <option value="">Select a venue</option>

                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.venueName}
                    {venue.location ? ` — ${venue.location}` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="slotDate">Availability Date</label>
              <input
                id="slotDate"
                type="date"
                min={today}
                value={slotDate}
                onChange={(event) => setSlotDate(event.target.value)}
              />
            </div>

            <div className="time-row">
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                />
              </div>

              <div className="time-arrow">→</div>

              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Slot Duration</label>
              <select
                id="duration"
                value={selectedDuration}
                onChange={(event) => setSelectedDuration(event.target.value)}
                disabled={loadingDurations || durations.length === 0}
              >
                <option value="">
                  {loadingDurations
                    ? "Loading durations..."
                    : durations.length === 0
                    ? "No durations available"
                    : "Select slot duration"}
                </option>

                {durations.map((duration) => (
                  <option key={duration.id} value={duration.durationMinutes}>
                    {formatDuration(duration.durationMinutes)}
                  </option>
                ))}
              </select>

              {durations.length === 0 && !loadingDurations && (
                <small>
                  No active durations are currently available. Please contact
                  the admin.
                </small>
              )}
            </div>

            {(selectedVenue ||
              slotDate ||
              startTime ||
              endTime ||
              selectedDuration) && (
              <div className="slot-preview">
                <div className="preview-title">Availability Preview</div>

                <div className="preview-content">
                  <div className="preview-icon">📅</div>

                  <div>
                    <strong>{slotDate || "Select a date"}</strong>

                    <span>
                      {startTime || "--:--"}
                      {"  →  "}
                      {endTime || "--:--"}
                    </span>

                    {durationMinutes > 0 && (
                      <small>
                        Slot duration: {formatDuration(durationMinutes)}
                      </small>
                    )}
                  </div>
                </div>

                {totalMinutes > 0 && durationMinutes > 0 && (
                  <div className="hourly-info">
                    {isDivisible ? (
                      <>
                        <div>
                          ✓ {numberOfSlots} slot
                          {numberOfSlots > 1 ? "s" : ""} will be created
                        </div>
                        <div>✓ Each slot: {durationMinutes} minutes</div>
                      </>
                    ) : (
                      <>
                        <div>⚠ Availability does not divide evenly</div>
                        <div>⚠ Choose another duration</div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {message && <div className="slot-success">✓ {message}</div>}

            {error && <div className="slot-error">⚠ {error}</div>}

            <button
              type="submit"
              className="create-slot-btn"
              disabled={creating || durations.length === 0}
            >
              {creating ? "Adding Availability..." : "＋ Add Availability"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateTimeSlot;