import ArticalBox from "@/components/ArticalBox";
import { Fragment, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import FeaturedArticlesBox from "@/components/FeaturedArticlesBox";

import ArticalBoxImg5 from "../../assets/image/ArticalBoxImg4.png";

import { newsPageQuery, blogsQuery, blogCatsQuery } from '@/helpers/api_gq_query_helper';
import { post } from "@/helpers/api_helper";
import { getFormattedDate } from "@/helpers/helper";

import { ApiContext } from "@/contexts/ApiContext";
const News = () => {
  const {blogPageApi, blogsApi, categoriesApi} = useContext(ApiContext);
  const [categories, setCategories] = categoriesApi;
  const [blogs, setBlogs] = blogsApi;
  const [blogPageData, setBlogPageData] = blogPageApi;
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [allBlogsTitle, setAllBlogsTitle] = useState([]);
  const [featuredBlogsTitle, setFeaturedBlogsTitle] = useState([]);

  useEffect(() => {
    if (blogPageData !== null && blogPageData !== undefined) {
      const articlePageField = blogPageData;
      document.body.classList.add("loaded");
      if (articlePageField.allArticleTitle != undefined && articlePageField.allArticleTitle !== '') {
        setAllBlogsTitle(articlePageField.allArticleTitle);
      }
      if (articlePageField.featuredArticles != undefined && articlePageField.featuredArticles !== '') {
        setFeaturedBlogs(articlePageField.featuredArticles);
      }
      if (articlePageField.featuredTitle != undefined && articlePageField.featuredTitle !== '') {
        setFeaturedBlogsTitle(articlePageField.featuredTitle);
      }
    }
  },[blogPageData])

  const changeDisplayPost = (target, slug) => {
    let list = document.getElementsByClassName('item-box');
    let listNav = document.querySelectorAll('ul#filters span');
    for (let i = 0; i < listNav.length; ++i) {
      listNav[i].classList.remove('active');
    }
    target.classList.add("active");

    for (let i = 0; i < list.length; ++i) {
      list[i].classList.add('hide');
    }
    list = document.getElementsByClassName(slug);
    for (let i = 0; i < list.length; ++i) {
      list[i].classList.add('active');
      list[i].classList.remove('hide');
    }
  }

  return (
    <Fragment>
      <Head>
        <title>News - Massage MNL</title>
      </Head>
      <div className="inner_wapper">

        <div className="artical-section">
          <div className="container">
            <div className="title">
              <h3>{allBlogsTitle}</h3>
            </div>
            {(categories && categories.length > 0) && (
              <div className="filter-artical">
                <ul id="filters">
                  <li><span className="filter active" onClick={(e) => changeDisplayPost(e.target, 'item-box')}>All</span></li>
                  {Object.entries(categories).map(([id, item]) => {
                    return (<li><span className="filter" onClick={(e) => changeDisplayPost(e.target, item.slug)}>{item.name}</span></li>
                    )
                  })}
                </ul>
              </div>
            )}
            <div className="articallist">
              <div className="row">
                {blogs.map(artibox => (
                  <ArticalBox item={artibox} />
                ))}
              </div>
            </div>

          </div>
        </div>
        {(featuredBlogs.length > 0) && (
          <div className="artical-top-section">
            <div className="container">
              <div className="page-title">
                <h1 className="h3">{featuredBlogsTitle}</h1>
              </div>
              <div className="artical-top-row">
                <div className="row">
                  <div className="col-lg-6">
                    {Object.entries(featuredBlogs).map(([id, item]) => {
                      return (
                        <>
                          {(id == 0) && (
                            <div className="articalbox">
                              {(item.featuredImage.node.sourceUrl) && (
                                <div className="images">
                                  {<Image src={item.featuredImage.node.sourceUrl} width={691} height={438} alt="ArticalBoxImg" />}
                                </div>
                              )}
                              <div className="acrtical-info">
                                <h6>{getFormattedDate(item.date)}</h6>
                                <h4><Link href={`./news/${item.uri}`}>{item.title}</Link></h4>
                                <p>{item.excerpt.substr(0, 135).replaceAll("<p>", '')}</p>
                              </div>
                            </div>
                          )}

                        </>
                      )

                    })}

                  </div>
                  <div className="col-lg-6">
                    <div className="artical-row">
                      {Object.entries(featuredBlogs).map(([id, item]) => {
                        return (
                          <>
                            {(id != 0) && (<FeaturedArticlesBox item={item} />)}
                          </>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default News;
