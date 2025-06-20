import React, { useState } from "react";
import "../styles/StarRating.scss";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="cardRating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={index}
            className={ratingValue <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(rating)}
          >
            {ratingValue <= (hover || rating) ? <FaStar /> : <FaRegStar />}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
