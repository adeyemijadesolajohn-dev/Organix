import React from "react";
import "../styles/WishlistModal.scss";
import { useLikes } from "../context/LikeContext";
import { Produce } from "../Data/Items";
import { BiX } from "react-icons/bi";

const WishlistModal = ({ onClose }) => {
  const { likedItems, toggleLike } = useLikes();
  const likedProducts = Produce.filter((item) => likedItems.includes(item.id));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Your Wishlist</h2>

          <div className="close-button" onClick={onClose}>
            <BiX style={{ display: "block" }} />
          </div>
        </div>

        {likedProducts.length > 0 ? (
          <div className="modal-body">
            {likedProducts.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.title} />

                <div className="item-details">
                  <h3>{item.title}</h3>

                  <p>{item.discount}</p>
                </div>

                <button
                  className="remove-button"
                  onClick={() => toggleLike(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-wishlist-message">
            Your wishlist is empty. Start adding some products!
          </p>
        )}
      </div>
    </div>
  );
};

export default WishlistModal;
