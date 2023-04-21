import MyAccountNav from "./MyAccountNav";
import {getUserDetail} from "../../helpers/helper";
import {removeUserSession, is_login} from "../../helpers/helper"
import { logoutUser } from "../../store/actions";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
const Dashboard = () => {
    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {
        const getDetail = getUserDetail();
        setUserDetail(getDetail)
    }, [])
    
    const router = useRouter();
    const dispatch = useDispatch();
    const {push, pathname } = useRouter();
    const Logout = (e) => {
        e.preventDefault();
		removeUserSession();
		dispatch(logoutUser());
		push("../");
	};

    return (
        <div className="inner_wapper">
            <div className="container">
                <div class="container_inner my-account-wrap">
                    <div class="page-title text-lg-start">
                        <h1 class="h3">My account</h1>
                    </div>
                    <div className="myAccount-row">
                        <div className='row'>
                            <div className='col-lg-3'>
                                <MyAccountNav/>
                            </div>
                            <div className='col-lg-9'>
                                <div className="myaccount-content">
                                    <p>Hello <strong>{userDetail.display_name}</strong>(not <strong>{userDetail.display_name}</strong>? <a href="#" onClick={Logout}>Log out</a>)</p>
                                    <p>From your account dashboard you can view your <a href="/my-account/orders">recent orders</a>, manage your <a href="/my-account/addresses">shipping and billing addresses</a>, and <a href="#">edit your password and account details</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Dashboard;