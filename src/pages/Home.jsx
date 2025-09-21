import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import FeatureBoxes from "../components/FeatureBoxes";
import Header from "../components/layout/Header";
import localization from "../assets/constants/localization";
import chatGif from "../assets/features/chatGif.gif";
import aireport from "../assets/features/ai-report.png";
import family from "../assets/features/family.png";
import lifestyle from "../assets/features/lifestyle.png";
import stressScore from "../assets/features/stressScore.png";
import calander from "../assets/features/calander.png";
import progress from "../assets/features/progress.png";
import Slider from "react-slick";
import Chatbot from "./ChatBot";
export default function Home() {
  const [showIcon, setShowIcon] = useState(false);
  const [openChatBot, setOpenChatBot] = useState(false);
  const [hideTxt, setHideTxt] = useState(false);
  const stepsImg = [
    aireport,
    family,
    lifestyle,
    stressScore,
    calander,
    progress,
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcon(true);
    }, 3000);
    const timerTxt = setTimeout(() => {
      setHideTxt(true);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timerTxt);
    };
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1, // one at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false, // 👈 keep autoplay even if user hovers
    pauseOnFocus: false, // 👈 don't pause when button is focused
  };
  const homeBanner = localization.homeBanner;
  const slides = localization.bannerSlide;
  const toggleChatBot = () => {
    setOpenChatBot(!openChatBot);
  };
  const navigate = useNavigate();

  const goToUploadPage = () => {
    navigate("/upload"); // the path to navigate to
  };
  return (
    <div className="home-page-parent">
      <Header />
      {/* desktop view */}
      {!window.RDL.isMobile && (
        <>
          <section className={"banner-home"}>
            desktop view is to be created...
          </section>
        </>
      )}
      {/* mobileview  */}
      {window.RDL.isMobile && (
        <>
          <section
            className={
              "banner-home" + (window.RDL.isMobile ? " mobile-view" : "")
            }
          >
            <div className="header">{homeBanner.header}</div>
            <div className="sub-header">{homeBanner.subHeader}</div>
            {/* <img src={yoga} alt="banner-img" className="banner-img" /> */}
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <div key={index} className="slide-home-page-banner">
                  {/* <img src={slide.img} alt="slide" className="slide-img" /> */}
                  <img
                    src={stepsImg[index]}
                    alt="banner-img"
                    className="banner-img"
                  />
                  <p className="slide-text">{slide.text}</p>
                </div>
              ))}
            </Slider>
            <button className="primary-cta" onClick={goToUploadPage}>
              {homeBanner.primaryCta}
            </button>
            {showIcon && (
              <div className="chat-floating-container">
                <div className="chat-icon-wrapper">
                  <img
                    src={chatGif}
                    alt="chat"
                    className="chat-icon"
                    onClick={toggleChatBot}
                  />
                  {/* bubble always in DOM for smooth animation */}
                  <span
                    className={"chat-text" + (hideTxt ? " hide-chat-text" : "")}
                  >
                    {localization.mediAiAssistTxt}
                  </span>
                </div>
              </div>
            )}
          </section>
          {openChatBot && <Chatbot onClose={toggleChatBot} />}
        </>
      )}
    </div>
  );
}
