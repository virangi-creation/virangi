import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory } from "react-router-dom";
import catchAxiosError from "../../Util/catchAxiosError.js";

const InputAgent = () => {
    const [agentname, setAgentname] = useState("");
    const [gst, setGST] = useState("");
    const [pan, setPAN] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [lineone, setLineone] = useState("");
    const [linetwo, setLinetwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const [load, setLoad] = useState(false);

    const history = useHistory();

    useEffect(() => {
        try {
            document.title = "Add Agent";
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }, []);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);

            axios
                .post("/agent/", {
                    agentname,
                    gst,
                    pan,
                    phoneno,
                    lineone,
                    linetwo,
                    city,
                    state,
                    pincode,
                })
                .then(() => {
                    setLoad(false);
                    history.push(`/agent`);
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
    };

    const handleFocus = (event) => {
        event.target.select();
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
                    <table>
                        <tbody>
                            <tr>
                                <td>Agent Name</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Agent Name"
                                        value={agentname}
                                        onChange={(e) =>
                                            setAgentname(
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        onKeyDown={captureEnter}
                                        required
                                        autoFocus
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>GST No</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="GST No"
                                        value={gst}
                                        onChange={(e) =>
                                            setGST(e.target.value.toUpperCase())
                                        }
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>PAN</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="PAN No"
                                        value={pan}
                                        onChange={(e) =>
                                            setPAN(e.target.value.toUpperCase())
                                        }
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Phone no</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Phone no"
                                        value={phoneno}
                                        onChange={(e) =>
                                            setPhoneno(
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan="5">Address</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Address Line 1"
                                        onFocus={handleFocus}
                                        value={lineone}
                                        onChange={(e) => {
                                            setLineone(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Address Line 2"
                                        onFocus={handleFocus}
                                        value={linetwo}
                                        onChange={(e) => {
                                            setLinetwo(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        onFocus={handleFocus}
                                        value={city}
                                        onChange={(e) => {
                                            setCity(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="State"
                                        onFocus={handleFocus}
                                        value={state}
                                        onChange={(e) => {
                                            setState(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Pin Code"
                                        onFocus={handleFocus}
                                        value={pincode}
                                        onChange={(e) => {
                                            setPincode(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
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
                                        Create Agent
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

export default InputAgent;
