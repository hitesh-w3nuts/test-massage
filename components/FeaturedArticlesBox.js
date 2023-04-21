import Image from "next/image";
import Link from "next/link";
import { getFormattedDate } from "@/helpers/helper";
const FeaturedArticlesBox = ({ item }) => {
    return (
        <div className="artical-item flxrow">
            {(item.featuredImage !== null && item.featuredImage.node.sourceUrl) && (
                <div className="images">
                    {<Image src={item.featuredImage.node.sourceUrl} width={259} height={131} alt="ArticalBoxImg" />}
                </div>
            )}
            <div className="acrtical-info">
                <h6>{getFormattedDate(item.date)}</h6>
                <h5>{item.title}</h5>
                <div className="btnmore"><Link href={`./news/${item.uri}`}>READ MORE<span><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1L8.5 8L1.5 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span></Link></div>
            </div>
        </div>
    )
}
export default FeaturedArticlesBox;