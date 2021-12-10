import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function Machine() {
    const [machines, setMachines] = useState([]);
    const [searchedMachines, setSearchedMachines] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let machineno = e;
            if (
                window.confirm("Are you sure you want to delete this machine?")
            ) {
                setLoad(true);
                await axios
                    .delete(`/machine/${machineno}`)
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
            document.title = "Machine " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/machine/`)
                .then(({ data }) => {
                    setLoad(false);
                    console.log(data);
                    setMachines(data.machines);
                    setSearchedMachines(data.machines);
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
        let tempMachines = [];
        machines.map((machine) => {
            console.log(machine.machineno);
            if (machine.machineno.toString().includes(str))
                tempMachines.push(machine);
        });
        setSearchedMachines([...tempMachines]);
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
                    placeholder="Search Machine"
                    autoFocus
                />
                <Link to="/machine/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Machine
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table
                    className="table table-bordered table-hover table-responsive "
                    style={{ verticalAlign: "middle" }}
                >
                    <tbody>
                        <tr>
                            <th>Machine No</th>
                            <th>Panes</th>
                            <th>Jacquard Hooks</th>
                            <th>Harness</th>
                            <th>Avg. RPM</th>
                            <th>Avg. Eff.</th>
                            <th>Remaining Program</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedMachines.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="4">No Machine Found yet</td>
                            </tr>
                        )}
                        {searchedMachines.length !== 0 &&
                            searchedMachines.map((machine) => {
                                return (
                                    <tr key={machine.machineno}>
                                        <td>{machine.machineno}</td>
                                        <td>{machine.panes}</td>
                                        <td>{machine.jacquardhooks}</td>
                                        <td>{machine.harness}</td>
                                        <td>{machine.avgrpm}</td>
                                        <td>{machine.avgefficiency}</td>
                                        <td>
                                            {machine.timeRequired / 24 -
                                                ((machine.timeRequired / 24) %
                                                    1)}
                                            D{" "}
                                            {(
                                                machine.timeRequired % 24
                                            ).toFixed(0)}
                                            Hr.
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-warning"
                                            >
                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/machineprogram/print",
                                                        state: {
                                                            machineno:
                                                                machine.machineno,
                                                        },
                                                    }}
                                                >
                                                    Print Program
                                                </Link>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() =>
                                                    deleteRequest(
                                                        machine.machineno
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-warning"
                                            >
                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/machine/update",
                                                        state: {
                                                            machineno:
                                                                machine.machineno,
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
            )}
        </div>
    );
}

export default Machine;
