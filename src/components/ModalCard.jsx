import React from "react";
import "../styles/ModalCard.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import StarRating from "./StarRating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
          <LazyLoadImage
            src={image}
            alt={title || "Product image"}
            effect="blur"
            draggable="false"
            width="auto"
            height="100%"
            className="modalImage"
          />
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
              <button type="button" className="modalButton">
                Add to Cart
              </button>

              <button type="button" className="modalButton">
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
