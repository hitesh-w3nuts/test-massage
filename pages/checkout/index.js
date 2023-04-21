import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";

import ItemBuyImg from "assets/image/massage-img-6.png";
import { get_cart_items, formatMoney, get_total_cart_amount, check_for_minimum, clear_cart_data, get_discount_data, save_discount_data } from "../../helpers/cart_helper"
import SimpleReactValidator from "simple-react-validator";

import { GET_STATES, POST_ADD_COUPON, POST_CHECKOUT } from "../../helpers/url_helper";
import { get, post } from "../../helpers/api_helper";
import ErrorMessage from "@/components/ErrorMessage";

const CheckoutPage = () => {
  const router = useRouter();
  const [isCoupen, setIsCoupen] = useState(true);
  const [checkoutInput, setCheckoutInput] = useState({
    billing_first_name: '',
    billing_last_name: '',
    billing_company: '',
    billing_country: '',
    billing_address_1: '',
    billing_address_2: '',
    billing_city: '',
    billing_state: '',
    billing_postcode: '',
    billing_phone: '',
    billing_email: '',
    order_comments: "",
    cart_items: {},
    coupon:{}
  });

  const simpleValidator = useRef(new SimpleReactValidator());
  const [forceUpdate, setForceUpdate] = useState();
  const [cart, setCart] = useState(null);
  const [cartSubTotal, setCartSubTotal] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);
  const [cartTimeError, setCartTimeError] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [buttonText, setButtonText] = useState('PLACE ORDER');
  const [states, setStates] = useState([]);

  const [finalTotal, setFinalTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState('');

  const [error, setError] = useState();

  const get_states = async () => {
    const stateData = await get(GET_STATES);
    if (stateData.result && stateData.states != null) {
      const statesObj = [];
      Object.entries(stateData.states).map((item) => {
        statesObj.push({ value: item[0], label: item[1] })
      })
      setStates(statesObj);
    }
  }

  useEffect(() => {
    if (states.length <= 0) {
      get_states();
    }
  }, [states]);

  useEffect(() => {
    const cartData = get_cart_items();
    if (cart == null) {
      setCart(cartData);
      const cartTotalData = get_total_cart_amount();
      setCartSubTotal(cartTotalData['cartSubTotal']);
      setCartTotal(cartTotalData['cartTotal']);
      setCartTimeError(check_for_minimum());
      //setCheckoutInput((inputs) => ({ ...checkoutInput, 'cart_items': cartData }));

      let newCartData = {
        ...checkoutInput,
        ...{'cart_items': cartData}
      }

      const discountData = get_discount_data();
      if (discountData !== undefined && discountData !== '' && discountData.coupon !== undefined) {
        setFinalTotal(discountData.total);
        setDiscount(discountData.discount_total);
        setCoupon(discountData.coupon);
        
        newCartData = {
          ...newCartData,
          ...{'coupon': discountData.coupon}
        }
      }
      document.body.classList.add("loaded");
      setCheckoutInput(newCartData);
    }
  }, [cart])

  const coupenHandler = () => {
    setIsCoupen(!isCoupen);
  }


  useEffect(() => {
    if (cartTimeError && cartTimeError['error']) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [cartTimeError])

  const options = [
    { value: 0, label: 'State' },
    { value: 1, label: 'State1' },
    { value: 2, label: 'State2' },
    { value: 3, label: 'State3' },
    { value: 4, label: 'State4' },
  ];

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#fff" : null,
        color: "#fff"
      };
    }
  };

  // input text change handler
  const handleInputChange = (event) => {
    event.persist();
    setCheckoutInput((inputs) => ({ ...checkoutInput, [event.target.name]: event.target.value }));
  };


  // form submit event
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(checkoutInput)

    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      simpleValidator.current.showMessages(true);
      setForceUpdate(1);
    } else {
      setButtonText("Please wait....")
      const result = await post(POST_CHECKOUT, checkoutInput);
      if (result.result) {
        clear_cart_data();
        save_discount_data('');
        setFinalTotal(0);
        setDiscount(0)
        setCoupon("");
        router.push("/checkout/thank-you/" + result.orderID);
      }else{
        setError(result.message);
      }
      setButtonText("PLACE ORDER");
    }
  }

  const [couponError, setCouponError] = useState('');
  const submitCoupon = (e) => {
    e.preventDefault();
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
      setCheckoutInput((inputs) => ({ ...checkoutInput, 'coupon': coupon }));
      setIsCoupen(true);
      document.getElementById("textCoupon").value = '';
    } else {
      setCouponError(result.message);
    }
  }

  const removeCoupon = () => {
    save_discount_data('');
    setFinalTotal(0);
    setDiscount(0)
    setCoupon("");
    setCheckoutInput((inputs) => ({ ...checkoutInput, 'coupon': '' }));
  }
  return (
    <div className="inner_wapper checkout-page">
      <div className="container">
        <div className="container_inner">
          <div className="page-title text-lg-start">
            <h1 className="h3">Checkout</h1>
          </div>
          {(cart && Object.keys(cart).length) ? (
            <div className="checkout-main">
              <div className="have-coupen" onClick={coupenHandler}>
                Have a coupon?
                <a href="#" className="showcoupon">
                  Click here to enter your code
                </a>
              </div>

              <form onSubmit={submitCoupon} className={`checkout_coupon ${isCoupen ? '' : 'active'}`}>
                <p>If you have a coupon code, please apply it below.</p>
                <div className="form-wrap">
                  <div className="form-row form-row-first">
                    <input
                      type="text"
                      id="textCoupon"
                      className="input-text"
                      placeholder="Coupon code"
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <p className="error">{couponError}</p>
                  </div>
                  <div className="form-row form-row-last">
                    <button
                      type="submit"
                      className="button"
                      name="apply_coupon"
                      value="Apply coupon"
                    >
                      Apply coupon
                    </button>
                  </div>
                </div>
              </form>
              {
                (cartTimeError && cartTimeError['error']) && (
                  <div className="cart-time-error"><p>You need at least 2 hours for booking at {cartTimeError['location']}</p></div>
                )
              }
              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="col2-set">
                  <div className="col-1">
                    <h3>Billing details</h3>
                    <div className="woocommerce-billing-fields__field-wrapper">
                      <div className="form-row form-row-first">
                        <label htmlFor="billing_first_name" className="">
                          First name&nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="input-text "
                          name="billing_first_name"
                          id="billing_first_name"
                          placeholder=""
                          value={checkoutInput.billing_first_name}
                          onChange={handleInputChange}
                          autoComplete="given-name"
                        />
                        {simpleValidator.current.message("billing_first_name", checkoutInput.billing_first_name, "required", {
                          className: "error-message",
                          messages: { required: "Please enter first name" }
                        })}
                      </div>

                      <div className="form-row form-row-last validate-required">
                        <label htmlFor="billing_last_name" className="">
                          Last name&nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="input-text "
                          name="billing_last_name"
                          id="billing_last_name"
                          placeholder=""
                          autoComplete="family-name"
                          value={checkoutInput.billing_last_name}
                          onChange={handleInputChange}
                        />
                        {simpleValidator.current.message("billing_last_name", checkoutInput.billing_last_name, "required", {
                          className: "error-message",
                          messages: { required: "Please enter last name" }
                        })}
                      </div>

                      <div className="form-row form-row-wide">
                        <label htmlFor="billing_company" className="">
                          Company name&nbsp;
                          <span className="optional">(optional)</span>
                        </label>
                        <input
                          type="text"
                          className="input-text "
                          name="billing_company"
                          id="billing_company"
                          placeholder=""
                          value={checkoutInput.billing_company}
                          autoComplete="organization"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-row form-row-wide address-field update_totals_on_change validate-required">
                        <label htmlFor="billing_country" className="">
                          Country / Region&nbsp;<span className="required">*</span>
                        </label>
                        <strong>Philippines</strong>
                      </div>

                      <div className="form-row address-field validate-required form-row-wide">
                        <label htmlFor="billing_address_1" className="">
                          Street address&nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="input-text "
                          name="billing_address_1"
                          id="billing_address_1"
                          placeholder="House number and street name"
                          value={checkoutInput.billing_address_1}
                          autoComplete="address-line1"
                          data-placeholder="House number and street name"
                          onChange={handleInputChange}
                        />
                        {simpleValidator.current.message("billing_address_1", checkoutInput.billing_address_1, "required", {
                          className: "error-message",
                          messages: { required: "Please enter address" }
                        })}
                      </div>

                      <div className="form-row address-field form-row-wide">
                        <label htmlFor="billing_address_2" className="screen-reader-text">
                          Apartment, suite, unit, etc.&nbsp;
                          <span className="optional">(optional)</span>
                        </label>
                        <input
                          type="text"
                          className="input-text "
                          name="billing_address_2"
                          id="billing_address_2"
                          placeholder="Apartment, suite, unit, etc. (optional)"
                          value={checkoutInput.billing_address_2}
                          autoComplete="address-line2"
                          data-placeholder="Apartment, suite, unit, etc. (optional)"
                          onChange={handleInputChange}
                        ></input>
                      </div>

                      <div className="form-row address-field validate-required form-row-wide">
                        <label htmlFor="billing_city" className="">
                          Town / City&nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="input-text "
                          name="billing_city"
                          id="billing_city"
                          placeholder=""
                          value={checkoutInput.billing_city}
                          autoComplete="address-level2"
                          onChange={handleInputChange}
                        ></input>
                        {simpleValidator.current.message("billing_city", checkoutInput.billing_city, "required", {
                          className: "error-message",
                          messages: { required: "Please enter city" }
                        })}
                      </div>

                      <div className="form-row address-field validate-required validate-state form-row-wide">
                        <label htmlFor="billing_state" className="">
                          State / County&nbsp;<span className="required">*</span>
                        </label>
                        <Select
                          options={states}
                          styles={colourStyles}
                          defaultValue={{ label: "Select State", value: '' }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          onChange={(e) => { setCheckoutInput((inputs) => ({ ...checkoutInput, 'billing_state': e.value })); }}
                        />
                        {simpleValidator.current.message("billing_state", checkoutInput.billing_state, "required", {
                          className: "error-message",
                          messages: { required: "Please enter state" }
                        })}
                      </div>

                      <div className="form-row address-field validate-required form-row-wide">
                        <label htmlFor="billing_phone" className="">
                          Phone&nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="input-text "
                          name="billing_phone"
                          id="billing_phone"
                          placeholder=""
                          value={checkoutInput.billing_phone}
                          autoComplete="address-level2"
                          onChange={handleInputChange}
                        ></input>
                        {simpleValidator.current.message("billing_phone", checkoutInput.billing_phone, "required", {
                          className: "error-message",
                          messages: { required: "Please enter phone number" }
                        })}
                      </div>

                      <div className="form-row address-field validate-required form-row-wide">
                        <label htmlFor="billing_email" className="">
                          Email address &nbsp;<span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="input-text "
                          name="billing_email"
                          id="billing_email"
                          placeholder=""
                          value={checkoutInput.billing_email}
                          autoComplete="email"
                          onChange={handleInputChange}
                        ></input>
                        {simpleValidator.current.message("billing_email", checkoutInput.billing_email, "required|email", {
                          className: "error-message",
                          messages: { required: "Please enter email", email: "Please enter valid email" }
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="col-2">
                    <h3>Additional information</h3>
                    <div className="woocommerce-billing-fields__field-wrapper">
                      <div className="form-row notes">
                        <label htmlFor="order_comments" className="">
                          Order notes&nbsp;
                          <span className="optional">(optional)</span>
                        </label>
                        <textarea
                          name="order_comments"
                          className="input-text "
                          id="order_comments"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          rows="2"
                          cols="5"
                          value={checkoutInput.order_comments}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w3n_order_review">
                  <h3>
                    Your order <Link href="/cart">Edit cart</Link>
                  </h3>
                  <div className="woocommerce-checkout-review-order">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-total">Subtotal</th>
                        </tr>
                      </thead>

                      <tbody>
                        {(cart) &&
                          Object.entries(cart).map((item, i) => {
                            const itemKey = item[0];
                            const itemData = item[1];
                            return (
                              <tr key={i} className="cart_item">
                                <td className="product-name">
                                  <div className="product-name_inner flxrow">
                                    <div className="order_img">
                                      <a href="#">
                                        <Image src={itemData.productImage} width={360} height={387} alt="product-image" />
                                      </a>
                                    </div>

                                    <div className="name-main">
                                      <p>
                                        <strong>
                                          {itemData.productTitle} - {itemData.variationText}
                                        </strong>
                                      </p>
                                      <div className="pr-pax">
                                        Pax :{" "}
                                        <span className="product-quantity">&nbsp;{itemData.pax}</span>
                                      </div>
                                      <div className="pr-duration">Duration : {itemData.variationText}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="product-total">
                                  <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol">
                                      P
                                    </span>
                                    {formatMoney(itemData.productPrice, 2, ".", ",")}
                                  </span>
                                </td>
                              </tr>
                            )
                          })
                        }

                      </tbody>

                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Subtotal</th>
                          <td>
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  P
                                </span>
                                {formatMoney(cartSubTotal)}
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        {(discount > 0) && (
                          <tr className="fee">
                            <th>Coupon</th>
                            <td>
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  <span className="woocommerce-Price-currencySymbol">
                                    P
                                  </span>
                                  {formatMoney(discount)}
                                </bdi>
                                <span className="remove_coupon" onClick={removeCoupon}>Remove</span>
                              </span>
                            </td>
                          </tr>
                        )}
                        <tr className="fee">
                          <th>New Normal Fees</th>
                          <td>
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  P
                                </span>
                                100.00
                              </bdi>
                            </span>
                          </td>
                        </tr>

                        <tr className="order-total">
                          <th>Total</th>
                          <td>
                            <strong>
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  <span className="woocommerce-Price-currencySymbol">
                                    P
                                  </span>
                                  {formatMoney(cartTotal)}
                                </bdi>
                              </span>
                            </strong>{" "}
                          </td>
                        </tr>
                        <tr className="order-total">
                          <td colSpan="2">
                            <p>
                              <i>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-alert-circle"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="#000000"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  ></path>
                                  <circle cx="12" cy="12" r="9"></circle>
                                  <line x1="12" y1="8" x2="12" y2="12"></line>
                                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                              </i>
                              The "New Normal Fee" may vary depending on the
                              number of Therapists assigned to this booking. You
                              will be notified with the updated fees after
                              Therapists are assigned.
                            </p>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="woocommerce-checkout-payment">
                      <div className="payment-title">
                        <h3>Payment Method</h3>
                      </div>
                      <ul className="wc_payment_methods payment_methods methods">
                        <li className="wc_payment_method payment_method_cod">
                          <input id="payment_method_cod" type="radio" className="input-radio" name="payment_method" value="cod" />
                          <label htmlFor="payment_method_cod">Cash on delivery</label>
                          <div className="payment_box payment_method_cod">
                            <p>Pay with cash upon delivery.</p>
                          </div>
                        </li>
                      </ul>
                      <div className="form-row place-order">
                        <div className="woocommerce-terms-and-conditions-wrapper">
                          <div className="woocommerce-privacy-policy-text"><p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="https://w3nut.com/projects/massagemnl/privacy-policy/" className="woocommerce-privacy-policy-link" target="_blank">privacy policy</a>.</p></div>
                        </div>
                        <button type="submit" className={`button alt ${(disableButton) ? "disableButton" : ''}`} name="woocommerce_checkout_place_order" id="place_order" value="Place order" data-value="Place order">{buttonText}</button>
                        <ErrorMessage message={error} />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
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
    </div>
  );
};

export default CheckoutPage;
