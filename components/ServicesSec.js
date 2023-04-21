import Image from "next/image";

import SpecializedIcon from "../assets/image/Specialized-w.svg";
import PressureIcon from "../assets/image/pressure-w.svg";
import OilBottleIcon from "../assets/image/oil-bottle-w.svg";
import ServicesImg from "../assets/image/service-img-1.png"
import ServicesImg2 from "../assets/image/service-img-2.png"

const Services = ({ products, setSidebarProduct }) => {

  const ModalHandler = (e, product) => {
    e.preventDefault();
    document.body.classList.toggle("open-modal");
    setSidebarProduct(product);
  };
  return (
    <div className="service-section">
      <div className="row">
        {/* servicebox */}
        {(products != undefined) && products.map((product, i) => {
          let content = product.content;
          let showLearnMore = false;
          if (content.length > 250) {
            content = content.substring(0, 247) + ' <a href="#">Learn more...</a>'
            showLearnMore = true;
          }
          return (
            <div className="col-md-12 col-lg-6 col-xl-3 col-xxl-3" key={i} >
              <div className="servicebox">
                <div className="image">
                  {/* <Image src={product.image} width={456} height={770} alt="servicebox" /> */}
                  <img src={product.image} alt="serviceBox" />
                </div>
                <div className="info">
                  <div className="info-inner">
                    <h2>{product.title}</h2>
                    <div className="discrip">
                      <div className="Icon-row flxrow">
                        {product.serviceType.map((item, i) => (
                          <div className="Icon-item flxrow">
                            <i>
                              <Image src={item.ser_icon} width={22} height={24} alt="ser-image" />
                            </i>
                            <span dangerouslySetInnerHTML={{ __html: item.ser_name }}></span>
                          </div>
                        ))}
                      </div>
                      <p onClick={(e) => ModalHandler(e, product)} dangerouslySetInnerHTML={{ __html: content }}></p>
                    </div>
                  </div>
                  <div className="btnbox">
                    <a
                      href="#"
                      className="open_sidebar" onClick={(e) => ModalHandler(e, product)}
                      data-id="132"
                    >
                      <i>
                        <svg
                          width="36"
                          height="35"
                          viewBox="0 0 36 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M28.6207 21.8995C27.4703 21.652 26.5602 22.1861 25.7544 22.6526C24.9291 23.1333 23.3599 24.4063 22.4605 24.0805C17.8553 22.1843 13.524 18.1536 11.6491 13.5299C11.3186 12.6112 12.5857 11.032 13.0628 10.197C13.5258 9.38874 14.0489 8.47007 13.8103 7.31104C13.5947 6.26951 10.8062 2.72121 9.82009 1.75091C9.16978 1.10997 8.50357 0.757453 7.81969 0.70048C5.24849 0.590097 2.37689 4.02089 1.87325 4.84165C0.611514 6.59176 0.618582 8.9205 1.89446 11.7442C4.96929 19.3286 16.5988 30.7747 24.2117 33.9651C25.6166 34.6221 26.9013 34.9515 28.0552 34.9515C29.1844 34.9515 30.1899 34.6363 31.0541 34.0114C31.7061 33.6358 35.2775 30.6216 35.1839 27.9813C35.1273 27.3083 34.7757 26.6353 34.143 25.9837C33.1799 24.9884 29.6545 22.1167 28.6207 21.8995Z"
                            fill="white"
                          ></path>
                        </svg>
                      </i>
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {/* servicebox */}
      </div>
    </div>
  );
};

export default Services;
