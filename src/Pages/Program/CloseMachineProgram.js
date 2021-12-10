import axios from "../../axios.js";
import React, { useState, useEffect } from "react";
import catchAxiosError from "../../Util/catchAxiosError";
import { useHistory } from "react-router";

function CloseMachineProgram() {
    const [machinePrograms, setMachinePrograms] = useState([]);
    const [machineNos, setMachineNos] = useState([]);
    const [tempMachineNo, setTempMachineNo] = useState("");
    const [programLayout, setProgramLayout] = useState({
        machineNo: "",
        tempMachineNo: "",
        programNo: "",
        tempProgramNo: "",
        startTime: "",
        endTime: "",
        bodyColour: "",
        borderColour: "",
    });
    const [load, setLoad] = useState(false);
    const history = useHistory();

    useEffect(async () => {
        try {
            let date = new Date();
            let strDate = date.toLocaleString().substr(0, 10);
            document.title = "Close Program " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/machineprogram/add`)
                .then(({ data }) => {
                    setLoad(false);
                    console.log(data);
                    setMachineNos(data.machinenos);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const updateMachineNo = async (e, index) => {
        try {
            let temp = "";
            await machineNos.map((machineNo) => {
                if (machineNo.machineno === parseInt(e.target.value)) {
                    temp = machineNo.machineno;
                }
            });
            console.log(temp);
            if (temp !== "") {
                await axios
                    .get(`/machineprogram/close/${temp}`)
                    .then(({ data }) => {
                        console.log(data.programs);
                        let tempMachinePrograms = [...machinePrograms];
                        tempMachinePrograms[index].programs = data.programs;
                        tempMachinePrograms[index].machineNo = temp;
                        setMachinePrograms(tempMachinePrograms);
                    });
            }
        } catch (err) {
            alert(err.message);
            catchAxiosError(err);
        }
    };

    const updateProgramNo = async (e, index) => {
        try {
            let tempMachinePrograms = [...machinePrograms];
            if (machinePrograms[index].programs) {
                console.log("1");
                let programid = "",
                    designfilename = "";
                await machinePrograms[index].programs.map((program) => {
                    if (program.programno === e.target.value) {
                        programid = program.programid;
                        designfilename = program.designfilename;
                    }
                });
                tempMachinePrograms[index].programid = programid;
                tempMachinePrograms[index].designfilename = designfilename;
                setMachinePrograms([...tempMachinePrograms]);
            } else {
                alert("Enter valid program no");
            }
        } catch (err) {
            alert(err.message);
            catchAxiosError(err);
        }
    };

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .post("/machineprogram/close", {
                    machinePrograms,
                })
                .then(() => {
                    setLoad(false);
                    history.push(`/machineprogram`);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    };

    const addMachineProgram = async (e) => {
        e.preventDefault();
        let tempProgramLayout = Object.assign({}, programLayout);
        setMachinePrograms([...machinePrograms, tempProgramLayout]);
    };
    const removeMachineProgram = async (e, index) => {
        e.preventDefault();
        let tempMachinePrograms = [...machinePrograms];
        tempMachinePrograms.splice(index, 1);
        setMachinePrograms(tempMachinePrograms);
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <table
                    className="table table-bordered table-hover table-responsive "
                    style={{
                        verticalAlign: "middle",
                        width: "80%",
                        margin: "0px auto",
                    }}
                >
                    <thead>
                        <tr>
                            <td>Machine No</td>
                            <td>Program No</td>
                            <td>Design File Name</td>
                            <td>Start Time</td>
                            <td>End Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {machinePrograms.map((program, index) => {
                            return (
                                <tr>
                                    <td>
                                        <input
                                            id={`machineno${index}`}
                                            list={`machinelist${index}`}
                                            onChange={(e) => {
                                                let tempMachinePrograms = [
                                                    ...machinePrograms,
                                                ];
                                                tempMachinePrograms[
                                                    index
                                                ].tempMachineNo =
                                                    e.target.value;
                                                setMachinePrograms(
                                                    tempMachinePrograms
                                                );
                                            }}
                                            value={program.tempMachineNo}
                                            autoCapitalize
                                            onBlur={(e) =>
                                                updateMachineNo(e, index)
                                            }
                                            placeholder="Machine No"
                                        />

                                        <datalist id={`machinelist${index}`}>
                                            {machineNos.length > 0 &&
                                                machineNos.map((machine) => (
                                                    <option
                                                        value={
                                                            machine.machineno
                                                        }
                                                    />
                                                ))}
                                        </datalist>
                                    </td>
                                    <td>
                                        <input
                                            id={`programno${index}`}
                                            list={`programlist${index}`}
                                            onChange={(e) => {
                                                let tempMachinePrograms = [
                                                    ...machinePrograms,
                                                ];
                                                tempMachinePrograms[
                                                    index
                                                ].tempProgramNo =
                                                    e.target.value;
                                                setMachinePrograms(
                                                    tempMachinePrograms
                                                );
                                            }}
                                            value={program.tempProgramNo}
                                            autoCapitalize
                                            onBlur={(e) =>
                                                updateProgramNo(e, index)
                                            }
                                            placeholder="Program No"
                                        />

                                        <datalist id={`programlist${index}`}>
                                            {program.programs &&
                                                program.programs.length > 0 &&
                                                program.programs.map(
                                                    (singleProgram) => (
                                                        <option
                                                            value={
                                                                singleProgram.programno
                                                            }
                                                        />
                                                    )
                                                )}
                                        </datalist>
                                    </td>
                                    <td>{program.designfilename}</td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            id={`starttime${index}`}
                                            onChange={(e) => {
                                                let tempMachinePrograms = [
                                                    ...machinePrograms,
                                                ];
                                                console.log(e.target.value);
                                                tempMachinePrograms[
                                                    index
                                                ].starttime = e.target.value;
                                                setMachinePrograms(
                                                    tempMachinePrograms
                                                );
                                            }}
                                            value={program.starttime}
                                            placeholder="Start Time"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            placeholder="End Time"
                                            value={program.endtime}
                                            onChange={(e) => {
                                                let tempMachinePrograms = [
                                                    ...machinePrograms,
                                                ];
                                                tempMachinePrograms[
                                                    index
                                                ].endtime = e.target.value;
                                                setMachinePrograms(
                                                    tempMachinePrograms
                                                );
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={(e) =>
                                                removeMachineProgram(e, index)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <button
                    className="btn btn-outline-secondary"
                    style={{ margin: "10px auto" }}
                    onClick={addMachineProgram}
                >
                    Add Matching
                </button>
            </div>
            <div className="container ">
                <div
                    className="col-md-12 text-center"
                    style={{ marginBottom: "20px" }}
                >
                    <button
                        style={{ fontSize: "20px" }}
                        className="btn btn-primary"
                        onClick={onSubmitEvent}
                        type="button"
                    >
                        Save Matching
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CloseMachineProgram;
