import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/NavBar.scss";
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
import { images } from "../Data/Images";
import { Produce } from "../Data/Items";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Nav = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResultsDropdown, setShowSearchResultsDropdown] =
    useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [isSearchFormActive, setIsSearchFormActive] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const handleWishlistClick = useCallback(() => {
    setWishlistCount((prevCount) => prevCount + 1);
  }, []);

  const toggleSearchForm = useCallback(() => {
    setIsSearchFormActive((prev) => {
      const newState = !prev;
      if (!newState) {
        setShowSearchResultsDropdown(false);
        setSearchQuery("");
        setSearchResults([]);
      } else {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
      return newState;
    });
  }, []);

  const handleSearchInputChange = useCallback((e) => {
    const input = e.target.value;
    setSearchQuery(input);
    if (input.trim().length > 0) {
      const matches = Produce.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(matches);
      setShowSearchResultsDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchResultsDropdown(false);
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
        setSelectedProductModal(chosen);
        setShowSearchResultsDropdown(false);
        setSearchQuery("");
        setIsSearchFormActive(false);
      } else {
        setShowNotFoundMessage(true);
        setTimeout(() => setShowNotFoundMessage(false), 2500);
      }
    },
    [searchQuery, searchResults]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        !event.target.closest(".searchButton")
      ) {
        setShowSearchResultsDropdown(false);
        // when clicking outside the search input area (but not the toggle button).
        // if (isSearchFormActive) setIsSearchFormActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchFormActive]);

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );

  const handleSelectSuggestion = useCallback((item) => {
    setSelectedProductModal(item);
    setShowSearchResultsDropdown(false);
    setSearchQuery("");
    setIsSearchFormActive(false);
  }, []);

  const ProductDetailModal = ({ item, onClose }) => {
    if (!item) return null;
    return (
      <div
        className="navModalOverlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="productModalTitle"
      >
        <div
          className="navModalContent"
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          <img
            className="navModalImage"
            src={item.image}
            alt={item.title}
            effect="blur"
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
            <button className="navModalButton">Add to Cart</button>
            <button className="navModalButton" onClick={onClose}>
              Close
            </button>
            <button className="navModalButton">Buy Now</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={isSticky ? "navbar sticky" : "navbar"}>
      <div className="leftContainer">
        <div className="logo">
          <LazyLoadImage
            src={images.leaves}
            alt="Organic leaves logo"
            className="logoLeaf"
            style={{ width: "50px", height: "35px" }}
            effect="blur"
            width="50px"
            height="35px"
          />
          <h3 className="logoText">organix</h3>
        </div>

        <div
          className="menuIcon"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
          {[
            "Home",
            "Shop",
            "Product",
            "Collections",
            "Pages",
            "Blog",
            "Contact Us",
            "Buy Themes!",
          ].map((item) => (
            <a className="menuLink" href="#" key={item}>
              {item}
              {["Shop", "Product", "Collections", "Pages", "Blog"].includes(
                item
              ) && (
                <div className="navIcons">
                  {item === "Shop" && (
                    <span
                      className="navPop"
                      style={{ backgroundColor: "#4edb62" }}
                    >
                      SALE
                    </span>
                  )}
                  {item === "Product" && (
                    <span
                      className="navPop"
                      style={{ backgroundColor: "#0376fa" }}
                    >
                      NEW
                    </span>
                  )}
                  {item === "Collections" && (
                    <span
                      className="navPop"
                      style={{ backgroundColor: "#e42e2e" }}
                    >
                      HOT
                    </span>
                  )}
                  <IoIosArrowDown
                    style={{ display: "block" }}
                    aria-hidden="true"
                  />
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="navBarIcons" ref={searchContainerRef}>
          <div className="searchContainer">
            <form
              className={`searchForm ${
                isSearchFormActive ? "activeSearch" : ""
              }`}
              onSubmit={handleSearchSubmit}
            >
              {isSearchFormActive && (
                <div
                  className="searchLeftIcon"
                  onClick={handleSearchSubmit}
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
                onChange={handleSearchInputChange}
                onFocus={() => {
                  if (
                    isSearchFormActive ||
                    searchQuery.trim().length > 0 ||
                    searchResults.length > 0
                  ) {
                    setShowSearchResultsDropdown(true);
                  }
                }}
                ref={searchInputRef}
                aria-label="Search for products"
              />
              {showSearchResultsDropdown &&
                searchQuery.trim().length > 0 &&
                searchResults.length > 0 && (
                  <ul className="suggestionsDropdown">
                    {searchResults.map((item) => (
                      <li
                        className="suggestionItem"
                        key={item.id}
                        onClick={() => handleSelectSuggestion(item)}
                        role="option"
                        aria-selected={
                          searchQuery.toLowerCase() === item.title.toLowerCase()
                        }
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
              {showSearchResultsDropdown &&
                searchQuery.trim().length > 0 &&
                searchResults.length === 0 && (
                  <ul className="suggestionsDropdown">
                    <li className="suggestionItem no-results" role="alert">
                      No results found
                    </li>
                  </ul>
                )}
              <div
                className="searchButton"
                onClick={toggleSearchForm}
                role="button"
                aria-label={
                  isSearchFormActive ? "Close search bar" : "Open search bar"
                }
              >
                {isSearchFormActive ? (
                  <BiX className="searchClose" />
                ) : (
                  <BiSearchAlt className="searchIcon" />
                )}
              </div>
            </form>
          </div>

          <div>
            <a className="navBarIconBtn" href="#" aria-label="User account">
              <BiUserCircle style={{ display: "block" }} />
            </a>
          </div>
          <div
            onClick={handleWishlistClick}
            role="button"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <a className="navBarIconBtn" href="#">
              <BiHeart style={{ display: "block" }} />
              <span className="popCount">{wishlistCount}</span>
            </a>
          </div>
          <div>
            <a
              className="navBarIconBtn"
              href="#"
              aria-label="Shopping bag, 0 items"
            >
              <BiShoppingBag style={{ display: "block" }} />
              <span className="popCount">0</span>
            </a>
          </div>
        </div>
      </div>

      {selectedProductModal && (
        <ProductDetailModal
          item={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
        />
      )}

      {showNotFoundMessage && (
        <div className="notFoundPopup" role="alert">
          No matching product found.
        </div>
      )}
    </div>
  );
};

export default Nav;
