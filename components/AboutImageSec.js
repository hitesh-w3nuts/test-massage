import Image from "next/image";

import BeautySpaImg from "../assets/image/beauty-spa-book.png";

const AboutImageSec = ({image}) => {
    return (
        <div className="about-image-section">
            <div className="container">
                <div className="image">
                   <Image src={image} width={1406} height={677} alt="img" /> 
                </div>
            </div>
        </div>
    )
}
export default AboutImageSec;