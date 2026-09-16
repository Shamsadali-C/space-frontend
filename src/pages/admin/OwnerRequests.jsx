import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import "../../styles/OwnerRequests.css";

const OwnerRequests = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await adminService.getOwnerRequests();

            console.log("Owner requests:", response);

            // adminService already returns response.data
            setRequests(
                Array.isArray(response)
                    ? response
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load owner requests:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load owner requests"
            );

        } finally {

            setLoading(false);
        }
    };


    const approve = async (id) => {

        try {

            const response =
                await adminService.approveOwnerRequest(id);

            // adminService already returns response.data
            alert(response);

            await loadRequests();

        } catch (error) {

            console.error(
                "Approval failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Approval failed"
            );
        }
    };


    const reject = async (id) => {

        try {

            const response =
                await adminService.rejectOwnerRequest(id);

            // adminService already returns response.data
            alert(response);

            await loadRequests();

        } catch (error) {

            console.error(
                "Rejection failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Rejection failed"
            );
        }
    };


    if (loading) {
        return (
            <div className="owner-requests-page">
                <h2>Loading requests...</h2>
            </div>
        );
    }


    return (

        <div className="owner-requests-page">

            <h1>
                Owner Requests
            </h1>


            {error && (
                <div className="request-error">
                    {error}
                </div>
            )}


            {requests.length === 0 ? (

                <p>
                    No owner requests found.
                </p>

            ) : (

                <div className="owner-request-grid">

                    {requests.map((request) => (

                        <div
                            className="owner-request-card"
                            key={request.id}
                        >

                            <h2>
                                {request.venueName}
                            </h2>


                            <p>
                                <strong>
                                    Request ID:
                                </strong>{" "}
                                {request.id}
                            </p>


                            <p>
                                <strong>
                                    User ID:
                                </strong>{" "}
                                {request.userId}
                            </p>


                            <p>
                                <strong>
                                    Username:
                                </strong>{" "}
                                {request.username}
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


                            <p>
                                <strong>
                                    Status:
                                </strong>{" "}

                                <span
                                    className={
                                        `request-status ${request.status}`
                                    }
                                >
                                    {request.status}
                                </span>

                            </p>


                            {request.status === "PENDING" && (

                                <div className="request-actions">

                                    <button
                                        className="approve-btn"
                                        onClick={() =>
                                            approve(request.id)
                                        }
                                    >
                                        Approve
                                    </button>


                                    <button
                                        className="reject-btn"
                                        onClick={() =>
                                            reject(request.id)
                                        }
                                    >
                                        Reject
                                    </button>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default OwnerRequests;