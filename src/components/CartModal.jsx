import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { LuRefreshCw } from "react-icons/lu";
import { BiChevronRight, BiCheckCircle } from "react-icons/bi";
import { useCart } from "../context/CartContext";
import { useBuyNow } from "../context/BuyNowContext"; // Import useBuyNow
import { Produce } from "../Data/Items";
import "../styles/CartModal.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const stages = ["cart", "success"];

const CartModal = ({ onClose, initialStage = "cart" }) => {
  const [stage, setStage] = useState(initialStage);
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { buyNow } = useBuyNow();

  const getProductDetails = (id) => Produce.find((p) => p.id === id);

  const totalAmount = cartItems.reduce((acc, item) => {
    const product = getProductDetails(item.id);
    if (!product) return acc;
    const price = parseFloat(product.discount.replace(/[^0-9.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    buyNow(cartItems);
    onClose();
  };

  const renderStage = () => {
    switch (stage) {
      case "cart":
        return (
          <>
            <h2 className="modalTitle">Your Cart</h2>
            <p className="cartTotal">Total: ₦{totalAmount.toFixed(2)}</p>
            {cartItems.length === 0 ? (
              <p className="emptyCartMessage">Your cart is empty. 😞</p>
            ) : (
              <ul className="cartList">
                {cartItems.map((item) => {
                  const product = getProductDetails(item.id);
                  if (!product) return null;
                  return (
                    <li key={item.id} className="cartItem">
                      <LazyLoadImage
                        src={product.image}
                        alt={product.title}
                        effect="blur"
                        className="cartItemImage"
                      />
                      <div className="cartItemDetails">
                        <h4 className="cartItemTitle">{product.title}</h4>
                        <p className="cartItemPrice">
                          ₦
                          {parseFloat(
                            product.discount.replace(/[^0-9.]/g, "")
                          ).toFixed(2)}
                        </p>
                        <div className="cartItemQuantity">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="quantityButton"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="quantityButton"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="removeItemButton"
                      >
                        <HiMiniXMark />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="modalActions">
              <button
                onClick={handleCheckout}
                className="checkoutButton"
                disabled={cartItems.length === 0}
              >
                Checkout <BiChevronRight />
              </button>
            </div>
          </>
        );
      case "success":
        return (
          <>
            <h2 className="modalTitle">Purchase Successful!</h2>
            <div className="successIconContainer">
              <div className="checkmark-wrapper">
                <BiCheckCircle className="checkmark-icon" />
              </div>
            </div>
            <p className="successMessage">
              Thank you! Your order has been placed. A confirmation email will
              be sent shortly.
            </p>
            <div className="modalActions">
              <button onClick={onClose} className="finishButton">
                Finish <BiChevronRight />
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="closeModalButton">
          <HiMiniXMark style={{ display: "block" }} />
        </button>
        {renderStage()}
      </div>
    </div>
  );
};

export default CartModal;
