import Slider from "react-slick";
import Image from "next/image";
import FeaturedImg1 from '../assets/image/featured-img-1.png'
import FeaturedImg2 from '../assets/image/featured-img-2.png'
import FeaturedImg3 from '../assets/image/featured-img-3.png'

import { formatMoney } from "@/helpers/cart_helper";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick} >
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1L8.5 8L1.5 15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 1L1.5 8L8.5 15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    </div>
  );
};



const FeaturedSlider = ({ packageTitle, packageSubTitle, selectPackages }) => {
  var settings = {
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    // infinite: true,
    infinite: !(selectPackages.length < 5),
    // speed: 400,
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  };

  return (
    <div className="featured-section">
      {(packageTitle != null) && <h5 dangerouslySetInnerHTML={{ __html: packageTitle }}></h5>}
      {(packageSubTitle != null) && <h2 className="h3" dangerouslySetInnerHTML={{ __html: packageSubTitle }}></h2>}
      <Slider {...settings} className="featured-slider">
        {
          selectPackages.map((item, i) => {
            return (
              <div key={i} className="featuredbox">
                <div className="image">
                  {/* <Image src={item.featuredImage.node.sourceUrl} width={363} height={460} alt="FeaturedImg" /> */}
                  <img src={item.featuredImage.node.sourceUrl} alt="FeaturedImg" />
                </div>
                <div className="info">
                  <h4>{item.title}</h4>
                  <p>Starts P{formatMoney(item.packageField.packagePrice)}</p>
                </div>
              </div>
            )
          })
        }
      </Slider>
    </div>
  );
};

export default FeaturedSlider;
