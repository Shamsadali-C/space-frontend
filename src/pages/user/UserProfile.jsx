// import React, { useEffect, useState } from "react";
// import userService from "../../services/userService";
// import "../styles/UserProfile.css";
//
// const UserProfile = () => {
//
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//
//     useEffect(() => {
//
//         const loadProfile = async () => {
//
//             try {
//
//                 const response = await userService.getProfile();
//
//                 setUser(response.data);
//
//             } catch (error) {
//
//                 console.error(error);
//
//                 setError("Failed to load profile");
//
//             } finally {
//
//                 setLoading(false);
//             }
//         };
//
//         loadProfile();
//
//     }, []);
//
//     if (loading) {
//         return <h2>Loading...</h2>;
//     }
//
//     if (error) {
//         return <h2>{error}</h2>;
//     }
//
//     return (
//         <div>
//
//             <h1>My Profile</h1>
//
//             {user && (
//                 <div>
//
//                     <p>
//                         <strong>ID:</strong> {user.id}
//                     </p>
//
//                     <p>
//                         <strong>Username:</strong> {user.username}
//                     </p>
//
//                     <p>
//                         <strong>Email:</strong> {user.email}
//                     </p>
//
// {/*                     <p> */}
// {/*                         <strong>Role:</strong> {user.role} */}
// {/*                     </p> */}
//
//                 </div>
//             )}
//
//         </div>
//     );
// };
//
// export default UserProfile;

import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import "../../styles/UserProfile.css";

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const response =
                    await userService.getProfile();

                setUser(response.data);

            } catch (error) {

                console.error(error);

                setError("Failed to load profile");

            } finally {

                setLoading(false);
            }
        };

        loadProfile();

    }, []);

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="profile-spinner"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-error">
                <div className="error-icon">
                    ⚠️
                </div>

                <h2>
                    {error}
                </h2>

                <p>
                    Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="profile-page">

            <div className="profile-container">

                {/* HEADER */}

                <div className="profile-header">

                    <div className="profile-avatar">
                        {user?.username
                            ?.charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            View your account information
                        </p>

                    </div>

                </div>


                {/* PROFILE CARD */}

                {user && (

                    <div className="profile-card">

                        <div className="profile-card-title">

                            <h2>
                                Personal Information
                            </h2>

                            <span className="profile-badge">
                                User
                            </span>

                        </div>


                        <div className="profile-details">

                            {/* ID */}

                            <div className="profile-detail">

                                <div className="detail-icon">
                                    🆔
                                </div>

                                <div className="detail-content">

                                    <span>
                                        User ID
                                    </span>

                                    <strong>
                                        {user.id}
                                    </strong>

                                </div>

                            </div>


                            {/* USERNAME */}

                            <div className="profile-detail">

                                <div className="detail-icon">
                                    👤
                                </div>

                                <div className="detail-content">

                                    <span>
                                        Username
                                    </span>

                                    <strong>
                                        {user.username}
                                    </strong>

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div className="profile-detail">

                                <div className="detail-icon">
                                    ✉️
                                </div>

                                <div className="detail-content">

                                    <span>
                                        Email Address
                                    </span>

                                    <strong>
                                        {user.email}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default UserProfile;