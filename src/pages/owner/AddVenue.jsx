// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ownerService from "../../services/ownerService";
// import "../../styles/AddVenue.css";
//
// const AddVenue = () => {
//
//     const navigate = useNavigate();
//
//     const [form, setForm] = useState({
//         venueName: "",
//         location: "",
//         capacity: "",
//         price: ""
//     });
//
//     const [files, setFiles] = useState([]);
//
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");
//
//
//     // =========================
//     // Handle text input
//     // =========================
//
//     const handleChange = (e) => {
//
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//     };
//
//
//     // =========================
//     // Handle image selection
//     // Maximum 3 images
//     // =========================
//
//     const handleFileChange = (e) => {
//
//         const selectedFiles = Array.from(e.target.files);
//
//         if (selectedFiles.length > 3) {
//
//             setError(
//                 "You can upload a maximum of 3 images."
//             );
//
//             setFiles([]);
//
//             e.target.value = "";
//
//             return;
//         }
//
//         setError("");
//         setFiles(selectedFiles);
//     };
//
//
//     // =========================
//     // Submit venue + images
//     // =========================
//
//     const handleSubmit = async (e) => {
//
//         e.preventDefault();
//
//         setLoading(true);
//         setMessage("");
//         setError("");
//
//         try {
//
//             // 1. Add venue
//
//             const venueResponse =
//                 await ownerService.addVenue({
//
//                     venueName: form.venueName,
//
//                     location: form.location,
//
//                     capacity: Number(form.capacity),
//
//                     price: Number(form.price)
//                 });
//
//
//
//             const venueId = venueResponse.data.id;
//
//             console.log(
//                 "Created venue:",
//                 venueResponse.data
//             );
//
//             console.log(
//                 "Venue ID:",
//                 venueId
//             );
//
//
//             // 3. Upload images
//
//             if (files.length > 0) {
//
//                 await ownerService.uploadImages(
//                     venueId,
//                     files
//                 );
//             }
//
//
//             // 4. Success message
//
//             setMessage(
//                 files.length > 0
//                     ? "Venue and images added successfully!"
//                     : "Venue added successfully!"
//             );
//
//
//             // 5. Reset form
//
//             setForm({
//                 venueName: "",
//                 location: "",
//                 capacity: "",
//                 price: ""
//             });
//
//             setFiles([]);
//
//
//             // Reset file input
//
//             const fileInput =
//                 document.getElementById("venue-images");
//
//             if (fileInput) {
//                 fileInput.value = "";
//             }
//
//
//         } catch (error) {
//
//             console.error(
//                 "Add venue error:",
//                 error
//             );
//
//             setError(
//                 error.response?.data?.message ||
//                 error.response?.data ||
//                 "Failed to add venue"
//             );
//
//         } finally {
//
//             setLoading(false);
//         }
//     };
//
//
//     return (
//         <div className="add-venue-page">
//
//             <div className="add-venue-card">
//
//                 <h1>Add Venue</h1>
//
//                 <p className="form-description">
//                     Add your venue and upload its images.
//                 </p>
//
//
//                 {/* Success */}
//
//                 {message && (
//                     <div className="success-message">
//                         {message}
//                     </div>
//                 )}
//
//
//                 {/* Error */}
//
//                 {error && (
//                     <div className="error-message">
//                         {error}
//                     </div>
//                 )}
//
//
//                 <form onSubmit={handleSubmit}>
//
//                     {/* Venue Name */}
//
//                     <div className="form-group">
//
//                         <label>
//                             Venue Name
//                         </label>
//
//                         <input
//                             type="text"
//                             name="venueName"
//                             value={form.venueName}
//                             onChange={handleChange}
//                             placeholder="Enter venue name"
//                             required
//                         />
//
//                     </div>
//
//
//                     {/* Location */}
//
//                     <div className="form-group">
//
//                         <label>
//                             Location
//                         </label>
//
//                         <input
//                             type="text"
//                             name="location"
//                             value={form.location}
//                             onChange={handleChange}
//                             placeholder="Enter location"
//                             required
//                         />
//
//                     </div>
//
//
//                     {/* Capacity */}
//
//                     <div className="form-group">
//
//                         <label>
//                             Capacity
//                         </label>
//
//                         <input
//                             type="number"
//                             name="capacity"
//                             value={form.capacity}
//                             onChange={handleChange}
//                             placeholder="Enter capacity"
//                             min="1"
//                             required
//                         />
//
//                     </div>
//
//
//                     {/* Price */}
//
//                     <div className="form-group">
//
//                         <label>
//                             Price
//                         </label>
//
//                         <input
//                             type="number"
//                             name="price"
//                             value={form.price}
//                             onChange={handleChange}
//                             placeholder="Enter price"
//                             min="0"
//                             required
//                         />
//
//                     </div>
//
//
//                     {/* Images */}
//
//                     <div className="form-group">
//
//                         <label>
//                             Venue Images
//                         </label>
//
//                         <input
//                             id="venue-images"
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             onChange={handleFileChange}
//                         />
//
//
//                         {files.length > 0 && (
//
//                             <div className="selected-files">
//
//                                 <p>
//                                     {files.length} image(s) selected
//                                 </p>
//
//                                 {files.map((file, index) => (
//
//                                     <span key={index}>
//                                         {file.name}
//                                     </span>
//
//                                 ))}
//
//                             </div>
//
//                         )}
//
//                     </div>
//
//
//                     {/* Submit */}
//
//                     <button
//                         type="submit"
//                         disabled={loading}
//                     >
//
//                         {loading
//                             ? "Adding Venue..."
//                             : "Add Venue"
//                         }
//
//                     </button>
//
//                 </form>
//
//
//                 {/* Back */}
//
//                 <button
//                     className="back-button"
//                     onClick={() => navigate("/owner")}
//                 >
//                     Back to Dashboard
//                 </button>
//
//             </div>
//
//         </div>
//     );
// };
//
// export default AddVenue;


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


    // =========================================
    // HANDLE TEXT INPUT
    // =========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));
    };


    // =========================================
    // HANDLE IMAGE SELECTION
    // MAXIMUM 3 IMAGES
    // =========================================

    const handleFileChange = (e) => {

        const selectedFiles = Array.from(
            e.target.files
        );


        if (selectedFiles.length > 3) {

            setError(
                "You can upload a maximum of 3 images."
            );

            setFiles([]);

            e.target.value = "";

            return;
        }


        // Check that selected files are images

        const invalidFile = selectedFiles.find(
            (file) =>
                !file.type.startsWith("image/")
        );


        if (invalidFile) {

            setError(
                "Only image files are allowed."
            );

            setFiles([]);

            e.target.value = "";

            return;
        }


        setError("");

        setFiles(selectedFiles);
    };


    // =========================================
    // SUBMIT
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        setLoading(true);

        setMessage("");

        setError("");


        try {

            // =================================
            // 1. CREATE VENUE
            // =================================

            const venue = {

                venueName:
                    form.venueName.trim(),

                location:
                    form.location.trim(),

                capacity:
                    Number(form.capacity),

                price:
                    Number(form.price)

            };


            console.log(
                "Sending venue:",
                venue
            );


            const createdVenue =
                await ownerService.addVenue(
                    venue
                );


            console.log(
                "Created venue:",
                createdVenue
            );


            // =================================
            // 2. GET CREATED VENUE ID
            // =================================

            /*
             * IMPORTANT:
             *
             * ownerService.addVenue()
             * already returns response.data.
             *
             * Therefore:
             *
             * createdVenue.id       ✅
             *
             * createdVenue.data.id  ❌
             */

            const venueId =
                createdVenue?.id;


            if (!venueId) {

                throw new Error(
                    "Venue was created, but the server did not return a venue ID."
                );
            }


            console.log(
                "Created Venue ID:",
                venueId
            );


            // =================================
            // 3. UPLOAD IMAGES
            // =================================

            if (files.length > 0) {

                console.log(
                    "Uploading images:",
                    files
                );


                await ownerService.uploadImages(
                    venueId,
                    files
                );


                console.log(
                    "Images uploaded successfully."
                );
            }


            // =================================
            // 4. SUCCESS MESSAGE
            // =================================

            setMessage(
                files.length > 0
                    ? "Venue and images added successfully!"
                    : "Venue added successfully!"
            );


            // =================================
            // 5. RESET FORM
            // =================================

            setForm({
                venueName: "",
                location: "",
                capacity: "",
                price: ""
            });


            setFiles([]);


            // Reset file input

            const fileInput =
                document.getElementById(
                    "venue-images"
                );


            if (fileInput) {
                fileInput.value = "";
            }


            // =================================
            // 6. GO TO MY VENUES
            // =================================

            setTimeout(() => {

                navigate("/owner/venues");

            }, 1200);


        } catch (error) {

            console.error(
                "Add venue error:",
                error
            );


            let errorMessage =
                "Failed to add venue.";


            if (error.response) {

                if (
                    typeof error.response.data ===
                    "string"
                ) {

                    errorMessage =
                        error.response.data;

                } else if (
                    error.response.data?.message
                ) {

                    errorMessage =
                        error.response.data.message;
                }

            } else if (error.message) {

                errorMessage =
                    error.message;
            }


            setError(errorMessage);


        } finally {

            setLoading(false);
        }
    };


    // =========================================
    // RENDER
    // =========================================

    return (

        <div className="add-venue-page">

            <div className="add-venue-card">


                {/* HEADER */}

                <div className="add-venue-header">

                    <span className="form-label">
                        VENUE MANAGEMENT
                    </span>

                    <h1>
                        Add Venue
                    </h1>

                    <p className="form-description">
                        Add your venue and upload
                        its images.
                    </p>

                </div>


                {/* SUCCESS MESSAGE */}

                {message && (

                    <div className="success-message">

                        <span>
                            ✓
                        </span>

                        {message}

                    </div>

                )}


                {/* ERROR MESSAGE */}

                {error && (

                    <div className="error-message">

                        <span>
                            !
                        </span>

                        {error}

                    </div>

                )}


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* =========================
                        VENUE NAME
                    ========================= */}

                    <div className="form-group">

                        <label htmlFor="venueName">
                            Venue Name
                        </label>

                        <input
                            id="venueName"
                            type="text"
                            name="venueName"
                            value={form.venueName}
                            onChange={handleChange}
                            placeholder="Enter venue name"
                            required
                        />

                    </div>


                    {/* =========================
                        LOCATION
                    ========================= */}

                    <div className="form-group">

                        <label htmlFor="location">
                            Location
                        </label>

                        <input
                            id="location"
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Enter venue location"
                            required
                        />

                    </div>


                    {/* =========================
                        CAPACITY
                    ========================= */}

                    <div className="form-group">

                        <label htmlFor="capacity">
                            Capacity
                        </label>

                        <input
                            id="capacity"
                            type="number"
                            name="capacity"
                            value={form.capacity}
                            onChange={handleChange}
                            placeholder="Enter capacity"
                            min="1"
                            required
                        />

                    </div>


                    {/* =========================
                        PRICE
                    ========================= */}

                    <div className="form-group">

                        <label htmlFor="price">
                            Price
                        </label>

                        <input
                            id="price"
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            min="0"
                            step="0.01"
                            required
                        />

                    </div>


                    {/* =========================
                        IMAGES
                    ========================= */}

                    <div className="form-group">

                        <label htmlFor="venue-images">
                            Venue Images
                        </label>

                        <input
                            id="venue-images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />


                        <small className="image-help">
                            You can select up to
                            3 images.
                        </small>


                        {files.length > 0 && (

                            <div className="selected-files">

                                <p>
                                    {files.length}
                                    {" "}
                                    image(s) selected
                                </p>


                                {files.map(
                                    (file, index) => (

                                        <span
                                            key={
                                                `${file.name}-${index}`
                                            }
                                        >
                                            🖼️{" "}
                                            {file.name}
                                        </span>

                                    )
                                )}

                            </div>

                        )}

                    </div>


                    {/* =========================
                        SUBMIT
                    ========================= */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-venue-btn"
                    >

                        {loading ? (

                            <>
                                <span className="button-spinner"></span>
                                Adding Venue...
                            </>

                        ) : (

                            <>
                                + Add Venue
                            </>

                        )}

                    </button>

                </form>


                {/* =========================
                    BACK BUTTON
                ========================= */}

                <button
                    type="button"
                    className="back-button"
                    onClick={() =>
                        navigate("/owner")
                    }
                    disabled={loading}
                >
                    ← Back to Dashboard
                </button>


                {/* MY VENUES */}

                <button
                    type="button"
                    className="my-venues-button"
                    onClick={() =>
                        navigate("/owner/venues")
                    }
                    disabled={loading}
                >
                    View My Venues →
                </button>

            </div>

        </div>
    );
};


export default AddVenue;
