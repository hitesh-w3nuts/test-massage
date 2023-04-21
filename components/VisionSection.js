import Image from "next/image";

import Treeimg from '../assets/image/plant-tree-1.png';
import VisionImg from '../assets/image/vision-main-img.jpg'

const VisionSection = ({item}) => {
    return(
        <div className="vision-section">
            {(item != null && item.missionVisionTitle != undefined) && 
                <div className="bg-text"><h2 dangerouslySetInnerHTML={{ __html : item.missionVisionTitle }}></h2></div>
            }
            <div className="container">
                <div className="vision-content">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="imagewrap">
                            
                            {(item != null && item.missionImage != undefined) && 
                                <div className="image">
                                    <Image src={item.missionImage.sourceUrl} alt="VisionImg" width={1522} height={2560} />
                                </div>
                            }
                            
                                <div className="tree-img">
                                    <Image src={Treeimg} alt="Treeimg" />
                                </div>
                            </div>
                        </div>
                        {(item != null && item.missionContent != undefined) && 
                            <div className="col-lg-6">
                                <div className="vision-text" dangerouslySetInnerHTML={{ __html : item.missionContent }} ></div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
export default VisionSection;