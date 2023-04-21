import Image from "next/image";
import checkSvg from "@/assets/image/c-check-thank.svg";
const ThankyouPage = () => {
    return (
        <section class="contain_wapper thank-you" id="contain_wapper">
            <div class="inner_wapper ">
                <div class="container">
                    <div class="container_inner">
                        <div class="woocommerce">
                            <div class="container">
                                <div class="woocommerce-order">
                                    <div class="order-top thankyou-page-woocommerce">
                                        <i><Image src={checkSvg} /></i>
                                        <h3 class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">Thank you for booking!</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ThankyouPage;