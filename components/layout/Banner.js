import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import playIcon from "../../assets/image/play-w.svg";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = ({ bannerData }) => {
  const [isVisibil, setIsVisibil] = useState(false);

  const PlayHandler = () => {
    setIsVisibil(false);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => <div className="dots_custom"></div>,
  };

  return (
    <div className="banner_wapper">
      <div className="home-banner">
        <Slider {...settings}>

          {/* vedio-slide *}
          {(bannerData.bannerType === "video") && (
          <div className="slide-item">
            <div className="imagebox"></div>
            <div className={!isVisibil ? "videobox show" : "videobox"}>
              <iframe
                src="https://www.youtube.com/embed/UeewkNNxEPc?autoplay=1&disablekb=1&enablejsapi=1&loop=1&modestbranding=1&playsinline=1&color=white&muted=1"
                width="560"
                height="315"
                frameBorder="0"
                autoPlay
                allow="autoplay;"
              />
            </div>
            <input type="hidden" id="youtube_video_id" value="UeewkNNxEPc" />
            <input type="hidden" id="videoType" value="Youtube" />
            <div className="captionbox">
              <div className="container">
                <div className="captionText">
                  <h1>
                    Easy
                    <br /> online
                    <br /> booking
                  </h1>
                </div>
              </div>
            </div>
          </div>
          )}
          {/* vedio-slide */}

          {/* slide-item */}
          {(bannerData.bannerType === "slider" && bannerData.bannerSlider.length > 0) && bannerData.bannerSlider.map((item, i) => {
            if (item.slideText !== '' || (item.slideImage && item.slideImage.sourceUrl)) {
              return (
                <div key={i} className="slide-item">
                  <div className="imagebox" style={{ backgroundImage: `url(${item.slideImage.sourceUrl})` }}></div>
                  <div className="captionbox">
                    <div className="container">
                      <div className="captionText">
                        {
                          (item.slideText != null) && <h1 dangerouslySetInnerHTML={{ __html: item.slideText }}></h1>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
          {/* slide-item */}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
