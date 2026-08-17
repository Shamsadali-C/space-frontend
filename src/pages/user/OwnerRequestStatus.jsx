import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import "../../styles/OwnerRequestStatus.css";


const OwnerRequestStatus = () => {

    const [request, setRequest] = useState(null);

    const [form, setForm] = useState({
        venueName: "",
        address: "",
        phone: ""
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    useEffect(() => {
        loadRequestStatus();
    }, []);


    const loadRequestStatus = async () => {

        try {

            const response =
                await userService.getOwnerRequestStatus();

            if (typeof response.data === "string") {

                setRequest(null);
                setMessage(response.data);

            } else {

                setRequest(response.data);
                setMessage("");

            }

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data ||
                "Unable to get request status"
            );

        } finally {

            setLoading(false);
        }
    };


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const submitRequest = async (e) => {

        e.preventDefault();

        try {

            const response =
                await userService.sendOwnerRequest(form);

            alert(response.data);

            setForm({
                venueName: "",
                address: "",
                phone: ""
            });

            loadRequestStatus();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to send owner request"
            );
        }
    };


    if (loading) {

        return (
            <div className="owner-request-page">

                <div className="owner-request-container">

                    <h2>
                        Loading...
                    </h2>

                </div>

            </div>
        );
    }


    return (

        <div className="owner-request-page">

            <div className="owner-request-container">

                {/* TITLE */}

                <div className="owner-request-title">

                    <h1>
                        Become an Owner
                    </h1>

                    <p>
                        Submit your request to become a venue owner.
                    </p>

                </div>


                {/* MESSAGE */}

                {message && (
                    <div className="owner-request-card">

                        <p>
                            {message}
                        </p>

                    </div>
                )}


                {/* EXISTING REQUEST */}

                {request ? (

                    <div className="owner-request-card">

                        <h2>
                            Your Owner Request
                        </h2>


                        <div className="owner-request-details">

                            <div className="owner-request-detail">

                                <strong>
                                    Request ID
                                </strong>

                                <span>
                                    {request.id}
                                </span>

                            </div>


                            <div className="owner-request-detail">

                                <strong>
                                    Venue Name
                                </strong>

                                <span>
                                    {request.venueName}
                                </span>

                            </div>


                            <div className="owner-request-detail">

                                <strong>
                                    Address
                                </strong>

                                <span>
                                    {request.address}
                                </span>

                            </div>


                            <div className="owner-request-detail">

                                <strong>
                                    Phone
                                </strong>

                                <span>
                                    {request.phone}
                                </span>

                            </div>


                            <div className="owner-request-detail">

                                <strong>
                                    Status
                                </strong>

                                <br />

                                <span
                                    className={`request-status ${
                                        request.status === "PENDING"
                                            ? "request-pending"
                                            : request.status === "APPROVED"
                                            ? "request-approved"
                                            : "request-rejected"
                                    }`}
                                >
                                    {request.status}
                                </span>

                            </div>


                            {request.status === "PENDING" && (

                                <div className="request-pending">

                                    Waiting for admin approval.

                                </div>

                            )}


                            {request.status === "APPROVED" && (

                                <div className="request-approved">

                                    🎉 Your owner request has been approved.

                                </div>

                            )}


                            {request.status === "REJECTED" && (

                                <div className="request-rejected">

                                    Your owner request was rejected.

                                </div>

                            )}

                        </div>

                    </div>

                ) : (

                    /* FORM */

                    <div className="owner-request-card">

                        <h2>
                            Owner Request Form
                        </h2>


                        <form
                            className="owner-request-form"
                            onSubmit={submitRequest}
                        >

                            <div className="owner-request-field">

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


                            <div className="owner-request-field">

                                <label>
                                    Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Enter venue address"
                                    required
                                />

                            </div>


                            <div className="owner-request-field">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                />

                            </div>


                            <button
                                type="submit"
                                className="owner-request-button"
                            >
                                Send Owner Request
                            </button>

                        </form>

                    </div>

                )}

            </div>

        </div>
    );
};


export default OwnerRequestStatus;