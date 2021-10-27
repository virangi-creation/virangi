import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory } from "react-router-dom";
import catchAxiosError from "../../Util/catchAxiosError.js";

function InputBank() {
    const [bankName, setBankName] = useState("");
    const [load, setLoad] = useState(false);
    const history = useHistory();

    useEffect(() => {
        document.title = "Add Bank";
    }, []);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .post("/bank/", {
                    bankName: bankName,
                })
                .then(() => {
                    setLoad(false);
                    history.push(`/bank`);
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
    };

    const updateEvent = (e) => {
        setBankName(e.target.value.toUpperCase());
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
                <table>
                    <tbody>
                        <tr>
                            <td>Bank Name</td>
                            <td>
                                <input
                                    type="text"
                                    id="bankname"
                                    placeholder="Bank Name"
                                    value={bankName}
                                    onChange={updateEvent}
                                    onKeyDown={captureEnter}
                                    required
                                    autoFocus
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
                                    Create Bank
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default InputBank;
