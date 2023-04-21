import Image from "next/image";

import KhozyImg from  "../assets/image/banner-min.png";
import AnnouncementIcon from  "../assets/image/announcement.svg";
import PinkHeartIcon from  "../assets/image/pink-heart.svg";
import StarsIcon from  "../assets/image/stars.svg";


const KhozySec = ({item}) => {
    return (
        <div className="khozy-section">
            <div className="container">
                <div className="khozy-row">
                    <div className="row g-0 align-items-center">
                        <div className="col-lg-5">
                            <div className="imagebox">
                                {(item.image !== undefined && item.image.sourceUrl !== undefined) && (
                                    <div className="image">
                                        <Image src={item.image.sourceUrl} width={550} height={661} alt="KhozyImg" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="khozy-content-outer">
                                <div className="khozy-content" dangerouslySetInnerHTML={{__html: item.content}}></div>
                                {(item.bottomText && item.bottomText !== '') && (<div className="khozy-text">Khozy Package Test</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default KhozySec;