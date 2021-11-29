import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";
import generateAddressString from "../../Util/generateAddressString";

function Firm() {
    const [firms, setFirms] = useState([]);
    const [searchedFirms, setSearchedFirms] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let firmid = e;
            if (window.confirm("Are you sure you want to delete this firm?")) {
                setLoad(true);
                await axios
                    .delete(`/firm/${firmid}`)
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
            document.title = "Bank " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/firm/`)
                .then((res) => {
                    setLoad(false);
                    console.log(res);
                    setFirms(res.data);
                    setSearchedFirms(res.data);
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
        let str = e.target.value;
        str = str.toUpperCase();
        let tempFirms = [];
        firms.map((firm) => {
            if (firm.firmname.includes(str)) tempFirms.push(firm);
        });
        setSearchedFirms([...tempFirms]);
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
                    placeholder="Search Bank"
                    autoFocus
                />
                <Link to="/firm/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Bank
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
                            <th>Firm ID</th>

                            <th>Short Name</th>
                            <th>Name</th>
                            <th>CC Account</th>
                            <th>Current Account</th>
                            <th>Billing Address</th>
                            <th>Delivery Address</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedFirms.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="4">No Bank Found yet</td>
                            </tr>
                        )}
                        {searchedFirms.length !== 0 &&
                            searchedFirms.map((firm) => {
                                return (
                                    <tr key={firm.firmid}>
                                        <td>{firm.firmid}</td>
                                        <td>{firm.shortname}</td>
                                        <td>{firm.firmname}</td>
                                        <td>{firm.ccaccountno}</td>
                                        <td>{firm.currentaccountno}</td>
                                        <td>
                                            {generateAddressString(
                                                firm.balineone,
                                                firm.balinetwo,
                                                firm.bacity,
                                                firm.bastate,
                                                firm.bapincode
                                            )}
                                        </td>
                                        <td>
                                            {generateAddressString(
                                                firm.dalineone,
                                                firm.dalinetwo,
                                                firm.dacity,
                                                firm.dastate,
                                                firm.dapincode
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() =>
                                                    deleteRequest(firm.firmid)
                                                }
                                            >
                                                Delete
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
                                                            "/firm/update",
                                                        state: {
                                                            firmid: firm.firmid,
                                                        },
                                                    }}
                                                >
                                                    Update
                                                </Link>
                                            </button>
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

export default Firm;
