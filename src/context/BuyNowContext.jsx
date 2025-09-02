import React, { createContext, useContext, useState, useCallback } from "react";
import { BiPrinter, BiImage } from "react-icons/bi";
import { useCart } from "./CartContext";
import { HiMiniXMark } from "react-icons/hi2";
import "../styles/BuyNowModal.scss";

const BuyNowContext = createContext();

export const useBuyNow = () => useContext(BuyNowContext);

export const BuyNowProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [stage, setStage] = useState("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "Nigeria",
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    deliveryType: "ship",
    warehouse: "",
  });
  const [products, setProducts] = useState([]);
  const { clearCart, addToCart } = useCart();

  const warehouses = [
    {
      name: "Lagos DC",
      address: "123 Ikeja Industrial Estate, Lagos, Nigeria",
    },
    { name: "Abuja DC", address: "456 Garki Area 11, Abuja, Nigeria" },
    {
      name: "Port Harcourt DC",
      address: "789 Trans-Amadi Industrial Layout, Port Harcourt, Nigeria",
    },
  ];

  const buyNow = useCallback((prods) => {
    setProducts(Array.isArray(prods) ? prods : [prods]);
    setShowModal(true);
    setStage("form");
    setFormData({
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "Nigeria",
      paymentMethod: "card",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      deliveryType: "ship",
      warehouse: warehouses[0].name,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "paymentMethod" && value === "wallet") {
      alert("Login first to use Wallet.");
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("Full Name is required.");
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.push("Valid Email is required.");
    if (!formData.phone.trim() || !/^\+234\d{10}$/.test(formData.phone))
      errors.push("Phone number must be in +234XXXXXXXXXX format.");

    if (formData.deliveryType === "ship") {
      if (!formData.street.trim()) errors.push("Street Address is required.");
      if (!formData.city.trim()) errors.push("City is required.");
      if (!formData.state.trim()) errors.push("State is required.");
      if (!formData.zip.trim()) errors.push("Postal Code is required.");
      if (!formData.country.trim()) errors.push("Country is required.");
    }

    if (formData.paymentMethod === "card") {
      if (!formData.cardName.trim()) errors.push("Name on Card is required.");
      if (!/^\d{16}$/.test(formData.cardNumber))
        errors.push("Card Number must be 16 digits.");
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry))
        errors.push("Expiry must be MM/YY.");
      if (!/^\d{3,4}$/.test(formData.cvv))
        errors.push("CVV must be 3 or 4 digits.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStage("success");
      clearCart(); // Clear cart on successful checkout
    }
  };

  const closeModal = () => {
    if (stage === "form") {
      products.forEach((product) => addToCart(product));
    }
    setShowModal(false);
    setStage("form");
    setProducts([]);
  };

  const getAddress = () => {
    if (formData.deliveryType === "pickup") {
      const selectedWarehouse = warehouses.find(
        (w) => w.name === formData.warehouse
      );
      return selectedWarehouse ? selectedWarehouse.address : "";
    } else {
      return `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}`;
    }
  };

  const calculateTotal = () => {
    return products
      .reduce((total, product) => {
        const price =
          parseFloat(product.discount.replace(/[^0-9.]/g, "")) *
          (product.quantity || 1);
        return total + price;
      }, 0)
      .toFixed(2);
  };

  const handlePrintPDF = () => {
    const receiptContent = document.getElementById("receipt").innerHTML;
    const printWindow = window.open("", "", "height=500, width=800");
    printWindow.document.write("<html><head><title>Receipt</title>");
    printWindow.document.write("</head><body >");
    printWindow.document.write(receiptContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 600);

    ctx.fillStyle = "black";
    ctx.font = "bold 24px Arial";
    ctx.fillText("Receipt", 140, 50);

    ctx.font = "16px Arial";
    let yOffset = 100;
    products.forEach((product, index) => {
      ctx.fillText(`Product ${index + 1}: ${product.title}`, 20, yOffset);
      ctx.fillText(
        `Price: ${product.discount} x ${product.quantity || 1}`,
        20,
        yOffset + 20
      );
      yOffset += 40;
    });
    ctx.fillText(`Total: ₦${calculateTotal()}`, 20, yOffset);
    ctx.fillText(`Name: ${formData.name}`, 20, yOffset + 30);
    ctx.fillText(`Address: ${getAddress()}`, 20, yOffset + 60);
    ctx.fillText(`Date: ${new Date().toLocaleString()}`, 20, yOffset + 90);

    ctx.beginPath();
    ctx.moveTo(170, yOffset + 120);
    ctx.lineTo(200, yOffset + 150);
    ctx.lineTo(250, yOffset + 80);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "green";
    ctx.stroke();

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "receipt.png";
    a.click();
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="buyNowModalOverlay" onClick={closeModal}>
        <div
          className="buyNowModalContent"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="closeCartModalButton" onClick={closeModal}>
            <HiMiniXMark style={{ display: "block" }} />
          </button>

          {stage === "form" ? (
            <form onSubmit={handleSubmit}>
              <h2>Checkout</h2>

              <h3>Order Summary</h3>

              {products.map((product, index) => (
                <div key={index}>
                  <p>
                    {product.title} - {product.discount} x{" "}
                    {product.quantity || 1}
                  </p>
                </div>
              ))}

              <p>
                <strong>Total: ₦{calculateTotal()}</strong>
              </p>

              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="+234 XXX XXX XXXX"
                value={formData.phone}
                onChange={handleChange}
              />

              <label>Delivery Option:</label>

              <select
                name="deliveryType"
                value={formData.deliveryType}
                onChange={handleChange}
              >
                <option value="ship">Ship to my address</option>

                <option value="pickup">Pickup at warehouse</option>
              </select>

              {formData.deliveryType === "ship" ? (
                <>
                  <input
                    name="street"
                    placeholder="Street Address"
                    value={formData.street}
                    onChange={handleChange}
                  />

                  <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />

                  <input
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />

                  <input
                    name="zip"
                    placeholder="Postal Code"
                    value={formData.zip}
                    onChange={handleChange}
                  />

                  <input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <label>Select Warehouse:</label>

                  <select
                    name="warehouse"
                    value={formData.warehouse}
                    onChange={handleChange}
                  >
                    {warehouses.map((w) => (
                      <option key={w.name} value={w.name}>
                        {w.name}
                      </option>
                    ))}
                  </select>

                  <p>
                    Address:{" "}
                    {
                      warehouses.find((w) => w.name === formData.warehouse)
                        ?.address
                    }
                  </p>
                </>
              )}

              <h3>Payment Method</h3>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="card">Credit/Debit Card</option>

                <option value="cash">Cash on Delivery</option>

                <option value="ussd">USSD</option>

                <option value="wallet" disabled>
                  Wallet
                </option>
              </select>

              {formData.paymentMethod === "card" && (
                <>
                  <input
                    name="cardName"
                    placeholder="Name on Card"
                    value={formData.cardName}
                    onChange={handleChange}
                  />

                  <input
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />

                  <input
                    name="expiry"
                    placeholder="Expiry (MM/YY)"
                    value={formData.expiry}
                    onChange={handleChange}
                  />

                  <input
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </>
              )}

              {formData.paymentMethod === "ussd" && (
                <p>Use your phone to complete USSD payment after submission.</p>
              )}

              <button type="submit">Submit</button>
            </form>
          ) : (
            <div className="successMessage">
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />

                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>

              <h2>Success!</h2>

              <p>
                Successfully purchased! The order will be delivered to{" "}
                {formData.name} at {getAddress()}.
              </p>

              <div id="receipt" style={{ display: "none" }}>
                <h2>Receipt</h2>

                {products.map((product, index) => (
                  <div key={index}>
                    <p>
                      Product {index + 1}: {product.title}
                    </p>

                    <p>
                      Price: {product.discount} x {product.quantity || 1}
                    </p>
                  </div>
                ))}

                <p>Total: ₦{calculateTotal()}</p>

                <p>Name: {formData.name}</p>

                <p>Address: {getAddress()}</p>

                <p>Date: {new Date().toLocaleString()}</p>
              </div>

              <button onClick={handlePrintPDF}>
                <BiPrinter /> Print as PDF
              </button>

              <button onClick={handleDownloadImage}>
                <BiImage /> Download as Image
              </button>

              <button onClick={closeModal}>Close</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <BuyNowContext.Provider value={{ buyNow }}>
      {children}
      {renderModal()}
    </BuyNowContext.Provider>
  );
};
