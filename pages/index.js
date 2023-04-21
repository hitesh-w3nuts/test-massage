import { Fragment, useEffect } from "react";
import { useState, useContext } from "react";
import { ApiContext } from "@/contexts/ApiContext";

import Banner from "@/components/layout/Banner";
import ServicesSec from "@/components/ServicesSec";
import FeaturedSlider from "@/components/FeaturedSlider";
import CustomerSlider from "@/components/CustomerSlider";
import MassageModal from "@/components/MassageModal";
import Head from "next/head";
import Link from "next/link";
export default function Home() {
  const { homePageDataApi, homeSelectedProductsApi } = useContext(ApiContext);
  const [homePageData, setHomePageData] = homePageDataApi;
  const [homeSelectedProducts, setHomeSelectedProducts] = homeSelectedProductsApi;
  const [sidebarProduct, setSidebarProduct] = useState(false);
  const [bannerData, setBannerData] = useState(null);
  useEffect(() => {
    if (homePageData !== null) {
      document.body.classList.add("loaded");
      setBannerData({
        bannerTitle: homePageData.bannerTitle,
        bannerType: homePageData.bannerType,
        bannerSlider: homePageData.bannerSlider,
        videoType: homePageData.videoType,
        vimeoUrl: homePageData.vimeoUrl,
        youtubeUrl: homePageData.youtubeUrl,
      })
      }
  }, [homePageData])

  return (
    <Fragment>
      <Head>
        <title>Massage MNL | #1 Specialized home service massage</title>
      </Head>
      {
        (bannerData != null ) && <Banner bannerData={bannerData} />
      }


      {/* desire-section */}
      <div className="desire-section">
        <div className="container">
          <div className="desire-content">
            {(homePageData != null && homePageData.treatmentDescription != null && homePageData.treatmentDescription != undefined) && <p dangerouslySetInnerHTML={{ __html: homePageData.treatmentDescription }}></p>}

            {(homePageData != null && homePageData.bookButton != null && homePageData.servicesLink != undefined) &&
              <div className="btngroup flxrow">

                {homePageData.bookButton != undefined && homePageData.bookButton.url != null}
                <div className="btnbox">
                  <Link href={homePageData.bookButton.url} target={homePageData.bookButton.target}>
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
                    {homePageData.bookButton.title}
                  </Link>
                </div>
                {homePageData.servicesLink != undefined && homePageData.servicesLink.url != null &&
                  <div className="btnbox outline">
                    <Link href={homePageData.servicesLink.url} target={homePageData.servicesLink.target} >{homePageData.servicesLink.title}</Link>
                  </div>
                }

              </div>
            }

          </div>
        </div>
      </div>
      {/* desire-section */}

      <ServicesSec products={homeSelectedProducts} setSidebarProduct={setSidebarProduct} />

      {(homePageData != null && homePageData.packageTitle != null && homePageData.packageTitle != undefined && homePageData.packageSubTitle != null && homePageData.packageSubTitle != undefined && homePageData.selectPackages != undefined) && <FeaturedSlider packageTitle={homePageData.packageTitle} packageSubTitle={homePageData.packageSubTitle} selectPackages={homePageData.selectPackages} />}

      {(homePageData != null && homePageData.testimonialTitle != null && homePageData.testimonialTitle != undefined && homePageData.testimonialSubTitle != null && homePageData.testimonialSubTitle != undefined && homePageData.selectTestimonial != undefined) && <CustomerSlider testimonialTitle={homePageData.testimonialTitle} testimonialSubTitle={homePageData.testimonialSubTitle} selectTestimonial={homePageData.selectTestimonial} setSidebarProduct={setSidebarProduct} />}
      <MassageModal product={sidebarProduct} />
    </Fragment>
  );
}
