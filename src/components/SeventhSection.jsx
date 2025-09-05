import React from "react";
import "../styles/SeventhSection.scss";
import { Reviews } from "../Data/Reviews";
import { images } from "../Data/Images";
import Swiper from "./EmblaReviews";

const OPTIONS = { loop: true };
const SLIDES = { slides: Reviews };

const SeventhSection = () => {
  return (
    <div className="seventhSection">
      <div className="seventhSectionContent">
        {/* Left Background */}
        <div className="seventhSectionBG leftBG">
          <img
            className="greenImg greenBGLeft"
            src={images.greenMarsh}
            alt="background left"
          />
        </div>

        {/* Review Section */}
        <div className="seventhSectionReview">
          <div className="seventhSectionReviewHeader">
            <h2 className="seventhSectionReviewTitle">Client Says</h2>
          </div>

          <Swiper options={OPTIONS} slides={SLIDES} />

          <div className="seventhSectionReviewFooter">
            <p className="seventhSectionReviewFooterText">
              Trusted customers are our top priority, happiness and our
              satisfaction.{" "}
              <a href="#" className="seventhSectionReviewFooterLink">
                Contact us.
              </a>
            </p>
          </div>
        </div>

        {/* Right Background */}
        <div className="seventhSectionBG rightBG">
          <img
            className="greenImg greenBGRight"
            src={images.dicedGreens}
            alt="background right"
          />
        </div>
      </div>
    </div>
  );
};

export default SeventhSection;
