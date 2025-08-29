import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const LikeContext = createContext();

// Hook for easy use
export const useLikes = () => useContext(LikeContext);

// Provider
export const LikeProvider = ({ children }) => {
  const [likedItems, setLikedItems] = useState([]);

  // Load from localStorage when app starts
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedItems")) || [];
    setLikedItems(storedLikes);
  }, []);

  // Save to localStorage whenever likedItems changes
  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  }, [likedItems]);

  // Toggle like/unlike
  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <LikeContext.Provider value={{ likedItems, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};
