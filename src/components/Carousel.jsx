import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import StarRating from "./StarRating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Carousel = ({ item }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const [like, setLike] = useState(false);

  const handleClick = () => {
    setLike(!like);
  };

  return (
    <div>
      <Slider {...settings}>
        {item.map((val) => (
          <div key={val.id} className="content">
            <span
              className="status"
              style={{
                backgroundColor: `${
                  val.left === "New" ? "yellowgreen" : "red"
                }`,
              }}
            >
              {val.left}
            </span>
            <button type="button" onClick={handleClick} className="heart">
              {like ? <FaHeart /> : <FaRegHeart />}
            </button>
            <div className="cardImage">
              <LazyLoadImage
                alt={val.title}
                effect="blur"
                src={val.image}
                width="100%"
                height="auto"
                wrapperProps={{
                  style: {
                    display: "block",
                    height: "100%",
                    width: "100%",
                    transition: "all 0.35s ease-in-out",
                  },
                }}
                className="cardImg"
              />
            </div>

            <div className="cardContent">
              <h4 className="cardTitle">{val.title}</h4>

              <StarRating />

              <div className="cardPrice">
                <p
                  className="discount"
                  style={{ color: `${val.original === null ? "gold" : "red"}` }}
                >
                  {val.discount}
                </p>
                <p className="original">{val.original}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
