import { getUserToken } from "@/helpers/helper";
import { useEffect, useState } from "react";
import { POST_LOST_PASSWORD } from "../../helpers/url_helper";
import { post } from "../../helpers/api_helper";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
const LostPassword = () => {
    const sessionToken = getUserToken();
    const [Error, SetError] = useState("");
    const [Success, SetSuccess] = useState("");
    const [password_inputs, setInputs] = useState({ email: ""});
    const [ButtonDisabled, SetButtonDisabled] = useState(false);
    useEffect(() => {
        if (sessionToken) router.push("/my-account/dashboard");
        setTimeout(() => {document.body.classList.add("loaded")}, 2000)
    }, [sessionToken]);

    // form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        SetError("");
        SetButtonDisabled(true);
        var res_data = await post(POST_LOST_PASSWORD, password_inputs);
        if (res_data.result) {
            SetSuccess(res_data.message);
            setInputs({ email: ""});
        } else {
            SetError(res_data.message);
        }
        setTimeout(() => {
            SetSuccess('');
            SetError('');
        }, 5000)
        SetButtonDisabled(false);
    }

    // input text change handler
	const handleInputChange = (event) => {
		event.persist();
        setInputs((inputs) => ({ ...password_inputs, [event.target.name]: event.target.value }));
	};

    return (
        <div className="inner_wapper auth_login lostpass">
            <div className="container">
                <div className="container_inner">
                    <div className="lostpass-form">
                        <form onSubmit={handleSubmit}>
                            <p class="reset_note">Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</p>
                            <div className="form-row">
                                <label for="user_login">Username or email</label>
                                <input class="input-text" type="text" name="email" onChange={handleInputChange} id="user_login" autocomplete="username" />
                            </div>
                            <div className="form-row">
                                <button type="submit" disabled={ButtonDisabled}  value="Reset password">Reset password</button>
                            </div>
                            <ErrorMessage message={Error} />
                            <SuccessMessage message={Success} />
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default LostPassword;