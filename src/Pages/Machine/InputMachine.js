import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory } from "react-router-dom";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus.js";

function InputMachine() {
    const [tempMachineNo, setTempMachineNo] = useState("");
    const [machineNo, setMachineNo] = useState("");
    const [harness, setHarness] = useState(3);
    const [jacquardHooks, setJacquardHooks] = useState("");
    const [panes, setPanes] = useState("");

    const [prevMachinenos, setPrevMachinenos] = useState([]);
    const [harnessTypes, setHarnessTypes] = useState([]);

    const [load, setLoad] = useState(false);
    const history = useHistory();

    useEffect(async () => {
        try {
            document.title = "Add Machine";
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/machine/add/`)
                .then(({ data }) => {
                    console.log(data);
                    setHarnessTypes(data.harnessTypes);
                    setPrevMachinenos(data.prevMachinenos);
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

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .post("/machine/", {
                    machineNo,
                    harness,
                    jacquardHooks,
                    panes,
                })
                .then(() => {
                    setLoad(false);
                    history.push(`/machine`);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    };

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

    const checkMachineNo = async (e) => {
        let flag = false;
        await prevMachinenos.map((prevMachineno) => {
            if (parseInt(prevMachineno) === parseInt(e.target.value)) {
                alert("Machine No already exists");
                document.getElementById("machineno").focus();
                flag = true;
            }
        });
        if (!flag) {
            setMachineNo(e.target.value);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            {load && <div>Loading...</div>}
            {!load && (
                <form>
                    <table className="table table-bordered table-hover table-responsive">
                        <tbody>
                            <tr>
                                <td>Machine No</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Machine No"
                                        value={tempMachineNo}
                                        onChange={(e) => {
                                            setTempMachineNo(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onBlur={checkMachineNo}
                                        autoFocus
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Panes</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Panes"
                                        value={panes}
                                        onChange={(e) => {
                                            setPanes(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Jacquard Hooks</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Jacquard Hooks"
                                        value={jacquardHooks}
                                        onChange={(e) => {
                                            setJacquardHooks(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Harness Type</td>
                                <td colSpan="2">
                                    <select
                                        value={harness}
                                        onChange={(e) => {
                                            setHarness(e.target.value);
                                        }}
                                    >
                                        {harnessTypes.map((harnessType) => {
                                            return (
                                                <option
                                                    value={
                                                        harnessType.harnessid
                                                    }
                                                >
                                                    {harnessType.harnessname}
                                                    {" / "}
                                                    {harnessType.fulldetail}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2">
                                    <button
                                        type="button"
                                        className={buttonStyles.inputbutton}
                                        onClick={onSubmitEvent}
                                    >
                                        Create Machine
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            )}
        </div>
    );
}

export default InputMachine;
