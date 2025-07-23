import React, { useState, useEffect } from "react";
import "../styles/NewThirdSection.scss";
import ProductCarousel from "./Slick";
import { Produce } from "../Data/Items";

const NewThirdSection = () => {
  const [filteredItems, setFilteredItems] = useState(Produce);
  const [activeFilter, setActiveFilter] = useState("All Products");
  const [categorySlideIndexes, setCategorySlideIndexes] = useState({});

  const menuItems = [...new Set(Produce.map((val) => val.category))];

  useEffect(() => {
    setActiveFilter("All Products");
    setFilteredItems(Produce);

    const initialIndexes = {};
    menuItems.forEach((category) => {
      initialIndexes[category] = 0;
    });
    initialIndexes["All Products"] = 0;
    setCategorySlideIndexes(initialIndexes);
  }, []);

  const handleFilterClick = (category) => {
    setActiveFilter(category);

    let newFilteredItems;
    if (category === "All Products") {
      newFilteredItems = Produce;
    } else {
      newFilteredItems = Produce.filter((c) => c.category === category);
    }
    setFilteredItems(newFilteredItems);
  };

  const handleSlideChange = (currentSlide) => {
    setCategorySlideIndexes((prevIndexes) => ({
      ...prevIndexes,
      [activeFilter]: currentSlide,
    }));
  };

  return (
    <div className="thirdSection">
      <p className="thirdSectionTitle">~Our Products~</p>
      <h3 className="thirdSectionSubTitle">What's Hot Items</h3>
      <div className="thirdSectionMenu">
        <button
          className={`filterButton ${
            activeFilter === "All Products" ? "active" : ""
          }`}
          onClick={() => handleFilterClick("All Products")}
        >
          All Products
        </button>
        {menuItems.map((val, index) => (
          <button
            className={`filterButton ${activeFilter === val ? "active" : ""}`}
            key={index}
            onClick={() => handleFilterClick(val)}
          >
            {val}
          </button>
        ))}
      </div>
      <ProductCarousel
        item={filteredItems}
        className="productCarousel"
        initialSlide={categorySlideIndexes[activeFilter] || 0}
        onSlideChange={handleSlideChange}
      />
    </div>
  );
};

export default NewThirdSection;
