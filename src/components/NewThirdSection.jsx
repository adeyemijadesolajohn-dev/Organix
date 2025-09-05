import React, { useState, useEffect } from "react";
import "../styles/NewThirdSection.scss";
import ProductCarousel from "./Slick";
import { Produce } from "../Data/Items";
import { LuFilter } from "react-icons/lu";

const NewThirdSection = () => {
  const [filteredItems, setFilteredItems] = useState(Produce);
  const [activeFilter, setActiveFilter] = useState("All Products");
  const [categorySlideIndexes, setCategorySlideIndexes] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

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

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
        {isMobile ? (
          <div className="filterDropdown">
            <LuFilter className="filterIcon" />
            <select
              value={activeFilter}
              onChange={(e) => handleFilterClick(e.target.value)}
              className="filterSelect"
            >
              <option value="All Products">All Products</option>
              {menuItems.map((val, index) => (
                <option key={index} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
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
                className={`filterButton ${
                  activeFilter === val ? "active" : ""
                }`}
                key={index}
                onClick={() => handleFilterClick(val)}
              >
                {val}
              </button>
            ))}
          </>
        )}
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
