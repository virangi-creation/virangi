import React, { Component } from "react";
import exportMaterial, { onDateChange } from "./script";
import { Link } from "react-router-dom";
import { confirmButton } from "./EventHandler";
import { Button } from "react-bootstrap";

const { updateAmount } = exportMaterial;

class InputSalesBill extends Component {
    eleID(str) {
        return document.getElementById(str).value;
    }

    async updateChallan() {
        const { challans } = this.state;
        let cno = document.getElementById("challanno").value;
        for (let i = 0; i < challans.length; i++) {
            const challan = challans[i];
            console.log(typeof challan.challanno, typeof cno);
            if (challan.challanno === cno) {
                this.setState({ selectChallan: challan });
                await document.getElementById("orderid").value;
                document.getElementById("orderid").value = challan.orderno;
                this.updateAll(challan);
            }
        }
    }

    updateAll(challanDetails) {
        const orders = this.state.salesOrders;
        let { selectedChallan } = this.state;
        if (!selectedChallan) selectedChallan = challanDetails;
        const orderid = this.eleID("orderid");
        console.log(selectedChallan);
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            if (order.orderid === orderid) {
                this.setState({ selectedOrder: order });
                let days = order.paymentdays,
                    vatavper = order.vatavper;
                var curr = new Date(this.eleID("challandate"));
                curr.setDate(curr.getDate() + days);
                var duedate = curr.toISOString().substr(0, 10);

                curr = new Date(order.orderdate);
                curr.setDate(curr.getDate() + 1);
                var odate = curr.toISOString().substr(0, 10);

                let price = (
                    order.rate *
                    (1 - vatavper / 100) *
                    (1 + order.gst / 100)
                ).toFixed(2);
                let amount = (selectedChallan.totalmeters * order.rate).toFixed(
                    2
                );
                let vatavamount = (amount * (vatavper / 100)).toFixed(2);
                let adjustedamount = amount - vatavamount;
                let cgstamount = ((adjustedamount * order.gst) / 200).toFixed(
                    2
                );
                let sgstamount = ((adjustedamount * order.gst) / 200).toFixed(
                    2
                );
                let totalamount = (
                    parseFloat(adjustedamount) +
                    parseFloat(cgstamount) +
                    parseFloat(sgstamount)
                ).toFixed(2);
                this.setState({
                    order: order,
                    maxinvoiceno: selectedChallan.challanno,
                    salesbill: {
                        invoiceno: selectedChallan.challanno,
                        invoicedate: new Date(selectedChallan.challandate)
                            .toISOString()
                            .substr(0, 10),
                        challanno: selectedChallan.challan,
                        challandate: new Date(selectedChallan.challandate)
                            .toISOString()
                            .substr(0, 10),
                        paymentdays: order.paymentdays,
                        duedate: duedate,
                        vehicleno: selectedChallan.tempno,
                        orderid: order.orderid,
                        orderdate: odate,
                        partyname: order.partyname,
                        broker: order.broker,
                        firmname: order.firmname,
                        itemname: order.itemname,
                        quantitymtr: selectedChallan.totalmeters,
                        quantitytaka: selectedChallan.totaltakas,
                        quantityweight: this.eleID("quantityweight"),
                        rate: order.rate,
                        vatavper: order.vatavper,
                        gst: order.gst,
                        price: price,
                        amount: amount,
                        vatavamount: vatavamount,
                        adjustedamount: adjustedamount,
                        cgstamount: cgstamount,
                        sgstamount: sgstamount,
                        totalamount: totalamount,
                        interestrate: order.interestrate,
                        intereststart: order.intereststart,
                        close: document.getElementById("close").checked,
                    },
                });
                break;
            }
        }
    }

    constructor() {
        super();
        var curr = new Date();
        curr.setDate(curr.getDate() - 1);
        var date = curr.toISOString().substr(0, 10);
        this.state = {
            challans: [],
            salesbill: {
                invoiceno: 1,
                invoicedate: date,
                challanno: 1,
                challandate: date,
                vehicleno: "GJ 05 BZ 0037",
                paymentdays: 45,
                orderid: "NA",
                quantityweight: 0,
            },
        };
    }

    onSubmitEvent = async () => {
        console.log("Submit Button Pressed");
        const { salesbill } = this.state;
        console.log(salesbill);

        await fetch("https://virangi-creation.herokuapp.com/addnewsalesbill", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                salesbill: this.state.salesbill,
            }),
        })
            .then(async () => {
                const { selectedOrder } = this.state;
                const deliveredMTR =
                    parseFloat(selectedOrder.deliveredquantitymtr) +
                    parseFloat(salesbill.quantitymtr);
                const orderedMTR = selectedOrder.quantitymtr;
                const diff = parseFloat(orderedMTR) - parseFloat(deliveredMTR);
                const str = `Close Order?
                            \nOrdered Meter : ${orderedMTR} \nTotal Delivered Meter: ${deliveredMTR} \nExtra Meter : ${diff}`;
                if (
                    document.getElementById("close").checked ||
                    this.state.order.remainingquantitymtr <=
                        parseInt(salesbill.quantitymtr)
                ) {
                    if (confirmButton(str)) {
                        await fetch(
                            "https://virangi-creation.herokuapp.com/closesalesorder",
                            {
                                method: "post",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    selectedSalesOrderID: this.eleID("orderid"),
                                }),
                            }
                        ).catch((err) => console.log(err));
                    }
                }
            })
            .then(() => {
                window.location.reload();
                this.componentDidMount();
            })
            .catch((err) => console.log(err));
    };

    escFunction = (event) => {
        if (
            event.keyCode === 27 &&
            confirmButton("Are you sure you want to add?")
        ) {
            this.onSubmitEvent();
        }
    };

    async componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
        document.title = "Add new Sales Bill ";
        if (!window.location.hash) {
            window.location = window.location + "#loaded";
            window.location.reload();
        }
        document.addEventListener("wheel", function (event) {
            if (document.activeElement.type === "number") {
                document.activeElement.blur();
            }
        });
        fetch("https://virangi-creation.herokuapp.com/challan")
            .then((response) => response.json())
            .then(async (data) => {
                console.log(data);
                this.setState({ challans: data });
            })
            .then(async () => {
                await fetch("https://virangi-creation.herokuapp.com/firm")
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({ firms: data });
                    })
                    .catch((err) => console.log(err));
            })
            .then(async () => {
                await fetch("https://virangi-creation.herokuapp.com/party")
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({ parties: data });
                    })
                    .catch((err) => console.log(err));
            })
            .then(async () => {
                await fetch("https://virangi-creation.herokuapp.com/broker")
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({ brokers: data });
                    })
                    .catch((err) => console.log(err));
            })
            .then(async () => {
                await fetch("https://virangi-creation.herokuapp.com/quality")
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({ qualities: data });
                    })
                    .catch((err) => console.log(err));
            })
            .then(async () => {
                await fetch(
                    "https://virangi-creation.herokuapp.com/salesreport"
                )
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({ salesOrders: data });
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    // selectFirm() {
    //     let { firms } = this.state;
    //     let selectFirms = "";
    //     if (firms) {
    //         let temp;
    //         selectFirms = ReactHtmlParser(
    //             firms.reduce((acc, firm) => {
    //                 temp = `<option value="${firm.firmname}">${firm.firmname}</option>`;
    //                 return acc + temp;
    //             }, "")
    //         );
    //     }
    //     return selectFirms;
    // }

    // selectQuality() {
    //     let { qualities } = this.state;
    //     let selectQualitites = "";
    //     if (qualities) {
    //         let temp;
    //         selectQualitites = ReactHtmlParser(
    //             qualities.reduce((acc, quality) => {
    //                 temp = `<option value="${quality.qualityname}">${quality.qualityname}</option>`;
    //                 return acc + temp;
    //             }, "")
    //         );
    //     }
    //     return selectQualitites;
    // }

    // selectParty() {
    //     let { parties } = this.state;
    //     let selectParties = "";
    //     if (parties) {
    //         let temp;
    //         selectParties = ReactHtmlParser(
    //             parties.reduce((acc, party) => {
    //                 temp = `<option value="${party.partyname}">${party.partyname}</option>`;
    //                 return acc + temp;
    //             }, "")
    //         );
    //     }
    //     return selectParties;
    // }

    // selectBroker() {
    //     let { brokers } = this.state;
    //     let selectBrokers = "";
    //     if (brokers) {
    //         let temp;
    //         selectBrokers = ReactHtmlParser(
    //             brokers.reduce((acc, broker) => {
    //                 temp = `<option value="${broker.brokername}">${broker.brokername}</option>`;
    //                 return acc + temp;
    //             }, "")
    //         );
    //     }
    //     return selectBrokers;
    // }

    // selectSalesOrder() {
    //     let { salesOrders } = this.state;
    //     let selectOrders = "";
    //     if (salesOrders) {
    //         let temp;
    //         selectOrders = ReactHtmlParser(
    //             salesOrders.reduce((acc, salesOrder) => {
    //                 temp = `<option value="${salesOrder.orderid}">${salesOrder.orderid} --- ${salesOrder.partyname} --- ${salesOrder.itemname} --- ${salesOrder.quantitymtr} --- ${salesOrder.rate} --- ${salesOrder.remainingquantitymtr}  </option>`;
    //                 return acc + temp;
    //             }, "")
    //         );
    //     }
    //     return selectOrders;
    // }

    updateState = () => {
        this.setState({
            maxinvoiceno: this.eleID("invoiceno"),
            salesbill: {
                invoiceno: this.eleID("invoiceno").toUpperCase(),
                invoicedate: this.eleID("invoicedate"),
                challanno: this.eleID("challanno").toUpperCase(),
                challandate: this.eleID("challandate"),
                paymentdays: this.eleID("paymentdays"),
                duedate: this.eleID("duedate"),
                vehicleno: this.eleID("vehicleno").toUpperCase(),
                orderid: this.eleID("orderid"),
                orderdate: this.eleID("orderdate"),
                partyname: this.eleID("partyname"),
                broker: this.eleID("broker"),
                firmname: this.eleID("firmname"),
                itemname: this.eleID("itemname"),
                quantitymtr: this.eleID("quantitymtr"),
                quantitytaka: this.eleID("quantitytaka"),
                quantityweight: this.eleID("quantityweight"),
                rate: this.eleID("rate"),
                vatavper: this.eleID("vatavper"),
                gst: this.eleID("gst"),
                price: this.eleID("price"),
                amount: this.eleID("amount"),
                vatavamount: this.eleID("vatavamount"),
                adjustedamount: this.eleID("adjustedamount"),
                cgstamount: this.eleID("cgstamount"),
                sgstamount: this.eleID("cgstamount"),
                totalamount: this.eleID("totalamount"),
                interestrate: this.eleID("interestrate"),
                intereststart: this.eleID("intereststart"),
                close: document.getElementById("close").checked,
            },
        });
    };

    render() {
        let qualities = this.selectQuality();
        let parties = this.selectParty();
        let brokers = this.selectBroker();
        let firms = this.selectFirm();
        let orders = this.selectSalesOrder();
        const { salesbill, challans } = this.state;
        console.log("Challan:", challans);
        return (
            <div className="body-content">
                <div className="module">
                    <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                        Add New Sales bill
                    </h1>
                    <div className="column">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Challan No.</td>
                                    <td>
                                        <select
                                            name="challanno"
                                            id="challanno"
                                            onChange={() => {
                                                this.updateChallan();
                                            }}
                                        >
                                            <option value="NA">
                                                Select Challan No.
                                            </option>
                                            {challans.length > 0 &&
                                                challans.map((challan) => {
                                                    return (
                                                        <option
                                                            value={
                                                                challan.challanno
                                                            }
                                                        >
                                                            {challan.challanno}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        <br />
                                        <Link to="/challan/add">
                                            Add new Challan
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Order No.</td>
                                    <td>
                                        <select
                                            name="orderid"
                                            id="orderid"
                                            onChange={() => {
                                                this.updateAll();
                                            }}
                                        >
                                            <option value="NA">
                                                Select Order No.
                                            </option>
                                            {/* {orders} */}
                                        </select>
                                        <br />
                                        <Link to="/salesorder/add">
                                            Add new Sales Order
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Firm</td>
                                    <td>
                                        <select
                                            name="firmname"
                                            id="firmname"
                                            value={salesbill.firmname}
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                        >
                                            <option value="NA">
                                                Select Firm
                                            </option>
                                            {/* {firms} */}
                                        </select>
                                        <br />
                                        <Link to="/firm/add">
                                            Add new Firms
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Invoice No.</td>
                                    <td>
                                        <input
                                            value={this.state.maxinvoiceno}
                                            type="number"
                                            onChange={this.updateState}
                                            id="invoiceno"
                                            placeholder="Invoice. No."
                                            required
                                            autoFocus
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Invoice Date</td>
                                    <td>
                                        <input
                                            value={salesbill.invoicedate}
                                            onChange={() => {
                                                onDateChange();
                                                this.updateState();
                                            }}
                                            type="date"
                                            id="invoicedate"
                                            required
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Quantity TAKA</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="quantitytaka"
                                            onChange={() => {
                                                updateAmount();
                                                this.updateState();
                                            }}
                                            value={salesbill.quantitytaka}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Quantity MTR</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="quantitymtr"
                                            onChange={() => {
                                                updateAmount();
                                                this.updateState();
                                            }}
                                            value={salesbill.quantitymtr}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Quantity Weight</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="quantityweight"
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                            value={salesbill.quantityweight}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Vatav %</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="vatavper"
                                            onK
                                            onChange={() => {
                                                updateAmount();
                                                this.updateState();
                                            }}
                                            value={salesbill.vatavper}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total Amount</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="totalamount"
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                            value={salesbill.totalamount}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Payment Days</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="paymentdays"
                                            value={salesbill.paymentdays}
                                            onChange={() => {
                                                onDateChange();
                                                this.updateState();
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Interest Rate</td>
                                    <td>
                                        <input
                                            type="number"
                                            name="interestrate"
                                            id="interestrate"
                                            value={salesbill.interestrate}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Interest Start (Days)</td>
                                    <td>
                                        <input
                                            type="number"
                                            name="intereststart"
                                            id="intereststart"
                                            value={salesbill.intereststart}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Challan Date</td>
                                    <td>
                                        <input
                                            value={salesbill.invoicedate}
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                            type="date"
                                            id="challandate"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Vehicle No.</td>
                                    <td>
                                        <input
                                            value={salesbill.vehicleno}
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                            type="text"
                                            id="vehicleno"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Order Date</td>
                                    <td>
                                        <input
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                            type="date"
                                            value={salesbill.orderdate}
                                            id="orderdate"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Party</td>
                                    <td>
                                        <select
                                            name="partyname"
                                            id="partyname"
                                            value={salesbill.partyname}
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                        >
                                            <option value="NA">
                                                Select Party
                                            </option>
                                            {/* {parties} */}
                                        </select>
                                        <br />
                                        <Link to="/party/add">
                                            Add new Party
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Broker</td>
                                    <td>
                                        <select
                                            name="broker"
                                            id="broker"
                                            value={salesbill.broker}
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                        >
                                            <option value="NA">
                                                Select Broker
                                            </option>
                                            {/* {brokers} */}
                                        </select>
                                        <br />
                                        <Link to="/broker/add">
                                            Add new Broker
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Item</td>
                                    <td>
                                        <select
                                            name="itemname"
                                            id="itemname"
                                            value={salesbill.itemname}
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                        >
                                            <option value="NA">
                                                Select Item
                                            </option>
                                            {/* {qualities} */}
                                        </select>
                                        <br />
                                        <Link to="/yarnquality/add">
                                            Add new Yarn Quality
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Rate</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="rate"
                                            onChange={() => {
                                                updateAmount();
                                                this.updateState();
                                            }}
                                            value={salesbill.rate}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>GST Per</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="gst"
                                            onChange={() => {
                                                updateAmount();
                                                this.updateState();
                                            }}
                                            value={salesbill.gst}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="price"
                                            onChange={() => {
                                                updateAmount();
                                                this.updateState();
                                            }}
                                            value={salesbill.price}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Amount</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="amount"
                                            onChange={() => {
                                                updateAmount();
                                                this.updateState();
                                            }}
                                            value={salesbill.amount}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Vatav Amount</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="vatavamount"
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                            value={salesbill.vatavamount}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Adj. Amount</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="adjustedamount"
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                            value={salesbill.adjustedamount}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>CGST @ {salesbill.gst / 2}%</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="cgstamount"
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                            value={salesbill.cgstamount}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>SGST @ {salesbill.gst / 2}%</td>
                                    <td>
                                        <input
                                            type="number"
                                            id="sgstamount"
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                            value={salesbill.sgstamount}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Due Date</td>
                                    <td>
                                        <input
                                            type="date"
                                            id="duedate"
                                            value={salesbill.duedate}
                                            onChange={() => {
                                                this.updateState();
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Close Order</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="close"
                                            id="close"
                                            value={salesbill.close}
                                        />
                                        <label htmlFor="close">
                                            Close Order
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Comments</td>
                                    <td>
                                        <input
                                            className="greyPH"
                                            type="text"
                                            placeholder="Any Comments"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <Button onClick={this.onSubmitEvent} type="button">
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default InputSalesBill;
