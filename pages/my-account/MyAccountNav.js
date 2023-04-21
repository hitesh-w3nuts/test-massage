import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/actions";
import {removeUserSession, is_login} from "../../helpers/helper"
import { useEffect } from "react";
const MyAccountNav = ({step}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {push, pathname } = useRouter();
    const NavLink = ({ url = "#", text, step }) => (
        <li className={(router.pathname == `/my-account/${url}` || (router.pathname.includes("/view-order/") && url == 'orders') ) ? "active" : ""}>
            <Link href={step+url} >{text}</Link>
        </li>
    );
    
    useEffect(() => {
        document.body.classList.add("loaded");
		if (!is_login()) router.push("/auth/login");
	}, []);

    const Logout = (e) => {
        e.preventDefault();
		removeUserSession();
		dispatch(logoutUser());
		push("/");
	};

    return(
            <ul className="my_accnav">
                <NavLink url="dashboard" step={(step !== undefined)?step:""} text="Dashboard" />
                <NavLink url="orders" step={(step !== undefined)?step:""} text="Orders"/>
                <NavLink url="addresses" step={(step !== undefined)?step:""} text="Addresses"/>
                <NavLink url="account-details" step={(step !== undefined)?step:""} text="Account details"/>
                <li className=""><a href="#" step={(step !== undefined)?step:""} onClick={Logout}>Logout</a></li>
            </ul>
    )
}
export default MyAccountNav;