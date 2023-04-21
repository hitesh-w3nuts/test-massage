import Link from "next/link";
import Image from "next/image";

import SpecializedIcon from "../assets/image/Specialized-w.svg";
import PressureIcon from "../assets/image/pressure-w.svg";
import OilBottleIcon from "../assets/image/oil-bottle-w.svg";

const MassageBox = ({ product, setSidebarProduct }) => {
    const ModalHandler = (e) => {
        e.preventDefault();
        document.body.classList.toggle('open-modal');
        setSidebarProduct(product);
    }
    return (
        <div className="massagebox">
            <div className="image">
                {/* <Image
                    src={product.image}
                    // width={360}
                    // height={387}
                    resizeMode={'cover'}
                    style={{ width: '100%', height: 387 }}
                    source={{ uri: product.image }}
                    alt="massageImg" /> */}
                <img alt="houses" src={product.image} />
                <div className="info">
                    <h5 dangerouslySetInnerHTML={{ __html: product.title }}></h5>
                    <div className="Icon-row flxrow">
                        {
                            product.serviceType.map((item, i) => (
                                <div key={i} className="Icon-item flxrow">
                                    <i><Image src={item.ser_iblack_icon} width={22} height={24} alt="ser-image" /></i>
                                    <span dangerouslySetInnerHTML={{ __html: item.ser_name }}></span>
                                </div>
                            ))
                        }

                    </div>
                    <p>{product.shortContent}</p>
                    <div className="btnbox">
                        <Link href="#" onClick={ModalHandler} className="open_sidebar">BOOK NOW</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MassageBox;