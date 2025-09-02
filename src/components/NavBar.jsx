import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  BiSearchAlt,
  BiX,
  BiHeart,
  BiUserCircle,
  BiShoppingBag,
} from "react-icons/bi";
import { TbMenu4 } from "react-icons/tb";
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { images } from "../Data/Images";
import { Produce } from "../Data/Items";
import AuthModal from "./Auth";
import WishlistModal from "./WishlistModal";
import CartModal from "./CartModal";
import { useLikes } from "../context/LikeContext";
import { useCart } from "../context/CartContext";
import { useBuyNow } from "../context/BuyNowContext";
import "../styles/NavBar.scss";

// Constants
const MENU_ITEMS = [
  { label: "Home" },
  { label: "Shop", pop: { text: "SALE", color: "#4edb62" } },
  { label: "Product", pop: { text: "NEW", color: "#0376fa" } },
  { label: "Collections", pop: { text: "HOT", color: "#e42e2e" } },
  { label: "Pages" },
  { label: "Blog" },
  { label: "Contact Us" },
  { label: "Buy Themes!" },
];

// Reusable IconButton component
const IconButton = ({ icon: Icon, count, onClick, ariaLabel, className }) => (
  <div
    className={`navBarIconBtn ${className || ""}`}
    onClick={onClick}
    role="button"
    aria-label={ariaLabel}
  >
    <Icon style={{ display: "block" }} />

    {count > 0 && <span className="popCount">{count}</span>}
  </div>
);

// SearchForm component
const SearchForm = ({
  isActive,
  toggleActive,
  searchQuery,
  setSearchQuery,
  searchResults,
  onSubmit,
  onSelect,
  inputRef,
  containerRef,
}) => {
  const handleInputChange = useCallback(
    (e) => {
      const input = e.target.value;
      setSearchQuery(input);
    },
    [setSearchQuery]
  );

  return (
    <div className="searchContainer" ref={containerRef}>
      <form
        className={`searchForm ${isActive ? "activeSearch" : ""}`}
        onSubmit={onSubmit}
      >
        {isActive && (
          <div
            className="searchLeftIcon"
            onClick={onSubmit}
            role="button"
            aria-label="Submit search"
          >
            <BiSearchAlt style={{ display: "block" }} />
          </div>
        )}

        <input
          type="text"
          placeholder="Search..."
          className="searchInput"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() =>
            searchQuery.trim() || searchResults.length > 0
              ? toggleActive(true)
              : null
          }
          ref={inputRef}
          aria-label="Search for products"
        />

        {isActive && searchQuery.trim() && (
          <ul className="suggestionsDropdown">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <li
                  className="suggestionItem"
                  key={item.id}
                  onClick={() => onSelect(item)}
                  role="option"
                  aria-selected={
                    searchQuery.toLowerCase() === item.title.toLowerCase()
                  }
                >
                  {item.title}
                </li>
              ))
            ) : (
              <li className="suggestionItem no-results" role="alert">
                No results found
              </li>
            )}
          </ul>
        )}

        <div
          className="searchButton"
          onClick={() => toggleActive(!isActive)}
          role="button"
          aria-label={isActive ? "Close search bar" : "Open search bar"}
          aria-expanded={isActive}
        >
          {isActive ? (
            <BiX className="searchClose" />
          ) : (
            <BiSearchAlt className="searchIcon" />
          )}
        </div>
      </form>
    </div>
  );
};

