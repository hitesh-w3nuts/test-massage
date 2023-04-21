const PriceSection = ({item}) => {
    return (
        <div className="price-section">
            <div className="container">
                {(item != null && item.serviceMainTitle != undefined) &&
                <div className="section-title text-center">
                    <h2 dangerouslySetInnerHTML={{ __html: item.serviceMainTitle }}></h2>
                </div>
                }

                <div className="row">
                    <div className="col-lg-6">
                        <div className="pricebox premium">
                        {(item != null && item.premiumServiceTableTitle != undefined) &&
                            <h4 dangerouslySetInnerHTML={{ __html: item.premiumServiceTableTitle }} ></h4>
                        }

                            <div className="price-table">
                                <div className="price-head">
                                {(item != null && item.preFirstColumnTitle != undefined) &&
                                    <div className="price-item">{item.preFirstColumnTitle}</div>
                                }
                                {(item != null && item.preSecondColumnTitle != undefined) &&
                                    <div className="price-item">{item.preSecondColumnTitle}</div>
                                }
                                {(item != null && item.preThirdColumnTitle != undefined) &&
                                    <div className="price-item">{item.preThirdColumnTitle}</div>
                                }
                                {(item != null && item.preFourthColumnTitle != undefined) &&
                                    <div className="price-item">{item.preFourthColumnTitle}</div>
                                }
                                </div>
                                {(item != null &&  item.premiumServices != undefined )  && item.premiumServices.map((priceConts) => {
                                    return (

                                    <div className="price-row">
                                    {(priceConts != null && priceConts.firstColumnContent != undefined) &&    
                                        <div className="price-item">{priceConts.firstColumnContent}</div>
                                    }
                                    {(priceConts != null && priceConts.secondColumnContent != undefined) &&    
                                        <div className="price-item">{priceConts.secondColumnContent}</div>
                                    }
                                    {(priceConts != null && priceConts.thirdColumnContent != undefined) &&    
                                        <div className="price-item">{priceConts.thirdColumnContent}</div>
                                    }
                                    {(priceConts != null && priceConts.fourthColumnContent != undefined) &&    
                                        <div className="price-item">{priceConts.fourthColumnContent}</div>
                                    }
                                    </div>
                                    )
                                }) }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="pricebox">
                        {(item != null && item.specializeServiceTableTitle != undefined) &&
                            <h4 dangerouslySetInnerHTML={{ __html: item.specializeServiceTableTitle }} ></h4>
                        }
                            <div className="price-table">
                            <div className="price-head">
                                {(item != null && item.speFirstColumnTitle != undefined) &&
                                    <div className="price-item">{item.speFirstColumnTitle}</div>
                                }
                                {(item != null && item.speSecondColumnTitle != undefined) &&
                                    <div className="price-item">{item.speSecondColumnTitle}</div>
                                }
                                {(item != null && item.speThirdColumnTitle != undefined) &&
                                    <div className="price-item">{item.speThirdColumnTitle}</div>
                                }
                                {(item != null && item.preFourthColumnTitle != undefined) &&
                                    <div className="price-item">{item.preFourthColumnTitle}</div>
                                }
                                </div>

                                {(item != null &&  item.premiumServices != undefined )  && item.premiumServices.map((spaCost) => {
                                    return (

                                    <div className="price-row">
                                    {(spaCost != null && spaCost.firstColumnContent != undefined) &&    
                                        <div className="price-item">{spaCost.firstColumnContent}</div>
                                    }
                                    {(spaCost != null && spaCost.secondColumnContent != undefined) &&    
                                        <div className="price-item">{spaCost.secondColumnContent}</div>
                                    }
                                    {(spaCost != null && spaCost.thirdColumnContent != undefined) &&    
                                        <div className="price-item">{spaCost.thirdColumnContent}</div>
                                    }
                                    {(spaCost != null && spaCost.fourthColumnContent != undefined) &&    
                                        <div className="price-item">{spaCost.fourthColumnContent}</div>
                                    }
                                    </div>
                                    
                                    )
                                }) }

                                {/* <div className="price-row item-2">
                                    <div className="price-item ">Baby Massage</div>

                                    <div className="price-item empty_item"></div>

                                    <div className="price-item empty_item"></div>

                                    <div className="price-item ">₱300 (20-30 Mins)</div>
                                </div>
                                <div className="price-row item-2">
                                    <div className="price-item ">Kiddie</div>

                                    <div className="price-item empty_item"></div>

                                    <div className="price-item empty_item"></div>

                                    <div className="price-item ">₱250 (20-30 Mins)</div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default PriceSection;