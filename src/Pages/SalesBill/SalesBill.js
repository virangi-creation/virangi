import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { confirmButton } from "./EventHandler";
import { Link } from "react-router-dom";

class SalesBill extends Component {
    constructor() {
        super();
        this.state = {
            route: "table",
            searchedSalesBill: -1,
            selectedSalesBill: { invoiceno: -1 },
            salesBills: [
                {
                    invoiceno: -1,
                },
            ],
            searchedSalesBills: [
                {
                    invoiceno: -1,
                },
            ],
        };
    }

    deleteRequest = () => {
        if (confirmButton()) {
            fetch(
                "https://virangi-creation.herokuapp.com/deletesalesbill"
            ).catch((err) => console.log(err));
            window.location.reload();
        }
    };
    componentDidMount() {
        let date = new Date();
        let strDate = date.toString().substr(4, 11);
        document.title = "Sales Bill " + strDate;
        document.addEventListener("wheel", function (event) {
            if (document.activeElement.type === "number") {
                document.activeElement.blur();
            }
        });
        fetch("https://virangi-creation.herokuapp.com/salesbill")
            .then((res) => res.json())
            .then(async (data) => {
                console.log(data);
                await data.sort((b, a) =>
                    a.invoiceno.localeCompare(b.invoiceno)
                );
                this.setState({ salesBills: data, searchedSalesBills: data });
            })
            .catch((err) => console.log(err));
    }

