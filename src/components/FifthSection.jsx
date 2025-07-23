import React from "react";
import "../styles/FifthSection.scss";
import { images } from "../Data/Images";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const FifthSection = () => {
  return (
    <div className="fifthSection">
      <div className="fifthSectionContent">
        <div className="fifthSectionText">
          <h1 className="fifthSectionTextTitle">
            The Most Healthy Organic Foods
          </h1>

          <p className="fifthSectionTextDescription">
            Organix is a community-driven platform that connects local farmers
            with consumers who value fresh, organic produce.
          </p>

          <button className="fifthSectionTextButton">Learn More</button>
        </div>

        <div className="fifthSectionImage">
          <img
            className="brushStroke"
            src={images.brushStroke}
            alt="brush stroke"
          />
          <LazyLoadImage
            className="pomidor"
            src={images.pomidor}
            alt="pomidor"
            effect="blur"
            placeholderSrc={images.pomidorLowRes}
            width="100%"
            height="auto"
          />
          <img
            className="leavesBlowing"
            src={images.leavesBlowing}
            alt="leaves"
          />
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
