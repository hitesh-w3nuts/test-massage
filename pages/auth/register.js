import Image from "next/image"

import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useSelector, useDispatch } from "react-redux";

import bookingImg from "../../assets/image/beauty-spa-book.png";

import { POST_REGISTER } from "../../helpers/url_helper";
import { post } from "../../helpers/api_helper";
import { setUserSession, getUserToken } from "../../helpers/helper";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";

import { loginUser } from "../../store/actions";

const Register = () => {

    const router = useRouter();
    const myState = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const sessionToken = getUserToken();

    useEffect(() => {
        if (sessionToken) router.push("/my-account/dashboard");
        setTimeout(() => {document.body.classList.add("loaded")}, 2000)
    }, [sessionToken]);

    const simpleValidator = useRef(new SimpleReactValidator());
    const [register_inputs, setInputs] = useState({ email: "", password: "", confirmPassword: "",firstName: "", lastName: "" });
    const [ButtonDisabled, SetButtonDisabled] = useState(false);
    const [forceUpdate, setForceUpdate] = useState();
    const [Error, SetError] = useState("");
    const [errorFields, setErrorFields] = useState({});
    const [SuccessMessageText, SetSuccessMessageText] = useState("");

    // form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages(true);
            setForceUpdate(1);
        } else {
            SetError("");
            setErrorFields({});
            SetButtonDisabled(true);
            var res_data = await post(POST_REGISTER, register_inputs);
            if (res_data.result && res_data.user !== undefined) {
                SetSuccessMessageText(res_data.message);
                setInputs({ email: "", password: "", confirmPassword: "",firstName: "", lastName: "" })
                setTimeout(function(){
                    setUserSession(res_data.token, res_data.user);
                    dispatch(loginUser());
                }, 2000);
            } else {
                if(res_data.fields !== undefined){
                    setErrorFields(res_data.fields);
                }else{
                    SetError(res_data.message);
                }
                
            }
        }
    }

    // input text change handler
    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({ ...register_inputs, [event.target.name]: event.target.value }));
    };

    return (
        <div className="inner_wapper register_login">
            <div className="container_inner pagecls">
                <div className="row flex-wrap-reverse">
                    <div className="col-lg-6">
                        <div className="register-form">
                            <h2 class="h3">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-wrap">
                                    <label for="first_name">First Name<span class="required">*</span></label>
                                    <input type="text" class="input-text" name="firstName" onChange={handleInputChange} value={register_inputs.firstName} id="first_name" />
                                    {simpleValidator.current.message("firstName", register_inputs.firstName, "required", {
                                        className: "error-message",
                                        messages:{required: "Please enter first name"}
                                    })}
                                </div>
                                <div className="input-wrap">
                                    <label for="last_name">Last Name<span class="required">*</span></label>
                                    <input type="text" class="input-text" id="last_name" onChange={handleInputChange} name="lastName" value={register_inputs.lastName} />
                                    {simpleValidator.current.message("lastName", register_inputs.lastName, "required", {
                                        className: "error-message",
                                        messages:{required: "Please enter last name"}
                                    })}
                                </div>
                                <div className="input-wrap">
                                    <label for="email">Email<span class="required">*</span></label>
                                    <input type="email" class="input-text" name="email" onChange={handleInputChange} id="email" value={register_inputs.email} />
                                    {simpleValidator.current.message("email", register_inputs.email, "required|email", {
                                        className: "error-message",
                                        messages:{required: "Please enter email", email:"Please enter valid email"}
                                    })}
                                </div>
                                <div className="input-wrap">
                                    <label for="password">Password&nbsp;<span class="required">*</span></label>
                                    <input class="input-text" type="password" name="password" onChange={handleInputChange} id="password" value={register_inputs.password} />
                                    {simpleValidator.current.message("password", register_inputs.password, "required", {
                                        className: "error-message",
                                        messages:{required: "Please enter password"}
                                    })}
                                </div>
                                <div className="input-wrap">
                                    <label for="confirm-password">Confirm Password&nbsp;<span class="required">*</span></label>
                                    <input class="input-text" type="password" onChange={handleInputChange} name="confirmPassword" id="confirm-password" value={register_inputs.confirmPassword} />
                                    {simpleValidator.current.message("confirmPassword", register_inputs.confirmPassword, `required|in:${register_inputs.password}`, {
                                        className: "error-message",
                                        messages:{
                                            required: "Please enter confirm password",
                                            in: "Password doesn't match"
                                        }
                                    })}
                                </div>
                                <ErrorMessage message={Error}/>
                                <SuccessMessage message={SuccessMessageText}/>
                                <div className="input-wrap">
                                    <button type="submit" class="woocommerce-button button woocommerce-form-login__submit" name="login" value="Submit">Submit</button>
                                </div>
                                <div className="global-error-wrap">
                                    {Object.entries(errorFields).map(([key, item], i) => (
                                        <ErrorMessage message={item}/>
                                    ))}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="imagebox">
                            <div className="image">
                                <Image src={bookingImg} alt="bookingImg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;