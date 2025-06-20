import React from "react";
import "../styles/SeventhSection.scss";
import { images } from "../Data/Images";
import Swiper from "./EmblaReviews";
import { Reviews } from "../Data/Reviews";

const OPTIONS = { loop: true };
const SLIDES = { slides: Reviews };
const SeventhSection = () => {
  return (
    <div className="seventhSection">
      <div className="seventhSectionContent">
        <div className="seventhSectionBG">
          <img className="greenBGLeft" src={images.greenBg} alt="background" />
        </div>

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

        <div className="seventhSectionBG">
          <img className="greenBGRight" src={images.greenBg} alt="background" />
        </div>
      </div>
    </div>
  );
};

export default SeventhSection;
