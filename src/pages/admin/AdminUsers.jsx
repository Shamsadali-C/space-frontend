import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import "../../styles/AdminUsers.css";

const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const response =
                await adminService.getUsers();

            setUsers(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to load users");

        } finally {

            setLoading(false);
        }
    };


    const makeOwner = async (id) => {

        try {

            const response =
                await adminService.makeOwner(id);

            alert(response.data);

            loadUsers();

        } catch (error) {

            alert(
                error.response?.data ||
                "Failed to make owner"
            );
        }
    };


    const makeUser = async (id) => {

        try {

            const response =
                await adminService.makeUser(id);

            alert(response.data);

            loadUsers();

        } catch (error) {

            alert(
                error.response?.data ||
                "Failed to change role"
            );
        }
    };


    const deleteUser = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this user?"
        )) {
            return;
        }

        try {

            const response =
                await adminService.deleteUser(id);

            alert(response.data);

            loadUsers();

        } catch (error) {

            alert(
                error.response?.data ||
                "Failed to delete user"
            );
        }
    };


    if (loading) {
        return <h2>Loading users...</h2>;
    }


    return (

        <div className="admin-users-page">


            <h1>
                Manage Users
            </h1>


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

                        {users.map((user) => (

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

                                    {user.role === "USER" && (

                                        <button
                                            onClick={() =>
                                                makeOwner(user.id)
                                            }
                                        >
                                            Make Owner
                                        </button>

                                    )}

                                    {user.role === "OWNER" && (

                                        <button
                                            onClick={() =>
                                                makeUser(user.id)
                                            }
                                        >
                                            Make User
                                        </button>

                                    )}

                                    {user.role !== "ADMIN" && (

                                        <button
                                            className="delete-user"
                                            onClick={() =>
                                                deleteUser(user.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminUsers;