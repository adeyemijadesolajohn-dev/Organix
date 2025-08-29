import React, { useRef, useState, useEffect } from "react";
import "../styles/Slick.scss";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import StarRating from "./StarRating";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useLikes } from "../context/LikeContext";
import { useCart } from "../context/CartContext";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BiRightArrow
      className={className}
      style={{
        ...style,
        display: "block",
        color: "var(--primary-color)",
        height: "35px",
        width: "35px",
        fontSize: "20px",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.35)",
        boxShadow:
          "0 2px 4px rgba(0, 0, 0, 0.35), inset 0 8px 12px rgba(0, 0, 0, 0.35), inset 0 -7px 13.5px 3.5px rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(3.5px)",
        borderRadius: "50%",
        padding: "7px",
        transition: "all 0.35s ease-in-out",
        zIndex: "1",
        cursor: "pointer",
        position: "absolute",
        right: "-12px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BiLeftArrow
      className={className}
      style={{
        ...style,
        display: "block",
        color: "var(--primary-color)",
        height: "35px",
        width: "35px",
        fontSize: "20px",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.35)",
        boxShadow:
          "0 2px 4px rgba(0, 0, 0, 0.35), inset 0 8px 12px rgba(0, 0, 0, 0.35), inset 0 -7px 13.5px 3.5px rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(3.5px)",
        borderRadius: "50%",
        padding: "7px",
        transition: "all 0.35s ease-in-out",
        zIndex: "1",
        cursor: "pointer",
        position: "absolute",
        left: "-12px",
      }}
      onClick={onClick}
    />
  );
}

const ProductCarousel = ({ item, initialSlide, onSlideChange }) => {
  const [popup, setPopup] = useState(null);
  const sliderRef = useRef(null);
  const { likedItems, toggleLike } = useLikes();
  const { addToCart } = useCart();

  useEffect(() => {
    if (sliderRef.current && initialSlide !== undefined) {
      sliderRef.current.slickGoTo(initialSlide, true);
    }
  }, [item, initialSlide]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setPopup(product);
    setTimeout(() => setPopup(null), 7000);
  };

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    afterChange: (current) => {
      if (onSlideChange) {
        onSlideChange(current);
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
        },
      },
    ],

    // appendDots: (dots) => (
    //   <div>
    //     <ul
    //       style={{
    //         listStyle: "none",
    //         backgroundColor: "transparent",
    //         color: "transparent",
    //         marginTop: "50px",
    //         transition: "all 0.35s ease-in-out",
    //       }}
    //     >
    //       {" "}
    //       {dots}{" "}
    //     </ul>
    //   </div>
    // ),
    // customPaging: (i) => (
    //   <button
    //     className="dot"
    //     style={{
    //       width: "12px",
    //       height: "12px",
    //       borderRadius: "50%",
    //       color: "var(--primary-color)",
    //       backgroundColor: "rgba(255, 255, 255, 0.35)",
    //       boxShadow:
    //         "0 1px 2px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(0, 0, 0, 0.35), inset 0 -7px 13.5px 3.5px rgba(255, 255, 255, 0.7)",
    //       backdropFilter: "blur(3.5px)",
    //       fontSize: "8px",
    //       padding: "8px",
    //       textAlign: "center",
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       transition: "all 0.35s ease-in-out",
    //     }}
    //   >
    //     {i + 1}
    //   </button>
    // ),
  };

  return (
    <>
      <ul className="slickWrapper">
        <SlickSlider ref={sliderRef} {...settings}>
          {item.map((val) => (
            <li key={val.id} className="slickCard">
              <div className="slickContent">
                <div className="slickTop">
                  <span
                    className="slickStatus"
                    style={{
                      backgroundColor: `${
                        val.left === "New" ? "yellowgreen" : "red"
                      }`,
                    }}
                  >
                    {val.left}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleLike(val.id)}
                    className="slickHeart"
                  >
                    {likedItems.includes(val.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <div className="slickCardImage">
                    <LazyLoadImage
                      className="slickImage"
                      src={val.image}
                      alt={val.title || "Product image"}
                      effect="blur"
                      draggable="false"
                    />
                  </div>

                  <div className="slickCardContent">
                    <h4
                      className="slickCardTitle"
                      onClick={() => handleAddToCart(val)}
                    >
                      {val.title}
                    </h4>
                  </div>
                </div>

                <div className="slickCardBottom">
                  <StarRating />

                  <div className="slickCardPrice">
                    <p
                      className="slickDiscount"
                      style={{
                        color: `${val.original === null ? "gold" : "red"}`,
                      }}
                    >
                      {val.discount}
                    </p>
                    <p className="slickOriginal">{val.original}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </SlickSlider>
      </ul>
      {popup && (
        <div className="cartPopup">
          <div className="popupContent">
            <BiCheckCircle className="checkmark-icon" />
            <img src={popup.image} alt={popup.title} className="popupImage" />
            <div className="popupDetails">
              <p>Added to Cart</p>
              <h4>{popup.title}</h4>
              <p>{popup.discount}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
