import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import BackBtn from "@/components/layout/BackBtn";
import MinusIcon from "../../assets/image/minus-q-1.svg"
import PlusIcon from "../../assets/image/plus-q-1.svg"
import ProductImg from "../../assets/image/massage-img-6.png"

import { get, post } from "../../helpers/api_helper";
import { GET_CART, POST_ADD_COUPON } from "../../helpers/url_helper";
import { get_cart_items, formatMoney, get_total_cart_amount, save_cart, check_for_minimum, save_discount_data, get_discount_data } from "../../helpers/cart_helper"
const Cart = () => {
    const [cart, setCart] = useState(null);
    const [cartSubTotal, setCartSubTotal] = useState(null);
    const [cartTotal, setCartTotal] = useState(null);
    const [cartTimeError, setCartTimeError] = useState(null);
    const [cartTimeErrorHourText, setCartTimeErrorHourText] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [finalTotal, setFinalTotal] = useState(0);
    const [discount, setDiscount] = useState(0);

    const [coupon, setCoupon] = useState('');

    useEffect(() => {
        const cartData = get_cart_items();
        if (cart == null) {
            setCart(cartData);
            const cartTotalData = get_total_cart_amount();
            setCartSubTotal(cartTotalData['cartSubTotal']);
            setCartTotal(cartTotalData['cartTotal']);
            setCartTimeError(check_for_minimum());

            const discountData = get_discount_data();
            if (discountData !== undefined && discountData !== '' && discountData.coupon !== undefined) {
                setFinalTotal(discountData.total);
                setDiscount(discountData.discount_total)
                setCoupon(discountData.coupon)
            }

        }
        document.body.classList.add("loaded")
    }, [cart])

    let cartDataObj = null;
    const updateCartItem = (key, action) => {
        let value = 0;
        if (action == 'add') {
            value = (parseInt(cart[key]['pax']) + 1);
        } else {
            value = (parseInt(cart[key]['pax']) - 1);
            if (value < 0) {
                value = 0;
            }
        }
        cart[key]['pax'] = value;
        document.getElementById('qty-' + key).value = value;
        document.getElementById('mobile-qty-' + key).value = value;
    }

    const updateCart = () => {
        let newCartData = {};
        Object.entries(cart).map((item, i) => {
            const itemKey = item[0];
            const itemData = item[1];
            const qty = itemData.pax;
            if (qty > 0) {
                newCartData = {
                    ...newCartData,
                    ...{ [itemKey]: itemData }
                }
            }
        });
        save_cart(newCartData);
        applyCoupon();
        setCart(null);
        setCartTimeError(null);
        setTimeout(() => {
            setCartTimeError(check_for_minimum());
        }, 500)

    }

    const deleteCartItem = (key) => {
        let newCartData = {};
        Object.entries(cart).map((item, i) => {
            const itemKey = item[0];
            const itemData = item[1];
            if (key !== itemKey) {
                newCartData = {
                    ...newCartData,
                    ...{ [itemKey]: itemData }
                }
            }
        });
        save_cart(newCartData);
        submitCoupon();
        setCart(null);
        setCartTimeError(null);

        setTimeout(() => {
            setCartTimeError(check_for_minimum());
        }, 500)
    }

    useEffect(() => {
        if (cartTimeError && cartTimeError['error']) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [cartTimeError])

    const [couponError, setCouponError] = useState('');
    const submitCoupon = () => {
        if (coupon === '') {
            setCouponError("Please enter coupon");
            setTimeout(() => { setCouponError(""); }, 5000)
        } else {
            setCouponError('');
            applyCoupon();
        }
    }

    const applyCoupon = async () => {
        if (coupon == '') {
            return;
        }
        const result = await post(POST_ADD_COUPON, { coupon: coupon, 'cart_items': cart });
        if (result.result) {
            save_discount_data({ subtotal: result.data.subtotal, discount_total: result.data.discount_total, total: result.data.total, coupon: coupon });
            setFinalTotal(result.data.total);
            setDiscount(result.data.discount_total);
        } else {
            setCouponError(result.message);
        }
    }

    const removeCoupon = () => {
        save_discount_data('');
        setFinalTotal(0);
        setDiscount(0)
        setCoupon("");
    }

    return (
        <div className="inner_wapper cart-page">
            <div className="container">
                <BackBtn url={"/services"} />
                <div className="page-title text-lg-start">
                    <h1 className="h3">Cart</h1>
                </div>
                {
                    (cartTimeError && cartTimeError['error']) && (
                        <div className="cart-time-error"><p>You need at least {cartTimeError['hourText']} for booking at {cartTimeError['location']}</p></div>
                    )
                }
                {(cart && Object.keys(cart).length) ? (
                    <>
                        <table className="cart">
                            <thead>
                                <tr>
                                    <th className="product-name">REQUESTS SUMMARY</th>
                                    <th className="product-price">Price</th>
                                    <th className="product-duration">Duration</th>
                                    <th className="product-quantity">Pax</th>
                                    <th className="product-subtotal">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(cart) &&
                                    Object.entries(cart).map((item, i) => {
                                        const itemKey = item[0];
                                        const itemData = item[1];
                                        return (
                                            <tr key={i} className="cart_item">
                                                <td className="product-thumbnail">
                                                    <div className="flxrow">
                                                        <a href="#">
                                                            <Image width={360} height={387} src={itemData.productImage} alt="ProductImg" />
                                                        </a>
                                                        <div class="info">
                                                            <h5 class="product-name" data-title="Product">
                                                                <a href="https://w3nut.com/projects/massagemnl/product/lymphatic-drainage/?attribute_pa_duration=30-minutes">{itemData.productTitle} - {itemData.variationText}</a>
                                                            </h5>
                                                            <div class="product-price d-md-none" data-title="Price">
                                                                Price: <span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">P</span>{formatMoney(itemData.productPrice, 2, ".", ",")}</bdi></span>
                                                            </div>
                                                            <div class="product-duration d-md-none" data-title="Duration">
                                                                Duration: <span>{itemData.variationText}</span>
                                                            </div>
                                                            <div class="product-quantity d-md-none" data-title="Pax">
                                                                Pax: <div class="quantity">
                                                                    <button type="button" onClick={(e) => { updateCartItem(itemKey, 'sub') }} class="minus"><Image width={18} height={18} src={MinusIcon} /></button>		<label class="screen-reader-text">Lymphatic Drainage - 30 Minutes quantity</label>
                                                                    <input type="number" id={`mobile-qty-${itemKey}`}  class="input-text qty text" step="1" min="0" max="" value={itemData.pax} title="Qty" size="4" placeholder="" inputmode="numeric" autocomplete="off" readOnly />
                                                                    <button type="button" onClick={(e) => { updateCartItem(itemKey, 'add') }} class="plus"><Image width={18} height={18} src={PlusIcon} /></button></div>
                                                            </div>
                                                            <div class="product-subtotal d-md-none">
                                                                <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">P</span>300.00</span>
                                                            </div>
                                                            <div class="product-remove d-md-none">
                                                                <a href="#" onClick={(e) => deleteCartItem(itemKey)} class="remove">remove</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="product-price">
                                                    <span className="amount"><span>P</span>{formatMoney(itemData.productPrice, 2, ".", ",")}</span>
                                                </td>
                                                <td className="product-duration">{itemData.variationText}</td>
                                                <td className="product-quantity">
                                                    <div className="quantity">
                                                        <button type="button" onClick={(e) => { updateCartItem(itemKey, 'sub') }} className="minus"><Image src={MinusIcon} alt="MinusIcon" /></button>
                                                        <input type="number" id={`qty-${itemKey}`} className="input-text qty text" step="1" min="0" max="" value={itemData.pax} onChange={(e) => { }} title="Qty" size="4" placeholder="" inputMode="numeric" readOnly autoComplete="off" />
                                                        <button type="button" onClick={(e) => { updateCartItem(itemKey, 'add') }} className="plus"><Image src={PlusIcon} alt="PlusIcon" /></button>
                                                    </div>
                                                </td>
                                                <td className="product-subtotal" data-title="Subtotal">
                                                    <span className="amount"><span>P</span>{formatMoney((itemData.productPrice * itemData.pax), 2, ".", ",")}</span>
                                                    <div className="product-remove">
                                                        <a href="#" onClick={(e) => deleteCartItem(itemKey)} className="remove">remove</a>
                                                    </div>
                                                </td>
                                            </tr>)
                                    })
                                }
                                <tr>
                                    <td colSpan="6" className="actions">
                                        <div className="coupon">
                                            <div>
                                                <input type="text" className="input-text" onChange={(e) => { setCoupon(e.target.value) }} placeholder="Coupon code" />
                                                <p className="error">{couponError}</p>
                                            </div>
                                            <button type="submit" onClick={submitCoupon} className="button" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                                        </div>
                                        <button type="submit" onClick={updateCart} className="button">Update cart</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="cart-collaterals">
                            <div className="cart_totals ">
                                <h2>Cart totals</h2>
                                <table cellSpacing="0" className="shop_table shop_table_responsive">
                                    <tbody>
                                        <tr className="cart-subtotal">
                                            <th>Subtotal</th>
                                            <td data-title="Subtotal"><span className="woocommerce-Price-amount amount"><bdi><span >P</span>{formatMoney(cartSubTotal)}</bdi></span></td>
                                        </tr>
                                        {(discount) > 0 && (
                                            <tr className="fee">
                                                <th>Coupon: {coupon}</th>
                                                <td data-title={`Coupon: ${coupon}`}><span className="woocommerce-Price-amount amount"><bdi><span >P</span>{formatMoney(discount)}</bdi><span className="remove_coupon" onClick={removeCoupon}>Remove</span></span></td>
                                            </tr>
                                        )}
                                        <tr className="fee">
                                            <th>New Normal Fees</th>
                                            <td data-title="New Normal Fees"><span className="woocommerce-Price-amount amount"><bdi><span >P</span>100.00</bdi></span></td>
                                        </tr>
                                        <tr className="order-total">
                                            <th>Total</th>
                                            <td data-title="Total"><strong><span className="woocommerce-Price-amount amount"><bdi><span >P</span>{(finalTotal > 0) ? formatMoney(finalTotal) : formatMoney(cartTotal)}</bdi></span></strong> </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="wc-proceed-to-checkout">
                                    <p>
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <circle cx="12" cy="12" r="9"></circle>
                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                            </svg>
                                        </i>
                                        The "New Normal Fee" may vary depending on the number of Therapists assigned to this booking. You will be notified with the updated fees after Therapists are assigned.
                                    </p>
                                    <Link href="/checkout" className={`checkout-button button alt wc-forward ${(disableButton) ? "disableButton" : ''}`}>Proceed to checkout</Link>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div class="woocommerce">
                        <div class="woocommerce-notices-wrapper"></div>
                        <p class="cart-empty woocommerce-info">Your cart is currently empty.</p>
                        <p class="return-to-shop">
                            <Link class="button wc-backward" href="../services">Return to shop</Link>
                        </p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Cart;