import React, { useState, useEffect } from "react";
import "../styles/StarRating.scss";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ id }) => {
  // Local state for rating & hover
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // If an id is provided → sync with localStorage (shared state between components)
  useEffect(() => {
    if (id) {
      const storedRatings =
        JSON.parse(localStorage.getItem("starRatings")) || {};
      if (storedRatings[id]) {
        setRating(storedRatings[id]);
      }
    }
  }, [id]);

  const handleClick = (value) => {
    setRating(value);

    // Persist only if `id` is provided
    if (id) {
      const storedRatings =
        JSON.parse(localStorage.getItem("starRatings")) || {};
      storedRatings[id] = value;
      localStorage.setItem("starRatings", JSON.stringify(storedRatings));
    }
  };

  return (
    <div className="cardRating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={index}
            className={ratingValue <= (hover || rating) ? "on" : "off"}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            {ratingValue <= (hover || rating) ? <FaStar /> : <FaRegStar />}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
