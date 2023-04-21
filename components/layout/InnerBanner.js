import Image from "next/image"

import innerBannerImg from "assets/image/ArticalBoxImg4.png"

const InnerBanner = ({bannerImage}) => {
    return (
        <div className="banner_wapper">
            <div className="inner-banner">
                <div className="imagebox">
                    <Image src={bannerImage} width={1903} height={555} alt="innerBannerImg" />
                </div>
            </div>
        </div>
    )
}

export default InnerBanner;