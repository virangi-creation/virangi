import React, { useEffect, useState } from "react";
import convertRupeesIntoWords from "convert-rupees-into-words";
import "./bill.css";
import ContentPrototype from "../../Containers/ContentPrototype";
import logo from "../../Containers/Pictures/logo.png";

function PrintSalesBill() {
    const [salesBill, setSalesBill] = useState({});
    const [loaded, setLoaded] = useState(false);

    let challandate = new Date(salesBill.challandate);

    challandate =
        challandate.getDate() +
        "/" +
        ("00" + parseInt(challandate.getMonth() + 1)).slice(-2) +
        "/" +
        challandate.getFullYear();

    let invoicedate = new Date(salesBill.invoicedate);

    invoicedate =
        invoicedate.getDate() +
        "/" +
        ("00" + parseInt(invoicedate.getMonth() + 1)).slice(-2) +
        "/" +
        invoicedate.getFullYear();
    let orderdate = new Date(salesBill.orderdate);

    orderdate =
        orderdate.getDate() +
        "/" +
        ("00" + parseInt(orderdate.getMonth() + 1)).slice(-2) +
        "/" +
        orderdate.getFullYear();

    const srWidth = "5%";
    const desWidth = "25%";
    const hsnWidth = "10%";
    const takaWidth = "10%";
    const mtrWidth = "10%";
    const rateWidth = "10%";
    const amountWidth = "10%";

    let roundOff = salesBill ? salesBill.totalamount % 1 : 0;
    roundOff = roundOff >= 0.5 ? roundOff - 1 : roundOff;
    let finalAmount = salesBill ? salesBill.totalamount - roundOff : 0;

    useEffect(() => {
        setTimeout(() => {
            fetch("https://virangi-creation.herokuapp.com/printsalesbill")
                .then((data) => data.json())
                .then((res) => {
                    console.log("RES:", res);
                    setSalesBill(res.salesBill);
                    setLoaded(true);
                });
        }, 1000);
    }, []);
    // if (loaded) {
    //     return (
    //         <div className="main-bill">
    //             <div className="headers">
    //                 <div className="image">
    //                     <img
    //                         style={{ margin: "10px 33%" }}
    //                         src={logo}
    //                         alt="Forum Logo"
    //                         height="100px"
    //                         width="auto"
    //                     />
    //                 </div>
    //                 <div className="header-content">
    //                     <p className="center" style={{ marginTop: "20px" }}>
    //                         ॥ श्री गणेशाय नमः ॥
    //                     </p>
    //                     <p className="center pa5" style={{ fontSize: "30px" }}>
    //                         TAX INVOICE
    //                     </p>
    //                     <h2
    //                         className="firmname "
    //                         style={{ fontSize: "40px", marginBottom: "10px" }}
    //                     >
    //                         Hariom Synthetics
    //                     </h2>
    //                     <p className="center" style={{ marginBottom: "40px" }}>
    //                         5814, Road No - 58, Sachin G.I.D.C., Sachin, Surat -
    //                         394230
    //                     </p>
    //                 </div>
    //             </div>
    //             <div className="firm-details-salesbill">
    //                 <div className="left-firm-details">
    //                     <ContentPrototype
    //                         heading="GSTIN"
    //                         content="24AIUPP2987K1ZC"
    //                         boldContent={true}
    //                     />
    //                     <ContentPrototype
    //                         heading="PAN No."
    //                         content="AIUPP2987K"
    //                         boldContent={true}
    //                     />
    //                 </div>
    //                 <div className="right-firm-details">
    //                     <ContentPrototype
    //                         heading="Phone No."
    //                         content="9913728256"
    //                         boldContent={false}
    //                     />
    //                     <ContentPrototype
    //                         heading="Email ID"
    //                         content="hariomsynthatics@gmail.com"
    //                         boldContent={false}
    //                     />
    //                 </div>
    //             </div>
    //             <div className="right-receiver-details">
    //                 <div className="left-inner-salesbill">
    //                     <ContentPrototype
    //                         heading="Invoice No."
    //                         content={salesBill.invoiceno}
    //                         boldContent={true}
    //                     />

    //                     <ContentPrototype
    //                         heading="Invoice Date"
    //                         content={invoicedate}
    //                         boldContent={true}
    //                     />
    //                 </div>
    //                 <div className="right-inner-salesbill">
    //                     <ContentPrototype
    //                         heading="Challan No."
    //                         content={salesBill.challanno}
    //                         boldContent={false}
    //                     />
    //                     <ContentPrototype
    //                         heading="Challan Date"
    //                         content={challandate}
    //                         boldContent={false}
    //                     />
    //                     <ContentPrototype
    //                         heading="Vehicle No."
    //                         content={salesBill.tempno}
    //                         boldContent={false}
    //                     />
    //                     <ContentPrototype
    //                         heading="Agent"
    //                         content={challan.agent}
    //                         boldContent={false}
    //                     />
    //                 </div>
    //             </div>
    //             <div className="address-headings">
    //                 <p
    //                     className="address-heading"
    //                     style={{ borderRight: "2px solid black" }}
    //                 >
    //                     <b>DETAILS OF RECEIVER (BILLED TO)</b>
    //                 </p>
    //                 <p className="address-heading">
    //                     <b>DETAILS OF CONSIGNEE (SHIPPED TO)</b>
    //                 </p>
    //             </div>
    //             <div className="receiver-details-salesbill">
    //                 <div
    //                     className="left-receiver-column"
    //                     style={{ borderRight: "2px solid black" }}
    //                 >
    //                     <ContentPrototype
    //                         heading="Name"
    //                         content={salesBill.partyname}
    //                         boldContent={true}
    //                     />
    //                     <ContentPrototype
    //                         heading="Address"
    //                         content={salesBill.billingadd}
    //                         boldContent={false}
    //                     />
    //                     <br />
    //                     <ContentPrototype
    //                         heading="GSTIN"
    //                         content={salesBill.partygst}
    //                         boldContent={true}
    //                     />
    //                 </div>
    //                 <div className="right-receiver-column">
    //                     <ContentPrototype
    //                         heading="Name"
    //                         content={salesBill.deliveryparty}
    //                         boldContent={true}
    //                     />
    //                     <ContentPrototype
    //                         heading="Address"
    //                         content={salesBill.deliveryadd}
    //                         boldContent={false}
    //                     />
    //                 </div>
    //             </div>
    //             <div className="description">
    //                 <div className="salesbill-table">
    //                     <table
    //                         style={{
    //                             minHeight: "300px",
    //                         }}
    //                     >
    //                         <tbody>
    //                             <tr
    //                                 style={{
    //                                     border: "1px solid black",
    //                                 }}
    //                             >
    //                                 <td
    //                                     style={{
    //                                         border: "1px solid black",
    //                                         width: srWidth,
    //                                     }}
    //                                 >
    //                                     Sr
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         border: "1px solid black",
    //                                         width: desWidth,
    //                                     }}
    //                                 >
    //                                     Description
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         border: "1px solid black",
    //                                         width: hsnWidth,
    //                                     }}
    //                                 >
    //                                     HSN Code
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         border: "1px solid black",
    //                                         width: takaWidth,
    //                                     }}
    //                                 >
    //                                     Total Taka
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         border: "1px solid black",
    //                                         width: mtrWidth,
    //                                     }}
    //                                 >
    //                                     Meters
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         border: "1px solid black",
    //                                         width: rateWidth,
    //                                     }}
    //                                 >
    //                                     Basic Rate
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         border: "1px solid black",
    //                                         width: amountWidth,
    //                                     }}
    //                                 >
    //                                     Total Amount
    //                                 </td>
    //                             </tr>
    //                             <tr>
    //                                 <td
    //                                     style={{
    //                                         width: srWidth,
    //                                         borderRight: "1px solid black",
    //                                         borderLeft: "1px solid black",
    //                                     }}
    //                                 >
    //                                     1
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         width: desWidth,
    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 >
    //                                     {challan.quality}
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         width: hsnWidth,
    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 >
    //                                     5407
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         width: takaWidth,
    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 >
    //                                     {challan.totaltakas}
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         width: mtrWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 >
    //                                     {challan.totalmeters.toFixed(2)}
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         width: rateWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 >
    //                                     {salesBill.rate.toFixed(2)}
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         width: amountWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 >
    //                                     {salesBill.amount.toFixed(2)}
    //                                 </td>
    //                             </tr>
    //                             <tr style={{ height: "160px" }}>
    //                                 <td
    //                                     style={{
    //                                         width: srWidth,

    //                                         borderRight: "1px solid black",
    //                                         borderLeft: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                                 <td
    //                                     style={{
    //                                         width: desWidth,
    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                                 <td
    //                                     style={{
    //                                         width: hsnWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                                 <td
    //                                     style={{
    //                                         width: takaWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>{" "}
    //                                 <td
    //                                     style={{
    //                                         width: mtrWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>{" "}
    //                                 <td
    //                                     style={{
    //                                         width: rateWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>{" "}
    //                                 <td
    //                                     style={{
    //                                         width: amountWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                             </tr>
    //                             <tr>
    //                                 <td
    //                                     style={{
    //                                         width: srWidth,

    //                                         borderRight: "1px solid black",
    //                                         borderLeft: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                                 <td
    //                                     style={{
    //                                         width: desWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 >
    //                                     <b>NO DYEING GUARANTEE</b>
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         width: hsnWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                                 <td
    //                                     style={{
    //                                         width: takaWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>{" "}
    //                                 <td
    //                                     style={{
    //                                         width: mtrWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>{" "}
    //                                 <td
    //                                     style={{
    //                                         width: rateWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>{" "}
    //                                 <td
    //                                     style={{
    //                                         width: amountWidth,

    //                                         borderRight: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                             </tr>
    //                             <tr>
    //                                 <td
    //                                     style={{
    //                                         width: srWidth,
    //                                         borderRight: "1px solid black",
    //                                         borderBottom: "1px solid black",
    //                                         borderLeft: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                                 <td
    //                                     style={{
    //                                         width: desWidth,
    //                                         borderRight: "1px solid black",
    //                                         borderBottom: "1px solid black",
    //                                         color: "white",
    //                                     }}
    //                                 >
    //                                     .
    //                                 </td>
    //                                 <td
    //                                     style={{
    //                                         width: hsnWidth,
    //                                         borderRight: "1px solid black",
    //                                         borderBottom: "1px solid black",
    //                                     }}
    //                                 ></td>{" "}
    //                                 <td
    //                                     style={{
    //                                         width: takaWidth,
    //                                         borderRight: "1px solid black",
    //                                         borderBottom: "1px solid black",
    //                                     }}
    //                                 ></td>{" "}
    //                                 <td
    //                                     style={{
    //                                         width: mtrWidth,
    //                                         borderRight: "1px solid black",
    //                                         borderBottom: "1px solid black",
    //                                     }}
    //                                 ></td>{" "}
    //                                 <td
    //                                     style={{
    //                                         width: rateWidth,
    //                                         borderRight: "1px solid black",
    //                                         borderBottom: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                                 <td
    //                                     style={{
    //                                         width: amountWidth,
    //                                         borderRight: "1px solid black",
    //                                         borderBottom: "1px solid black",
    //                                     }}
    //                                 ></td>
    //                             </tr>
    //                         </tbody>
    //                     </table>
    //                 </div>
    //                 <div className="totalamountdetails">
    //                     <div className="lowerleft">
    //                         <div className="bank">
    //                             <h2>-: Bank Details :-</h2>
    //                         </div>
    //                         <div className="bankdetails">
    //                             <div className="content-prototype">
    //                                 <div className="heading">Bank</div>
    //                                 <div className="colon">:</div>
    //                                 <div className="content">
    //                                     <b>{account.bankname}</b>
    //                                 </div>
    //                             </div>
    //                             <div className="content-prototype">
    //                                 <div className="heading">A/c No.</div>
    //                                 <div className="colon">:</div>
    //                                 <div className="content">
    //                                     <b>{account.accountno}</b>
    //                                 </div>
    //                             </div>
    //                             <div className="content-prototype">
    //                                 <div className="heading">IFSC</div>
    //                                 <div className="colon">:</div>
    //                                 <div className="content">
    //                                     <b>{account.ifsccode}</b>
    //                                 </div>
    //                             </div>
    //                             <div className="content-prototype">
    //                                 <div className="heading">Branch</div>
    //                                 <div className="colon">:</div>
    //                                 <div className="content">
    //                                     <b>{account.branch}</b>
    //                                 </div>
    //                             </div>{" "}
    //                         </div>
    //                         <br />
    //                         <br />
    //                         {/* <div className="payment-terms">
    //                             <div className="duedates1">
    //                                 <div className="temp-terms">
    //                                     <ContentPrototype
    //                                         content={`${salesBill.duedate.substr(
    //                                             8,
    //                                             2
    //                                         )}-${salesBill.duedate.substr(
    //                                             5,
    //                                             2
    //                                         )}-${salesBill.duedate.substr(
    //                                             0,
    //                                             4
    //                                         )} `}
    //                                         heading="Due Date"
    //                                         boldContent={true}
    //                                     />
    //                                     <ContentPrototype
    //                                         content={salesBill.paymentdays}
    //                                         heading="Due Days"
    //                                         boldContent={true}
    //                                     />
    //                                 </div>
    //                             </div>
    //                             <div className="duedates2">
    //                                 <div className="temp-terms">
    //                                     <ContentPrototype
    //                                         content={`${salesBill.interestrate}%`}
    //                                         heading="Interest Rate"
    //                                         boldContent={true}
    //                                     />
    //                                     <ContentPrototype
    //                                         heading="Int. Start Days"
    //                                         content={salesBill.intereststart}
    //                                         boldContent={true}
    //                                     />
    //                                 </div>
    //                             </div>
    //                         </div> */}
    //                     </div>
    //                     <div className="lowerright-amount">
    //                         <br />
    //                         <div className="content-prototype">
    //                             <div className="heading">
    //                                 Total Amount Before Tax
    //                             </div>
    //                             <div className="colon">:</div>
    //                             <div className="content">
    //                                 {salesBill.amount.toFixed(2)}
    //                             </div>
    //                         </div>
    //                         <div className="content-prototype">
    //                             <div className="heading">
    //                                 Vatav @ {salesBill.vatavper.toFixed(2)}%
    //                             </div>
    //                             <div className="colon">:</div>
    //                             <div className="content">
    //                                 {`- ${salesBill.vatavamount.toFixed(2)}`}
    //                             </div>
    //                         </div>
    //                         <div className="content-prototype">
    //                             <div className="heading">
    //                                 CGST @ {(salesBill.gst / 2).toFixed(2)}%
    //                             </div>
    //                             <div className="colon">:</div>
    //                             <div className="content">
    //                                 {salesBill.cgstamount.toFixed(2)}
    //                             </div>
    //                         </div>
    //                         <div className="content-prototype">
    //                             <div className="heading">
    //                                 SGST @ {(salesBill.gst / 2).toFixed(2)}% :
    //                             </div>
    //                             <div className="colon">:</div>
    //                             <div className="content">
    //                                 {salesBill.sgstamount.toFixed(2)}
    //                             </div>
    //                         </div>
    //                         <div className="content-prototype">
    //                             <div className="heading">
    //                                 <b> Total</b>
    //                             </div>
    //                             <div className="colon">:</div>
    //                             <div className="content">
    //                                 <b>{salesBill.totalamount.toFixed(2)}</b>
    //                             </div>
    //                         </div>
    //                         <div className="content-prototype">
    //                             <div className="heading">Round Off </div>
    //                             <div className="colon">:</div>
    //                             <div className="content">
    //                                 {`± ${roundOff.toFixed(2)}`}
    //                             </div>
    //                         </div>
    //                         <div
    //                             className="content-prototype"
    //                             style={{ marginTop: "20px" }}
    //                         >
    //                             <div className="heading">
    //                                 <h1 style={{ fontSize: "larger" }}>
    //                                     Final Amount
    //                                 </h1>
    //                             </div>
    //                             <div className="colon">:</div>
    //                             <div className="content">
    //                                 <h1 style={{ fontSize: "larger" }}>
    //                                     {finalAmount.toFixed(2)}
    //                                 </h1>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="amountinwords">
    //                     ₹ {convertRupeesIntoWords(finalAmount).toUpperCase()}{" "}
    //                     ONLY
    //                 </div>
    //                 <div className="receiveddetails">
    //                     <div className="paymentdetails">
    //                         <div className="paiddetails">
    //                             <h2> Received / Paid Details</h2>
    //                         </div>
    //                         <div
    //                             className="content-prototype"
    //                             style={{ marginTop: "20px" }}
    //                         >
    //                             <div className="heading">Cheque No.</div>
    //                             <div className="colon">:</div>
    //                             <div className="content"></div>
    //                         </div>
    //                         <div className="content-prototype">
    //                             <div className="heading">Amount</div>
    //                             <div className="colon">:</div>
    //                             <div className="content"></div>
    //                         </div>{" "}
    //                         <div className="content-prototype">
    //                             <div className="heading">Cheque Date</div>
    //                             <div className="colon">:</div>
    //                             <div className="content"></div>
    //                         </div>{" "}
    //                         <div className="content-prototype">
    //                             <div className="heading">Rec. Date</div>
    //                             <div className="colon">:</div>
    //                             <div className="content"></div>
    //                         </div>{" "}
    //                         <div className="content-prototype">
    //                             <div className="heading">Bank</div>
    //                             <div className="colon">:</div>
    //                             <div className="content"></div>
    //                         </div>
    //                     </div>
    //                     <div className="companysign">
    //                         <div className="firmname">
    //                             <span>For&nbsp;</span>
    //                             <b>{firm.firmname}</b>
    //                         </div>
    //                         <br />
    //                         <br />
    //                         <br />
    //                         <div className="signatory">
    //                             Director/Authorised Person
    //                         </div>
    //                         <br />
    //                         <br />
    //                     </div>
    //                 </div>
    //                 <div className="terms">
    //                     <p
    //                         style={{
    //                             paddingLeft: "40px",
    //                             paddingTop: "10px",

    //                             marginBottom: "5px",
    //                         }}
    //                     >
    //                         TERMS OF SALES:-
    //                     </p>
    //                     <p
    //                         style={{
    //                             fontSize: "large",
    //                             paddingLeft: "80px",
    //                             paddingBottom: "10px",
    //                         }}
    //                     >
    //                         (1) Payment to be made by A/c. payee's cheque/draft
    //                         only. <br />
    //                         (2) Any complaint for the goods should be made
    //                         within 2 days after that no comlaint will be
    //                         entertained. <br />
    //                         (3) Interest @ 24% per annum will be charged after
    //                         due date of the bill. <br />
    //                         (4) We are not responsible for any loss or damage
    //                         during transit. <br />
    //                         (5) We reserve the right of recovery at any time
    //                         before due date. <br />
    //                         (6) Goods once sold will not be taken back. <br />
    //                         (7) Do not mix types of lots. <br />
    //                         (8) Subject to SURAT Jurisdiction.
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else {
    return <div>Loading...</div>;
    // }
}

export default PrintSalesBill;
