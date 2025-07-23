import React from "react";
import "../styles/FirstSection.scss";
import { images } from "../Data/Images";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const FirstSection = () => {
  return (
    <div className="firstSection">
      <div className="whiteTable"></div>
      <div className="pictureFlex">
        <LazyLoadImage
          className="vegetables"
          src={images.vegetableBasket}
          alt="Basket of fresh organic vegetables"
          effect="blur"
          width="100%"
          height="auto"
          wrapperProps={{
            style: { display: "block" },
          }}
        />

        <div className="backgroundText">
          <p className="welcome">WELCOME TO OUR FARM</p>
          <h1 className="title">Fresh Bread Oatmeal Crumble.</h1>
          <p className="description">
            Presentation matters. Our fresh Vietnamese vegetable rolls look good
            and taste even better
          </p>

          <button className="shopNow">SHOP NOW</button>
        </div>
      </div>

      <img className="stamp" src={images.organicStamp} alt="" />
    </div>
  );
};

export default FirstSection;
