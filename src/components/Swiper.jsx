import React, { useState, useEffect, useRef } from "react";
import "../styles/Swiper.scss";
import { Reviews } from "../Data/Reviews";
import StarRating from "./StarRating";

const Swiper = ({ slideInterval = 7000 }) => {
  const [current, setCurrent] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const reqId = useRef(null);
  const lastTime = useRef(0);
  const startX = useRef(null);
  const trackRef = useRef(null);
  const transitioning = useRef(false);

  const extendedReviews = [Reviews[Reviews.length - 1], ...Reviews, Reviews[0]];

  const jumpTo = (index) => {
    requestAnimationFrame(() => {
      const track = trackRef.current;
      if (track) track.style.transition = "none";
      setCurrent(index);
      requestAnimationFrame(() => {
        if (track) track.style.transition = "transform 0.35s ease-in-out";
      });
    });
  };

  const next = () => {
    if (transitioning.current) return;
    transitioning.current = true;
    setCurrent((c) => c + 1);
  };

  const prev = () => {
    if (transitioning.current) return;
    transitioning.current = true;
    setCurrent((c) => c - 1);
  };

  useEffect(() => {
    const loop = (ts) => {
      if (isPaused) {
        reqId.current = requestAnimationFrame(loop);
        return;
      }
      if (!lastTime.current) lastTime.current = ts;
      if (ts - lastTime.current >= slideInterval) {
        next();
        lastTime.current = ts;
      }
      reqId.current = requestAnimationFrame(loop);
    };

    reqId.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(reqId.current);
    };
  }, [slideInterval, isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = () => {
      transitioning.current = false;
      if (current === 0) {
        jumpTo(Reviews.length);
      } else if (current === Reviews.length + 1) {
        jumpTo(1);
      } else {
        transitioning.current = false;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    track.addEventListener("transitionend", handleTransitionEnd);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      track.removeEventListener("transitionend", handleTransitionEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current]);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = startX.current - endX;
    const threshold = 50;
    if (Math.abs(delta) > threshold) {
      delta > 0 ? next() : prev();
    }
  };

  return (
    <div
      className="swiper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="track"
        ref={trackRef}
        style={{
          width: `${extendedReviews.length * 100}%`,
          transform: `translateX(-${
            current * (100 / extendedReviews.length)
          }%)`,
          transition: "transform 0.35s ease-in-out",
        }}
      >
        {extendedReviews.map((review, idx) => (
          <div
            key={review.id || idx}
            style={{ width: `${100 / extendedReviews.length}%` }}
            className="slide"
          >
            <div className="profilePic">
              <img src={review.image} alt={review.name} className="avatar" />
            </div>

            <div className="review">
              <p className="reviewText">{review.review}</p>
            </div>

            <div className="starRating">
              <StarRating />
            </div>

            <div className="clientName">
              <p className="clientNameText">{review.name}</p>
            </div>

            <div className="clientLocation">
              <p className="clientLocationText">{review.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="swiperPagination">
        <div className="swiperDots">
          {Reviews.map((_, idx) => (
            <div
              key={idx}
              className={`swiperDot ${idx + 1 === current ? "active" : ""}`}
              onClick={() => setCurrent(idx + 1)}
              aria-label={`Review ${idx + 1}`}
            >
              <div className="dot"></div>
            </div>
          ))}
        </div>

        <div className="controls">
          <button
            className="swiperButton"
            onClick={prev}
            aria-label="Previous Review"
          >
            {"<"}
          </button>
          <button
            className="swiperButton"
            onClick={next}
            aria-label="Next Review"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Swiper;
