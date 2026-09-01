import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/userService";
import "../../styles/UserProfile.css";

const UserProfile = () => {

    const [user, setUser] = useState(null);

    const [form, setForm] = useState({
        username: "",
        email: ""
    });

    const [loading, setLoading] = useState(true);

    const [updating, setUpdating] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [editMode, setEditMode] = useState(false);




    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await userService.getProfile();

            console.log("PROFILE:", data);

            setUser(data);

            setForm({
                username: data.username || "",
                email: data.email || ""
            });

        } catch (error) {

            console.error(
                "Failed to load profile:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to load profile."
            );

        } finally {

            setLoading(false);
        }
    };




    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setUpdating(true);

            setMessage("");

            setError("");


            const updatedUser =
                await userService.updateUser(form);


            console.log(
                "UPDATED USER:",
                updatedUser
            );


            setUser(updatedUser);

            setForm({
                username: updatedUser.username || "",
                email: updatedUser.email || ""
            });


            setMessage(
                "Profile updated successfully!"
            );

            setEditMode(false);


        } catch (error) {

            console.error(
                "Update profile error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update profile."
            );

        } finally {

            setUpdating(false);
        }
    };



    const handleCancel = () => {

        setForm({
            username: user?.username || "",
            email: user?.email || ""
        });

        setError("");

        setMessage("");

        setEditMode(false);
    };



    if (loading) {

        return (

            <div className="profile-loading">

                <div className="profile-spinner"></div>

                <h2>
                    Loading profile...
                </h2>

            </div>
        );
    }




    return (

        <div className="profile-page">


            <aside className="profile-sidebar">

                <div className="profile-logo">
                    Book My Space
                </div>

                <div className="profile-role">
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

                    <Link
                        to="/user/profile"
                        className="active"
                    >
                        👤 Profile
                    </Link>

                    <Link to="/user/owner-request">
                        ⭐ Become an Owner
                    </Link>

                </nav>

            </aside>



            <main className="profile-main">



                <div className="profile-header">

                    <span>
                        ACCOUNT SETTINGS
                    </span>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        View and manage your account
                        information.
                    </p>

                </div>



                {message && (

                    <div className="profile-success">
                        ✓ {message}
                    </div>

                )}


                {error && (

                    <div className="profile-error">
                        {error}
                    </div>

                )}



                {user && (

                    <div className="profile-card">



                        <div className="profile-card-top">

                            <div className="profile-avatar">
                                {user.username
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U"}
                            </div>


                            <div className="profile-name">

                                <h2>
                                    {user.username}
                                </h2>

                                <span>
                                    {user.role || "USER"}
                                </span>

                            </div>


                            {!editMode && (

                                <button
                                    className="edit-profile-btn"
                                    onClick={() => {

                                        setMessage("");

                                        setError("");

                                        setEditMode(true);

                                    }}
                                >
                                    ✏️ Edit Profile
                                </button>

                            )}

                        </div>


                        {!editMode ? (

                            <div className="profile-information">


                                <div className="profile-info-item">

                                    <span className="info-icon">
                                        👤
                                    </span>

                                    <div>

                                        <small>
                                            Username
                                        </small>

                                        <strong>
                                            {user.username || "Not available"}
                                        </strong>

                                    </div>

                                </div>


                                <div className="profile-info-item">

                                    <span className="info-icon">
                                        📧
                                    </span>

                                    <div>

                                        <small>
                                            Email Address
                                        </small>

                                        <strong>
                                            {user.email || "Not available"}
                                        </strong>

                                    </div>

                                </div>


                                <div className="profile-info-item">

                                    <span className="info-icon">
                                        🛡️
                                    </span>

                                    <div>

                                        <small>
                                            Account Role
                                        </small>

                                        <strong className="role-value">
                                            {user.role || "USER"}
                                        </strong>

                                    </div>

                                </div>


{/*                                 <div className="profile-info-item"> */}

{/*                                     <span className="info-icon"> */}
{/*                                         🆔 */}
{/*                                     </span> */}

{/*                                     <div> */}

{/*                                         <small> */}
{/*                                             User ID */}
{/*                                         </small> */}

{/*                                         <strong> */}
{/*                                             #{user.id} */}
{/*                                         </strong> */}

{/*                                     </div> */}

{/*                                 </div> */}


                            </div>

                        ) : (



                            <form
                                className="profile-form"
                                onSubmit={handleSubmit}
                            >


                                <div className="profile-form-group">

                                    <label>
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        required
                                    />

                                </div>


                                <div className="profile-form-group">

                                    <label>
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        required
                                    />

                                </div>


                                <div className="profile-readonly">

                                    <span>
                                        🛡️
                                    </span>

                                    <div>

                                        <small>
                                            Account Role
                                        </small>

                                        <strong>
                                            {user.role || "USER"}
                                        </strong>

                                        <p>
                                            Your account role
                                            cannot be changed
                                            from this page.
                                        </p>

                                    </div>

                                </div>



                                <div className="profile-actions">

                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={handleCancel}
                                        disabled={updating}
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="save-profile-btn"
                                        disabled={updating}
                                    >

                                        {updating
                                            ? "Saving..."
                                            : "✓ Save Changes"}

                                    </button>

                                </div>

                            </form>

                        )}

                    </div>

                )}

            </main>

        </div>
    );
};

export default UserProfile;