import Image from "next/image";

import ArticalBox from "./ArticalBox";

const RelatedArticle = ({blogs}) => {
    return(
        <div className="artical-section">
            <div className="container">
                <div className="title"><h3>Related Article</h3></div>
                <div className="row">
                {(blogs) && blogs.map(item => (
                  <ArticalBox item={item} customClass={'col-lg-4 col-md-4 articals category-a category-f'}/>
                ))}
                </div>
            </div>
        </div>
    )
}
export default RelatedArticle;