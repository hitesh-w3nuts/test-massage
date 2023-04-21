import { Fragment, useContext } from "react";
import Image from "next/image"
import Head from "next/head";
import { useState, useEffect } from "react";
import { post } from "@/helpers/api_helper";
import { aboutusPageQuery } from "@/helpers/api_gq_query_helper";

import BackBtn from "@/components/layout/BackBtn";
import StorySection from "@/components/StorySection"
import VisionSection from "@/components/VisionSection"
import PriceSection from "@/components/PriceSection"
import BookingBlock from "@/components/BookingBlock"
import ContactSec from "@/components/ContactSec"
import SectionSeparator from "@/components/layout/SectionSeparator";
import AboutImageSec from "@/components/AboutImageSec";
import KhozySec from "@/components/KhozySec";
import QnA from "@/components/QnA"

import TreeImg from "assets/image/treeImg.png"
import { ApiContext } from "@/contexts/ApiContext";
const Packages = () => {
    const {helpPageApi} = useContext(ApiContext);
    const [helpPageData, setAboutPageData] = helpPageApi;
    
    useEffect(() => {
        if (helpPageData !== null) {
            document.body.classList.add("loaded");
        }
    }, [helpPageData]);
    return (
        <Fragment>
            <Head>
                <title>Packages - Massage MNL</title>
            </Head>
            <div className="inner_wapper">
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
        </Fragment>
    )
} 

export default Packages;