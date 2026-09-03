import React, { useEffect, useState } from "react";
import "../styles/VenueImageSlider.css";

const VenueImageSlider = ({ images = [], venueName = "Venue" }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    /* Reset slider when images change */
    useEffect(() => {
        setCurrentIndex(0);
    }, [images]);

    /* Automatic slideshow */
    useEffect(() => {

        if (images.length <= 1) {
            return;
        }

        const interval = setInterval(() => {

            setCurrentIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );

        }, 4000);

        return () => clearInterval(interval);

    }, [images]);

    const nextImage = () => {

        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % images.length
        );
    };

    const previousImage = () => {

        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length
        );
    };

    const selectImage = (index) => {
        setCurrentIndex(index);
    };


    /* No images */
    if (!images || images.length === 0) {

        return (
            <div className="venue-slider">

                <div className="venue-slider-placeholder">
                    🏢
                    <span>No image</span>
                </div>

            </div>
        );
    }


    const image = images[currentIndex];


    return (

        <div className="venue-slider">

            {/* IMAGE */}

            <img
                key={image.id || currentIndex}
                className="venue-slider-image"
                src={
                    `http://localhost:8080/uploads/` +
                    image.imageUrl
                }
                alt={`${venueName} ${currentIndex + 1}`}
            />


            {/* IMAGE COUNTER */}

            {images.length > 1 && (

                <div className="venue-image-counter">
                    {currentIndex + 1} / {images.length}
                </div>

            )}


            {/* PREVIOUS */}

            {images.length > 1 && (

                <button
                    type="button"
                    className="slider-btn slider-prev"
                    onClick={previousImage}
                    aria-label="Previous image"
                >
                    ‹
                </button>

            )}


            {/* NEXT */}

            {images.length > 1 && (

                <button
                    type="button"
                    className="slider-btn slider-next"
                    onClick={nextImage}
                    aria-label="Next image"
                >
                    ›
                </button>

            )}


            {/* DOTS */}

            {images.length > 1 && (

                <div className="slider-dots">

                    {images.map((_, index) => (

                        <button
                            type="button"
                            key={index}
                            className={
                                `slider-dot ${
                                    index === currentIndex
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() => selectImage(index)}
                            aria-label={`Show image ${index + 1}`}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};

export default VenueImageSlider;