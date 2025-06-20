import React, { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header.jsx";
import FirstSection from "./components/FirstSection.jsx";
import SecondSection from "./components/SecondSection.jsx";
import ThirdSection from "./components/NewThirdSection.jsx";
import FourthSection from "./components/FourthSection.jsx";
import FifthSection from "./components/FifthSection.jsx";
import SixthSection from "./components/SixthSection.jsx";
import SeventhSection from "./components/SeventhSection.jsx";
import EightSection from "./components/EightSection.jsx";
import Footer from "./components/Footer.jsx";
import { PiArrowFatLinesUpBold } from "react-icons/pi";

function App() {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <>
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
      <EightSection />
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
