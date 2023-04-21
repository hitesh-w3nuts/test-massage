import Link from "next/link";
import MyAccountNav from "./MyAccountNav";
import { getUserDetail, getFormattedDate, capitalizeFirstLetter } from "../../helpers/helper";
import {formatMoney} from "../../helpers/cart_helper";
import { get, getWCToken } from "../../helpers/api_helper"
import { GET_ORDERS } from "../../helpers/url_helper"
import { logoutUser } from "../../store/actions";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const Orders = () => {

  const [userDetail, setUserDetail] = useState({});
  const [orders, setOrders] = useState([]);

  const get_orders = async () => {
    const wcToken = getWCToken();
    const getOrders = await get(GET_ORDERS + '?customer=' + userDetail.ID, {
      headers: {
        Authorization: wcToken,
      }
    });
    setOrders(getOrders);
  }

  useEffect(() => {
    const getDetail = getUserDetail();
    setUserDetail(getDetail)
  }, [])

  useEffect(() => {
    if (orders.length <= 0 && userDetail.ID != undefined) {
      get_orders();
    }
  }, [userDetail])

  return (
    <div className="inner_wapper">
      <div className="container">
        <div class="container_inner my-account-wrap">
          <div class="page-title text-lg-start">
            <h1 class="h3">My account</h1>
          </div>

          <div className="myAccount-row">
            <div className="row">
              <div className="col-lg-3">
                <MyAccountNav />
              </div>
              <div className="col-lg-9">
                <div className="myaccount-content">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <span class="nobr">Order</span>
                        </th>
                        <th>
                          <span class="nobr">Date</span>
                        </th>
                        <th>
                          <span class="nobr">Status</span>
                        </th>
                        <th>
                          <span class="nobr">Total</span>
                        </th>
                        <th>
                          <span class="nobr">Actions</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {(orders.length > 0) &&
                        Object.entries(orders).map(([id, order]) => {
                          return (
                            <tr key={id}>
                              <td data-title="Order">
                                <Link href={`/my-account/view-order/${order['id']}`}>#{order['id']}</Link>
                              </td>
                              <td data-title="Date">
                                <time>{getFormattedDate(order['date_created'])}</time>
                              </td>
                              <td data-title="Status">{ capitalizeFirstLetter(order['status'])}</td>
                              <td data-title="Total">
                                <span>
                                  <span>P</span>{formatMoney(order['total'])}
                                </span>
                              </td>
                              <td data-title="Actions">
                                <Link href={`/my-account/view-order/${order['id']}`}>View</Link>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
