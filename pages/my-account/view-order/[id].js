import Link from "next/link";
import MyAccountNav from "../MyAccountNav";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import { GET_ORDERS } from '../../../helpers/url_helper';
import { get, getWCToken } from '../../../helpers/api_helper';
import { getFormattedDate, capitalizeFirstLetter } from '../../../helpers/helper';
import { formatMoney } from '../../../helpers/cart_helper';

const Order = () => {
    const router = useRouter()
    const { id } = router.query;
    let subtotal = 0;
    const [order, setOrder] = useState(null);
    const get_orders = async () => {
        setOrder({})
        const wcToken = getWCToken();
        const getOrder = await get(GET_ORDERS + '/' + id, {
            headers: {
                Authorization: wcToken,
            }
        });
        document.body.classList.add("loaded");
        setOrder(getOrder);
    }

    useEffect(() => {
        if (id !== undefined && order == null) {
            get_orders();
        }
    }, [id])

    return (
        <>
            <div className="inner_wapper">
                <div className="container">
                    <div className="container_inner my-account-wrap">
                        <div className="page-title text-lg-start">
                            <h1 className="h3">My account</h1>
                        </div>
                        <div className="myAccount-row">
                            <div className="row">
                                <div className="col-lg-3">
                                    <MyAccountNav step={'../'} />
                                </div>
                                <div className="col-lg-9">
                                    {(order && order['id'] !== undefined) && (
                                        <div className="myaccount-content">
                                            <p> Order #<mark className="order-number">{id}</mark> was placed on <mark className="order-date">{getFormattedDate(order['date_created'])}</mark> and is currently <mark className="order-status">{capitalizeFirstLetter(order['status'])}</mark>.</p>
                                            <section className="woocommerce-order-details">
                                                <h2 className="woocommerce-order-details__title">Order details</h2>
                                                <table className="woocommerce-table woocommerce-table--order-details shop_table order_details">
                                                    <thead>
                                                        <tr>
                                                            <th className="woocommerce-table__product-name product-name">Product</th>
                                                            <th className="woocommerce-table__product-table product-total">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Object.entries(order['line_items']).map(([id, item]) => {
                                                                subtotal = (subtotal + parseFloat(item['subtotal']));
                                                                return (
                                                                    <tr key={id} className="woocommerce-table__line-item order_item">
                                                                        <td className="woocommerce-table__product-name product-name">
                                                                            <Link href="../../service">{item.name}</Link>
                                                                            <ul className="wc-item-meta">
                                                                                {Object.entries(item['meta_data']).map(([metaID, metaItem]) => {
                                                                                    if (metaItem['display_key'] == 'Duration' || metaItem['display_key'] == 'Location' || metaItem['display_key'] == 'Sub Location' || metaItem['display_key'] == 'Date Time' || metaItem['display_key'] == 'Pax')
                                                                                        return (
                                                                                            <li key={metaID}>
                                                                                                <strong className="wc-item-meta-label">{metaItem['display_key']}:</strong><p>{metaItem['display_value']}</p>
                                                                                            </li>
                                                                                        )
                                                                                })}
                                                                            </ul>
                                                                        </td>
                                                                        <td className="woocommerce-table__product-total product-total">
                                                                            <span className="woocommerce-Price-amount amount"><bdi><span className="woocommerce-Price-currencySymbol">{order['currency_symbol']}</span>{formatMoney(item['subtotal'])}</bdi></span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th scope="row">Subtotal:</th>
                                                            <td><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">P</span>{formatMoney(subtotal)}</span></td>
                                                        </tr>
                                                        {(parseFloat(order['discount_total'])) > 0 && (
                                                        <tr>
                                                            <th scope="row">Discount:</th>
                                                            <td><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">P</span>{formatMoney(order['discount_total'])}</span></td>
                                                        </tr>
                                                        )}
                                                        {
                                                            Object.entries(order['fee_lines']).map(([id, item]) => {
                                                                return (
                                                                <tr key={id}>
                                                                    <th scope="row">{item['name']}:</th>
                                                                    <td><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">P</span>{formatMoney(item['total'])}</span></td>
                                                                </tr>
                                                                )
                                                            })
                                                        }
                                                        <tr>
                                                            <th scope="row">Payment method:</th>
                                                            <td>Cash on delivery</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Total:</th>
                                                            <td><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">P</span>{formatMoney(order['total'])}</span></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </section>
                                            <section className="woocommerce-customer-details">
                                            <h2 className="woocommerce-column__title">Billing address</h2>
                                            <address>
                                                {`${order['billing']['first_name']} ${order['billing']['last_name']}`}<br/>
                                                {(order['billing']['company'] !== '') && `${order['billing']['company']}`}<br/>
                                                {`${order['billing']['address_1']}`}<br/>
                                                {`${order['billing']['address_2']}`}<br/>
                                                {`${order['billing']['city']}`}<br/>
                                                {`${order['billing']['state']}`}<br/>
                                                {`${order['billing']['phone']}`}<br/>
                                                {`${order['billing']['email']}`}
                                            </address>
                                            </section>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Order;