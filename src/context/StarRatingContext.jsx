import React, { createContext, useContext, useState, useEffect } from "react";

const StarRatingContext = createContext();

export const useStarRatings = () => useContext(StarRatingContext);

export const StarRatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("starRatings")) || {};
    setRatings(storedRatings);
  }, []);

  useEffect(() => {
    localStorage.setItem("starRatings", JSON.stringify(ratings));
  }, [ratings]);

  const setRating = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <StarRatingContext.Provider value={{ ratings, setRating }}>
      {children}
    </StarRatingContext.Provider>
  );
};
