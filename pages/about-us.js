import { Fragment } from "react"
import Head from "next/head";
import Image from "next/image"
import { useState, useEffect, useContext } from "react";

import BackBtn from "@/components/layout/BackBtn"
import StorySection from "@/components/StorySection"
import VisionSection from "@/components/VisionSection"
import PriceSection from "@/components/PriceSection"
import BookingBlock from "@/components/BookingBlock"
import ContactSec from "@/components/ContactSec"
import SectionSeparator from "@/components/layout/SectionSeparator";
import AboutImageSec from "@/components/AboutImageSec";
import KhozySec from "@/components/KhozySec";
import QnA from "@/components/QnA"

import AboutBannerImg from "assets/image/about-banner.png"
import TreeImg from "assets/image/treeImg.png"
import { ApiContext } from "@/contexts/ApiContext";
const AboutUs = () => {
    const {aboutPageApi} = useContext(ApiContext);
    const [helpPageData, setHelpPageData] = aboutPageApi;
    
    useEffect(() => {
        if (helpPageData !== null) {
            document.body.classList.add("loaded");
        }
    }, [helpPageData]);

    return (
        <div className="aboutpage-wrap">
            <Head>
                <title>AboutUs - Massage MNL</title>
            </Head>
            <div className="banner_wapper">
                <div className="inner-banner about-banner">
                    <div className="container">
                        <div className="row align-items-center">

                            <div className="col-lg-7">
                                <div className="banner_cap">
                                    {(helpPageData != null && helpPageData.bannerTitle != null && helpPageData.bannerTitle != undefined) && <h1 dangerouslySetInnerHTML={{ __html: helpPageData.bannerTitle }}></h1>
                                    }
                                    {(helpPageData != null && helpPageData.bannerDescription != null && helpPageData.bannerDescription != undefined) && <p dangerouslySetInnerHTML={{ __html: helpPageData.bannerDescription }}></p>
                                    }
                                    <div className="btngroup flxrow">
                                        <div className="btnbox">
                                            {(helpPageData != null && helpPageData.bannerButton1 != null && helpPageData.bannerButton1 != undefined) && <a href={helpPageData.bannerButton1.url} target={helpPageData.bannerButton1.target} ><i><svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.6207 21.8995C27.4703 21.652 26.5602 22.1861 25.7544 22.6526C24.9291 23.1333 23.3599 24.4063 22.4605 24.0805C17.8553 22.1843 13.524 18.1536 11.6491 13.5299C11.3186 12.6112 12.5857 11.032 13.0628 10.197C13.5258 9.38874 14.0489 8.47007 13.8103 7.31104C13.5947 6.26951 10.8062 2.72121 9.82009 1.75091C9.16978 1.10997 8.50357 0.757453 7.81969 0.70048C5.24849 0.590097 2.37689 4.02089 1.87325 4.84165C0.611514 6.59176 0.618582 8.9205 1.89446 11.7442C4.96929 19.3286 16.5988 30.7747 24.2117 33.9651C25.6166 34.6221 26.9013 34.9515 28.0552 34.9515C29.1844 34.9515 30.1899 34.6363 31.0541 34.0114C31.7061 33.6358 35.2775 30.6216 35.1839 27.9813C35.1273 27.3083 34.7757 26.6353 34.143 25.9837C33.1799 24.9884 29.6545 22.1167 28.6207 21.8995Z" fill="white"></path></svg></i>{helpPageData.bannerButton1.title}</a>
                                            }
                                        </div>
                                        {(helpPageData != null && helpPageData.bannerButton1 != null && helpPageData.bannerButton1 != undefined) &&
                                            <div className="btnbox white"><a href={helpPageData.bannerButton2.url} target={helpPageData.bannerButton2.target}>{helpPageData.bannerButton2.title}</a></div>
                                        }
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-5">
                                <div className="imagewrap">
                                    {(helpPageData != null && helpPageData.bannerImage != undefined) &&
                                        <div className="image"><Image src={helpPageData.bannerImage.sourceUrl} alt="AboutBannerImg" width={100} height={100} /></div>
                                    }
                                    <div className="tree-img"><Image src={TreeImg} alt="TreeImg" /></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* <BackBtn /> */}
            {(helpPageData != null && helpPageData.flexibleContent) && helpPageData.flexibleContent.map((item) => {
                if (item.fieldGroupName == "Page_Flexiblepagefield_FlexibleContent_StorySection") {
                    return (
                        <StorySection item={item} key={item.fieldGroupName} />
                    )
                }
                if (item.fieldGroupName == "Page_Flexiblepagefield_FlexibleContent_MissionSection") {
                    return (
                        <VisionSection item={item} key={item.fieldGroupName} />
                    )
                }
                if (item.fieldGroupName == "Page_Flexiblepagefield_FlexibleContent_ServicesSection") {
                    return (
                        <PriceSection item={item} key={item.fieldGroupName} />
                    )
                }
                if (item.fieldGroupName == "Page_Flexiblepagefield_FlexibleContent_BookingSection") {
                    return (
                        <BookingBlock item={item} key={item.fieldGroupName} />
                    )
                }
                if (item.fieldGroupName == "Page_Flexiblepagefield_FlexibleContent_ContactSection") {
                    return (
                        <ContactSec item={item} key={item.fieldGroupName} />
                    )
                }
                if (item.fieldGroupName == "Page_Flexiblepagefield_FlexibleContent_Separator") {
                    return (
                        <SectionSeparator />
                    )
                }
                if (item.fieldGroupName == "Page_Flexiblepagefield_FlexibleContent_FaqSection") {
                    return (
                        <QnA item={item} key={item.fieldGroupName} />
                    )
                }
                if (item.fieldGroupName == "Page_Flexiblepagefield_FlexibleContent_ImageSection") {
                    return (
                        <AboutImageSec image={item.image.sourceUrl} />
                    )
                }
                if (item.fieldGroupName == "Page_Flexiblepagefield_FlexibleContent_ImageRightSideContentSection") {
                    return (
                        <KhozySec item={item} />
                    )
                }
            })}
        </div>
    )
}
export default AboutUs;