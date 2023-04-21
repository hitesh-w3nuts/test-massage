import { getUserToken } from "@/helpers/helper";
import { useEffect, useState } from "react";
import { POST_CHANGE_PASSWORD    } from "../../helpers/url_helper";
import { post } from "../../helpers/api_helper";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import { useRouter } from "next/router";
const LostPassword = () => {
    const router = useRouter();
    const sessionToken = getUserToken();
    const {key, login} = router.query;
    const [Error, SetError] = useState("");
    const [Success, SetSuccess] = useState("");
    const [buttonText, SetButtonText] = useState("RESET PASSWORD");
    const [password_inputs, setInputs] = useState({ new_password: "",  confirm_password: "", 'key': "", 'login': ""});
    const [ButtonDisabled, SetButtonDisabled] = useState(false);
    useEffect(() => {
        if (sessionToken) router.push("/my-account/dashboard");
        setTimeout(() => {document.body.classList.add("loaded")}, 2000)
    }, [sessionToken]);

    useEffect(() => {
        if(key == ''){
            router.push("/");
        }
        setInputs((inputs) => ({ ...password_inputs, key: key, login: login }));
        //document.body.classList.add("loaded");
    }, [key, login]);

    // form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        SetError("");
        SetButtonDisabled(true);
        SetButtonText('Loading...');
        var res_data = await post(POST_CHANGE_PASSWORD, password_inputs);
        if (res_data.result) {
            SetSuccess(res_data.message);
            setInputs({ new_password: "",  confirm_password: "", 'key': "", 'login': ""});
        } else {
            SetError(res_data.message);
        }
        SetButtonText('RESET PASSWORD');
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
                            <p class="reset_note">Reset Password</p>
                            <div className="form-row">
                                <label for="user_login">New password</label>
                                <input class="input-text" type="password" name="new_password" onChange={handleInputChange} id="new_password" autocomplete="Off" />
                            </div>
                            <div className="form-row">
                                <label for="user_login">Confirm password</label>
                                <input class="input-text" type="password" name="confirm_password" onChange={handleInputChange} id="new_password" autocomplete="Off" />
                            </div>
                            <div className="form-row">
                                <button type="submit" disabled={ButtonDisabled}  value="Reset password">{buttonText}</button>
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