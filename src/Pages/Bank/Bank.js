import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function Bank() {
    const [banks, setBanks] = useState([]);
    const [searchedBanks, setSearchedBanks] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let bankid = e;
            if (window.confirm("Are you sure you want to delete this bank?")) {
                setLoad(true);
                await axios
                    .delete(`/bank/${bankid}`)
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
                .get(`/bank/`)
                .then((res) => {
                    setLoad(false);
                    setBanks(res.data);
                    setSearchedBanks(res.data);
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
        let tempBanks = [];
        banks.map((bank) => {
            if (bank.bankname.includes(str)) tempBanks.push(bank);
        });
        setSearchedBanks([...tempBanks]);
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
                <Link to="/bank/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Bank
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table border="1" className={tableStyles.table}>
                    <tbody>
                        <tr>
                            <th>Bank ID</th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedBanks.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="4">No Bank Found yet</td>
                            </tr>
                        )}
                        {searchedBanks.length !== 0 &&
                            searchedBanks.map((bank) => {
                                return (
                                    <tr key={bank.bankid}>
                                        <td>{bank.bankid}</td>
                                        <td>{bank.bankname}</td>
                                        <td
                                            className={tableStyles.tableButton}
                                            onClick={() => {
                                                deleteRequest(bank.bankid);
                                            }}
                                        >
                                            Delete
                                        </td>
                                        <td className={tableStyles.tableButton}>
                                            <Link
                                                style={{ color: "white" }}
                                                to={{
                                                    pathname: "/bank/update",
                                                    state: {
                                                        bankid: bank.bankid,
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

export default Bank;
