import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.scss";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { PiArrowFatLinesUpBold } from "react-icons/pi";
import { ClipLoader } from "react-spinners";

const FirstSection = lazy(() => import("./components/FirstSection.jsx"));
const SecondSection = lazy(() => import("./components/SecondSection.jsx"));
const ThirdSection = lazy(() => import("./components/NewThirdSection.jsx"));
const FourthSection = lazy(() => import("./components/FourthSection.jsx"));
const FifthSection = lazy(() => import("./components/FifthSection.jsx"));
const SixthSection = lazy(() => import("./components/SixthSection.jsx"));
const SeventhSection = lazy(() => import("./components/SeventhSection.jsx"));
const EightSection = lazy(() => import("./components/EightSection.jsx"));

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [dots, setDots] = useState("");

  const toggleVisibility = () => {
    if (window.pageYOffset > 1200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < 3) {
          return prevDots + ".";
        }
        return "";
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const spinnerOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "var(--primary-color)",
  };

  const SPINNER_SIZE = 135;
  const TEXT_FONT_SIZE = "1.35em";

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "55vh",
              position: "relative",
            }}
          >
            <ClipLoader
              color={"var(--primary-color)"}
              loading={true}
              cssOverride={spinnerOverride}
              size={SPINNER_SIZE}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: TEXT_FONT_SIZE,
                color: "var(--primary-color)",
                fontWeight: "bold",
                textAlign: "center",
                zIndex: 1,
              }}
            >
              Loading{dots}
            </div>
          </div>
        }
      >
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SixthSection />
        <SeventhSection />
        <EightSection />
      </Suspense>
      <Footer />

      <div
        className="scrollToTop"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <button className="scrollToTopBtn" onClick={scrollToTop}>
          <PiArrowFatLinesUpBold style={{ display: "block" }} />
        </button>
      </div>
    </>
  );
}

export default App;
