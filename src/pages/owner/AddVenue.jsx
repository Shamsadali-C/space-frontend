import React, { useState } from "react";
import { Link } from "react-router-dom";
import ownerService from "../../services/ownerService";
import "../../styles/AddVenue.css";

const AddVenue = () => {

    const [form, setForm] = useState({
        venueName: "",
        location: "",
        capacity: "",
        price: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response =
                await ownerService.addVenue({
                    ...form,
                    capacity: Number(form.capacity),
                    price: Number(form.price)
                });

            alert("Venue added successfully");

            console.log(response.data);

            setForm({
                venueName: "",
                location: "",
                capacity: "",
                price: ""
            });

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data ||
                "Failed to add venue"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="owner-layout">

            <aside className="owner-sidebar">

                <div className="owner-logo">
                    Book My Space
                </div>

                <div className="owner-role">
                    OWNER PANEL
                </div>

                <nav>

                    <Link to="/owner">
                        Dashboard
                    </Link>

                    <Link to="/owner/venues">
                        My Venues
                    </Link>

                    <Link to="/owner/bookings">
                        Bookings
                    </Link>

                    <Link to="/owner/add-venue">
                        Add Venue
                    </Link>

                </nav>

            </aside>


            <main className="owner-main">

                <h1>Add Venue</h1>

                <div className="owner-form-card">

                    <form onSubmit={handleSubmit}>

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


                        <label>
                            Capacity
                        </label>

                        <input
                            type="number"
                            name="capacity"
                            value={form.capacity}
                            onChange={handleChange}
                            placeholder="Enter capacity"
                            required
                        />


                        <label>
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            required
                        />


                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Adding..."
                                : "Add Venue"}
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
};

export default AddVenue;