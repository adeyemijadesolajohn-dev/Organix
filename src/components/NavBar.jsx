import React, { useState, useEffect } from "react";
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

const Nav = () => {
  const [value, setValue] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleClick = () => {
    setValue(value + 1);
  };

  const toggleSearch = () => {
    const searchForm = document.querySelector(".searchForm");
    const isActive = searchForm.classList.toggle("activeSearch");
    setIsSearchActive(isActive);
    setShowDropdown(isActive);
  };

  const handleSearchInput = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.trim().length > 0) {
      const matches = Produce.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(matches);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSearchSubmit = () => {
    if (!query.trim()) return;

    const chosen =
      Produce.find(
        (p) => p.title.toLowerCase() === query.trim().toLowerCase()
      ) || suggestions[0];

    if (chosen) {
      setModalItem(chosen);
      setShowDropdown(false);
      setQuery("");
    } else {
      setShowNotFound(true);
      setTimeout(() => setShowNotFound(false), 2500);
    }
  };

  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSelectSuggestion = (item) => {
    setModalItem(item);
    setShowDropdown(false);
    setQuery("");
  };

  const ItemModal = ({ item, onClose }) => {
    if (!item) return null;
    return (
      <div className="modalOverlay" onClick={onClose}>
        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>
            <strong>{item.discount}</strong>
            {item.original && (
              <span style={{ textDecoration: "line-through", marginLeft: 10 }}>
                {item.original}
              </span>
            )}
          </p>

          <button>Add to Cart</button>
          <button onClick={onClose}>Close</button>
          <button>Buy Now</button>
        </div>
      </div>
    );
  };

  return (
    <div className={isSticky ? "navbar sticky" : "navbar"}>
      <div className="leftContainer">
        <div className="logo">
          <img
            src={images.leaves}
            alt="leaf"
            className="leaf"
            style={{ width: "50px" }}
          />
          <h3>organix</h3>
        </div>

        <div className="menuIcon" onClick={toggleMenu}>
          {isOpen ? (
            <BiX className="menuClose" />
          ) : (
            <TbMenu4 className="menuOpen" />
          )}
        </div>
      </div>

      <div className={isOpen ? "rightContainer active" : "rightContainer"}>
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
          ].map((item, i) => (
            <a className="menuLink" href="#" key={i}>
              {item}
              {["Shop", "Product", "Collections", "Pages", "Blog"].includes(
                item
              ) && (
                <div className="navIcons">
                  {item === "Shop" && (
                    <span style={{ backgroundColor: "#4edb62" }}>SALE</span>
                  )}
                  {item === "Product" && (
                    <span style={{ backgroundColor: "#0376fa" }}>NEW</span>
                  )}
                  {item === "Collections" && (
                    <span style={{ backgroundColor: "#e42e2e" }}>HOT</span>
                  )}
                  <IoIosArrowDown style={{ display: "block" }} />
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="navBarIcons">
          <div>
            <form
              encType="application/x-www-form-urlencoded"
              className="searchForm"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit();
              }}
            >
              {isSearchActive && (
                <div className="searchLeftIcon" onClick={handleSearchSubmit}>
                  <BiSearchAlt style={{ display: "block" }} />
                </div>
              )}
              <input
                type="text"
                placeholder="Search..."
                className="searchInput"
                value={query}
                onChange={handleSearchInput}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
              />
              {showDropdown && isInputFocused && (
                <ul className="suggestionsDropdown">
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSelectSuggestion(item)}
                      >
                        {item.title}
                      </li>
                    ))
                  ) : (
                    <li>No results found</li>
                  )}
                </ul>
              )}
              <div className="searchButton" onClick={toggleSearch}>
                <BiSearchAlt
                  className="searchIcon"
                  style={{ display: "block" }}
                />
                <BiX className="searchClose" />
              </div>
            </form>
          </div>

          <div>
            <a href="#">
              <BiUserCircle style={{ display: "block" }} />
            </a>
          </div>
          <div onClick={handleClick}>
            <a href="#">
              <BiHeart style={{ display: "block" }} />
              <span>{value}</span>
            </a>
          </div>
          <div>
            <a href="#">
              <BiShoppingBag style={{ display: "block" }} />
              <span>0</span>
            </a>
          </div>
        </div>
      </div>

      {modalItem && (
        <ItemModal item={modalItem} onClose={() => setModalItem(null)} />
      )}

      {showNotFound && (
        <div className="notFoundPopup">No matching product found.</div>
      )}
    </div>
  );
};

export default Nav;
