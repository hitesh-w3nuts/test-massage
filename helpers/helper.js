import cookies from "js-cookie";


const getUserToken = () => {
	return cookies.get("massage_mnl_token") || null;
};

const getUserDetail = () => {
	if(cookies.get("massage_mnl_user_detail")){
		return JSON.parse(cookies.get("massage_mnl_user_detail"));
	}else{
		return ;
	}
};
const getFullUserDetail = () => {
	if(cookies.get("massage_mnl_user_detail")){
		return cookies.get("massage_mnl_user_detail")
	}else{
		return ;
	}
	
}

const getUserId = () => {
	return cookies.get("massage_mnl_user_detail") ? JSON.parse(cookies.get("massage_mnl_user_detail"))["ID"] : 0;
};

const getUserType = () => {
	if (cookies.get("massage_mnl_user_detail")) {
		return JSON.parse(cookies.get("massage_mnl_user_detail"))["user_role"];
	} else {
		return 0;
	}
};

const removeUserSession = () => {
	cookies.remove("massage_mnl_token");
	cookies.remove("user_detail");
};

const setUserSession = (token, user) => {
	cookies.set("massage_mnl_token", token, { expires: 365 * 24 });
	cookies.set("massage_mnl_user_detail", JSON.stringify(user), { expires: 365 * 24 });
};

const updateUserDetailSession = ( user)  => {
	cookies.set("massage_mnl_user_detail", JSON.stringify(user), { expires: 365 * 24 });
};

const is_login = () => {
	if (cookies.get("massage_mnl_token")) {
		return true;
	} else {
		return false;
	}
};

const getFormattedDate = (date) => {
	let dateText = date;

	const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
	];

	const dateObj = new Date(date);
	dateText = monthNames[dateObj.getMonth()]+' '+dateObj.getDate().toString()+' '+dateObj.getFullYear();
	return dateText;
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
	getUserType,
	getUserToken,
	removeUserSession,
	setUserSession,
	is_login,
	getUserDetail,
	getUserId,
	getFullUserDetail,
	updateUserDetailSession,
	getFormattedDate,
	capitalizeFirstLetter
};