// ProductDetailModal component
const ProductDetailModal = ({ item, onClose, addToCart, openCartModal }) => {
  const { buyNow } = useBuyNow();

  const handleAddToCart = useCallback(() => {
    addToCart(item);
    onClose();
  }, [item, addToCart, onClose]);

  const handleBuyNow = useCallback(() => {
    addToCart(item);
    buyNow(item);
    onClose();
  }, [item, addToCart, onClose, buyNow]);

  if (!item) return null;

  return (
    <div
      className="navModalOverlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="productModalTitle"
    >
      <div className="navModalContent" onClick={(e) => e.stopPropagation()}>
        <LazyLoadImage
          className="navModalImage"
          src={item.image}
          alt={item.title}
          effect="blur"
          width="100%"
          height="auto"
        />

        <h3 id="productModalTitle" className="navModalTitle">
          {item.title}
        </h3>

        <p className="navModalDescription">{item.description}</p>

        <p>
          <strong className="navModalPrice">{item.discount}</strong>
          {item.original && (
            <span
              className="navModalOriginal"
              style={{ textDecoration: "line-through", marginLeft: "10px" }}
            >
              {item.original}
            </span>
          )}
        </p>

        <div className="modalActions">
          <button className="navModalButton" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button className="navModalButton" onClick={onClose}>
            Close
          </button>

          <button className="navModalButton" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  const { likedItems } = useLikes();
  const { cartItems, addToCart } = useCart();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [modalState, setModalState] = useState({ type: null, props: {} });
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Debounced search
  const debouncedSearch = useCallback((input) => {
    if (input.trim().length > 0) {
      const matches = Produce.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(matches);
      setIsSearchActive(true);
    } else {
      setSearchResults([]);
      setIsSearchActive(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => debouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        !event.target.closest(".searchButton")
      ) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );

  const toggleSearchForm = useCallback((active) => {
    setIsSearchActive(active);
    if (!active) {
      setSearchQuery("");
      setSearchResults([]);
    } else {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, []);

  const handleSearchSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      if (!searchQuery.trim()) return;

      const chosen =
        Produce.find(
          (p) => p.title.toLowerCase() === searchQuery.trim().toLowerCase()
        ) || searchResults[0];
      if (chosen) {
        setSelectedProduct(chosen);
        setSearchQuery("");
        setIsSearchActive(false);
      } else {
        setShowNotFound(true);
        setTimeout(() => setShowNotFound(false), 2500);
      }
    },
    [searchQuery, searchResults]
  );

  const handleSelectSuggestion = useCallback((item) => {
    setSelectedProduct(item);
    setSearchQuery("");
    setIsSearchActive(false);
  }, []);

  const openModal = useCallback((type, props = {}) => {
    setModalState({ type, props });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, props: {} });
  }, []);

  const renderModal = useMemo(() => {
    switch (modalState.type) {
      case "auth":
        return <AuthModal onClose={closeModal} />;
      case "wishlist":
        return <WishlistModal onClose={closeModal} />;
      case "cart":
        return (
          <CartModal
            onClose={closeModal}
            initialStage={modalState.props.initialStage || "cart"}
          />
        );
      default:
        return null;
    }
  }, [modalState]);

  return (
    <div className={isSticky ? "navbar sticky" : "navbar"}>
      <div className="leftContainer">
        <div className="logo">
          <LazyLoadImage
            src={images.leaves}
            alt="Organic leaves logo"
            className="logoLeaf"
            effect="blur"
          />

          <h3 className="logoText">organix</h3>
        </div>

        <div
          className="menuIcon"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <BiX className="menuClose" />
          ) : (
            <TbMenu4 className="menuOpen" />
          )}
        </div>
      </div>

      <div
        className={
          isMobileMenuOpen ? "rightContainer active" : "rightContainer"
        }
      >
        <div className="menu">
          {MENU_ITEMS.map(({ label, pop }) => (
            <div
              className="menuLink"
              key={label}
              onClick={(e) => e.preventDefault()}
            >
              {label}
              {pop && (
                <div className="navIcons">
                  <span
                    className="navPop"
                    style={{ backgroundColor: pop.color }}
                  >
                    {pop.text}
                  </span>

                  <div className="navArrow">
                    <IoIosArrowDown className="arrowDown" aria-hidden="true" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="navBarIcons">
          <SearchForm
            isActive={isSearchActive}
            toggleActive={toggleSearchForm}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            onSubmit={handleSearchSubmit}
            onSelect={handleSelectSuggestion}
            inputRef={searchInputRef}
            containerRef={searchContainerRef}
          />

          <IconButton
            icon={BiUserCircle}
            ariaLabel="User account"
            onClick={() => openModal("auth")}
          />

          <IconButton
            icon={BiHeart}
            count={likedItems.length}
            ariaLabel={`Wishlist, ${likedItems.length} items`}
            onClick={() => openModal("wishlist")}
          />

          <IconButton
            icon={BiShoppingBag}
            count={cartItems.length}
            ariaLabel={`Shopping bag, ${cartItems.length} items`}
            onClick={() => openModal("cart", { initialStage: "cart" })}
          />
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          item={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
          openCartModal={openModal}
        />
      )}

      {showNotFound && (
        <div className="notFoundPopup" role="alert">
          No matching product found.
        </div>
      )}
      {renderModal}
    </div>
  );
};

export default React.memo(Nav);
