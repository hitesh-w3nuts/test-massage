import MyAccountNav from "./MyAccountNav";
import { getUserDetail } from "../../helpers/helper";
import { useEffect, useState } from "react";
const Addresses = () => {
    const [userDetail, setUserDetail] = useState(null);
    const getUserData = getUserDetail();
    useEffect(() => {
        if (userDetail === null && getUserData !== null) {
            setUserDetail(getUserData);
        }
    }, [getUserData])
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
                                {console.log(userDetail)}
                                {(userDetail !== null) && (
                                    <div className="myaccount-content">
                                        <p>The following addresses will be used on the checkout page by default.</p>
                                        <div className="addresses">
                                            <div className="billing-addrs-box">
                                                <div className="title">
                                                    <h3>Billing address</h3>
                                                    <a href="./edit-address/billing" className="#">Edit</a>
                                                </div>
                                                {(userDetail['billing'] !== undefined && userDetail['billing']['address_1'] !== '') && (
                                                    <address>
                                                        {`${userDetail['billing']['first_name']} ${userDetail['billing']['last_name']}`}<br />
                                                        {`${userDetail['billing']['address_1']}`}<br />
                                                        {`${userDetail['billing']['address_2']}`}<br />
                                                        {`${userDetail['billing']['city']}`}<br />
                                                        {`${userDetail['billing']['state']}`}<br />
                                                        {`${userDetail['billing']['postcode']}`}
                                                    </address>
                                                )}
                                                {(userDetail['billing'] === undefined || userDetail['billing']['address_1'] === '') && (
                                                    <address>
                                                        You have not set up this type of address yet.
                                                    </address>
                                                )}
                                            </div>
                                            <div className="billing-addrs-box">
                                                <div className="title">
                                                    <h3>Shipping address</h3>
                                                    <a href="./edit-address/shipping" className="#">Edit</a>
                                                </div>
                                                {(userDetail['shipping'] !== undefined && userDetail['shipping']['address_1'] !== '') && (
                                                    <address>
                                                        {`${userDetail['shipping']['first_name']} ${userDetail['shipping']['last_name']}`}<br />
                                                        {`${userDetail['shipping']['address_1']}`}<br />
                                                        {`${userDetail['shipping']['address_2']}`}<br />
                                                        {`${userDetail['shipping']['city']}`}<br />
                                                        {`${userDetail['shipping']['state']}`}<br />
                                                        {`${userDetail['shipping']['postcode']}`}
                                                    </address>
                                                )}
                                                {(userDetail['shipping'] === undefined || userDetail['shipping']['address_1'] === '') && (
                                                    <address>
                                                        You have not set up this type of address yet.
                                                    </address>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Addresses;