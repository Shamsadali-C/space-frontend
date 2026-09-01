


import React, {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import userService from "../../services/userService";
import "../../styles/OwnerRequestStatus.css";


const OwnerRequest = () => {

    const [form, setForm] = useState({
        venueName: "",
        address: "",
        phone: ""
    });


    const [request, setRequest] =
        useState(null);


    const [loading, setLoading] =
        useState(true);


    const [sending, setSending] =
        useState(false);


    const [message, setMessage] =
        useState("");


    const [error, setError] =
        useState("");


    useEffect(() => {

        loadRequestStatus();

    }, []);


    const loadRequestStatus = async () => {

        try {

            const data =
                await userService
                    .getOwnerRequestStatus();


            console.log(
                "Owner request:",
                data
            );



            if (
                typeof data === "string"
            ) {

                setRequest(null);

            } else {

                setRequest(data);
            }


        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load request status."
            );

        } finally {

            setLoading(false);
        }
    };


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setSending(true);

            setMessage("");

            setError("");


            const response =
                await userService
                    .sendOwnerRequest(form);


            setMessage(response);


            setForm({
                venueName: "",
                address: "",
                phone: ""
            });


            await loadRequestStatus();


        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to send owner request."
            );

        } finally {

            setSending(false);
        }
    };


    if (loading) {

        return (

            <div className="user-loading">

                <div className="user-spinner"></div>

                <h2>
                    Loading...
                </h2>

            </div>
        );
    }


    return (

        <div className="user-layout">


            <aside className="user-sidebar">

                <div className="user-logo">
                    Book My Space
                </div>

                <div className="user-role">
                    USER PANEL
                </div>


                <nav>

                    <Link to="/user">
                        🏠 Dashboard
                    </Link>

                    <Link to="/user/venues">
                        🏢 Find Venues
                    </Link>

                    <Link to="/user/bookings">
                        📅 My Bookings
                    </Link>

                    <Link to="/user/profile">
                        👤 Profile
                    </Link>

                    <Link
                        to="/user/owner-request"
                        className="active"
                    >
                        ⭐ Become an Owner
                    </Link>

                </nav>

            </aside>


            <main className="user-main">

                <div className="owner-request-card">

                    <span>
                        OWNER PROGRAM
                    </span>

                    <h1>
                        Become a Venue Owner
                    </h1>

                    <p>
                        Submit your venue information
                        and request permission to become
                        an owner.
                    </p>


                    {message && (

                        <div className="request-success">
                            ✓ {message}
                        </div>

                    )}


                    {error && (

                        <div className="request-error">
                            {error}
                        </div>

                    )}


                    {request ? (

                        <div className="existing-request">

                            <div>

                                <small>
                                    Request Status
                                </small>

                                <strong
                                    className={
                                        `request-status ${
                                            request.status
                                                ?.toLowerCase()
                                        }`
                                    }
                                >
                                    {request.status}
                                </strong>

                            </div>


                            <p>
                                <strong>
                                    Venue:
                                </strong>{" "}
                                {request.venueName}
                            </p>


                            <p>
                                <strong>
                                    Address:
                                </strong>{" "}
                                {request.address}
                            </p>


                            <p>
                                <strong>
                                    Phone:
                                </strong>{" "}
                                {request.phone}
                            </p>

                        </div>

                    ) : (



                        <form
                            onSubmit={handleSubmit}
                        >

                            <div className="request-form-group">

                                <label>
                                    Venue Name
                                </label>

                                <input
                                    type="text"
                                    name="venueName"
                                    value={
                                        form.venueName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter venue name"
                                    required
                                />

                            </div>


                            <div className="request-form-group">

                                <label>
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={
                                        form.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter venue address"
                                    required
                                />

                            </div>


                            <div className="request-form-group">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={
                                        form.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter phone number"
                                    required
                                />

                            </div>


                            <button
                                type="submit"
                                disabled={sending}
                            >
                                {sending
                                    ? "Sending Request..."
                                    : "Send Owner Request"}
                            </button>

                        </form>

                    )}

                </div>

            </main>

        </div>
    );
};


export default OwnerRequest;
