import MyAccountNav from "./MyAccountNav";
import { useState, useEffect, useRef } from "react";
import { getUserDetail, updateUserDetailSession } from "@/helpers/helper";
import { post, getWCToken } from "@/helpers/api_helper";
import { useRouter } from "next/router";
import { POST_UPDATE_PROFILE } from "@/helpers/url_helper";
import SimpleReactValidator from "simple-react-validator";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
const AccountDetails = () => {
    const [userData, setUserData] = useState(null);
    const getUserData = getUserDetail();
    const simpleValidator = useRef(new SimpleReactValidator());
    const [forceUpdate, setForceUpdate] = useState();
    const [userInput, setUserInput] = useState({ id: 0, first_name: '', last_name: "", email: "", display_name: "", old_password: "", new_password: "", confirm_password: "" });
    const [passwordRequired, setPasswordRequired] = useState(false);
    const [Error, SetError] = useState("");
    const [SuccessMessageText, SetSuccessMessageText] = useState("");

    useEffect(() => {
        if (userData === null && getUserData !== null) {
            setUserData(getUserData);
            setUserInput((input) => ({ ...userInput, id: getUserData['ID'],first_name: getUserData['first_name'], last_name: getUserData['last_name'], email: getUserData['user_email'], display_name: getUserData['display_name'], old_password: "", new_password: "", confirm_password: "" }));
        }
    }, [getUserData])

    // input text change handler
    const handleInputChange = (event) => {
        event.persist();
        setUserInput((inputs) => ({ ...userInput, [event.target.name]: event.target.value }));
        if(event.target.name === 'new_password'){
			if(event.target.value){
				setPasswordRequired(true)
			}else{
				setPasswordRequired(false)
			}
		}   
    };

    // form submit event
    const handleSubmit = async (event) => {
        SetError("");
        event.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages(true);
            setForceUpdate(1);
        } else {
            const result = await post(POST_UPDATE_PROFILE, userInput);
            if (result.result) {
                SetSuccessMessageText(result.message);
                getUserData['first_name'] = userInput.first_name;
                getUserData['last_name'] = userInput.last_name;
                getUserData['display_name'] = userInput.display_name;
                updateUserDetailSession(getUserData);
                setUserInput((input) => ({ ...userInput, old_password: "", new_password: "", confirm_password: "" }));
                setTimeout(() => {
                    SetSuccessMessageText("")
                }, 3000)
            }else{
                SetError(result.message);
            }
        }
    }

    return (
        <div className="inner_wapper">
            <div className="container">
                <div className="container_inner my-account-wrap">
                    <div className="page-title text-lg-start">
                        <h1 className="h3">My account</h1>
                    </div>
                    <div className="myAccount-row">
                        <div className='row'>
                            <div className='col-lg-3'>
                                <MyAccountNav />
                            </div>
                            <div className='col-lg-9'>
                                <div className="myaccount-content">
                                    <form className="edit-account" onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <label htmlFor="account_first_name">First name&nbsp;<span className="required">*</span></label>
                                            <input type="text" className="input-text" id="account_first_name" name="first_name" value={userInput.first_name} onChange={handleInputChange} autoComplete="given-name" />
                                            {simpleValidator.current.message("first_name", userInput.first_name, "required", {
                                                className: "error-message",
                                                messages: { required: "Please enter first name" }
                                            })}
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="account_last_name">Last name&nbsp;<span className="required">*</span></label>
                                            <input type="text" className="input-text" id="account_last_name" name="last_name" value={userInput.last_name} onChange={handleInputChange} autoComplete="family-name" />
                                            {simpleValidator.current.message("last_name", userInput.last_name, "required", {
                                                className: "error-message",
                                                messages: { required: "Please enter last name" }
                                            })}
                                        </div>
                                        <div className="form-row form-row-wide">
                                            <label htmlFor="account_display_name">Display name&nbsp;<span className="required">*</span></label>
                                            <input type="text" className="input-text" value={userInput.display_name} name="display_name" onChange={handleInputChange} id="account_display_name" />
                                            {simpleValidator.current.message("display_name", userInput.display_name, "required", {
                                                className: "error-message",
                                                messages: { required: "Please enter display name" }
                                            })}
                                            <span><em>This will be how your name will be displayed in the account section and in reviews</em></span>
                                        </div>
                                        <div className="form-row form-row-wide">
                                            <label htmlFor="account_email">Email address&nbsp;<span className="required">*</span></label>
                                            <input type="email" className="input-text" value={userInput.email} name="email" id="account_email" onChange={handleInputChange} autoComplete="email" readOnly/>
                                            {/* {simpleValidator.current.message("email", userInput.email, "required|email", {
                                                className: "error-message",
                                                messages: { required: "Please enter email", email: "Please enter valid email" }
                                            })} */}
                                        </div>
                                        <h3>Password change</h3>
                                        <div className="form-row form-row-wide">
                                            <label htmlFor="password_current">Current password (leave blank to leave unchanged)</label>
                                            <span className="password-input">
                                                <input type="password" className="input-text" name="old_password" value={userInput.old_password} id="password_current" onChange={handleInputChange} autoComplete="off" />
                                                <span className="show-password-input"></span>
                                            </span>
                                        </div>
                                        <div className="form-row form-row-wide">
                                            <label htmlFor="password_1">New password (leave blank to leave unchanged)</label>
                                            <span className="password-input">
                                                <input type="password" className="input-text" name="new_password" value={userInput.new_password} id="password_1" onChange={handleInputChange} autoComplete="off" />
                                                <span className="show-password-input"></span>
                                            </span>
                                        </div>
                                        <div className="form-row form-row-wide">
                                            <label htmlFor="password_2">Confirm new password</label>
                                            <span className="password-input">
                                                <input type="password" className="input-text" name="confirm_password" value={userInput.confirm_password} id="password_2" onChange={handleInputChange} autoComplete="off" />
                                                <span className="show-password-input"></span>
                                                { passwordRequired === true && simpleValidator.current.message(
                                                    "confirm_password",
                                                    userInput.confirm_password,
                                                    `in:${userInput.new_password}`,
                                                    {
                                                        className: "error-message",
                                                        messages: { in: `Passwords don't match.` },
                                                    }
                                                )}
                                            </span>
                                        </div>
                                        <div className="form-row form-row-wide">
                                            <button type="submit" className="button" value="Save changes">Save changes</button>
                                        </div>
                                        <ErrorMessage message={Error}/>
                                        <SuccessMessage message={SuccessMessageText}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AccountDetails;
