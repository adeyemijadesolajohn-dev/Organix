import React, { useState } from "react";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import "../styles/FourthSection.scss";
import { images } from "../Data/Images";
import StarRating from "./StarRating";
import CountDown from "./CountDown";
import ProgressBar from "./ProgressBar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const FourthSection = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="fourthSection" id="fourthSection">
      <div className="fourthSectionHeader">
        <p className="fourthSectionTitle">
          Discover thousands of other quality products.{" "}
        </p>
        <a href="#" className="fourthSectionLink">
          <p className="fourthSectionLinkText">View all products</p>
          <span className="fourthSectionLinkArrow">
            <RiArrowRightDoubleLine className="arrowIcon" />
          </span>
        </a>
      </div>

      <div className="fourthSectionContent">
        <div className="fourthSectionImage">
          <LazyLoadImage
            className="greenMachine"
            src={images.greenMachine}
            alt="Green Machine"
            effect="blur"
            placeholderSrc={images.greenMachineLowRes}
            width="100%"
            height="auto"
            wrapperProps={{
              style: { display: "block", width: "100%", height: "100%" },
            }}
          />
        </div>

        <div className="fourthSectionText">
          <h2 className="fourthSectionTextTitle">Lagrana Milk</h2>

          <div className="fourthSectionTextPrice">
            <p className="fourthSectionTextPriceNew">$56.00</p>
            <p className="fourthSectionTextPriceOld">$69.00</p>
          </div>

          <StarRating />

          <p className="fourthSectionTextStatus">Status: In Stock</p>

          <div className="fourthSectionTextDescription">
            Lagrana Milk is a fresh milk product from the local community. It is
            a good source of protein and nutrients for your body. The quality of
            the milk is guaranteed by the local farmers.
            <span className={`longText ${collapse ? "expanded" : ""}`}>
              {" "}
              The milk is fresh and healthy. The brand is trusted by many
              people. It's a good choice for anyone who wants to eat healthy and
              natural food. The milk is made from local cows that are raised in
              the best conditions. The milk is fresh and healthy. The brand is
              trusted by many people. It's a good choice for anyone who wants to
              eat healthy and natural food.
            </span>
            <button
              onClick={() => setCollapse((prev) => !prev)}
              className="readMore"
              style={{ color: collapse ? "#f4ad16" : "" }}
            >
              {collapse ? "...Read Less" : "Read More..."}
            </button>
          </div>

          <CountDown />

          <ProgressBar />
        </div>
      </div>
    </div>
  );
};

export default FourthSection;
