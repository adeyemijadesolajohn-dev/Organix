import React, { useState } from "react";
import "../styles/NewThirdSection.scss";
import Slider from "./Slick";
import { Produce } from "../Data/Items";

const NewThirdSection = () => {
  const [item, setItem] = useState(Produce);
  const menuItems = [...new Set(Produce.map((val) => val.category))];

  return (
    <div className="thirdSection">
      <p className="thirdSectionTitle">~Our Products~</p>
      <h3 className="thirdSectionSubTitle">What's Hot Items</h3>
      <div className="thirdSectionMenu">
        <button
          className={` ${item === Produce ? "active" : ""}`}
          onClick={() => setItem(Produce)}
        >
          All Products
        </button>
        {menuItems.map((val, index) => (
          <button
            className={`${val === "button" ? "active" : ""}`}
            key={index}
            onClick={() => setItem(Produce.filter((c) => c.category === val))}
          >
            {val}
          </button>
        ))}
      </div>
      <Slider item={item} />
    </div>
  );
};

export default NewThirdSection;
