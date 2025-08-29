import React, { useState } from "react";
import "../styles/ProgressBar.scss";
import { Produce } from "../Data/Items";
import { useLikes } from "../context/LikeContext";
import { useCart } from "../context/CartContext";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { TfiEye } from "react-icons/tfi";
import { LuRefreshCw } from "react-icons/lu";

const ProgressBar = ({ productId, onBuyNow }) => {
  const { likedItems, toggleLike } = useLikes();
  const isLiked = likedItems.includes(productId);
  const { addToCart, removeFromCart, updateQuantity } = useCart();

  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(100);

  const getProductDetails = (id) => Produce.find((p) => p.id === id);

  const handleAddToCart = () => {
    const product = getProductDetails(productId);
    if (product) {
      addToCart(product);
      setProgress((p) => p + 1);
      setRemaining((r) => r - 1);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productId);
    setProgress((p) => (p > 0 ? p - 1 : 0));
    setRemaining((r) => r + 1);
  };

  const handleBuyNow = () => {
    const product = getProductDetails(productId);
    if (product) {
      addToCart(product);
      onBuyNow(product);
    }
    setProgress(0);
    setRemaining(100);
  };

  const getColor = () => {
    if (progress < 25) return "red";
    if (progress < 50) return "yellow";
    if (progress < 75) return "#f4ad16";
    if (progress < 100) return "var(--primary-color)";
    return "yellowgreen";
  };

  return (
    <div className="progressBar">
      <div className="progressBarText">
        <p className="progressBarTitle">
          Sold: <span className="progressBarNumber">{progress}</span>
        </p>

        <p className="progressBarTitle">
          Available: <span className="progressBarNumber">{remaining}</span>
        </p>
      </div>

      <div className="progressBarContainer">
        <div
          className="progressBarFill"
          style={{ width: `${progress}%`, backgroundColor: getColor() }}
        ></div>
      </div>

      <div className="progressBarTextButtons">
        <div className="progressBarButtonContainer">
          <button onClick={handleAddToCart} className="progressBarTextButton">
            <p>ADD TO CART</p>
          </button>

          <button onClick={handleBuyNow} className="progressBarTextButton">
            <p>BUY NOW</p>
          </button>

          <button
            onClick={handleRemoveFromCart}
            className="progressBarTextButton"
          >
            <p>CANCEL ORDER</p>
          </button>
        </div>

        <div className="progressBarButtonContainer">
          <button
            onClick={() => toggleLike(productId)}
            className={`progressBarIconButton ${isLiked ? "liked" : ""}`}
            style={{
              backgroundColor: `${isLiked ? "#f4a261" : ""}`,
            }}
          >
            {isLiked ? (
              <IoMdHeart style={{ display: "block" }} />
            ) : (
              <IoMdHeartEmpty style={{ display: "block" }} />
            )}
          </button>

          <button className="progressBarIconButton">
            <TfiEye style={{ display: "block" }} />
          </button>

          <button
            onClick={() => window.location.reload()}
            className="progressBarIconButton"
          >
            <LuRefreshCw style={{ display: "block" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
