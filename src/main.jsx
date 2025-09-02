import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LikeProvider } from "./context/LikeContext.jsx";
import { StarRatingProvider } from "./context/StarRatingContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { BuyNowProvider } from "./context/BuyNowContext.jsx"; // Add BuyNowProvider
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LikeProvider>
      <StarRatingProvider>
        <CartProvider>
          <BuyNowProvider>
            <App />
          </BuyNowProvider>
        </CartProvider>
      </StarRatingProvider>
    </LikeProvider>
  </StrictMode>
);
