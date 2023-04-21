import Image from "next/image"
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useSelector, useDispatch } from "react-redux";
import bookingImg from "../../assets/image/beauty-spa-book.png";

import {POST_LOGIN} from "../../helpers/url_helper";
import { post } from "../../helpers/api_helper";
import { setUserSession, getUserToken } from "../../helpers/helper";
import ErrorMessage from "../../components/ErrorMessage";

import { loginUser } from "../../store/actions";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const myState = useSelector((state) => state.login);
	const dispatch = useDispatch();

    const sessionToken = getUserToken();

    useEffect(() => {
		if (sessionToken) router.push("/my-account/dashboard");
        setTimeout(() => {document.body.classList.add("loaded")}, 2000)
	}, [sessionToken]);

    const simpleValidator = useRef(new SimpleReactValidator());
    const [login_inputs, setInputs] = useState({ email: "", password: "" });
	const [ButtonDisabled, SetButtonDisabled] = useState(false);
	const [forceUpdate, setForceUpdate] = useState();
	const [Error, SetError] = useState("");
    
    // form submit event
	const handleSubmit = async (event) => {
		event.preventDefault();
        const formValid = simpleValidator.current.allValid();
		if (!formValid) {
			simpleValidator.current.showMessages(true);
			setForceUpdate(1);
		} else {
            SetError("");
			SetButtonDisabled(true);
            var res_data = await post(POST_LOGIN, login_inputs);
            if(res_data.result && res_data.user !== undefined){
                setUserSession(res_data.token, res_data.user);
				dispatch(loginUser());
            }else{
                SetError(res_data.message);
            }
            SetButtonDisabled(false);
        }
    }

    // input text change handler
	const handleInputChange = (event) => {
		event.persist();
        setInputs((inputs) => ({ ...login_inputs, [event.target.name]: event.target.value }));
	};

    return (
        <>
        <div className="inner_wapper auth_login">

                <div className="container_inner pagecls">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="imagebox">
                                <div className="image">
                                    <Image src={bookingImg} alt="bookingImg" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="register-form">
                                <h2 className="h3">Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-wrap">
                                        <label for="email">Email address&nbsp;<span className="required">*</span></label>
                                        <input type="text" className="input-text" id="email" name="email" autocomplete="email" value={login_inputs.email} onChange={handleInputChange} />
                                        {simpleValidator.current.message("email", login_inputs.email, "required|email", {
                                            className: "error-message",
                                            messages:{required: "Please enter email", email:"Please enter valid email"}
                                        })}
                                    </div>
                                    <div className="input-wrap">
                                        <label for="password">Password&nbsp;<span className="required">*</span></label>
                                        <input className="input-text" type="password" id="password" name="password" autocomplete="current-password" onChange={handleInputChange} value={login_inputs.password} />
                                        {simpleValidator.current.message("password", login_inputs.password, "required", {
                                            className: "error-message",
                                            messages:{required: "Please enter password"}
                                        })}
                                    </div>
                                    <ErrorMessage message={Error}/>
                                    <div className="input-wrap">
                                        <button type="submit" disabled={ButtonDisabled} className="woocommerce-button button woocommerce-form-login__submit" name="login" value="Log in">Log in</button>
                                        <label className="login__rememberme"> <input className="input-checkbox" type="checkbox" /> <span>Remember me</span>
                                        </label>
                                    </div>
                                    <div className="lost_password">
                                        <Link href="./lost-password/">Lost your password?</Link>
                                    </div>
                                    <div className="register_text">
                                        Don't have an account yet? <Link href="./register">register now</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
        </>
    )
}
export default Login;