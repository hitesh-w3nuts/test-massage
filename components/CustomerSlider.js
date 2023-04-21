import Image from "next/image";
import Slider from "react-slick";

import loginAvtarIcon from "../assets/image/icons8-female.png";

import slideImg1 from '../assets/image/customner-img-1.png'
import slideImg2 from '../assets/image/customner-img-2.png'
import { useContext } from "react";
import { ApiContext } from "@/contexts/ApiContext";

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

const CustomerSlider = ({ testimonialTitle, testimonialSubTitle, selectTestimonial, setSidebarProduct }) => {

  const { servicesApi } = useContext(ApiContext);
  const [services, setServices] = servicesApi;

  const getProductByID = (productID) => {
    if (services) {
      for (let index = 0; index < services.length; index++) {
        const element = services[index];
        if (element.products) {
          const products = element.products;
          for (let productInx = 0; productInx < products.length; productInx++) {
            const product = products[productInx];
            if (product.id === productID) {
              return product;
            }
          }
        }
      }
    }
  }

  const ModalHandler = (e, product) => {
    e.preventDefault();
    document.body.classList.toggle("open-modal");
    setSidebarProduct(product);
  };

  var settings = {
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    // infinite: true,
    infinite: !(selectTestimonial.length < 5) ,
    speed: 400,
    slidesToShow: 4,
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
    <div className="customer-section">
      <div className="customer-wrapper">
        {(testimonialTitle != null) && <h5 dangerouslySetInnerHTML={{ __html: testimonialTitle }}></h5>}
        {(testimonialSubTitle != null) && <h2 className="h3" dangerouslySetInnerHTML={{ __html: testimonialSubTitle }}></h2>}
        <Slider {...settings} className="customer-slider">
          {selectTestimonial.map((cuslider => (
            <div className="customerbox" key={cuslider.id}>
              {(cuslider.featuredImage.node.sourceUrl != null && cuslider.featuredImage.node.sourceUrl != undefined) &&
                <div className="image">
                  {/* <Image src={cuslider.featuredImage.node.sourceUrl} width={348} height={346} alt="slideImg1" /> */}
                  <img src={cuslider.featuredImage.node.sourceUrl} alt={`FeaturedImg-${cuslider.id}`} />
                </div>
              }
              <div className="info">
                <div className="review-rate flxrow">
                  <div className="icon-name flxrow">
                    <div className="icon">
                      <Image src={loginAvtarIcon} alt="loginAvtarIcon" />
                    </div>
                    {(cuslider.title != null && cuslider.title != undefined) &&
                      <p dangerouslySetInnerHTML={{ __html: cuslider.title }}></p>
                    }
                  </div>
                  {(cuslider.testimonialField && cuslider.testimonialField.rating) && (
                    <ul>
                      {Array.from({ length: cuslider.testimonialField.rating }, (_, index) => {
                        return (
                          <li key={index}>
                            <a href="#">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 7.45694V7.23038C0 4.49991 1.97344 2.171 4.66406 1.72257C6.41016 1.42608 8.25781 2.00655 9.53125 3.28194L10 3.74991L10.4336 3.28194C11.7422 2.00655 13.5547 1.42608 15.3359 1.72257C18.0273 2.171 20 4.49991 20 7.23038V7.45694C20 9.07803 19.3281 10.6288 18.1406 11.7343L11.082 18.3241C10.7891 18.5976 10.4023 18.7499 10 18.7499C9.59766 18.7499 9.21094 18.5976 8.91797 18.3241L1.85898 11.7343C0.673047 10.6288 1.17188e-05 9.07803 1.17188e-05 7.45694H0Z"
                                  fill="#8C8C8C"
                                ></path>
                              </svg>
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
                {(cuslider.content != null && cuslider.content != undefined) &&
                  <h5 dangerouslySetInnerHTML={{ __html: cuslider.content }}></h5>
                }
                {(cuslider.testimonialField && cuslider.testimonialField.product && cuslider.testimonialField.product.productId) && (
                  <div className="book-now-link">
                    <a
                      href="#" onClick={(e) => {ModalHandler(e, getProductByID(cuslider.testimonialField.product.productId))}}
                      tabIndex="0" >
                      BOOK THIS MASSAGE!
                    </a>
                  </div>
                )}

              </div>
            </div>
          )))}
        </Slider>
      </div>
    </div>
  );
};
export default CustomerSlider;
