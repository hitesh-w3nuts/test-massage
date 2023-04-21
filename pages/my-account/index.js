import { useRouter } from "next/router";
import {is_login} from "../../helpers/helper"
import { useEffect } from "react";
const index = () => {
    const router = useRouter();
    const {push} = useRouter();
    useEffect(() => {
		if (!is_login()){
            router.push("/auth/login");
        }else{
            router.push("/my-account/dashboard");
        }
	}, []);

    return(
        <></>
    )
}
export default index;