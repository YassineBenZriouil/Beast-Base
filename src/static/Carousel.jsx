import React, { useState, useEffect } from "react";
import Eagle from "../assets/animals/Eagle.jpg";
import Whale from "../assets/animals/Whale.jpg";
import Lion from "../assets/animals/Lion.jpg";
import An4 from "../assets/animals/An4.jpg";
import An5 from "../assets/animals/An5.jpg";

const Carousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            image: Eagle,
        },
        {
            image: Whale,
        },
        {
            image: Lion,
        },
        { image: An4 },
        { image: An5 },
    ];

    // Auto-sliding effect
    useEffect(() => {
        let interval;

        if (isAutoPlaying) {
            interval = setInterval(() => {
                setActiveSlide((prev) =>
                    prev === slides.length - 1 ? 0 : prev + 1
                );
            }, 2000); // Change slide every 2 seconds
        }

        // Clean up interval on component unmount or when auto-play is disabled
        return () => {
            clearInterval(interval);
        };
    }, [isAutoPlaying, slides.length]);

    const nextSlide = () => {
        setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        // Pause auto-sliding when manually navigating
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        // Pause auto-sliding when manually navigating
        setIsAutoPlaying(false);
    };

    // Resume auto-play on mouse leave
    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
    };

    // Pause auto-play on mouse enter
    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
    };

    return (
        <div
            className="relative h-full w-full flex items-center justify-center bg-black text-white border-1 border-white"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full h-full overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 flex flex-col justify-end ${
                            index === activeSlide
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 z-20 p-2 rounded-full bg-black bg-opacity-50 text-white font-bold transition-all cursor-pointer"
            >
                ←
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 z-20 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
            >
                →
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setActiveSlide(index);
                            setIsAutoPlaying(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === activeSlide
                                ? "bg-white w-4"
                                : "bg-gray-500"
                        }`}
                    />
                ))}
            </div>

            {/* Auto-play toggle button */}
            <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all text-xs"
            >
                {isAutoPlaying ? "❚❚" : "▶"}
            </button>
        </div>
    );
};

export default Carousel;
