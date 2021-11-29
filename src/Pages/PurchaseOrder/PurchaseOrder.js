import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";
import dateStringDB from "../../Util/dateStringDB.js";

function PurchaseOrder() {
    const [orders, setOrders] = useState([]);
    const [searchedOrders, setSearchedOrders] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let orderid = e;
            if (window.confirm("Are you sure you want to delete this order?")) {
                setLoad(true);
                await axios
                    .delete(`/purchaseorder/${orderid}`)
                    .then(() => {
                        setLoad(false);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoad(false);
                        catchAxiosError(err);
                    });
            }
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(async () => {
        try {
            let date = new Date();
            let strDate = date.toLocaleString().substr(0, 10);
            document.title = "Purchase Order " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/purchaseorder/`)
                .then(({ data }) => {
                    setLoad(false);
                    console.log(data[0]);
                    setOrders(data);
                    setSearchedOrders(data);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const onSearchChange = (e) => {
        let str = e.target.value.toUpperCase();
        let tempOrders = [];
        orders.map((order) => {
            if (
                order.partyname.includes(str) ||
                order.shortname.includes(str) ||
                order.qualityname.includes(str) ||
                order.shadeno.includes(str) ||
                order.agentname.includes(str)
            )
                tempOrders.push(order);
        });
        setSearchedOrders([...tempOrders]);
    };

    return (
        <div className="margin">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "10px auto",
                    minWidth: "30%",
                }}
            >
                <input
                    type="text"
                    onChange={onSearchChange}
                    className={inputStyles.textInput}
                    placeholder="Search Purchase Order"
                    autoFocus
                />
                <Link to="/purchaseorder/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Purchase Order
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table
                    className="table table-bordered table-hover table-responsive"
                    style={{ verticalAlign: "middle" }}
                >
                    <tbody>
                        <tr>
                            <th>Order ID</th>
                            <th>Delete</th>
                            <th>Update</th>
                            <th>Order Date</th>
                            <th>Firm</th>
                            <th>Party</th>
                            <th>Agent</th>
                            <th>Manufacturer</th>
                            <th>Quality</th>
                            <th>Shade</th>
                            <th>Rate</th>
                            <th>Quantity KG</th>
                            <th>Total Amount</th>
                            <th>Delivery Days</th>
                            <th>Delivery Date</th>
                            <th>Payment Days</th>
                            <th>Received Quantity KG</th>
                            <th>Interest Rate</th>
                            <th>Interest Start</th>
                            <th>Refund</th>
                            <th>Remarks</th>
                            <th>Received</th>
                            <th>Remaining KG</th>
                            <th>Remaining %</th>
                            <th>Is Over</th>
                        </tr>
                        {searchedOrders.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="10">No Order Found yet</td>
                            </tr>
                        )}
                        {searchedOrders.length !== 0 &&
                            searchedOrders.map((order) => {
                                return (
                                    <tr key={order.orderid}>
                                        <td>{order.orderid}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    deleteRequest(
                                                        order.orderid
                                                    );
                                                }}
                                                type="button"
                                                className="btn btn-outline-primary"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td className={tableStyles.tableButton}>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                            >
                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/purchaseorder/update",
                                                        state: {
                                                            orderid:
                                                                order.orderid,
                                                        },
                                                    }}
                                                >
                                                    Update
                                                </Link>
                                            </button>
                                        </td>
                                        <td>{dateStringDB(order.orderdate)}</td>
                                        <td>{order.shortname}</td>
                                        <td>{order.partyname}</td>
                                        <td>{order.agentname}</td>
                                        <td>{order.manufacturer}</td>
                                        <td>{order.qualityname}</td>
                                        <td>{order.shadeno}</td>
                                        <td>{order.rate}</td>
                                        <td>{order.totalkg}</td>
                                        <td>{order.finalamount}</td>
                                        <td>{order.deliverydays}</td>
                                        <td>
                                            {dateStringDB(order.deliverydate)}
                                        </td>
                                        <td>{order.paymentdays}</td>
                                        <td>{order.receivedkg}</td>
                                        <td>{order.interestrate}</td>
                                        <td>{order.intereststart}</td>
                                        <td>{order.refund}</td>
                                        <td>{order.remarks}</td>
                                        <td>{order.receivedkg}</td>
                                        <td>
                                            {order.totalkg - order.receivedkg}
                                        </td>
                                        <td>
                                            {(
                                                ((order.totalkg -
                                                    order.receivedkg) *
                                                    100) /
                                                order.totalkg
                                            ).toFixed(2)}
                                        </td>
                                        <td>{order.isover}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            )}{" "}
        </div>
    );
}

export default PurchaseOrder;
