import React from "react";
import "../styles/ModalCard.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import StarRating from "./StarRating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useLikes } from "../context/LikeContext";

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
  onAddToCart,
  onBuyNow,
}) => {
  const { likedItems, toggleLike } = useLikes();

  const item = { id, category, image, title, description, discount, original };

  return (
    <div className="itemModalCard">
      <div key={id} className="itemModalContent">
        <button
          type="button"
          onClick={() => toggleLike(id)}
          className="itemModalHeart"
        >
          {likedItems.includes(id) ? <FaHeart /> : <FaRegHeart />}
        </button>

        <button type="button" className="itemModalClose">
          <HiMiniXMark onClick={handleClose} />
        </button>

        <div className="itemModalCardImage">
          <LazyLoadImage
            src={image}
            alt={title || "Product image"}
            effect="blur"
            draggable="false"
            width="auto"
            height="100%"
            className="itemModalImage"
          />
        </div>

        <div className="itemModalCardContent">
          <h4 className="itemModalCardTitle">{title}</h4>

          <p className="itemModalCardDescription">{description}</p>

          <div className="itemModalCardBottom">
            <StarRating id={id} />

            <div className="itemModalCardPrice">
              <p
                className="itemModalCardDiscount"
                style={{ color: original === null ? "gold" : "red" }}
              >
                {discount}
              </p>

              <p className="itemModalCardOriginal">{original}</p>
            </div>

            <span
              className="itemModalCardStatus"
              style={{
                backgroundColor: left === "New" ? "yellowgreen" : "red",
              }}
            >
              {left}
            </span>

            <div className="itemModalCardButton">
              <button
                type="button"
                className="itemModalButton"
                onClick={() => onAddToCart(item)}
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="itemModalButton"
                onClick={() => onBuyNow(item)}
              >
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
