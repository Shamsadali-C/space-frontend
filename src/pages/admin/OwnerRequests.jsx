import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import AdminSidebar from "./AdminSidebar";
import "../../styles/OwnerRequests.css";

const OwnerRequests = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {

        try {

            const response =
                await adminService.getOwnerRequests();

            setRequests(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to load owner requests");

        } finally {

            setLoading(false);
        }
    };


    const approve = async (id) => {

        try {

            const response =
                await adminService.approveOwnerRequest(id);

            alert(response.data);

            loadRequests();

        } catch (error) {

            alert(
                error.response?.data ||
                "Approval failed"
            );
        }
    };


    const reject = async (id) => {

        try {

            const response =
                await adminService.rejectOwnerRequest(id);

            alert(response.data);

            loadRequests();

        } catch (error) {

            alert(
                error.response?.data ||
                "Rejection failed"
            );
        }
    };


    if (loading) {
        return <h2>Loading requests...</h2>;
    }


    return (

        <div className="owner-requests-page">

            <h1>
                Owner Requests
            </h1>

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

                                <span className={
                                    `request-status ${request.status}`
                                }>
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