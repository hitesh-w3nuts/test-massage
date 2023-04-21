import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const ArticalBox = ({ item, customClass }) => {
    const router = useRouter()
    const newsId = router.query.newsId;
    const cats = [];
    if(item !== undefined &&item.categories !== undefined){
        item.categories.nodes.map(cat => {
            cats.push(cat.slug)
        });
    }
    return (
        <div className={`${(customClass !== null && customClass != undefined)?customClass:'col-lg-3 col-md-4'} item-box ${cats.join(" ")}`}>
            {(item) && (
            <div className={`articalBox`}>
                {(item.featuredImage !== null && item.featuredImage.node.sourceUrl) && (
                    <div className="image"><Image src={item.featuredImage.node.sourceUrl} width={333} height={234} alt="aritcalImg" /></div>
                )}
                <div className="info">
                    <h5>{item.title}</h5>
                    <p>{item.excerpt.substr(0, 50).replaceAll("<p>", '')}</p>
                    <div className="btnmore">
                        <Link href={`./news/${item.uri}`} >READ MORE
                            <span><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1L8.5 8L1.5 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div >
            )}
        </div>
    )
}
export default ArticalBox;