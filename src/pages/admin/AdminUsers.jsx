import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import "../../styles/AdminUsers.css";

const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        loadUsers();
    }, []);


    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await adminService.getUsers();

            console.log("Users response:", response);

            if (Array.isArray(response)) {
                setUsers(response);
            } else {
                console.error(
                    "Expected users array but received:",
                    response
                );

                setUsers([]);
            }

        } catch (error) {

            console.error(
                "Users error:",
                error
            );

            setUsers([]);

            setError(
                error.response?.data ||
                "Failed to load users."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // MAKE OWNER
    // =========================

    const makeOwner = async (id) => {

        try {

            const response =
                await adminService.makeOwner(id);

            alert(response);

            await loadUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to make owner"
            );
        }
    };


    // =========================
    // MAKE USER
    // =========================

    const makeUser = async (id) => {

        try {

            const response =
                await adminService.makeUser(id);

            alert(response);

            await loadUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to change role"
            );
        }
    };


    // =========================
    // DELETE USER
    // =========================

    const deleteUser = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this user?"
            )
        ) {
            return;
        }


        try {

            const response =
                await adminService.deleteUser(id);

            alert(response);

            await loadUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to delete user"
            );
        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="admin-users-page">

                <h2>
                    Loading users...
                </h2>

            </div>
        );
    }


    // =========================
    // PAGE
    // =========================

    return (

        <div className="admin-users-page">

            <h1>
                Manage Users
            </h1>


            {error && (

                <div className="error-message">
                    {typeof error === "string"
                        ? error
                        : "Failed to load users."}
                </div>

            )}


            <div className="users-table-container">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Username</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody>

                        {Array.isArray(users) &&
                            users.length > 0 ? (

                            users.map((user) => (

                                <tr key={user.id}>

                                    <td>
                                        {user.id}
                                    </td>


                                    <td>
                                        {user.username}
                                    </td>


                                    <td>
                                        {user.email}
                                    </td>


                                    <td>

                                        <strong>
                                            {user.role}
                                        </strong>

                                    </td>


                                    <td>


                                        {/* USER → OWNER */}

                                        {user.role === "USER" && (

                                            <button
                                                onClick={() =>
                                                    makeOwner(
                                                        user.id
                                                    )
                                                }
                                            >
                                                Make Owner
                                            </button>

                                        )}


                                        {/* OWNER → USER */}

                                        {user.role === "OWNER" && (

                                            <button
                                                onClick={() =>
                                                    makeUser(
                                                        user.id
                                                    )
                                                }
                                            >
                                                Make User
                                            </button>

                                        )}


                                        {/* DELETE */}

                                        {user.role !== "ADMIN" && (

                                            <button
                                                className="delete-user"
                                                onClick={() =>
                                                    deleteUser(
                                                        user.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "30px"
                                    }}
                                >
                                    No users found.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminUsers;