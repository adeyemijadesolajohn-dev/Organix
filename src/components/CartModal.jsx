import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { LuRefreshCw } from "react-icons/lu";
import { BiChevronRight, BiCheckCircle } from "react-icons/bi";
import { useCart } from "../context/CartContext";
import { Produce } from "../Data/Items";
import "../styles/CartModal.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const stages = ["cart", "checkout", "success"];

const CartModal = ({ onClose, initialStage = "cart" }) => {
  const [stage, setStage] = useState(initialStage);
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "card",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const getProductDetails = (id) => Produce.find((p) => p.id === id);

  const totalAmount = cartItems.reduce((acc, item) => {
    const product = getProductDetails(item.id);
    if (!product) return acc;
    const price = parseFloat(product.discount.replace(/[^0-9.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate full name
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
      isValid = false;
    }

    // Validate address
    if (!formData.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    // Validate phone number
    const phone = formData.phoneNumber.replace(/\s/g, "");
    if (!/^\d{9,11}$/.test(phone)) {
      errors.phoneNumber = "Invalid phone number format (9-11 digits)";
      isValid = false;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    // Validate city
    if (!formData.city.trim()) {
      errors.city = "City is required";
      isValid = false;
    }

    // Validate state
    if (!formData.state.trim()) {
      errors.state = "State is required";
      isValid = false;
    }

    setFormErrors(errors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "phoneNumber") {
      const numbers = value.replace(/\D/g, "");
      if (numbers.length > 11) return;
      if (numbers.length > 9) {
        formattedValue = `${numbers.substring(0, 4)} ${numbers.substring(
          4,
          7
        )} ${numbers.substring(7, 11)}`;
      } else if (numbers.length > 2) {
        formattedValue = `${numbers.substring(0, 2)} ${numbers.substring(
          2,
          9
        )}`;
      } else {
        formattedValue = numbers;
      }
    }
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleCheckout = () => {
    if (validateForm()) {
      setStage("success");
      // Simulating sending data to an API
      console.log("Purchase successful! Details:", formData);
      clearCart();
    }
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
                onClick={() => setStage("checkout")}
                className="checkoutButton"
                disabled={cartItems.length === 0}
              >
                Checkout <BiChevronRight />
              </button>
            </div>
          </>
        );
      case "checkout":
        return (
          <>
            <h2 className="modalTitle">Checkout</h2>
            <form className="checkoutForm" onSubmit={(e) => e.preventDefault()}>
              <div className="formGroup">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={`formInput ${formData.fullName ? "filled" : ""} ${
                    formErrors.fullName ? "invalid" : ""
                  }`}
                />
                <label className="formLabel">Full Name</label>
              </div>

              <div className="formGroup">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={`formInput ${formData.address ? "filled" : ""} ${
                    formErrors.address ? "invalid" : ""
                  }`}
                />
                <label className="formLabel">Delivery Address</label>
              </div>

              <div className="formGroup">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className={`formInput ${formData.city ? "filled" : ""} ${
                    formErrors.city ? "invalid" : ""
                  }`}
                />
                <label className="formLabel">City</label>
              </div>

              <div className="formGroup">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className={`formInput ${formData.state ? "filled" : ""} ${
                    formErrors.state ? "invalid" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {["Lagos", "Abuja", "Rivers", "Oyo", "Kano"].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <label className="formLabel">State</label>
              </div>

              <div className="formGroup">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={validateForm}
                  required
                  className={`formInput ${
                    formData.phoneNumber ? "filled" : ""
                  } ${formErrors.phoneNumber ? "invalid" : ""}`}
                />
                <label className="formLabel">Phone Number</label>
                {formErrors.phoneNumber && (
                  <span className="errorText">{formErrors.phoneNumber}</span>
                )}
              </div>

              <div className="formGroup">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={validateForm}
                  required
                  className={`formInput ${formData.email ? "filled" : ""} ${
                    formErrors.email ? "invalid" : ""
                  }`}
                />
                <label className="formLabel">Email Address</label>
                {formErrors.email && (
                  <span className="errorText">{formErrors.email}</span>
                )}
              </div>

              <div className="paymentMethod">
                <h3>Payment Method</h3>
                <div className="radioGroup">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  <label htmlFor="card">Credit/Debit Card</label>
                </div>
                <div className="radioGroup">
                  <input
                    type="radio"
                    id="transfer"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === "transfer"}
                    onChange={handleChange}
                  />
                  <label htmlFor="transfer">Bank Transfer</label>
                </div>
              </div>
            </form>
            <p className="cartTotal">Total: ₦{totalAmount.toFixed(2)}</p>
            <div className="modalActions">
              <button onClick={() => setStage("cart")} className="backButton">
                <BiChevronLeft /> Back to Cart
              </button>
              <button onClick={handleCheckout} className="payButton">
                Pay Now <BiChevronRight />
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
              Thank you, {formData.fullName}! Your order has been placed. A
              confirmation email with details will be sent to{" "}
              <strong>{formData.email}</strong> shortly.
            </p>
            <p className="successAddress">
              Your items will be delivered to: <br />
              <strong>
                {formData.address}, {formData.city}, {formData.state}.
              </strong>
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
