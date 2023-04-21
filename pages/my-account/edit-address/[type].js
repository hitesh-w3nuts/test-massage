import { useState, useEffect, useRef } from "react";
import { getUserDetail, updateUserDetailSession } from "@/helpers/helper";
import { post, getWCToken, get } from "@/helpers/api_helper";
import { useRouter } from "next/router";
import MyAccountNav from "../MyAccountNav";
import { POST_EDIT_ADD, GET_STATES } from "@/helpers/url_helper";
import SimpleReactValidator from "simple-react-validator";
import Select from "react-select";

// const [states, setStates] = useState([]);

const EditAddress = () => {
    const router = useRouter()
    const { type } = router.query;
    const [addressDetail, setAddressDetail] = useState(null);
    const getUserData = getUserDetail();
    const simpleValidator = useRef(new SimpleReactValidator());
    const [forceUpdate, setForceUpdate] = useState();
    const [addressInput, setAddressInput] = useState({ first_name: '', last_name: "", company: "", country: "", address_1: "", address_2: "", city: "", state: "", postcode: "", phone: "", email: "" })
    const [states, setStates] = useState([]);

    useEffect(() => {
        if (addressDetail === null && getUserData !== null && type !== undefined) {
            setAddressDetail(getUserData[type]);
            setAddressInput((inputs) => ({ ...addressInput, first_name: getUserData[type]['first_name'], last_name: getUserData[type]['last_name'], company: getUserData[type]['company'], country: getUserData[type]['country'], address_1: getUserData[type]['address_1'], address_2: getUserData[type]['address_2'], city: getUserData[type]['city'], state: getUserData[type]['state'], postcode: getUserData[type]['postcode'], phone: getUserData[type]['phone'], email: getUserData[type]['email'] }));
        }
    }, [getUserData])

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

    // input text change handler
    const handleInputChange = (event) => {
        event.persist();
        setAddressInput((inputs) => ({ ...addressInput, [event.target.name]: event.target.value }));
    };

    // form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages(true);
            setForceUpdate(1);
        } else {
            const wcToken = getWCToken();
            const result = await post(POST_EDIT_ADD + getUserData['ID'], { [type]: addressInput }, {
                headers: {
                    Authorization: wcToken,
                }
            });
            if (result.id !== undefined) {
                getUserData[type] = result['billing'];
                console.log(getUserData);
                updateUserDetailSession(getUserData);
            }
        }
    }


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

    return (
        <>
            <div className="inner_wapper">
                <div className="container">
                    <div className="container_inner my-account-wrap">
                        <div className="page-title text-lg-start">
                            <h1 className="h3">My account</h1>
                        </div>
                        <div className="myAccount-row">
                            <div className='row'>
                                <div className='col-lg-3'>
                                    <MyAccountNav step={'../'} />
                                </div>
                                {(addressDetail) && (
                                    <div className='col-lg-9'>
                                        <div className="myaccount-content">
                                            <div className="woocommerce-MyAccount-content">
                                                <div className="woocommerce-notices-wrapper"></div>
                                                <form method="post" onSubmit={handleSubmit}>
                                                    <h3>Billing address</h3>
                                                    <div className="woocommerce-address-fields">
                                                        <div className="woocommerce-address-fields__field-wrapper">
                                                            <p className="form-row form-row-first validate-required" id="first_name_field" data-priority="10">
                                                                <label htmlFor="first_name" className="">First name&nbsp;<abbr className="required" title="required">*</abbr></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input type="text" className="input-text" name="first_name" id="first_name" placeholder="" value={addressInput.first_name} onChange={handleInputChange} autoComplete="given-name" />
                                                                    {simpleValidator.current.message("first_name", addressInput.first_name, "required", {
                                                                        className: "error-message",
                                                                        messages: { required: "Please enter first name" }
                                                                    })}
                                                                </span>
                                                            </p>
                                                            <p className="form-row form-row-last validate-required" id="last_name_field" data-priority="20">
                                                                <label htmlFor="last_name" className="">Last name&nbsp;<abbr className="required" title="required">*</abbr></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input type="text" className="input-text" name="last_name" id="last_name" placeholder="" value={addressInput.last_name} autoComplete="family-name" onChange={handleInputChange} />
                                                                    {simpleValidator.current.message("last_name", addressInput.first_name, "required", {
                                                                        className: "error-message",
                                                                        messages: { required: "Please enter last name" }
                                                                    })}
                                                                </span>
                                                            </p>
                                                            <p className="form-row form-row-wide" id="company_field" data-priority="30">
                                                                <label htmlFor="company" className="">Company name&nbsp;<span className="optional">(optional)</span></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input type="text" className="input-text" name="company" id="company" placeholder="" value={addressInput.company} autoComplete="organization" onChange={handleInputChange} />

                                                                </span>
                                                            </p>
                                                            <p className="form-row form-row-wide address-field update_totals_on_change validate-required" id="country_field" data-priority="40">
                                                                <label htmlFor="country" className="">Country / Region&nbsp;<abbr className="required" title="required">*</abbr></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <strong>Philippines</strong>
                                                                    <input type="hidden" name="country" id="country" value={addressInput.country} autoComplete="country" className="country_to_state" readOnly="readonly" />
                                                                </span>
                                                            </p>
                                                            <p className="form-row address-field validate-required form-row-wide" id="address_1_field" data-priority="50">
                                                                <label htmlFor="address_1" className="">Street address&nbsp;<abbr className="required" title="required">*</abbr></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input
                                                                        type="text"
                                                                        className="input-text"
                                                                        name="address_1"
                                                                        id="address_1"
                                                                        placeholder="House number and street name"
                                                                        value={addressInput.address_1}
                                                                        autoComplete="address-line1"
                                                                        data-placeholder="House number and street name"
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    {simpleValidator.current.message("address_1", addressInput.address_1, "required", {
                                                                        className: "error-message",
                                                                        messages: { required: "Please enter address" }
                                                                    })}
                                                                </span>
                                                            </p>
                                                            <p className="form-row address-field form-row-wide" id="address_2_field" data-priority="60">
                                                                <label htmlFor="address_2" className="screen-reader-text">Apartment, suite, unit, etc.&nbsp;<span className="optional">(optional)</span></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input
                                                                        type="text"
                                                                        className="input-text"
                                                                        name="address_2"
                                                                        id="address_2"
                                                                        placeholder="Apartment, suite, unit, etc. (optional)"
                                                                        value={addressInput.address_2}
                                                                        autoComplete="address-line2"
                                                                        data-placeholder="Apartment, suite, unit, etc. (optional)"
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </span>
                                                            </p>
                                                            <p className="form-row address-field validate-required form-row-wide" id="city_field" data-priority="70">
                                                                <label htmlFor="city" className="">Town / City&nbsp;<abbr className="required" title="required">*</abbr></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input type="text" className="input-text" name="city" id="city" placeholder="" value={addressInput.city} autoComplete="address-level2" onChange={handleInputChange} />
                                                                    {simpleValidator.current.message("city", addressInput.city, "required", {
                                                                        className: "error-message",
                                                                        messages: { required: "Please enter city" }
                                                                    })}
                                                                </span>
                                                            </p>
                                                            <p className="form-row address-field validate-required validate-state form-row-wide" id="state_field" data-priority="80">
                                                                <label htmlFor="state" className="">State / County&nbsp;<abbr className="required" title="required">*</abbr></label>
                                                                <Select
                                                                    options={states}
                                                                    styles={colourStyles}
                                                                    defaultValue={{ label: "Select State", value: '' }}
                                                                    className="react-select-container"
                                                                    classNamePrefix="react-select"
                                                                    onChange={(e) => { setAddressInput((inputs) => ({ ...addressInput, 'state': e.value })); }}
                                                                />
                                                                {simpleValidator.current.message("state", addressInput.state, "required", {
                                                                    className: "error-message",
                                                                    messages: { required: "Please select state" }
                                                                })}
                                                            </p>
                                                            <p className="form-row address-field validate-required validate-postcode form-row-wide" id="postcode_field" data-priority="90">
                                                                <label htmlFor="postcode" className="">Postcode / ZIP&nbsp;<abbr className="required" title="required">*</abbr></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input type="text" className="input-text" name="postcode" id="postcode" placeholder="" value={addressInput.postcode} autoComplete="postal-code" onChange={handleInputChange} />
                                                                    {simpleValidator.current.message("postcode", addressInput.postcode, "required", {
                                                                        className: "error-message",
                                                                        messages: { required: "Please enter postcode" }
                                                                    })}
                                                                </span>
                                                            </p>
                                                            <p className="form-row form-row-wide validate-required validate-phone" id="phone_field" data-priority="100">
                                                                <label htmlFor="phone" className="">Phone&nbsp;<abbr className="required" title="required">*</abbr></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input type="tel" className="input-text" name="phone" id="phone" placeholder="" value={addressInput.phone} autoComplete="tel" onChange={handleInputChange} />
                                                                    {simpleValidator.current.message("phone", addressInput.phone, "required", {
                                                                        className: "error-message",
                                                                        messages: { required: "Please enter phone" }
                                                                    })}
                                                                </span>
                                                            </p>
                                                            <p className="form-row form-row-wide validate-required validate-email" id="email_field" data-priority="110">
                                                                <label htmlFor="email" className="">Email address&nbsp;<abbr className="required" title="required">*</abbr></label>
                                                                <span className="woocommerce-input-wrapper">
                                                                    <input type="email" className="input-text" name="email" id="email" placeholder="" value={addressInput.email} autoComplete="email username" onChange={handleInputChange} />
                                                                    {simpleValidator.current.message("email", addressInput.email, "required|email", {
                                                                        className: "error-message",
                                                                        messages: { required: "Please enter email", email: "Please enter valid email" }
                                                                    })}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <p>
                                                            <button type="submit" className="button" name="save_address" value="Save address">Save address</button>
                                                        </p>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditAddress;