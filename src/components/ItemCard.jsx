import React, { useState } from "react";
import "../styles/ItemCard.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import StarRating from "./StarRating";
import ModalCard from "./ModalCard";
import "../styles/StarRating.scss";
import { FaStar, FaRegStar } from "react-icons/fa";
const ItemCard = ({
  id,
  left,
  category,
  image,
  title,
  description,
  discount,
  original,
}) => {
  const [likedItems, setLikedItems] = useState([]);

  const handleLike = (id) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter((item) => item !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="itemCardContainer">
        <span
          className="itemCardStatus"
          style={{
            backgroundColor: `${left === "New" ? "yellowgreen" : "red"}`,
          }}
        >
          {left}
        </span>
        <button
          type="button"
          onClick={() => handleLike(id)}
          className="itemCardHeart"
        >
          {likedItems.includes(id) ? <FaHeart /> : <FaRegHeart />}
        </button>
        <div className="itemCardImage">
          <img
            src={image}
            alt="image"
            draggable="false"
            onClick={() => setShowModal(true)}
          />
        </div>

        <div className="itemCardContent">
          <h4 className="itemCardTitle">{title}</h4>

          {/* <p className="itemCardDescription">{category}</p> */}

          <div className="itemCardBottom">
            <StarRating />

            <div className="itemCardPrice">
              <p
                className="itemCardDiscount"
                style={{ color: `${original === null ? "gold" : "red"}` }}
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
          key={id}
          id={id}
          left={left}
          category={category}
          image={image}
          title={title}
          description={description}
          discount={discount}
          original={original}
          handleClose={handleClose}
          likedItems={likedItems}
          handleLike={handleLike}
        />
      )}
    </>
  );
};

export default ItemCard;
