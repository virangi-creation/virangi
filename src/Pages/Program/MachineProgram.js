import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function MachineProgram() {
    const [machinePrograms, setMachinePrograms] = useState([]);
    const [searchedMachinePrograms, setSearchedMachinePrograms] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (machineno, programid) => {
        try {
            if (
                window.confirm("Are you sure you want to delete this program?")
            ) {
                setLoad(true);
                await axios
                    .delete(`/machineprogram/${machineno}/${programid}`)
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
            document.title = "Program " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/machineprogram/`)
                .then(({ data }) => {
                    setLoad(false);
                    console.log(data);
                    setMachinePrograms(data.machinePrograms);
                    setSearchedMachinePrograms(data.machinePrograms);
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
        let tempMachinePrograms = [];
        machinePrograms.map((machineProgram) => {
            if (
                machineProgram.machineno.toString().includes(str) ||
                machineProgram.programid.toString().includes(str)
            )
                tempMachinePrograms.push(machineProgram);
        });
        setSearchedMachinePrograms([...tempMachinePrograms]);
    };

    return (
        <div className="margin">
            <div
                style={{
                    textAlign: "center",
                    margin: "10px auto",
                    minWidth: "30%",
                }}
            >
                <div
                    className="form-group"
                    style={{ width: "20%", margin: "auto" }}
                >
                    <input
                        type="text"
                        onChange={onSearchChange}
                        className={inputStyles.textInput}
                        className="form-control"
                        placeholder="Search Machine Program"
                        autoFocus
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to="/machineprogram/close">
                        <button
                            type="button"
                            className={buttonStyles.inputbutton}
                            style={{
                                margin: "10px",
                            }}
                        >
                            Close Machine Program
                        </button>
                    </Link>
                    <Link to="/machineprogram/add">
                        <button
                            type="button"
                            className={buttonStyles.inputbutton}
                            style={{
                                margin: "10px",
                            }}
                        >
                            Add new Machine Program
                        </button>
                    </Link>
                </div>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table
                    className="table table-bordered table-hover table-responsive "
                    style={{
                        verticalAlign: "middle",
                        width: "80%",
                        margin: "0px auto",
                    }}
                >
                    <tbody>
                        <tr>
                            <th>Machine No</th>
                            <th>Program No</th>
                            <th>Design File Name</th>
                            <th>Body</th>
                            <th>Border</th>
                            <th>Total Repeat</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedMachinePrograms.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="5">No Machine Found yet</td>
                            </tr>
                        )}
                        {searchedMachinePrograms.length !== 0 &&
                            searchedMachinePrograms.map((machineProgram) => {
                                let programno = machineProgram.programid;
                                if (machineProgram.programid < 10000)
                                    programno = "S" + machineProgram.programid;
                                else
                                    programno =
                                        "P" +
                                        (machineProgram.programid % 10000);
                                return (
                                    <tr key={machineProgram.machineno}>
                                        <td>{machineProgram.machineno}</td>
                                        <td>{programno}</td>
                                        <td>{machineProgram.designfilename}</td>
                                        <td>{machineProgram.bodycolour}</td>
                                        <td>{machineProgram.bordercolour}</td>
                                        <td>{machineProgram.totalrepeat}</td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() =>
                                                    deleteRequest(
                                                        machineProgram.machineno,
                                                        machineProgram.programid
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
                                                            "/machineprogram/update",
                                                        state: {
                                                            machineno:
                                                                machineProgram.machineno,
                                                            programid:
                                                                machineProgram.programid,
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

export default MachineProgram;
