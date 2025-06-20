import React from "react";
import "../styles/FirstSection.scss";
import { images } from "../Data/Images";

const FirstSection = () => {
  return (
    <div className="firstSection">
      <div className="whiteTable"></div>
      <div className="pictureFlex">
        <img className="vegetables" src={images.vegetableBasket} alt="" />

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
