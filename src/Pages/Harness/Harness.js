import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function Harness() {
    const [harnesses, setHarnesses] = useState([]);
    const [searchedHarnesses, setSearchedHarnesses] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let harnessid = e;
            if (
                window.confirm("Are you sure you want to delete this harness?")
            ) {
                setLoad(true);
                await axios
                    .delete(`/harness/${harnessid}`)
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

    useEffect(() => {
        try {
            document.title = "Harness";
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            axios
                .get(`/harness/`)
                .then((res) => {
                    setLoad(false);
                    setHarnesses(res.data);
                    setSearchedHarnesses(res.data);
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
        let tempHarnesses = [];
        harnesses.map((harness) => {
            if (harness.harnessname.includes(str)) tempHarnesses.push(harness);
        });
        setSearchedHarnesses([...tempHarnesses]);
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
                    placeholder="Search Harness"
                    autoFocus
                />
                <Link to="/harness/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Harness
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table border="1" className={tableStyles.table}>
                    <tbody>
                        <tr>
                            <th>Harness</th>
                            <th>Complete Detail</th>
                            <th>Reed</th>
                            <th>Loom no</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedHarnesses.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="4">No Harness Found yet</td>
                            </tr>
                        )}
                        {searchedHarnesses.length !== 0 &&
                            searchedHarnesses.map((harness) => {
                                return (
                                    <tr key={harness.harnessid}>
                                        <td>{harness.harnessname}</td>
                                        <td>{harness.fulldetail}</td>
                                        <td>{harness.reed}</td>
                                        <td>{harness.loomno}</td>
                                        <td
                                            className={tableStyles.tableButton}
                                            onClick={() => {
                                                deleteRequest(
                                                    harness.harnessid
                                                );
                                            }}
                                        >
                                            Delete
                                        </td>
                                        <td className={tableStyles.tableButton}>
                                            <Link
                                                style={{ color: "white" }}
                                                to={{
                                                    pathname: "/harness/update",
                                                    state: {
                                                        harnessid:
                                                            harness.harnessid,
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

export default Harness;
