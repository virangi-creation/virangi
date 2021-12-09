import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function Matching() {
    const [matching, setMatching] = useState([]);
    const [searchedMatching, setSearchedMatching] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let matchingid = e;
            if (
                window.confirm("Are you sure you want to delete this matching?")
            ) {
                setLoad(true);
                await axios
                    .delete(`/matching/${matchingid}`)
                    .then(() => {
                        setLoad(false);
                        window.location.reload();
                    })
                    .catch((err) => {
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
            document.title = "Matching " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/matching/`)
                .then(({ data }) => {
                    console.log(data.designs);
                    setMatching(data.designs);
                    setSearchedMatching(data.designs);
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

    const onSearchChange = (e) => {
        let str = e.target.value;
        str = str.toUpperCase();
        let tempMatching = [];
        matching.map((singleMatching) => {
            if (singleMatching.designfilename.includes(str))
                tempMatching.push(singleMatching);
        });
        setSearchedMatching([...tempMatching]);
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
                    placeholder="Search Matching"
                    autoFocus
                />
                <Link to="/matching/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Matching
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
                            <th>Matching ID</th>
                            <th></th>
                            <th></th>
                            <th>Design File Name</th>
                        </tr>
                        {searchedMatching.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="4">No Party Found yet</td>
                            </tr>
                        )}
                        {searchedMatching.length !== 0 &&
                            searchedMatching.map((singleMatching) => {
                                return (
                                    <tr key={singleMatching.matchingid}>
                                        <td>{singleMatching.matchingid}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    deleteRequest(
                                                        singleMatching.matchingid
                                                    );
                                                }}
                                                type="button"
                                                className="btn btn-outline-primary"
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
                                                            "/singleMatching/update",
                                                        state: {
                                                            matchingid:
                                                                singleMatching.matchingid,
                                                            agentname:
                                                                singleMatching.agentname,
                                                            bankname:
                                                                singleMatching.bankname,
                                                        },
                                                    }}
                                                >
                                                    Update
                                                </Link>
                                            </button>
                                        </td>

                                        <td>{singleMatching.designfilename}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            )}{" "}
        </div>
    );
}

export default Matching;
