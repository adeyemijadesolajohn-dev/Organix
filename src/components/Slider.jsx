import React, { useState } from "react";
import "../styles/Slider.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import StarRating from "./StarRating";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const Slider = ({ item }) => {
  const [like, setLike] = useState(false);

  const handleClick = () => {
    setLike(!like);
  };

  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".thirdSectionArrow");
  const card = document.querySelector(".card");

  let isDragging = false,
    startX,
    startScrollLeft;

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft +=
        btn.id === "left" ? -card.offsetWidth : card.offsetWidth;
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

  function autoSlide() {
    setInterval(() => {
      carousel.scrollLeft += card.offsetWidth;
    }, 7000);
  }

  autoSlide();

  return (
    <div className="wrapper">
      <BiLeftArrow className="thirdSectionArrow left" id="left" />
      <ul id="carousel" className="carousel">
        {item.map((val) => (
          <li key={val.id} className="card">
            <div className="content">
              <span
                className="status"
                style={{
                  backgroundColor: `${
                    val.left === "New" ? "yellowgreen" : "red"
                  }`,
                }}
              >
                {val.left}
              </span>
              <button type="button" onClick={handleClick} className="heart">
                {like ? <FaHeart /> : <FaRegHeart />}
              </button>
              <div className="cardImage">
                <img src={val.image} alt="image" draggable="false" />
              </div>

              <div className="cardContent">
                <h4 className="cardTitle">{val.title}</h4>

                <div className="cardBottom">
                  <StarRating />

                  <div className="cardPrice">
                    <p
                      className="discount"
                      style={{
                        color: `${val.original === null ? "gold" : "red"}`,
                      }}
                    >
                      {val.discount}
                    </p>
                    <p className="original">{val.original}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <BiRightArrow className="thirdSectionArrow right" id="right" />
    </div>
  );
};

export default Slider;
