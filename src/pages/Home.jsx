import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {

    const navigate = useNavigate();

    return (
        <div className="home-page">



            <nav className="home-navbar">

                <div className="logo">
                    Book My Space
                </div>

                <div className="home-nav-buttons">

                    <button
                        onClick={() => navigate("/login")}
                        className="login-btn"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="register-btn"
                    >
                        Register
                    </button>

                </div>

            </nav>


            {/* HERO SECTION */}

            <section className="hero-section">

                <div className="hero-content">

                    <p className="hero-small">
                        FIND YOUR PERFECT SPACE
                    </p>

                    <h1>
                        Book Your Perfect
                        <span> Space </span>
                        Easily
                    </h1>

                    <p className="hero-description">
                        Discover beautiful venues for weddings,
                        meetings, parties, conferences and other
                        special events.
                    </p>

                    <div className="hero-buttons">

                        <button
                            onClick={() =>
                                navigate("/register")
                            }
                            className="primary-btn"
                        >
                            Get Started
                        </button>

                        <button
                            onClick={() =>
                                navigate("/login")
                            }
                            className="secondary-btn"
                        >
                            Login
                        </button>

                    </div>

                </div>


                {/* IMAGE */}

                <div className="hero-image">

                    <img
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80"
                        alt="Beautiful event venue"
                    />



                </div>

            </section>


            {/* FEATURES */}

            <section className="features-section">

                <h2>
                    Everything You Need
                </h2>

                <p className="features-subtitle">
                    Make your event planning simple and stress-free.
                </p>


                <div className="features">

                    <div className="feature-card">

                        <div className="feature-icon">
                            🔍
                        </div>

                        <h3>
                            Find Venues
                        </h3>

                        <p>
                            Browse different venues and
                            find the perfect space for your event.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            📅
                        </div>

                        <h3>
                            Easy Booking
                        </h3>

                        <p>
                            Book your preferred venue quickly
                            and easily.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🏆
                        </div>

                        <h3>
                            Trusted Spaces
                        </h3>

                        <p>
                            Choose from quality venues suitable
                            for different occasions.
                        </p>

                    </div>

                </div>

            </section>

            <footer className="home-footer">

                <h3>
                    Book My Space
                </h3>

                <p>
                    Find. Book. Celebrate.
                </p>

            </footer>

        </div>
    );
}

export default Home;