import React, { useState, useEffect, useRef } from "react";
import "../styles/SixthSection.scss";
import { Produce } from "../Data/Items";
import ItemCard from "./ItemCard";
import {
  LuRefreshCcwDot,
  LuFilter,
  LuArrowBigLeftDash,
  LuArrowBigRightDash,
} from "react-icons/lu";
import { CgMoreVertical } from "react-icons/cg";
import { RiArrowRightDoubleLine } from "react-icons/ri";

const SixthSection = () => {
  const itemPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? Produce
      : Produce.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / itemPerPage);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxShown = 5;

    if (totalPages <= maxShown) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sixthSection">
      <div className="sixthSectionContent">
        <div className="sixthSectionHeader">
          <p className="sixthSectionTitle">~Special Products~</p>
          <h2 className="sixthSectionSubTitle">Weekly Food Offers</h2>
          <p className="sixthSectionText">
            We offer a wide range of organic products, including fruits,
            vegetables, dairy, and grains. All our products are sourced from
            local farmers who adhere to strict organic farming practices,
            ensuring that you receive the freshest and healthiest food possible.
          </p>
        </div>

        <div className="sixthSectionIcons">
          <div className="sixthSectionIcon" ref={dropdownRef}>
            <button
              className="dropdownButton"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Filter"
            >
              <LuFilter className="buttonIcon" />
            </button>

            {open && (
              <div className="dropdown">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="dropdownSelect"
                >
                  <option value="All">All Products</option>

                  {[...new Set(Produce.map((item) => item.category))].map(
                    (category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
          </div>

          <div className="sixthSectionIcon">
            <button
              className="dropdownButton"
              onClick={() => window.location.reload()}
              aria-label="Refresh"
            >
              <LuRefreshCcwDot className="buttonIcon" />
            </button>
          </div>

          <div className="sixthSectionIcon">
            <button className="dropdownButton" aria-label="More">
              <CgMoreVertical className="buttonIcon" />
            </button>
          </div>
        </div>

        <div className="cardContainer">
          {currentItems.map((item, index) => {
            return (
              <ItemCard
                key={index}
                id={item.id}
                left={item.left}
                category={item.category}
                image={item.image}
                title={item.title}
                description={item.description}
                discount={item.discount}
                original={item.original}
              />
            );
          })}
        </div>

        <div className="sixthSectionPagination">
          <div className="pagination">
            <button
              className="page"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="paginationIcon">
                <LuArrowBigLeftDash className="paginationIconFont" />
              </span>
            </button>

            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`page ${currentPage === page ? "active" : ""}`}
                onClick={() => goToPage(page)}
                disabled={page === "..."}
                style={page === "..." ? { pointerEvents: "none" } : {}}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}

            <button
              className="page"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className="paginationIcon">
                <LuArrowBigRightDash className="paginationIconFont" />
              </span>
            </button>
          </div>
        </div>

        <div className="sixthSectionFooter">
          <p className="sixthSectionFooterText">
            We offer a wide range of organic products, including fruits,
            vegetables, dairy, and grains. All our products are sourced from
            local farmers who adhere to strict organic farming practices,
            ensuring that you receive the freshest and healthiest food possible.
          </p>

          <p className="sixthSectionFooterLinkText">
            Discover thousands of other quality products.{" "}
            <a href="#" className="sixthSectionFooterLinkPath">
              View all products <RiArrowRightDoubleLine className="arrowIcon" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SixthSection;
