const homePageQuery = {
  query: `query NewQuery {
    page(id: "/", idType: URI) {
      homePageField {
        bannerTitle
        bannerType
        bannerSlider {
          slideText
          slideImage {
            sourceUrl
            title
          }
        }
        fieldGroupName
        packageSubTitle
        packageTitle
        testimonialSubTitle
        testimonialTitle
        treatmentDescription
        videoType
        vimeoUrl
        youtubeUrl
        packageSubTitle
        packageTitle
        selectTestimonial {
          ... on Testimonial {
            id
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            content
            testimonialField {
              rating
              product {
                ... on VariableProduct {
                  productId
                }
              }
            }
          }
        }
        bookButton {
          target
          title
          url
        }
        servicesLink {
          target
          title
          url
        }
        selectPackages {
          ... on Package {
            id
            title
            packageField {
              packagePrice
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      content
    }
  }`
}

const headerQuery = {
  query: `query NewQuery {
    themeHeaderSettings {
      headerSettings {
        headerLogo {
          sourceUrl
        }
      }
    }
    menuItems {
      nodes {
        label
        uri
        id
      }
    }
  }`
}

const footerQuery = {
  query: `query NewQuery {
    page(id: "/", idType: URI) {
      id
    }
    themeFooterSettings {
      footerSettings {
        adreess
        contactEmail
        contactNumber
        contactText
        copyrightText
        facebookLink
        fieldGroupName
        findText
        formTitle
        instagramLink
        tiktokLink
        visitText
        youtubeLink
        footerLogo {
          sourceUrl
        }
      }
    }
  }`
}

const aboutusPageQuery = {
  query: `query NewQuery($id: ID = "") {
    page(id: $id, idType: URI) {
      flexiblePageField {
        bannerImage {
          sourceUrl
        }
        bannerTitle
        bannerDescription
        bannerButton1 {
          target
          title
          url
        }
        bannerButton2 {
          target
          title
          url
        }
        flexibleContent {
          ... on Page_Flexiblepagefield_FlexibleContent_MissionSection {
            fieldGroupName
            missionContent
            missionVisionTitle
            missionImage {
              sourceUrl
            }
          }
          ... on Page_Flexiblepagefield_FlexibleContent_ServicesSection {
            fieldGroupName
            preFirstColumnTitle
            preFourthColumnTitle
            preSecondColumnTitle
            preThirdColumnTitle
            premiumServiceTableTitle
            premiumServices {
              fieldGroupName
              firstColumnContent
              fourthColumnContent
              secondColumnContent
              thirdColumnContent
            }
            premiumServicesTableColumn
            serviceMainTitle
            speFirstColumnTitle
            speFourthColumnTitle
            speSecondColumnTitle
            speThirdColumnTitle
            specializeServiceTableTitle
            specializeServices {
              fieldGroupName
              firstColumnContent
              fourthColumnContent
              secondColumnContent
              thirdColumnContent
            }
            specializeServicesTableColumn
          }
          ... on Page_Flexiblepagefield_FlexibleContent_Separator {
            fieldGroupName
          }
          ... on Page_Flexiblepagefield_FlexibleContent_ImageLeftSideContentSection {
            bottomText
            content
            fieldGroupName
            image {
              sourceUrl
            }
          }
          ... on Page_Flexiblepagefield_FlexibleContent_ImageRightSideContentSection {
            bottomText
            content
            fieldGroupName
            image {
              sourceUrl
            }
          }
          ... on Page_Flexiblepagefield_FlexibleContent_ImageSection {
            fieldGroupName
            image {
              sourceUrl
            }
          }
          ... on Page_Flexiblepagefield_FlexibleContent_FaqSection {
            faqTitle
            fieldGroupName
            faq {
              question
              answer
            }
          }
          ... on Page_Flexiblepagefield_FlexibleContent_ContactSection {
            formShortcodeId
            contactTitle
            fieldGroupName
            contactImage {
              sourceUrl
            }
          }
          ... on Page_Flexiblepagefield_FlexibleContent_BookingSection {
            bookingDescription
            bookingTitle
            fieldGroupName
            bookingImage {
              sourceUrl
            }
            bookingButton {
              url
              title
              target
            }
          }
          ... on Page_Flexiblepagefield_FlexibleContent_StorySection {
            fieldGroupName
            storyDescription
            storyTitle
            storyRightContent
            storyLeftContent
          }
        }
      }
    }
  }`
}

const servicePageQuery = {
  query: `query NewQuery($id: ID = "services") {
    page(idType: URI, id: $id) {
      template {
        ... on Template_MassagePage {
          templateName
          servicesPageOptions {
            selectCategory {
              products {
                nodes {
                  ... on VariableProduct {
                    id
                    name
                    variations {
                      nodes {
                        databaseId
                        name
                        price
                        regularPrice
                        attributes {
                          nodes {
                            name
                            label
                            value
                          }
                        }
                      }
                    }
                    productField {
                      serviceType {
                        serName
                        serIcon {
                          mediaItemUrl
                          title
                        }
                        serIblackIcon {
                          mediaItemUrl
                          title
                        }
                      }
                    }
                  }
                  shortDescription(format: RAW)
                  content
                  databaseId
                  featuredImage {
                    node {
                      title
                      sourceUrl
                    }
                  }
                }
              }
              description
              name
            }
          }
        }
      }
    }
  }`
}


const locationsQuery = {
  query: `query locations {
    locations(where: {parent: 0}) {
      nodes {
        name
        children {
          nodes {
            name
            parentDatabaseId
            databaseId
          }
        }
        databaseId
      }
    }
  }`
}

const subLocationsQuery = {
  query: `query subLocations($parent: Int = null) {
    locations(where: {parent: $parent}) {
      nodes {
        name
        databaseId
        locationSettings {
          locationMinimumHours
        }
      }
    }
  }`
}

const newsPageQuery = {
  query: `query NewQuery {
    page(id: "news", idType: URI) {
      template {
        ... on Template_ArticlePage {
          templateName
          articlePageField {
            featuredTitle
            allArticleTitle
            featuredArticles {
              ... on Post {
                id
                title
                excerpt
                uri
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                date
              }
            }
          }
        }
      }
    }
  }`
}

const blogsQuery = {
  query: `query NewQuery {
    posts(first: 999) {
      nodes {
        uri
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        excerpt
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }`
}

const blogCatsQuery = {
  query: `query NewQuery {
    categories {
      nodes {
        slug
        name
      }
    }
  }`
}


const blogDetailPage = {
  query: `query NewQuery($id: ID = "") {
    post(id: $id, idType: URI) {
      databaseId
      author {
        node {
          firstName
          lastName
          avatar {
            url
          }
        }
      }
      postField {
        bannerImage {
          sourceUrl
        }
        likes
      }
      categories {
        nodes {
          databaseId
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      title
      content(format: RENDERED)
    }
  }`
}

const relatedArticleQuery = {
  query: `query NewQuery($categoryIn: [ID] = "") {
    posts(where: {categoryIn: $categoryIn}, first: 3) {
      nodes {
        uri
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }`
}

export {
  homePageQuery,
  servicePageQuery,
  locationsQuery,
  subLocationsQuery,
  footerQuery,
  headerQuery,
  aboutusPageQuery,
  newsPageQuery,
  blogsQuery,
  blogCatsQuery,
  blogDetailPage,
  relatedArticleQuery
}