import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  usePrevNextButtons,
  PrevButton,
  NextButton,
} from "./EmblaCarouselArrowButtons";
import { useDotButton, DotButton } from "./EmblaCarouselDotButton";
import StarRating from "./StarRating";
import { Reviews } from "../Data/Reviews";
import "../styles/EmblaReviews.scss";

export default function ReviewSlider({
  autoplayInterval = 7000,
  options = { loop: true, align: "center", dragFree: false },
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: autoplayInterval, stopOnInteraction: false }),
  ]);

  const onNavButtonClick = useCallback((api) => {
    const autoplay = api?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {Reviews.map((review) => (
            <div
              className="embla__slide"
              key={review.id}
              style={{ width: "100%", textAlign: "center" }}
            >
              <div className="review-card">
                <img
                  src={review.image}
                  alt={`Avatar of ${review.name}`}
                  className="review-card__avatar"
                />
                <p className="review-card__text">"{review.review}"</p>
                <div className="review-card__rating">
                  <StarRating rating={review.rating} />
                </div>
                <h4 className="review-card__name">{review.name}</h4>
                <span className="review-card__location">{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
