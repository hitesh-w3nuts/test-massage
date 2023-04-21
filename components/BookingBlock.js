import Image from "next/image"

import bookingImg from "../assets/image/beauty-spa-book.png";

const BookingBlock = ({item}) => {
    return (
        <div className="booking-section">
            <div className="row g-0">
                <div className="col-md-6">
                    <div className="imagebox">
                        {(item != null &&  item.bookingImage != undefined ) &&
                        <div className="image">
                            <Image src={item.bookingImage.sourceUrl} alt="bookingImg" width={723} height={473} />
                        </div>
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="booking-content">
                    {(item != null &&  item.bookingTitle != undefined ) &&
                        <h2 dangerouslySetInnerHTML={{ __html : item.bookingTitle }}></h2>
                    }
                    {(item != null &&  item.bookingTitle != undefined ) &&
                        <p dangerouslySetInnerHTML={{ __html : item.bookingDescription }}></p>
                    }
                        <div className="btnbox white">
                        {(item != null &&  item.bookingButton != undefined ) && 
                        <a href={item.bookingButton.url} target={item.bookingButton.target}>
                            <i>
                                <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.6207 21.8995C27.4703 21.652 26.5602 22.1861 25.7544 22.6526C24.9291 23.1333 23.3599 24.4063 22.4605 24.0805C17.8553 22.1843 13.524 18.1536 11.6491 13.5299C11.3186 12.6112 12.5857 11.032 13.0628 10.197C13.5258 9.38874 14.0489 8.47007 13.8103 7.31104C13.5947 6.26951 10.8062 2.72121 9.82009 1.75091C9.16978 1.10997 8.50357 0.757453 7.81969 0.70048C5.24849 0.590097 2.37689 4.02089 1.87325 4.84165C0.611514 6.59176 0.618582 8.9205 1.89446 11.7442C4.96929 19.3286 16.5988 30.7747 24.2117 33.9651C25.6166 34.6221 26.9013 34.9515 28.0552 34.9515C29.1844 34.9515 30.1899 34.6363 31.0541 34.0114C31.7061 33.6358 35.2775 30.6216 35.1839 27.9813C35.1273 27.3083 34.7757 26.6353 34.143 25.9837C33.1799 24.9884 29.6545 22.1167 28.6207 21.8995Z" fill="#000"></path></svg>
                            </i>{item.bookingButton.title}
                        </a>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookingBlock;