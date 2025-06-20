import React from "react";
import "../styles/SecondSection.scss";
import { images } from "../Data/Images";

const SecondSection = () => {
  return (
    <div className="secondSection">
      <div className="secondSectionContent">
        <div className="secondSectionCard">
          <img src={images.planting} alt="" />

          <h4 className="secondSectionTitle">Who We Are</h4>

          <p className="secondSectionText">
            Organix is a community-driven platform that connects local farmers
            with consumers who value fresh, organic produce. Our mission is to
            promote sustainable agriculture and support local economies by
            providing a marketplace for organic food.
          </p>
        </div>

        <div className="secondSectionCard">
          <img src={images.quality} alt="" />

          <h4 className="secondSectionTitle">Our Products</h4>

          <p className="secondSectionText">
            We offer a wide range of organic products, including fruits,
            vegetables, dairy, and grains. All our products are sourced from
            local farmers who adhere to strict organic farming practices,
            ensuring that you receive the freshest and healthiest food possible.
          </p>
        </div>

        <div className="secondSectionCard">
          <img src={images.blackGrape} alt="" />

          <h4 className="secondSectionTitle">How We Work</h4>

          <p className="secondSectionText">
            Our platform allows you to browse and purchase organic products
            directly from local farmers. We facilitate the entire process,
            ensuring that your food is delivered fresh and on time. By choosing
            Organix, you support sustainable farming practices and contribute to
            a healthier planet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
