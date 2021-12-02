import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios.js";
import amountFormatter from "../../Util/amountFormatter.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function SalesOrder() {
    let [load, setLoad] = useState(false);
    let [orders, setOrders] = useState([]);
    let [searchedOrders, setSearchedOrders] = useState([]);

    useEffect(async () => {
        try {
            setLoad(true);
            await axios
                .get("/salesorder")
                .then(({ data }) => {
                    setOrders(data);
                    setSearchedOrders(data);
                    setLoad(false);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const searchOrderPage = (e) => {
        const val = e.target.value.toUpperCase();
        let tempSearchedOrder = [];
        orders.map((order) => {
            if (
                order.orderid.includes(val) ||
                order.partyname.includes(val) ||
                order.deliverypartyname.includes(val) ||
                order.agentname.includes(val)
            )
                tempSearchedOrder.push(order);
        });
        setSearchedOrders(tempSearchedOrder);
    };

    return (
        <div>
            {load ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <form action="">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "10px auto",
                                alignItems: "center",
                                maxWidth: "40%",
                            }}
                        >
                            <input
                                onChange={searchOrderPage}
                                placeholder="Search for Order...."
                                autoFocus
                            />
                            <div className="container">
                                <div className="text-center">
                                    <Link to="salesorder/add">
                                        <Button
                                            className="btn btn-primary"
                                            type="button"
                                        >
                                            Add new Order
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                    <table className="table table-bordered table-hover table-responsive">
                        <thead className="thead-light">
                            <tr>
                                <th>Order Id</th>
                                <th
                                    style={{
                                        maxWidth: "fit-content",
                                    }}
                                >
                                    Details
                                </th>
                                <th
                                    style={{
                                        maxWidth: "fit-content",
                                    }}
                                >
                                    Update
                                </th>
                                <th>Firm</th>
                                <th>Date</th>
                                <th>Party</th>
                                <th>Agent</th>
                                <th>Delivery Party</th>
                                <th>Delivery Address</th>
                                <th>Total Saress</th>
                            </tr>
                        </thead>
                        {searchedOrders.length > 0 &&
                            searchedOrders.map((order) => {
                                let date = order.orderdate.substr(0, 10);
                                return (
                                    <tr style={{ border: "1px solid black" }}>
                                        <td
                                            style={{
                                                width: "7%",
                                            }}
                                        >
                                            {order.orderid}
                                        </td>
                                        <td
                                            style={{
                                                width: "5%",
                                            }}
                                        >
                                            <Link
                                                style={{ color: "white" }}
                                                to={{
                                                    pathname:
                                                        "/salesorder/print",
                                                    state: {
                                                        orderid: order.orderid,
                                                    },
                                                }}
                                            >
                                                <Button
                                                    type="button"
                                                    style={{
                                                        cursor: "pointer",
                                                        border: "1px solid black",
                                                    }}
                                                >
                                                    Print
                                                </Button>
                                            </Link>
                                        </td>
                                        <td
                                            style={{
                                                width: "7%",
                                            }}
                                        >
                                            <Link
                                                style={{ color: "white" }}
                                                to={{
                                                    pathname: "/order/update",
                                                    state: {
                                                        orderid: order.orderid,
                                                    },
                                                }}
                                            >
                                                <Button
                                                    type="button"
                                                    style={{
                                                        cursor: "pointer",
                                                        border: "1px solid black",
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                            </Link>
                                        </td>

                                        <td
                                            style={{
                                                fontSize: "medium",
                                                width: "8%",
                                            }}
                                        >
                                            {date}
                                        </td>
                                        <td
                                            style={{
                                                width: "20%",
                                                fontSize: "medium",
                                            }}
                                        >
                                            {order.partyname}
                                        </td>
                                        <td
                                            style={{
                                                width: "20%",
                                                fontSize: "medium",
                                            }}
                                        >
                                            {order.agentname}
                                        </td>
                                        <td
                                            style={{
                                                width: "15%",
                                                fontSize: "large",
                                            }}
                                        >
                                            {order.deliverypartyname}
                                        </td>
                                        <td
                                            style={{
                                                width: "15%",
                                                fontSize: "large",
                                            }}
                                        >
                                            {order.deliveryaddress}
                                        </td>
                                        <td
                                            style={{
                                                width: "5%",
                                            }}
                                        >
                                            {amountFormatter(
                                                order.totalsarees,
                                                0
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </table>
                </div>
            )}
        </div>
    );
}

export default SalesOrder;
