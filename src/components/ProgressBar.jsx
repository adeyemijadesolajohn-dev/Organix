import React, { useState } from "react";
import "../styles/ProgressBar.scss";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { TfiEye } from "react-icons/tfi";
import { LuRefreshCw } from "react-icons/lu";

const ProgressBar = () => {
  const [favorite, setFavorite] = useState(false);

  const [progress, setProgress] = useState(0);

  const [remaining, setRemaining] = useState(100);

  const handleButtonAdd = () => {
    setProgress(progress + 1);
    setRemaining(remaining - 1);

    if (remaining === 0) {
      setProgress(100);
      setRemaining(0);
    }
  };

  const handleButtonReset = () => {
    setProgress(0);
    setRemaining(100);
  };

  const handleButtonRemove = () => {
    setProgress(progress - 1);
    setRemaining(remaining + 1);

    if (progress === 0) {
      setProgress(0);
      setRemaining(100);
    }
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  const getColor = () => {
    if (progress < 25) {
      return "red";
    } else if (progress < 50) {
      return "yellow";
    } else if (progress < 75) {
      return "#f4ad16";
    } else if (progress < 100) {
      return "var(--primary-color)";
    } else {
      return "yellowgreen";
    }
  };

  return (
    <div className="progressBar">
      <div className="progressBarText">
        <p>
          Sold: <span>{progress}</span>
        </p>

        <p>
          Available: <span>{remaining}</span>
        </p>
      </div>

      <div className="progressBarContainer">
        <div
          id="progressBarGutterFill"
          className="progressBarFill"
          style={{ width: `${progress}%`, backgroundColor: `${getColor()}` }}
        ></div>
      </div>

      <div className="progressBarTextButtons">
        <div className="progressBarButtonContainer">
          <button onClick={handleButtonAdd} className="progressBarTextButton">
            <p>ADD TO CART</p>
          </button>

          <button onClick={handleButtonReset} className="progressBarTextButton">
            <p>BUY NOW</p>
          </button>

          <button
            onClick={handleButtonRemove}
            className="progressBarTextButton"
          >
            <p>CANCEL ORDER</p>
          </button>
        </div>

        <div className="progressBarButtonContainer">
          <button
            onClick={handleFavorite}
            className="progressBarIconButton"
            style={{
              backgroundColor: `${favorite ? "#f4a261" : ""}`,
            }}
          >
            {favorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </button>
          <button className="progressBarIconButton">
            <TfiEye />
          </button>
          <button
            onClick={() => window.location.reload()}
            className="progressBarIconButton"
          >
            <LuRefreshCw />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
