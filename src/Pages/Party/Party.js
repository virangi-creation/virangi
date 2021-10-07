import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function Party() {
    const [parties, setParties] = useState([]);
    const [searchedParties, setSearchedParties] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let partyid = e;
            if (window.confirm("Are you sure you want to delete this party?")) {
                setLoad(true);
                await axios
                    .delete(`/party/${partyid}`)
                    .then(() => {
                        setLoad(false);
                        window.location.reload();
                    })
                    .catch(catchAxiosError);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        try {
            let date = new Date();
            let strDate = date.toLocaleString().substr(0, 10);
            document.title = "Party " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            axios
                .get(`/party/`)
                .then((res) => {
                    setParties(res.data);
                    setSearchedParties(res.data);
                    setLoad(false);
                })
                .catch(catchAxiosError);
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const onSearchChange = (e) => {
        let str = e.target.value;
        str = str.toUpperCase();
        let tempParties = [];
        parties.map((party) => {
            if (
                party.partyname.includes(str) ||
                party.leadingname.includes(str) ||
                party.agentname.includes(str)
            )
                tempParties.push(party);
        });
        setSearchedParties([...tempParties]);
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
                    placeholder="Search Party"
                    autoFocus
                />
                <Link to="/party/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Party
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table border="1" className={tableStyles.table}>
                    <tbody>
                        <tr>
                            <th>Party ID</th>
                            <th>Agent Name</th>
                            <th>Party Type</th>
                            <th>Party Name</th>
                            <th>Leading Name</th>
                            <th>Leading Phone No</th>
                            <th>Accountant Name</th>
                            <th>Accountant Phone</th>
                            <th>GST</th>
                            <th>PAN</th>
                            <th>EMAIL</th>
                            <th>CIN</th>
                            <th>Billing address</th>
                            <th>Delivery address</th>
                            <th>Account No</th>
                            <th>IFSC Code</th>
                            <th>Bank Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedParties.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="4">No Party Found yet</td>
                            </tr>
                        )}
                        {searchedParties.length !== 0 &&
                            searchedParties.map((party) => {
                                let billingaddress =
                                    party.balineone +
                                    ", " +
                                    party.balinetwo +
                                    ", " +
                                    party.bacity +
                                    " - " +
                                    party.bapincode;
                                let deliveryaddress =
                                    party.dalineone +
                                    ", " +
                                    party.dalinetwo +
                                    ", " +
                                    party.dacity +
                                    " - " +
                                    party.dapincode;
                                return (
                                    <tr key={party.partyid}>
                                        <td>{party.partyid}</td>
                                        <td>{party.agentname}</td>
                                        <td>{party.partytype}</td>
                                        <td>{party.partyname}</td>
                                        <td>{party.leadingname}</td>
                                        <td>{party.leadingphone}</td>
                                        <td>{party.accountantname}</td>
                                        <td>{party.accountantphone}</td>
                                        <td>{party.gst}</td>
                                        <td>{party.pan}</td>
                                        <td>{party.email}</td>
                                        <td>{party.cin}</td>
                                        <td>{billingaddress}</td>
                                        <td>{deliveryaddress}</td>
                                        <td>{party.accountno}</td>
                                        <td>{party.ifsccode}</td>
                                        <td>{party.bankname}</td>
                                        <td
                                            className={tableStyles.tableButton}
                                            onClick={() => {
                                                deleteRequest(party.partyid);
                                            }}
                                        >
                                            Delete
                                        </td>
                                        <td className={tableStyles.tableButton}>
                                            <Link
                                                style={{ color: "white" }}
                                                to={{
                                                    pathname: "/party/update",
                                                    state: {
                                                        partyid: party.partyid,
                                                        agentname:
                                                            party.agentname,
                                                        bankname:
                                                            party.bankname,
                                                    },
                                                }}
                                            >
                                                Update
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            )}{" "}
        </div>
    );
}

export default Party;
