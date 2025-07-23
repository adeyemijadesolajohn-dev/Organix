import React from "react";
import "../styles/SlickReview.scss";
import { Reviews } from "../Data/Reviews";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRating from "./StarRating";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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

        "&:hover": {
          transform: "scale(1.35)",
          color: "#f4ad16",
          transition: "all 0.35s ease-in-out",
        },
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

const SlickReview = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => <ul className="custom-dots">{dots}</ul>,
    customPaging: (i) => <button className="dot" />,
  };
  return (
    <div className="slickReview">
      <Slider {...settings}>
        {Reviews.map((review) => (
          <div key={review.id} className="track">
            <div className="reviewSlide">
              <div className="profilePic">
                <LazyLoadImage
                  src={review.image}
                  alt={review.name || "Reviewer profile picture"}
                  className="avatar"
                  effect="blur"
                  width="100%"
                  height="100%"
                />
              </div>

              <div className="review">
                <p className="reviewText">{review.review}</p>
              </div>

              <div className="starRating">
                <StarRating />
              </div>

              <div className="clientName">
                <p className="clientNameText">{review.name}</p>
              </div>

              <div className="clientLocation">
                <p className="clientLocationText">{review.location}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickReview;
