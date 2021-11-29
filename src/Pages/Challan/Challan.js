import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";
import generateAddressString from "../../Util/generateAddressString.js";

function Challan() {
    const history = useHistory();

    let [load, setLoad] = useState(false);
    let [challans, setChallans] = useState([]);
    let [searchedChallan, setSearchedChallans] = useState([]);

    useEffect(async () => {
        try {
            setLoad(true);
            await axios
                .get("/challan")
                .then(({ data }) => {
                    setChallans(data);
                    setSearchedChallans(data);
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

    const searchChallanPage = (e) => {
        const val = e.target.value.toUpperCase();
        let tempSearchedChallan = [];
        challans.map((challan) => {
            if (
                challan.challanno.includes(val) ||
                challan.partyname.includes(val) ||
                challan.deliverypartyname.includes(val) ||
                challan.agentname.includes(val)
            )
                tempSearchedChallan.push(challan);
        });
        setSearchedChallans(tempSearchedChallan);
    };

    const hindiNumberFormatter = new Intl.NumberFormat("en-IN");
    let totalSarees = 0;
    searchedChallan.map((challan) => {
        totalSarees += parseFloat(challan.totalsarees);
    });

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
                    onChange={searchChallanPage}
                    placeholder="Search for challan...."
                    className={inputStyles.textInput}
                    autoFocus
                />
                <Link to="/challan/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Challan
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table
                    border="1"
                    className="table table-bordered table-hover table-responsive"
                    style={{ tableLayout: "fixed" }}
                >
                    <thead>
                        <tr>
                            <th>Challan No</th>
                            <th>Print</th>
                            <th>Update</th>
                            <th>Date</th>
                            <th>Party</th>
                            <th>Agent</th>
                            <th>Delivery Party</th>
                            <th>Delivery Address</th>
                            <th>Total Saress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchedChallan.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="4">No Agent Found yet</td>
                            </tr>
                        )}
                        {searchedChallan.length !== 0 &&
                            searchedChallan.map((challan) => {
                                let date = challan.challandate.substr(0, 10);

                                return (
                                    <tr key={challan.challanno}>
                                        <td>{challan.challanno}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                            >
                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/challan/print",
                                                        state: {
                                                            challanno:
                                                                challan.challanno,
                                                        },
                                                    }}
                                                >
                                                    Print
                                                </Link>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                            >
                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/challan/update",
                                                        state: {
                                                            challanno:
                                                                challan.challanno,
                                                        },
                                                    }}
                                                >
                                                    Update
                                                </Link>
                                            </button>
                                        </td>
                                        <td>{challan.agentname}</td>

                                        <td>{challan.partyname}</td>
                                        <td>{challan.agentname}</td>
                                        <td>{challan.deliverypartyname}</td>
                                        <td>{challan.deliveryaddress}</td>
                                        <td>
                                            {hindiNumberFormatter.format(
                                                challan.totalsarees
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            )}{" "}
        </div>
    );

    // return (
    //     <div>
    //         {load ? (
    //             <div>Loading...</div>
    //         ) : (
    //             <div>
    //                 <form action="">
    //                     <div
    //                         style={{
    //                             display: "flex",
    //                             justifyContent: "space-between",
    //                             margin: "10px auto",
    //                             alignItems: "center",
    //                             maxWidth: "40%",
    //                         }}
    //                     >
    //                         <input
    //                             onChange={searchChallanPage}
    //                             placeholder="Search for challan...."
    //                             autoFocus
    //                         />
    //                         <div className="container">
    //                             <div className="text-center">
    //                                 <Link to="challan/add">
    //                                     <Button
    //                                         className="btn btn-primary"
    //                                         type="button"
    //                                     >
    //                                         Add new Challan
    //                                     </Button>
    //                                 </Link>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </form>
    //                 <table
    //                     className="table table-bordered table-striped table-responsive"
    //                     // style={{
    //                     //     margin: "auto",
    //                     //     maxWidth: "90%",
    //                     //     maxHeight: "660px",
    //                     // }}
    //                 >
    //                     <tbody>
    //                         {/* <thead className="thead-light"> */}
    //                         <tr>
    //                             <th>Challan No</th>
    //                             <th
    //                             // style={{
    //                             //     maxWidth: "fit-content",
    //                             // }}
    //                             >
    //                                 Print
    //                             </th>
    //                             <th
    //                             // style={{
    //                             //     maxWidth: "fit-content",
    //                             // }}
    //                             >
    //                                 Update
    //                             </th>
    //                             <th>Date</th>
    //                             <th>Party</th>
    //                             <th>Agent</th>
    //                             <th>Delivery Party</th>
    //                             <th>Delivery Address</th>
    //                             <th>Total Saress</th>
    //                         </tr>
    //                         {/* </thead> */}
    //                         {/* <tbody> */}
    //                         {searchedChallan.map((challan) => {
    //                             let date = challan.challandate.substr(0, 10);
    //                             return (
    //                                 <tr
    //                                 // style={{ border: "1px solid black" }}
    //                                 >
    //                                     <td
    //                                     // style={{
    //                                     //     width: "7%",
    //                                     // }}
    //                                     >
    //                                         {challan.challanno}
    //                                     </td>
    //                                     <td
    //                                     // style={{
    //                                     //     width: "5%",
    //                                     // }}
    //                                     >
    //                                         <Link
    //                                             // style={{ color: "white" }}
    //                                             to={{
    //                                                 pathname: "/challan/print",
    //                                                 state: {
    //                                                     challanno:
    //                                                         challan.challanno,
    //                                                 },
    //                                             }}
    //                                         >
    //                                             <Button
    //                                                 type="button"
    //                                                 // style={{
    //                                                 //     cursor: "pointer",
    //                                                 //     border: "1px solid black",
    //                                                 // }}
    //                                             >
    //                                                 Print
    //                                             </Button>
    //                                         </Link>
    //                                     </td>
    //                                     <td
    //                                         style={{
    //                                             width: "7%",
    //                                         }}
    //                                     >
    //                                         <Link
    //                                             // style={{ color: "white" }}
    //                                             to={{
    //                                                 pathname: "/challan/update",
    //                                                 state: {
    //                                                     challanno:
    //                                                         challan.challanno,
    //                                                 },
    //                                             }}
    //                                         >
    //                                             <Button
    //                                                 type="button"
    //                                                 // style={{
    //                                                 //     cursor: "pointer",
    //                                                 //     border: "1px solid black",
    //                                                 // }}
    //                                             >
    //                                                 Update
    //                                             </Button>
    //                                         </Link>
    //                                     </td>

    //                                     <td
    //                                     // style={{
    //                                     //     fontSize: "medium",
    //                                     //     width: "8%",
    //                                     // }}
    //                                     >
    //                                         {date}
    //                                     </td>
    //                                     <td
    //                                     // style={{
    //                                     //     width: "20%",
    //                                     //     fontSize: "medium",
    //                                     // }}
    //                                     >
    //                                         {challan.partyname}
    //                                     </td>
    //                                     <td
    //                                     // style={{
    //                                     //     width: "20%",
    //                                     //     fontSize: "medium",
    //                                     // }}
    //                                     >
    //                                         {challan.agentname}
    //                                     </td>
    //                                     <td
    //                                     // style={{
    //                                     //     width: "15%",
    //                                     //     fontSize: "large",
    //                                     // }}
    //                                     >
    //                                         {challan.deliverypartyname}
    //                                     </td>
    //                                     <td
    //                                     // style={{
    //                                     //     width: "15%",
    //                                     //     fontSize: "large",
    //                                     // }}
    //                                     >
    //                                         {challan.deliveryaddress}
    //                                     </td>
    //                                     <td
    //                                     // style={{
    //                                     //     width: "5%",
    //                                     // }}
    //                                     >
    //                                         {hindiNumberFormatter.format(
    //                                             challan.totalsarees
    //                                         )}
    //                                     </td>
    //                                 </tr>
    //                             );
    //                         })}
    //                     </tbody>
    //                 </table>
    //                 <div
    //                 // style={{
    //                 //     display: "flex",
    //                 //     justifyContent: "space-between",
    //                 //     margin: "-10px auto 20px auto",
    //                 //     alignItems: "center",
    //                 //     maxWidth: "30%",
    //                 // }}
    //                 >
    //                     <h2>Total Sarees : {totalSarees}</h2>
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // );
}

export default Challan;
