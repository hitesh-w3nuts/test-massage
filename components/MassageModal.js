import Image from "next/image";
import Select from "react-select";

import Link from "next/link";
import ProductImg from "./../assets/image/massage-img-1.png";
import SpecializedIcon from "../assets/image/Specialized-w.svg";
import PressureIcon from "../assets/image/pressure-w.svg";
import OilBottleIcon from "../assets/image/oil-bottle-w.svg";
import { useEffect, useState } from "react";

import { post } from '../helpers/api_helper';
import { POST_ADD_TO_CART } from "../helpers/url_helper";
import { save_cart_item, get_default_booking_data, formatMoney } from "../helpers/cart_helper";
import { locationsQuery, subLocationsQuery } from '../helpers/api_gq_query_helper';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';

import moment from 'moment';

import Pen from "@/assets/image/pen.svg"


const MassageModal = ({ product }) => {
    const [locations, setLocations] = useState([]);
    const [variations, setVariations] = useState([]);
    const [subLocations, setSubLocations] = useState([]);
    const [priceHtml, setPriceHtml] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [cartItem, setCartItem] = useState({ productID: "", productTitle: "", productImage: "", productPrice: "", main_area_id: "", user_location: "", user_location_id: "", user_sub_location: "", user_sub_location_id: "", user_sel_date: "", user_sel_date_text: "", user_sel_time_text: "", user_sel_time_row: "", productID: "", variationID: "", variationMinutes: 0, pax: "", user_requests: "", minimumTime: 0 });
    const [step, setStep] = useState(0);
    const [timeError, setTimeError] = useState("");
    const [dateTimeSetDone, setDateTimeSetDone] = useState(false);
    const [minStep, setMinStep] = useState(0);
    const [showViewCart, setShowViewCart] = useState(false);

    const options = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
    ]

    const getLocations = async () => {
        const locationsData = await post('api/graphql', locationsQuery);
        if (locationsData.data != undefined && locationsData.data.locations != undefined && locationsData.data.locations != undefined && locationsData.data.locations.nodes != undefined) {
            let locationsObj = [{ label: "Select Location", value: "" }];
            let inc = 0;
            for (let index = 0; index < locationsData.data.locations.nodes.length; index++) {
                const element = locationsData.data.locations.nodes[index];
                if (element.children != undefined && element.children.nodes.length > 0) {
                    for (let indexChild = 0; indexChild < element.children.nodes.length; indexChild++) {
                        const elementChild = element.children.nodes[indexChild];
                        locationsObj[inc] = { "value": elementChild.databaseId, "label": elementChild.name, "parent": element.databaseId }
                        inc++;
                    }
                }
                if (index == (locationsData.data.locations.nodes.length - 1)) {
                    setLocations(locationsObj)
                }
            }

        }
    }

    const getSubLocations = async (locationID) => {
        setSubLocations([]);
        const newQuery = { ...subLocationsQuery, "variables": { parent: locationID } }
        const locationsData = await post('api/graphql', newQuery);
        if (locationsData.data != undefined && locationsData.data.locations != undefined && locationsData.data.locations != undefined && locationsData.data.locations.nodes != undefined) {
            let locationsObj = [];
            let inc = 0;
            for (let index = 0; index < locationsData.data.locations.nodes.length; index++) {
                const element = locationsData.data.locations.nodes[index];
                locationsObj[inc] = { "value": element.databaseId, "label": element.name, minimumTime: parseFloat(element.locationSettings.locationMinimumHours) }
                inc++
                if (index == (locationsData.data.locations.nodes.length - 1)) {
                    setSubLocations(locationsObj);
                }
            }

        }
    }

    useEffect(() => {
        if (locations.length <= 1) {
            getLocations();
        }
    }, [locations]);

    useEffect(() => {
        if (cartItem.main_area_id !== '' && cartItem.user_location_id !== '' && cartItem.variationID != '' && cartItem.user_sel_date != '' && cartItem.pax != '') {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }, [cartItem]);

    useEffect(() => {

        setCartItem({ productID: "", main_area_id: "", user_location: "", user_location_id: "", user_sub_location: "", user_sub_location_id: "", user_sel_date: "",user_sel_date_text: "",user_sel_time_text: "", productID: "", variationID: "", variationText: "", pax: "", user_requests: "" });

        if (product != undefined && product.id != undefined) {
            setCartItem((inputs) => ({ ...inputs, 'productID': product.id, 'productTitle': product.title, 'productImage': product.image }));
            setPriceHtml(product.prices)
        }

        if (product.variations !== undefined) {
            const variationObj = [];
            Object.entries(product.variations).map((item) => {
                const variationID = item[0];
                const variationData = item[1];
                variationObj.push({
                    value: variationID,
                    label: variationData['name'],
                    price: (variationData['data']['price_html'] !== '') ? variationData['data']['price_html'] : `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">P</span>${formatMoney(variationData['data']['display_price'])}</bdi></span>`,
                    display_price: variationData['data']['display_price'],
                    minutes: variationData['minutes']
                })
            });
            setVariations(variationObj);
        }

        // set default locations and date data if already added
        const bookingData = get_default_booking_data();
        if (bookingData) {
            setCartItem((inputs) => ({
                ...inputs,
                main_area_id: bookingData.main_area_id,
                user_location: bookingData.user_location,
                user_location_id: bookingData.user_location_id,
                user_sel_date: bookingData.user_sel_date,
                user_sel_date_text: bookingData.user_sel_date_text,
                user_sel_time_text: bookingData.user_sel_time_text,
                user_sub_location: bookingData.user_sub_location,
                user_sub_location_id: bookingData.user_sub_location_id,
                minimumTime: bookingData.minimumTime
            }));
            setStep(4)
            setMinStep(4);
        }
    }, [product]);

    const colourStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            // const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isFocused ? "#fff" : null,
                color: "#333333"
            };
        }
    };

    const ModalHandler = (e) => {
        e.preventDefault();
        setShowViewCart(false);
        setStep(0);
        setCartItem({ productID: "", main_area_id: "", user_location: "", user_location_id: "", user_sub_location: "", user_sub_location_id: "", user_sel_date: "", user_sel_date_text: "", user_sel_time_text: "", productID: "", variationID: "", variationText: "", pax: "", user_requests: "" });
        document.body.classList.toggle('open-modal');
    }

    const addToCartSubmit = async (e) => {
        e.preventDefault();
        save_cart_item(cartItem);
        setCartItem({ variationID: "", variationText: "", pax: "", user_requests: "" });
        setShowViewCart(true);
        setStep(3)
    }

    // disable past dates
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
    };

    const setDate = (date) => {
        const formattedDate = date.format("YYYY/MM/DD");
        setCartItem((inputs) => ({ ...inputs, 'user_sel_date_text': formattedDate }))
    }

    const setTime = (date) => {
        const formattedDate = date.format("hh:mm A");
        const dateObj = new Date(cartItem.user_sel_date_text+' '+formattedDate);
        const selectedTimeStamp = dateObj.getTime();
        const hours = dateObj.getHours();
        const currentTimeStamp = new Date().getTime();
        if(selectedTimeStamp <= currentTimeStamp){
            setTimeError("Please select valid time");
            setDateTimeSetDone(false);
            setCartItem((inputs) => ({ ...inputs, 'user_sel_time_text': '', user_sel_time_row: '', user_sel_date: "" }))
        }else if(hours < 14 || hours > 23){
            setCartItem((inputs) => ({ ...inputs, 'user_sel_time_text': '', user_sel_time_row: '', user_sel_date: "" }))
            setTimeError("Time must be between 2:00 PM to 11:00 PM");
            setDateTimeSetDone(false);
        }else{
            setTimeError("");
            setCartItem((inputs) => ({ ...inputs, 'user_sel_time_text': formattedDate, user_sel_time_row: date }))
        }
    }

    useEffect(() => {
        if(cartItem.user_sel_date_text !== '' && cartItem.user_sel_time_text !== '' && !dateTimeSetDone){
            setCartItem((inputs) => ({ ...inputs, 'user_sel_date': `${cartItem.user_sel_date_text} ${cartItem.user_sel_time_text}` }));
            setDateTimeSetDone(true);
        }
    }, [cartItem])

    return (
        <div className="massage-modal">
            <div className="modal-overlay" onClick={ModalHandler} />
            <div className="m-modal-content">
                {(product) && (
                    <div className="m-modal-body">
                        <div className="back-row flxrow">
                            <div className="backbtn">
                                <a href="#" onClick={(e) => { (step > minStep) && setStep((step - 1)) }}>
                                    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="41.5" transform="matrix(-1 0 0 1 42 42)" stroke="#B0B0B0"></circle><path d="M38.5981 33.502L30.1001 42L38.5981 50.498" stroke="#B0B0B0" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M53.9001 42H30.3381" stroke="#B0B0B0" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </a>
                            </div>
                            <div className="btnclose">
                                <a href="#" onClick={ModalHandler}>
                                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.500088 22.1342C0.500088 34.0796 10.2445 43.7685 22.2714 43.7685C34.2983 43.7685 44.0427 34.0796 44.0427 22.1342C44.0427 10.1889 34.2983 0.5 22.2714 0.5C10.2445 0.5 0.500088 10.1889 0.500088 22.1342Z" stroke="#B0B0B0"></path><path d="M16.46 27.6C16.46 27.86 16.66 28.08 16.92 28.08C17.14 28.08 17.28 27.94 17.42 27.76L22.2 21.54L27.04 27.82C27.16 27.98 27.28 28.08 27.48 28.08C27.74 28.08 27.98 27.84 27.98 27.6C27.98 27.46 27.92 27.34 27.8 27.2L22.86 20.84L27.64 14.74C27.72 14.64 27.78 14.52 27.78 14.4C27.78 14.14 27.58 13.92 27.32 13.92C27.1 13.92 26.96 14.06 26.82 14.24L22.24 20.16L17.6 14.18C17.48 14.02 17.36 13.92 17.16 13.92C16.9 13.92 16.66 14.16 16.66 14.4C16.66 14.54 16.74 14.66 16.84 14.8L21.6 20.86L16.6 27.26C16.52 27.36 16.46 27.48 16.46 27.6Z" fill="#B0B0B0"></path></svg>
                                </a>
                            </div>
                        </div>

                        <form onSubmit={addToCartSubmit}>
                            <div className="modal-row flxrow">
                                <div className="modal-col-1">
                                    <div className="image">
                                        <Image src={product.image} height={351} width={250} alt="ProductImg" />
                                    </div>
                                </div>
                                <div className="modal-col-2">
                                    <div className="massage-content">
                                        <div className="massage-title">{product.title}</div>
                                        <ul className="detail-data">
                                            <li className={`user_input_1 ${(cartItem.user_location) ? 'active' : ""}`} id="location_value">
                                                <span>Location: </span> <p className="w3n_show_location">{cartItem.user_location} {(minStep <= 0 && cartItem.user_location !== '' && cartItem.user_location !== undefined) && (<span href="#" onClick={(e) => { setStep(0) }}><Image src={Pen} height={10} width={10} /></span>)}</p>
                                            </li>
                                            <li className={`user_input_2 ${(cartItem.user_sub_location) ? 'active' : ""}`} id="sub_location_value">
                                                <span>Sub Location: </span> <p className="w3n_show_sub_location">{cartItem.user_sub_location} {(minStep <= 0 && cartItem.user_sub_location !== '' && cartItem.user_sub_location !== undefined) && (<span href="#" onClick={(e) => { setStep(1) }}><Image src={Pen} height={10} width={10} /></span>)}</p>
                                            </li>
                                            <li className={`user_input_3 ${(cartItem.user_sel_date_text) ? 'active' : ""}`} id="user_sel_date_value">
                                                <span>Date: </span> <p className="w3n_show_sel_date">{cartItem.user_sel_date_text} {(minStep <= 0 && cartItem.user_sel_date_text !== '' && cartItem.user_sel_date_text !== undefined) && (<span href="#" onClick={(e) => { setStep(2) }}><Image src={Pen} height={10} width={10} /></span>)}</p>
                                            </li>
                                            <li className={`user_input_3 ${(cartItem.user_sel_time_text) ? 'active' : ""}`} id="user_sel_date_value">
                                                <span>Time: </span> <p className="w3n_show_sel_date">{cartItem.user_sel_time_text} {(minStep <= 0 && cartItem.user_sel_time_text !== '' && cartItem.user_sel_time_text !== undefined) && (<span href="#" onClick={(e) => { setStep(3) }}><Image src={Pen} height={10} width={10} /></span>)}</p>
                                            </li>
                                            <li className={`user_input_4 ${(cartItem.variationText) ? 'active' : ""}`}>
                                                <span>Duration: </span> <p className="w3n_show_sel_hour">{cartItem.variationText} {(cartItem.variationText !== '' && cartItem.variationText !== undefined ) && (<span href="#" onClick={(e) => { setStep(4) }}><Image src={Pen} height={10} width={10} /></span>)}</p>
                                            </li>
                                            <li className={`user_input_5 ${(cartItem.pax) ? 'active' : ""}`}>
                                                <span>Pax: </span> <p className="w3n_show_sel_pax">{cartItem.pax} {(cartItem.pax !== '') && (<span href="#" onClick={(e) => { setStep(4) }}><Image src={Pen} height={10} width={10} /></span>)}</p>
                                            </li>
                                        </ul>
                                        <div className="estimate">
                                            {(step == 0) && (
                                                <Select
                                                    options={locations}
                                                    styles={colourStyles}
                                                    defaultValue={{ label: "Location", value: 0 }}
                                                    value={(cartItem.user_location_id !== '') ? { value: cartItem.user_location_id, label: cartItem.user_location } : ''}
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Location"
                                                    onChange={(e) => { setCartItem((inputs) => ({ ...inputs, 'user_location_id': e.value, "user_location": e.label, "main_area_id": e.parent })); getSubLocations(e.value); (e.value !== '') ? setStep(1) : ""; }}
                                                />
                                            )}
                                            {(step == 1) && (
                                                <Select
                                                    options={subLocations}
                                                    styles={colourStyles}
                                                    defaultValue={{ label: "Sub Location", value: 0 }}
                                                    value={(cartItem.user_sub_location_id !== '') ? { value: cartItem.user_sub_location_id, label: cartItem.user_sub_location } : ''}
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    onChange={(e) => { setCartItem((inputs) => ({ ...inputs, 'user_sub_location_id': e.value, "user_sub_location": e.label, minimumTime: e.minimumTime })); (e.value !== '') ? setStep(2) : ""; }}
                                                    placeholder="Select Sub Location"
                                                />
                                            )}
                                            {(step == 2) && (
                                                <Datetime
                                                    dateFormat="YYYY/MM/DD"
                                                    onChange={setDate}
                                                    onClose={(e) => { (cartItem.user_sel_date_text !== '') ? setStep(3) : '' }}
                                                    value={cartItem.user_sel_date_text}
                                                    inputProps={{ placeholder: "Select Date" }}
                                                    isValidDate={disablePastDt}
                                                    timeFormat={false}
                                                />
                                            )}
                                            {(step == 3) && (
                                                <>
                                                <Datetime
                                                    dateFormat={false}
                                                    onChange={setTime}
                                                    onClose={(e) => { (cartItem.user_sel_time_text !== '' && timeError == '') ? setStep(4) : '' }}
                                                    inputProps={{ placeholder: "Select Time" }}
                                                    isValidDate={disablePastDt}
                                                    timeFormat={"HH:mm"}
                                                    timeConstraints={{
                                                        hours: { min: 14, max: 23, seed: 14 },
                                                        minutes: { min: 0, max: 0, seed: 0 },
                                                    }}
                                                />
                                                <p className="error">{timeError}</p>
                                                </>
                                            )}
                                            {(step == 4) && (
                                                <Select
                                                    options={variations}
                                                    styles={colourStyles}
                                                    defaultValue={{ label: "Duration", value: 0 }}
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    onChange={(e) => { setCartItem((inputs) => ({ ...inputs, 'variationID': e.value, "variationText": e.label, 'productPrice': e.display_price, variationMinutes: e.minutes })); setPriceHtml(e.price); (e.value !== '') ? setStep(5) : ''; }}
                                                    value={(cartItem.variationID) ? { value: cartItem.variationID, label: cartItem.variationText } : ''}
                                                    placeholder={"Select Duration"}
                                                />
                                            )}
                                            {(step == 5) && (
                                                <Select
                                                    options={options}
                                                    styles={colourStyles}
                                                    defaultValue={{ label: "Pax", value: 0 }}
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    onChange={(e) => { setCartItem((inputs) => ({ ...inputs, 'pax': e.value })); }}
                                                    value={(cartItem.pax) ? { value: cartItem.pax, label: cartItem.pax } : ""}
                                                    placeholder="Select Pax"
                                                />
                                            )}
                                            <p id="w3n_total_price">Total: <span dangerouslySetInnerHTML={{ __html: priceHtml }}></span></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="requestbox">
                                <textarea name="user_requests" value={cartItem.user_requests} onChange={(e) => { setCartItem((inputs) => ({ ...inputs, 'user_requests': e.target.value })); }} id="user_requests" placeholder="Remarks only"></textarea>
                            </div>
                            <button type="submit" disabled={disabledBtn} className="add_cart w3n_add_bag">Add TO BAG</button>
                            {(showViewCart) && (<div className="w3n_addcart_msg success">Service added to cart successfully. <Link href="/cart" onClick={(e) => { document.body.classList.toggle('open-modal'); }} className="cart-link">View Cart</Link></div>)}
                        </form>
                        <div className="massage-info">
                            <h6>{product.title} DETAILS</h6>
                            <div className="Icon-row flxrow">
                                {
                                    product.serviceType.map((item, i) => (
                                        <div key={i} className="Icon-item flxrow">
                                            <i><Image src={item.ser_icon} width={22} height={24} alt="ser-image" /></i>
                                            <span dangerouslySetInnerHTML={{ __html: item.ser_name }}></span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: product.content }}></div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}
export default MassageModal;