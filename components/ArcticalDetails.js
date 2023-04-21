import Image from "next/image";

import avtarIcon from "assets/image/avtarpic.png"
import HeartIcon from "assets/image/hearticon.svg"
import ShareIcon from "assets/image/share.svg"
import { useEffect, useState } from "react";
import { post } from "@/helpers/api_helper";

const ArcticalDetails = ({ blog }) => {
    const [likes, setLikes] = useState(0);
    const [postID, setPostID] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const like_post = async(e) => {
        e.preventDefault();
        if(!disabled){
            setDisabled(true);
            const result = await post('wp-json/next-api/like-post', {
                postID: postID
            });
            setLikes(result.likes);
        }
    }
    
    useEffect(() => {
        if(blog.postField != undefined && blog.postField.likes != undefined && blog.postField.likes != ''){
            setLikes(blog.postField.likes);
            setPostID(blog.databaseId);
        }
    }, [blog])

    return (
        <div className="arctical-single">
            <div className="container">
                <div className="single-content">
                    <div className="row">
                        <div className="offset-lg-2 col-lg-10">
                            <h1>{blog.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="authorbox">
                                <div className="avtar"><Image src={blog.author.node.avatar.url} width={450} height={450} alt="avtarIcon" /></div>
                                <small>Written By</small>
                                <p>{`${blog.author.node.firstName} ${blog.author.node.lastName} `}</p>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="content-default" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-lg-2 col-lg-10">
                            <div className="artical-share flxrow">
                                <div className="articalLove flxrow">
                                    <a href="#" onClick={like_post}>
                                        <i>
                                            <Image src={HeartIcon} alt="Heart" />
                                            <span id="total_like">{likes}</span>
                                        </i>
                                        <div className="likeText">
                                            <p>Love this article</p>
                                            <div className="like-count"> Likes till now.</div>
                                        </div>
                                    </a>
                                </div>

                                <div className="articalShare flxrow">
                                    <i><Image src={ShareIcon} alt="share" /></i>Let's share!
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArcticalDetails;