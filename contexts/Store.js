import React, { useState, useEffect } from 'react'
import { ApiContext } from '@/contexts/ApiContext'

import { aboutusPageQuery, blogCatsQuery, blogsQuery, homePageQuery, newsPageQuery } from '@/helpers/api_gq_query_helper';

import { GET_SERVICES, } from "@/helpers/url_helper"
import { get, post } from "@/helpers/api_helper";


function Store({ children }) {
    let servicesCall = false, homePageDataCall = false, homeSelectedProductsCall = false, aboutPageCall = false, packagePageCall = false, helpPageCall = false, blogCatCall =false, blogsCall = false, blogPageCall = false;   


    const [services, setServices] = useState([])
    const [homePageData, setHomePageData] = useState(null);
    const [homeSelectedProducts, setHomeSelectedProducts] = useState([]);
    const [aboutPageData, setAboutPageData] = useState(null);
    const [packagePageData, setPackagePageData] = useState(null);
    const [helpPageData, setHelpPageData] = useState(null);

    const [categories, setCategories] = useState(null);
    const [blogPage, setBlogPage] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [blogDetails, setBlogDetails] = useState({});
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});

    // get home page data Start
    const getHomePageData = async () => {
        homePageDataCall = true;
        const res = await post('api/graphql', homePageQuery);
        if (res.data != undefined && res.data != null && res.data.page != undefined && res.data.page != null && res.data.page.homePageField != undefined && res.data.page.homePageField != null) {
            setHomePageData(res.data.page.homePageField);
        }
    }

    const getSelectedProducts = async () => {
        homeSelectedProductsCall = true;
        const res = await get('wp-json/next-api/homepage-selected-products');
        if (res.result && res.product.length) {
            setHomeSelectedProducts(res.product);
        }
    }
    // get home page data End

    // get services
    const getServicePageData = async () => {
        servicesCall = true;
        const servicesData = await get(GET_SERVICES);
        if (servicesData.result) {
            setServices(servicesData.services);
        }
    }

    // get about us data start
    const getAboutData = async () => {
        aboutPageCall = true;
        const aboutusQuery = {
            ...aboutusPageQuery,
            ...{ variables: { id: "about-us" } }
        }
        const res = await post('api/graphql', aboutusQuery);
        if (res.data != undefined && res.data != null && res.data.page != null && res.data.page != undefined && res.data.page.flexiblePageField != null && res.data.page.flexiblePageField != undefined) {
            setAboutPageData(res.data.page.flexiblePageField);
        }
    }
    // get about us data end

    // get package data start
    const getPackagesData = async () => {
        packagePageCall = true;
        const aboutusQuery = {
            ...aboutusPageQuery,
            ...{ variables: { id: "packages" } }
        }
        const res = await post('api/graphql', aboutusQuery);
        if (res.data != undefined && res.data != null && res.data.page != null && res.data.page != undefined && res.data.page.flexiblePageField != null && res.data.page.flexiblePageField != undefined) {
            setPackagePageData(res.data.page.flexiblePageField);
        }
    }
    // get package data end

    // get help data start
    const getHelpData = async () => {
        packagePageCall = true;
        const aboutusQuery = {
            ...aboutusPageQuery,
            ...{ variables: { id: "help" } }
        }
        const res = await post('api/graphql', aboutusQuery);
        if (res.data != undefined && res.data != null && res.data.page != null && res.data.page != undefined && res.data.page.flexiblePageField != null && res.data.page.flexiblePageField != undefined) {
            setHelpPageData(res.data.page.flexiblePageField);
        }
    }
    // get help data end

    // get new page data start
    const getNewsPageData = async () => {
        blogPageCall = true;
        const pageData = await post('api/graphql', newsPageQuery);
        if (pageData.data != undefined && pageData.data.page != undefined && pageData.data.page.template != undefined && pageData.data.page.template.articlePageField != undefined) {
            const articlePageField = pageData.data.page.template.articlePageField;
            setBlogPage(articlePageField);
        }
    }

    const getBlogs = async () => {
        blogsCall = true;
        const pageData = await post('api/graphql', blogsQuery);
        if (pageData.data !== undefined && pageData.data.posts !== undefined && pageData.data.posts.nodes !== undefined) {
            setBlogs(pageData.data.posts.nodes);
        }
    }

    const getCats = async () => {
        blogCatCall = true;
        const pageData = await post('api/graphql', blogCatsQuery);
        if (pageData.data !== undefined && pageData.data.categories !== undefined && pageData.data.categories.nodes !== undefined) {
            setCategories(pageData.data.categories.nodes);
        }
    }
    // get new page data end

    useEffect(() => {
        if (!servicesCall) {
            getServicePageData();
        }
    }, [])

    useEffect(() => {
        if (!homePageDataCall) {
            getHomePageData();
        }
    }, [])

    useEffect(() => {
        if (!homeSelectedProductsCall) {
            getSelectedProducts();
        }
    }, [])

    useEffect(() => {
        if (!aboutPageCall) {
            getAboutData();
        }
    }, [])

    useEffect(() => {
        if (!packagePageCall) {
            getPackagesData();
        }
    }, [])

    useEffect(() => {
        if (!helpPageCall) {
            getHelpData();
        }
    }, [])

    useEffect(() => {
        if (!blogPageCall) {
            getNewsPageData();
        }
    }, [])

    useEffect(() => {
        if (!blogsCall) {
            getBlogs();
        }
    }, [])

    useEffect(() => {
        if (!blogCatCall) {
            getCats();
        }
    }, [])

    const data = {
        homePageDataApi: [homePageData, setHomePageData],
        homeSelectedProductsApi: [homeSelectedProducts, setHomeSelectedProducts],
        servicesApi: [services, setServices],
        aboutPageApi: [aboutPageData, setAboutPageData],
        packagePageApi: [packagePageData, setPackagePageData],
        helpPageApi: [helpPageData, setHelpPageData],
        blogPageApi: [blogPage, setBlogPage],
        blogsApi: [blogs, setBlogs],
        categoriesApi: [categories, setCategories],
        blogDetailsApi:[blogDetails, setBlogDetails],
        ordersApi: [orders, setOrders],
        orderDetailsApi: [orderDetails, setOrderDetails]
    }

    return (
        <ApiContext.Provider value={
            data
        }>
            {children}
        </ApiContext.Provider>
    )
}
export default Store