import React, { useState, useCallback } from "react";
import "../styles/ItemCard.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import StarRating from "./StarRating";
import ModalCard from "./ModalCard";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useLikes } from "../context/LikeContext";
import { useCart } from "../context/CartContext";

const ItemCard = ({
  id,
  left,
  category,
  image,
  title,
  description,
  discount,
  original,
  onOpenCartModal,
  onOpenCheckoutModal,
}) => {
  const { likedItems, toggleLike } = useLikes();
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(
    (item) => {
      addToCart(item);
      setShowModal(false);
      onOpenCartModal();
    },
    [addToCart, onOpenCartModal]
  );

  const handleBuyNow = useCallback(
    (item) => {
      addToCart(item);
      setShowModal(false);
      onOpenCheckoutModal();
    },
    [addToCart, onOpenCheckoutModal]
  );

  return (
    <>
      <div className="itemCardContainer">
        <span
          className="itemCardStatus"
          style={{ backgroundColor: left === "New" ? "yellowgreen" : "red" }}
        >
          {left}
        </span>
        <button
          type="button"
          onClick={() => toggleLike(id)}
          className="itemCardHeart"
        >
          {likedItems.includes(id) ? <FaHeart /> : <FaRegHeart />}
        </button>
        <div className="itemCardImage">
          <LazyLoadImage
            src={image}
            alt={title || "Product image"}
            effect="blur"
            draggable="false"
            onClick={() => setShowModal(true)}
            width="100%"
            height="auto"
            className="itemCardImg"
          />
        </div>
        <div className="itemCardContent">
          <h4 className="itemCardTitle">{title}</h4>
          <div className="itemCardBottom">
            <StarRating id={id} />
            <div className="itemCardPrice">
              <p
                className="itemCardDiscount"
                style={{ color: original === null ? "gold" : "red" }}
              >
                {discount}
              </p>
              <p className="itemCardOriginal">{original}</p>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalCard
          id={id}
          left={left}
          category={category}
          image={image}
          title={title}
          description={description}
          discount={discount}
          original={original}
          handleClose={() => setShowModal(false)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}
    </>
  );
};

export default ItemCard;
