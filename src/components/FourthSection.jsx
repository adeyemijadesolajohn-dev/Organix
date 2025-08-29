import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { RiArrowRightDoubleLine, RiArrowLeftDoubleLine } from "react-icons/ri";
import "../styles/FourthSection.scss";
import { images } from "../Data/Images";
import { Produce } from "../Data/Items";
import StarRating from "./StarRating";
import CountDown from "./CountDown";
import ProgressBar from "./ProgressBar";
import CartModal from "./CartModal"; // Import CartModal

const startDate = new Date("2025-10-26T00:00:00Z");

const FourthSection = () => {
  const [collapse, setCollapse] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 70000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [initialCartStage, setInitialCartStage] = useState("cart");

  const lagranaMilk = {
    id: 0,
    title: "Lagrana Milk",
    image: images.greenMachine,
    lowResImage: images.greenMachineLowRes,
    discount: "$56.00",
    original: "$69.00",
    status: "In Stock",
    shortDescription:
      "Lagrana Milk is a fresh milk product from the local community. It is a good source of protein and nutrients for your body.",
    longDescription:
      "The milk is fresh and healthy. The brand is trusted by many people. It's a good choice for anyone who wants to eat healthy and natural food. The milk is made from local cows that are raised in the best conditions.",
    endDate: new Date(
      startDate.getTime() + 1000 * 60 * 60 * 24 * 10
    ).toISOString(),
  };

  const allProducts = [
    lagranaMilk,
    ...Produce.map((product, index) => ({
      ...product,
      endDate: new Date(
        startDate.getTime() + 1000 * 60 * 60 * 24 * (index + 1)
      ).toISOString(),
    })),
  ];

  const getDescriptions = (fullDescription) => {
    if (!fullDescription) {
      return { shortDescription: "", longDescription: "" };
    }
    const sentences = fullDescription.split(". ");
    const shortDescription = sentences[0] + ".";
    const longDescription = sentences.slice(1).join(". ");
    return { shortDescription, longDescription };
  };

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const handleBuyNow = useCallback(() => {
    setInitialCartStage("checkout");
    setShowCartModal(true);
  }, []);

  const closeCartModal = useCallback(() => {
    setShowCartModal(false);
    setInitialCartStage("cart"); // Reset stage for next time
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveSlide(emblaApi.selectedScrollSnap());
      setCollapse({});
    };

    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, setCollapse]);

  return (
    <div className="fourthSection" id="fourthSection">
      <div className="fourthSectionHeader">
        <p className="fourthSectionTitle">
          Discover thousands of other quality products.
        </p>
        <a href="#" className="fourthSectionLink">
          <p className="fourthSectionLinkText">View all products</p>
          <span className="fourthSectionLinkArrow">
            <RiArrowRightDoubleLine className="arrowIcon" />
          </span>
        </a>
      </div>

      <div className="fourthSectionCarousel group relative" ref={emblaRef}>
        <div className="embla__container flex">
          {allProducts.map((product, index) => {
            const descriptions =
              product.shortDescription && product.longDescription
                ? {
                    shortDescription: product.shortDescription,
                    longDescription: product.longDescription,
                  }
                : getDescriptions(product.description);
            return (
              <div key={product.id} className="fourthSectionContent">
                <div className="fourthSectionImage" draggable="false">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="greenMachine"
                  />
                </div>
                <div className="fourthSectionText">
                  <h2 className="fourthSectionTextTitle" draggable="false">
                    {product.title}
                  </h2>
                  <div className="fourthSectionTextPrice" draggable="false">
                    <p className="fourthSectionTextPriceNew">
                      {product.discount}
                    </p>
                    {product.original && (
                      <p className="fourthSectionTextPriceOld">
                        {product.original}
                      </p>
                    )}
                  </div>
                  <StarRating id={product.id} />
                  <p className="fourthSectionTextStatus" draggable="false">
                    Status: {product.status || "In Stock"}
                  </p>
                  <div
                    className="fourthSectionTextDescription"
                    draggable="false"
                  >
                    {descriptions.shortDescription}
                    {descriptions.longDescription && (
                      <span
                        className={`longText ${
                          collapse[index] ? "expanded" : ""
                        }`}
                      >
                        {descriptions.longDescription}
                      </span>
                    )}
                    {descriptions.longDescription && (
                      <button
                        onClick={() =>
                          setCollapse((prev) => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                        className="readMore"
                        style={{ color: collapse[index] ? "#f4ad16" : "" }}
                      >
                        {collapse[index] ? "...Read Less" : "Read More..."}
                      </button>
                    )}
                  </div>
                  <CountDown endDate={product.endDate} draggable="false" />
                  <ProgressBar productId={product.id} onBuyNow={handleBuyNow} />
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={scrollPrev}
          className="customArrow prev"
          aria-label="Previous Slide"
        >
          <RiArrowLeftDoubleLine size={28} />
        </button>
        <button
          onClick={scrollNext}
          className="customArrow next"
          aria-label="Next Slide"
        >
          <RiArrowRightDoubleLine size={28} />
        </button>
      </div>

      {showCartModal && (
        <CartModal onClose={closeCartModal} initialStage={initialCartStage} />
      )}
    </div>
  );
};

export default FourthSection;
