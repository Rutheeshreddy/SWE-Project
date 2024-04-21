import React, { useState } from "react";

const Rating = ({ category, onChange }) => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (value) => {
        setRating(value);
        onChange(category, value);
    };

    return (
        <div className="flex items-center gap-20">
            <h4>{category}</h4>
            <div className="flex items-center gap-5">
                {[1, 2, 3, 4, 5].map((value) => (
                    <svg
                        key={value}
                        className={`h-6 w-6 cursor-pointer ${value <= rating ? "text-yellow-500" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleStarClick(value)}
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2.75l1.74 5.295H18l-4.155 3.025 1.605 4.95L10 13.25l-4.45 2.725 1.605-4.95L2 8.045h5.26L10 2.75zm0 2.475L8.66 8.12H4.29l3.47 2.525-1.325 4.095L10 11.28l3.565 2.465-1.325-4.095 3.47-2.525h-4.37L10 5.225z"
                            clipRule="evenodd"
                        />
                    </svg>
                ))}
            </div>
        </div>
    );
};

export default Rating;
