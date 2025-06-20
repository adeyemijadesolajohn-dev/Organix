import React, { useState } from "react";
import "../styles/ThirdSection.scss";
import ItemCard from "./ItemCard";
import { Produce } from "../Data/Items";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const ThirdSection = () => {
  const [item, setItem] = useState(Produce);
  const menuItems = [...new Set(Produce.map((val) => val.category))];

  const carousel = document.querySelector(".itemCard");
  const arrowBtns = document.querySelectorAll(".thirdSectionArrow");

  let isDragging = false,
    startX,
    startScrollLeft;

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id === "left" ? -1350 : 1350;
    });
  });

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  document.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  return (
    <div className="thirdSection">
      <p className="thirdSectionTitle">~Our Products~</p>
      <h3 className="thirdSectionSubTitle">What's Hot Items</h3>

      <div className="thirdSectionMenu">
        <button onClick={() => setItem(Produce)}>All Products</button>
        {menuItems.map((val, index) => (
          <button
            key={index}
            onClick={() => setItem(Produce.filter((c) => c.category === val))}
          >
            {val}
          </button>
        ))}
      </div>

      <div className="thirdSectionSlider">
        <div className="thirdSectionSlides">
          <BiLeftArrow id="left" className="thirdSectionArrow leftArrow" />
          <ItemCard item={item} className="itemCard" />
          <BiRightArrow id="right" className="thirdSectionArrow rightArrow" />
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
