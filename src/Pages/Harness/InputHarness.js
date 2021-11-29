import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus";

const InputHarness = () => {
    const [harnessname, setHarnessname] = useState("");
    const [reed, setReed] = useState("");
    const [loomno, setLoomno] = useState("");
    const [fulldetail, setFulldetail] = useState("");

    const [load, setLoad] = useState(false);

    const history = useHistory();

    useEffect(() => {
        try {
            document.title = "Add Harness";
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }, []);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);

            axios
                .post("/harness/", {
                    harnessname,
                    reed,
                    loomno,
                    fulldetail,
                })
                .then(() => {
                    setLoad(false);
                    history.push(`/harness`);
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
        let kC = event.keyCode;
        if (kC == 27 && window.confirm("Are you sure you want to save?"))
            onSubmitEvent();
        else if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
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
                    <table
                        className="table table-bordered table-hover table-responsive"
                        style={{ verticalAlign: "middle" }}
                    >
                        <tbody>
                            <tr>
                                <td>Harness Name</td>
                                <td>
                                    <input
                                        placeholder="Harness Name"
                                        value={harnessname}
                                        onChange={(e) =>
                                            setHarnessname(
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        autoFocus
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Complete Harness Pattern</td>
                                <td>
                                    <input
                                        placeholder="Complete Harness Pattern"
                                        value={fulldetail}
                                        onChange={(e) =>
                                            setFulldetail(
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Reed</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Reed"
                                        value={reed}
                                        onChange={(e) =>
                                            setReed(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Loom No</td>
                                <td>
                                    <input
                                        placeholder="Loom no"
                                        value={loomno}
                                        onChange={(e) =>
                                            setLoomno(
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button
                                        type="button"
                                        className={buttonStyles.inputbutton}
                                        onClick={onSubmitEvent}
                                    >
                                        Create Harness
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            )}{" "}
        </div>
    );
};

export default InputHarness;
