import { Fragment, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import InnerBanner from "@/components/layout/InnerBanner";
import ArcticalDetails from "@/components/ArcticalDetails";
import RelatedArticle from "@/components/RelatedArticle";

import { blogDetailPage, relatedArticleQuery } from '@/helpers/api_gq_query_helper';
import { post } from "@/helpers/api_helper";
import { getFormattedDate } from "@/helpers/helper";


import { ApiContext } from "@/contexts/ApiContext";
const NewsDetails = () => {
    const router = useRouter()
    const {newsId} = router.query
    const {blogDetailsApi} = useContext(ApiContext);

    const [blogDetails, setBlogDetails] = blogDetailsApi;

    const [bannerImage, setBannerImage] = useState('');
    const [blog, setBlog] = useState(null);
    
    const [blogs, setBlogs] = useState([]);

    const [blogCats, setBlogCats] = useState(null);
    
    const getBlog = async () => {
        const blogDetailQuery = {
            ...blogDetailPage,
            ...{variables: {id: newsId}}
        }
        document.body.classList.remove("loaded");
        const pageData = await post('api/graphql', blogDetailQuery);
        document.body.classList.add("loaded");
        document.getElementById("header").classList.add("loaded");
        if (pageData.data !== undefined && pageData.data.post !== undefined) {
            const blog = pageData.data.post;
            if(blog.postField != undefined && blog.postField.bannerImage != undefined && blog.postField.bannerImage.sourceUrl != undefined && blog.postField.bannerImage.sourceUrl !== ''){
                setBannerImage(blog.postField.bannerImage.sourceUrl);
            }
            setBlog(blog);
            setBlogDetails((inputs) => ({ ...blogDetails, [newsId]: blog }));
            const catIds = [];
            if(blog.categories != undefined && blog.categories.nodes != undefined && blog.categories.nodes.length > 0){
                blog.categories.nodes.map(cat => {
                    catIds.push(cat.databaseId)
                });
                setBlogCats(catIds);
            }
        }
    }

    const getBlogs = async () => {
        const relatedArticlesQuery = {
            ...relatedArticleQuery,
            ...{variables: {categoryIn: blogCats}}
        }
        const pageData = await post('api/graphql', relatedArticlesQuery);
        if (pageData.data !== undefined && pageData.data.posts !== undefined && pageData.data.posts.nodes !== undefined) {
            setBlogs(pageData.data.posts.nodes);
        }
    }

    useEffect(() => {
        if (newsId !== undefined && blogDetails[newsId] == undefined && blogDetails[newsId] == null ) {
            getBlog();
        }else if(blogDetails[newsId] != undefined && blogDetails[newsId] != null){
            //setBlogDetails((blogs) => (...blogDetails, ))
            const blog = blogDetails[newsId];
            if(blog.postField != undefined && blog.postField.bannerImage != undefined && blog.postField.bannerImage.sourceUrl != undefined && blog.postField.bannerImage.sourceUrl !== ''){
                setBannerImage(blog.postField.bannerImage.sourceUrl);
            }
            setBlog(blog);
            setBlogDetails((inputs) => ({ ...blogDetails, [newsId]: blog }));
            const catIds = [];
            if(blog.categories != undefined && blog.categories.nodes != undefined && blog.categories.nodes.length > 0){
                blog.categories.nodes.map(cat => {
                    catIds.push(cat.databaseId)
                });
                setBlogCats(catIds);
            }
        }
    }, [newsId])

    useEffect(() => {
        if (blogCats !== null) {
            getBlogs();
        }
    }, [blogCats])
    return (
        <Fragment>
            <div className="inner_wapper">
                {(bannerImage !== '') && (<InnerBanner bannerImage={bannerImage} />)}
                {(blog !== null) && (<ArcticalDetails blog={blog} catIds={blogCats} />)}
                {(blogs !== null) && (<RelatedArticle blogs={blogs} />)}
            </div>
        </Fragment>
    )
}

export default NewsDetails;