import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ownerService from "../../services/ownerService";
import "../../styles/AddVenue.css";

const AddVenue = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        venueName: "",
        location: "",
        capacity: "",
        price: ""
    });

    const [files, setFiles] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =========================
    // Handle text input
    // =========================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    // =========================
    // Handle image selection
    // Maximum 3 images
    // =========================

    const handleFileChange = (e) => {

        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length > 3) {

            setError(
                "You can upload a maximum of 3 images."
            );

            setFiles([]);

            e.target.value = "";

            return;
        }

        setError("");
        setFiles(selectedFiles);
    };


    // =========================
    // Submit venue + images
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {

            // 1. Add venue

            const venueResponse =
                await ownerService.addVenue({

                    venueName: form.venueName,

                    location: form.location,

                    capacity: Number(form.capacity),

                    price: Number(form.price)
                });


            // 2. Get newly created venue ID

            const venueId = venueResponse.data.id;

            console.log(
                "Created venue:",
                venueResponse.data
            );

            console.log(
                "Venue ID:",
                venueId
            );


            // 3. Upload images

            if (files.length > 0) {

                await ownerService.uploadImages(
                    venueId,
                    files
                );
            }


            // 4. Success message

            setMessage(
                files.length > 0
                    ? "Venue and images added successfully!"
                    : "Venue added successfully!"
            );


            // 5. Reset form

            setForm({
                venueName: "",
                location: "",
                capacity: "",
                price: ""
            });

            setFiles([]);


            // Reset file input

            const fileInput =
                document.getElementById("venue-images");

            if (fileInput) {
                fileInput.value = "";
            }


        } catch (error) {

            console.error(
                "Add venue error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to add venue"
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <div className="add-venue-page">

            <div className="add-venue-card">

                <h1>Add Venue</h1>

                <p className="form-description">
                    Add your venue and upload its images.
                </p>


                {/* Success */}

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}


                {/* Error */}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    {/* Venue Name */}

                    <div className="form-group">

                        <label>
                            Venue Name
                        </label>

                        <input
                            type="text"
                            name="venueName"
                            value={form.venueName}
                            onChange={handleChange}
                            placeholder="Enter venue name"
                            required
                        />

                    </div>


                    {/* Location */}

                    <div className="form-group">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Enter location"
                            required
                        />

                    </div>


                    {/* Capacity */}

                    <div className="form-group">

                        <label>
                            Capacity
                        </label>

                        <input
                            type="number"
                            name="capacity"
                            value={form.capacity}
                            onChange={handleChange}
                            placeholder="Enter capacity"
                            min="1"
                            required
                        />

                    </div>


                    {/* Price */}

                    <div className="form-group">

                        <label>
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            min="0"
                            required
                        />

                    </div>


                    {/* Images */}

                    <div className="form-group">

                        <label>
                            Venue Images
                        </label>

                        <input
                            id="venue-images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />


                        {files.length > 0 && (

                            <div className="selected-files">

                                <p>
                                    {files.length} image(s) selected
                                </p>

                                {files.map((file, index) => (

                                    <span key={index}>
                                        {file.name}
                                    </span>

                                ))}

                            </div>

                        )}

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Adding Venue..."
                            : "Add Venue"
                        }

                    </button>

                </form>


                {/* Back */}

                <button
                    className="back-button"
                    onClick={() => navigate("/owner")}
                >
                    Back to Dashboard
                </button>

            </div>

        </div>
    );
};

export default AddVenue;