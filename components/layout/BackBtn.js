import Link from "next/link";
import { useRouter } from "next/router";


const BackBtn = ({url}) => {
    const router = useRouter();

    return (
        <div className="backbtn">
            <Link href={(url)?url:'#'} className="back" id="back-history">
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="41.5" transform="matrix(-1 0 0 1 42 42)" stroke="#B0B0B0"></circle><path d="M38.5981 33.502L30.1001 42L38.5981 50.498" stroke="#B0B0B0" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M53.9001 42H30.3381" stroke="#B0B0B0" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </Link>
        </div>
    )
}

export default BackBtn;