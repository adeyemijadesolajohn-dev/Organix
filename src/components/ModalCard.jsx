import React, { useState } from "react";
import "../styles/ModalCard.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import StarRating from "./StarRating";

const ModalCard = ({
  id,
  category,
  left,
  image,
  title,
  description,
  discount,
  original,
  handleClose,
  handleLike,
  likedItems,
}) => {
  return (
    <div className="modalCard">
      <div key={id} className="modalContent">
        <button
          type="button"
          onClick={() => handleLike(id)}
          className="modalHeart"
        >
          {likedItems.includes(id) ? <FaHeart /> : <FaRegHeart />}
        </button>

        <button type="button" className="modalClose">
          <HiMiniXMark onClick={() => handleClose()} />
        </button>

        <div className="modalCardImage">
          <img src={image} alt="image" draggable="false" />
        </div>

        <div className="modalCardContent">
          <h4 className="modalCardTitle">{title}</h4>

          <p className="modalCardDescription">{description}</p>

          <div className="modalCardBottom">
            <StarRating />

            <div className="modalCardPrice">
              <p
                className="modalCardDiscount"
                style={{ color: `${original === null ? "gold" : "red"}` }}
              >
                {discount}
              </p>
              <p className="modalCardOriginal">{original}</p>
            </div>

            <span
              className="modalCardStatus"
              style={{
                backgroundColor: `${left === "New" ? "yellowgreen" : "red"}`,
              }}
            >
              {left}
            </span>

            <div className="modalCardButton">
              <button type="button" className="modalAddToCart">
                Add to Cart
              </button>

              <button type="button" className="modalBuyNow">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