    closeRequest = () => {
        if (confirmButton()) {
            fetch("https://virangi-creation.herokuapp.com/closesalesbill", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    selectedSalesBillInvoiceNo:
                        this.state.searchedSalesBill.invoiceno,
                }),
            }).catch((err) => console.log(err));
            window.location.reload();
        }
    };

    openRequest = () => {
        if (confirmButton()) {
            fetch("https://virangi-creation.herokuapp.com/opensalesbill", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    selectedSalesBillInvoiceNo:
                        this.state.searchedSalesBill.invoiceno,
                }),
            }).catch((err) => console.log(err));
            window.location.reload();
        }
    };

    onGroupChange = (e) => {
        const { salesBills } = this.state;
        const val = e.target.value.toUpperCase();
        let tempSearchedBills = [];
        salesBills.map((salesbill) => {
            if (
                salesbill.challanno.includes(val) ||
                salesbill.partyname.includes(val) ||
                salesbill.itemname.includes(val) ||
                salesbill.firmname.includes(val) ||
                salesbill.broker.includes(val)
            )
                tempSearchedBills.push(salesbill);
        });
        this.setState({ searchedSalesBills: tempSearchedBills });
    };

    printBill = (invoiceno) => {
        fetch("https://virangi-creation.herokuapp.com/searchedsalesbill", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                searchedSalesBill: invoiceno,
            }),
        }).catch((err) => console.log(err));
    };
    onSearchChange = () => {
        const { salesBills } = this.state;
        let val = document.getElementById("searchSalesBill").value;
        this.setState({ selectedSalesInvoiceNO: val });
        for (let i = 0; i < salesBills.length; i++) {
            const salesBill = salesBills[i];
            if (salesBill.invoiceno == val) {
                this.setState({ searchedSalesBill: salesBill });
                break;
            }
        }
    };

    findDayDifference(date1, date2) {
        return Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
    }

    showSearchedItem = (invoiceno) => {
        let val = document.getElementById("searchSalesBill").value;
        if (invoiceno) {
            val = parseInt(invoiceno);
        }
        if (val !== -1) {
            this.setState({ route: "search", selectedSalesInvoiceNO: val });
            fetch("https://virangi-creation.herokuapp.com/searchedsalesbill", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    searchedSalesBill: this.state.searchedSalesBill,
                }),
            }).catch((err) => console.log(err));
        }
    };

    render() {
        if (this.state.route === "search") {
            let salesBill = this.state.searchedSalesBill;
            var dueDate = new Date(salesBill.duedate);
            let curr = new Date();
            var remainingDays = this.findDayDifference(curr, dueDate);
            var intDays =
                remainingDays - salesBill.paymentdays + salesBill.intereststart;
            var interestamount = 0;
            var perDayInterest = (
                (salesBill.totalamount * salesBill.interestrate) /
                36500
            ).toFixed(2);
            if (intDays < 0) {
                interestamount = (perDayInterest * intDays * -1).toFixed(2);
            }
            curr = new Date(salesBill.invoicedate);
            let idate = curr.toString().substr(4, 11);

            let fName =
                salesBill.firmname === "VIRANGI CREATION PRIVATE LIMITED"
                    ? "VCPL"
                    : "VWPL";

            curr = new Date(salesBill.challandate);
            let cdate = curr.toString().substr(4, 11);

            curr = new Date(salesBill.orderdate);
            let odate = curr.toString().substr(4, 11);

            curr = new Date(salesBill.duedate);
            let duedate = curr.toString().substr(4, 11);

            var finalAmount =
                parseFloat(salesBill.totalamount) + parseFloat(interestamount);

            var totalamount = salesBill.totalamount;

            let onIsOver = salesBill.isover;
            if (salesBill.isover) {
                onIsOver = "Close";
            } else {
                onIsOver = "-";
            }

            let temp = `<tr>
                            <td>${fName}</td>
                            <td>${salesBill.invoiceno % 10000}</td>
                            <td>${idate}</td>
                            <td>${salesBill.challanno}</td>
                            <td>${cdate}</td>
                            <td>${salesBill.vehicleno}</td>
                            <td>${salesBill.orderid}</td>
                            <td>${odate}</td>
                            <td>${salesBill.partyname}</td>
                            <td>${salesBill.broker}</td>
                            <td>${salesBill.itemname}</td>
                            <td>${salesBill.quantitytaka}</td>
                            <td>${salesBill.quantitymtr}</td>
                            <td>${salesBill.rate}</td>
                            <td>${salesBill.vatavper}</td>
                            <td>${salesBill.gst}</td>
                            <td>${salesBill.price}</td>
                            <td>${salesBill.amount}</td>
                            <td>${salesBill.vatavamount}</td>
                            <td>${salesBill.adjustedamount}</td>
                            <td>${salesBill.cgstamount}</td>
                            <td>${salesBill.sgstamount}</td>
                            <td>${totalamount}</td>   
                            <td>${salesBill.interestrate}</td> 
                            <td>${salesBill.intereststart}</td> 
                            <td>${salesBill.paymentdays}</td>
                            <td>${duedate}</td>                  
                            <td>${remainingDays}</td>       
                            <td>${perDayInterest}</td>
                            <td>${interestamount}</td> 
                            <td>${finalAmount}</td>  
                            <td>${onIsOver}</td>   
                        </tr>`;

            return (
                <div className="margin">
                    <table
                        style={{
                            margin: "50px auto",
                            overflowX: "auto",
                            overflowY: "scroll",
                        }}
                    >
                        <tbody>
                            <tr>
                                <th>Firm Name</th>
                                <th>Invoice No.</th>
                                <th></th>
                                <th></th>
                                <th>Invoice Date</th>
                                <th>Challan No.</th>
                                <th>Challan Date</th>
                                <th>Vehicle No.</th>
                                <th>Order No.</th>
                                <th>Order Date</th>
                                <th>Party Name</th>
                                <th>Broker</th>
                                <th>Gray Quality</th>
                                <th>Quantity TAKA</th>
                                <th>Quantity MTR</th>
                                <th>Rate</th>
                                <th>Vatav %</th>
                                <th>GST</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Vatav Amount</th>
                                <th>Adjusted Amount</th>
                                <th>CGST Amount</th>
                                <th>SGST Amount</th>
                                <th style={{ backgroundColor: "red" }}>
                                    Total Amount
                                </th>
                                <th>Interest Rate</th>
                                <th>Interest Start</th>
                                <th>Payment Days</th>
                                <th>Due Date</th>
                                <th>Remaining Days</th>
                                <th>Interest Per Day</th>
                                <th>Total Interest</th>
                                <th style={{ backgroundColor: "red" }}>
                                    Final Amount
                                </th>
                                <th>Is Over</th>
                            </tr>
                            {/* {allSalesBills} */}
                        </tbody>
                    </table>
                    <Link to="/salesbill/update">
                        <Button type="button">Update Sales Bill</Button>
                    </Link>
                </div>
            );
        } else {
            let salesBills = this.state.searchedSalesBills;
            let temp = "";
            let optionVar = salesBills.reduce((acc, salesBill) => {
                temp = `<option value='${salesBill.invoiceno}'>${
                    salesBill.invoiceno % 10000
                }</option>`;
                return acc + temp;
            }, "");
            temp = "";
            // let salesBillSelection = ReactHtmlParser(optionVar);
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
                            autoFocus
                            onKeyDown={this.onGroupChange}
                            style={{ width: "30%" }}
                            placeholder="Search Sales Bill"
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            margin: "10px auto",
                            minWidth: "30%",
                        }}
                    >
                        <select
                            autoFocus
                            onChange={this.onSearchChange}
                            style={{ width: "30%" }}
                            name="searchSalesBill"
                            id="searchSalesBill"
                        >
                            <option value="-1">Search Sales Bill</option>
                            {/* {salesBillSelection} */}
                        </select>
                    </div>

                    <Link to="/salesbill/add">
                        <Button type="button">Add new Sales Bill</Button>
                    </Link>
                    <table
                        border="1"
                        style={{
                            margin: "50px auto",
                            overflowX: "auto",
                            overflowY: "scroll",
                        }}
                    >
                        <tbody>
                            <tr>
                                <th>Firm Name</th>
                                <th>Invoice No.</th>
                                <th></th>
                                <th>Invoice Date</th>
                                <th>Challan No.</th>
                                <th>Challan Date</th>
                                <th>Vehicle No.</th>
                                <th>Order No.</th>
                                <th>Order Date</th>
                                <th>Party Name</th>
                                <th>Broker</th>
                                <th>Gray Quality</th>
                                <th>Quantity TAKA</th>
                                <th>Quantity MTR</th>
                                <th>Rate</th>
                                <th>Vatav %</th>
                                <th>GST</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Vatav Amount</th>
                                <th>Adjusted Amount</th>
                                {/* <th>CGST Amount</th>
                                <th>SGST Amount</th> */}

                                <th style={{ backgroundColor: "red" }}>
                                    Total Amount
                                </th>
                                <th>Interest Rate</th>
                                <th>Interest Start</th>
                                <th>Payment Days</th>
                                <th>Due Date</th>
                                <th>Remaining Days</th>
                                <th>Interest Per Day</th>
                                <th>Total Interest</th>
                                <th style={{ backgroundColor: "red" }}>
                                    Final Amount
                                </th>
                                <th>Is Over</th>
                            </tr>
                            {salesBills.map((salesBill, i) => {
                                let fName = salesBill.firmname;
                                if (
                                    salesBill.firmname ===
                                    "VIRANGI CREATION PRIVATE LIMITED"
                                )
                                    fName = "VCPL";
                                else if (
                                    salesBill.firmname ===
                                    "VIRANGI WEAVES PRIVATE LIMITED"
                                )
                                    fName = "VWPL";

                                var dueDate = new Date(salesBill.duedate);
                                let curr = new Date();
                                var remainingDays = this.findDayDifference(
                                    curr,
                                    dueDate
                                );
                                var intDays =
                                    remainingDays -
                                    salesBill.paymentdays +
                                    salesBill.intereststart;
                                console.log(intDays);
                                var idate = new Date(salesBill.invoicedate);

                                var interestamount = 0;
                                var perDayInterest = (
                                    (salesBill.totalamount *
                                        salesBill.interestrate) /
                                    36500
                                ).toFixed(2);
                                if (intDays < 0) {
                                    interestamount = parseFloat(
                                        perDayInterest * intDays * -1
                                    ).toFixed(0);
                                }
                                curr = new Date(salesBill.invoicedate);
                                idate = curr.toString().substr(4, 11);

                                curr = new Date(salesBill.challandate);
                                let cdate = curr.toString().substr(4, 11);

                                curr = new Date(salesBill.orderdate);
                                let odate = curr.toString().substr(4, 11);

                                curr = new Date(salesBill.duedate);
                                let duedate = curr.toString().substr(4, 11);

                                var finalAmount =
                                    parseFloat(salesBill.totalamount) +
                                    parseFloat(interestamount);

                                var totalamount = salesBill.totalamount;

                                let onIsOver = salesBill.isover;
                                if (salesBill.isover) {
                                    onIsOver = "Close";
                                } else {
                                    onIsOver = "-";
                                }
                                return (
                                    <tr>
                                        <td>{fName}</td>
                                        <td>{salesBill.invoiceno % 10000}</td>

                                        <td>
                                            <Link to="/salesbill/print">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        this.printBill(
                                                            salesBill.invoiceno
                                                        );
                                                    }}
                                                >
                                                    Print
                                                </button>
                                            </Link>
                                        </td>
                                        <td>{idate}</td>
                                        <td>{salesBill.challanno}</td>
                                        <td>{cdate}</td>
                                        <td>{salesBill.vehicleno}</td>
                                        <td>{salesBill.orderid}</td>
                                        <td>{odate}</td>
                                        <td>{salesBill.partyname}</td>
                                        <td>{salesBill.broker}</td>
                                        <td>{salesBill.itemname}</td>
                                        <td>{salesBill.quantitytaka}</td>
                                        <td>{salesBill.quantitymtr}</td>
                                        <td>{salesBill.rate}</td>
                                        <td>{salesBill.vatavper}</td>
                                        <td>{salesBill.gst}</td>
                                        <td>{salesBill.price}</td>
                                        <td>{salesBill.amount}</td>
                                        <td>{salesBill.vatavamount}</td>
                                        <td>{salesBill.adjustedamount}</td>
                                        {/* <td>{salesBill.cgstamount}</td> */}
                                        {/* <td>{salesBill.sgstamount}</td> */}
                                        <td>{totalamount}</td>
                                        <td>{salesBill.interestrate}</td>
                                        <td>{salesBill.intereststart}</td>
                                        <td>{salesBill.paymentdays}</td>
                                        <td>{duedate}</td>
                                        <td>{remainingDays}</td>
                                        <td>{perDayInterest}</td>
                                        <td>{interestamount}</td>
                                        <td>{finalAmount}</td>
                                        <td>{onIsOver}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}
export default SalesBill;
