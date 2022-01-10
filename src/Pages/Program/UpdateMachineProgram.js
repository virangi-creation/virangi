import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory, useLocation } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus.js";
import MatchingTable from "../Matching/MatchingTable.js";

function UpdateMachineProgram() {
    const [programType, setProgramType] = useState("production");
    const [machineNos, setMachineNos] = useState([]);
    const [designFileNames, setDesignFileNames] = useState([]);
    const [matchings, setMatchings] = useState([]);
    const [matchingFeeders, setMatchingFeeders] = useState([]);
    const [selectedMatching, setSelectedMatching] = useState([]);
    const [machineNo, setMachineNo] = useState("1");
    const [tempMachineNo, setTempMachineNo] = useState("1");
    const [programno, setProgramno] = useState(1);
    const [designFileName, setDesignFileName] = useState("");
    const [tempDesignFileName, setTempDesignFileName] = useState("");
    const [matching, setMatching] = useState("");
    const [designMatchingId, setDesignMatchingId] = useState("");
    const [matchingObject, setMatchingObject] = useState({});
    const [keyIndex, setKeyIndex] = useState(0);
    const [repeats, setRepeats] = useState(1);
    const [units, setUnits] = useState(1);
    const [orderno, setOrderno] = useState("");
    const [panes, setPanes] = useState(0);
    const [totalPick, setTotalPick] = useState(0);
    const [totalPicks, setTotalPicks] = useState(0);
    const [pick, setPick] = useState(0);
    const [load, setLoad] = useState(true);
    const [prevMachineNo, setPrevMachineNo] = useState("");
    const [prevProgramNo, setPrevProgramNo] = useState("");
    const history = useHistory();
    const location = useLocation();
    const [harnessId, setHarnessId] = useState("");

    useEffect(async () => {
        try {
            document.title = "Add Program";
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            if (location.state) {
                setPrevMachineNo(location.state.machineno);
                setPrevProgramNo(location.state.programid);
                setLoad(true);
                await axios
                    .get(
                        `/machineprogram/update/${location.state.machineno}/${location.state.programid}`
                    )
                    .then(({ data }) => {
                        console.log(data);
                        setMachineNos(data.machinenos);
                        setMachineNos(data.machinenos);
                        setDesignFileNames(data.designfilenames);
                        setMatchings(data.matchings);
                        setMatchingFeeders(data.matchingFeeders);
                        let program = data.program;
                        setMachineNo(program.machineno);

                        if (program.programid > 10000)
                            setProgramType("production");
                        setProgramno(program.programid % 10000);
                        setMachineNo(program.machineno);
                        setTempMachineNo(program.machineno);
                        setDesignFileName(program.designfilename);
                        setTempDesignFileName(program.designfilename);
                        setPick(program.pickonloom);
                        setDesignMatchingId(program.designmatchingid);

                        setRepeats(program.totalrepeat);
                        setUnits(program.totalpiece);
                        setPanes(program.totalpiece / program.totalrepeat);
                        setTotalPicks(program.totalpicks);
                        setOrderno(program.orderno);
                        setLoad(false);
                    })
                    .catch((err) => {
                        setLoad(false);
                        catchAxiosError(err);
                    });
            }
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .put("/machineprogram/", {
                    prevProgramNo,
                    prevMachineNo,
                    machineNo,
                    programType,
                    designFileName,
                    programno,
                    designMatchingId,
                    repeats,
                    units,
                    orderno,
                    totalPicks,
                    pick,
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

    useEffect(() => {
        matchings.map((matching) => {
            if (matching.id === designMatchingId) {
                setMatchingObject(matching);
                setMatching(matching);
            }
        });
    }, [designMatchingId]);

    const captureEnter = (event) => {
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
        if (
            event.keyCode === 27 &&
            window.confirm("Are you sure you want to add?")
        ) {
            onSubmitEvent();
        }
    };

    useEffect(() => {
        if (machineNos && machineNos.length > 0)
            setMachineNo(machineNos[0].machineno);
    }, [machineNos]);

    useEffect(async () => {
        try {
            if (machineNo) {
                setLoad(true);
                await axios
                    .get(
                        `/machineprogram/machine/${machineNo}?type=${programType}`
                    )
                    .then(({ data }) => {
                        setProgramno(data.programid);
                        setDesignFileNames(data.designs);
                        setLoad(false);
                        document.getElementById("programtype").focus();
                    })
                    .catch((err) => {
                        setLoad(false);
                        catchAxiosError(err);
                    });
            }
        } catch (err) {
            alert(err.message);
            catchAxiosError(err);
        }
    }, [programType, machineNo]);

    useEffect(async () => {
        try {
            if (designFileName.length > 0) {
                setLoad(true);
                await axios
                    .get(`/machineprogram/add/matching/${designFileName}`)
                    .then(({ data }) => {
                        console.log(data);
                        setMatchings(data.matchings);
                        setMatchingFeeders(data.matchingFeeders);
                        setLoad(false);
                    })
                    .catch((err) => {
                        setLoad(false);
                        catchAxiosError(err);
                    });
            }
        } catch (err) {
            alert(err.message);
            catchAxiosError(err);
        }
    }, [designFileName]);

    const updateMachineNo = async (e) => {
        let q = parseInt(e.target.value);
        let temp = null;
        await machineNos.map((machine) => {
            if (machine.machineno === q) {
                temp = machine.machineno;
                setPanes(machine.panes);
                setHarnessId(machine.harness);
            }
        });
        setMachineNo(temp);
    };

    const updateDesignFileName = async (e) => {
        let q = e.target.value;
        let temp = null;
        await designFileNames.map((design) => {
            if (design.designfilename === q) {
                temp = design.designfilename;
                setTotalPick(design.totalpick);
                setPick(design.pickonloom);
            }
        });
        setDesignFileName(temp);
    };

    useEffect(() => {
        setUnits(repeats * panes);
        setTotalPicks(repeats * totalPick);
    }, [repeats, panes, totalPick]);

    const updateMatching = async (e) => {
        let q = e.target.value;
        setMatching(q);
        let temp = null;
        await matchings.map((matching, index) => {
            let f = `${matching.matchingcode} - ${matching.bodycolour} - ${matching.bordercolour}`;
            setKeyIndex(index);
            if (f === q) {
                temp = matching.designmatchingid;
                setMatchingObject(matching);
            }
        });
        setDesignMatchingId(temp);
    };
    useEffect(async () => {
        let tempSelecetedFeeders = [];
        let tempMatchingFeeders = matchingFeeders[keyIndex];
        await tempMatchingFeeders.map((matchingFeeder) => {
            if (
                parseInt(matchingFeeder.designmatchingid) === designMatchingId
            ) {
                tempSelecetedFeeders.push(matchingFeeder);
            }
        });
        setSelectedMatching(tempMatchingFeeders);
        await matchings.map((matching, index) => {
            setKeyIndex(index);
            if (matching.designmatchingid === designMatchingId) {
                setMatchingObject(matching);
                setMatching(
                    `${matching.matchingcode} - ${matching.bodycolour} - ${matching.bordercolour}`
                );
            }
        });
    }, [designMatchingId]);
    let feederTypeList = ["", "Body", "Border", "Meena"];

    return (
        <div>
            {load && <div>Loading...</div>}
            {!load && (
                <form>
                    <table
                        style={{
                            width: "50%",
                            margin: "50px auto",
                        }}
                        className="table table-bordered table-hover table-responsive"
                    >
                        <tbody>
                            {machineNos.length > 0 && (
                                <tr>
                                    <td>Machine No</td>
                                    <td>
                                        <input
                                            id="machineno"
                                            list="machinelist"
                                            onChange={(e) => {
                                                setTempMachineNo(
                                                    e.target.value
                                                );
                                            }}
                                            value={tempMachineNo}
                                            autoFocus
                                            autoCapitalize
                                            onBlur={updateMachineNo}
                                            placeholder="Machine No"
                                        />

                                        <datalist id="machinelist">
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
                                </tr>
                            )}
                            <tr>
                                <td>Program Type</td>
                                <td>
                                    <select
                                        id="programtype"
                                        value={programType}
                                        onChange={(e) =>
                                            setProgramType(e.target.value)
                                        }
                                    >
                                        <option value="production">
                                            Production
                                        </option>
                                        <option value="sample">Sample</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Order No</td>
                                <td>
                                    <input
                                        id="orderno"
                                        value={orderno}
                                        onChange={(e) => {
                                            setOrderno(e.target.value);
                                        }}
                                        placeholder="Order No"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Program No</td>
                                <td>
                                    <input
                                        id="programno"
                                        value={programno}
                                        onChange={(e) => {
                                            setProgramno(e.target.value);
                                        }}
                                        placeholder="Program No"
                                    />
                                </td>
                            </tr>
                            {designFileNames.length > 0 && (
                                <tr>
                                    <td>Design No</td>
                                    <td>
                                        <input
                                            id="designfilename"
                                            list="designlist"
                                            onChange={(e) => {
                                                setTempDesignFileName(
                                                    e.target.value
                                                );
                                            }}
                                            value={tempDesignFileName}
                                            autoCapitalize
                                            onBlur={updateDesignFileName}
                                            placeholder="Design No"
                                        />

                                        <datalist id="designlist">
                                            {designFileNames.length > 0 &&
                                                designFileNames.map(
                                                    (design) => {
                                                        if (
                                                            design.harnessid ===
                                                            harnessId
                                                        )
                                                            return (
                                                                <option
                                                                    value={
                                                                        design.designfilename
                                                                    }
                                                                />
                                                            );
                                                    }
                                                )}
                                        </datalist>
                                    </td>
                                </tr>
                            )}
                            {matchings.length > 0 && (
                                <tr>
                                    <td>Matching Code</td>
                                    <td>
                                        <input
                                            id="matching"
                                            list="matchinglist"
                                            onChange={(e) => {
                                                setMatching(e.target.value);
                                            }}
                                            value={matching}
                                            autoCapitalize
                                            onBlur={updateMatching}
                                            placeholder="Matching Code"
                                        />

                                        <datalist id="matchinglist">
                                            {matchings.length > 0 &&
                                                matchings.map((matching) => (
                                                    <option
                                                        value={`${matching.matchingcode} - ${matching.bodycolour} - ${matching.bordercolour}`}
                                                    />
                                                ))}
                                        </datalist>
                                    </td>
                                </tr>
                            )}
                            {selectedMatching.length > 0 && (
                                <>
                                    <tr>
                                        <td>Repeat</td>
                                        <td>
                                            <input
                                                id="repeat"
                                                value={repeats}
                                                onChange={(e) => {
                                                    setRepeats(e.target.value);
                                                }}
                                                placeholder="Repeat"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Pieces</td>
                                        <td>{units}</td>
                                    </tr>
                                </>
                            )}
                            {selectedMatching.length > 0 && (
                                <tr>
                                    <td>Pick on Loom</td>
                                    <td>
                                        <input
                                            id="pick"
                                            value={pick}
                                            onChange={(e) => {
                                                setPick(e.target.value);
                                            }}
                                            placeholder="Pick on Loom"
                                        />
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan="2">
                                    <button
                                        type="button"
                                        className={buttonStyles.inputbutton}
                                        onClick={onSubmitEvent}
                                    >
                                        Save Program
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {selectedMatching.length > 0 && (
                        <table
                            className="table table-bordered table-hover table-responsive"
                            style={{
                                width: "80%",
                                margin: "50px 10%",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th>Matching Code</th>
                                    <td>{matchingObject.matchingcode}</td>
                                    <td>Body - {matchingObject.bodycolour}</td>
                                    <td>
                                        Border -{matchingObject.bordercolour}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Feeder no.</td>
                                    <td>Type</td>
                                    <td>Pick</td>
                                    <td>Yarn Quality</td>
                                    <td>Yarn Shade</td>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMatching.map((feeder, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {feederTypeList[feeder.feedertype]}
                                        </td>
                                        <td>{feeder.pick}</td>
                                        <td>{feeder.yarnqualityname}</td>
                                        <td>
                                            {feeder.shade} / {feeder.colour} /{" "}
                                            {feeder.partyname}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </form>
            )}
        </div>
    );
}

export default UpdateMachineProgram;
