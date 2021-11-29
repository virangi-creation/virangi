import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory } from "react-router-dom";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus.js";

function InputBank() {
    const [bankName, setBankName] = useState("");
    const [load, setLoad] = useState(false);
    const history = useHistory();

    useEffect(() => {
        document.title = "Add Bank";
        document.addEventListener("keydown", captureEnter, false);
        document.addEventListener("focus", handleFocus, true);
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

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            {load && <div>Loading...</div>}
            {!load && (
                <table className="table table-bordered table-hover table-responsive">
                    <tbody>
                        <tr>
                            <td>Bank Name</td>
                            <td>
                                <input
                                    placeholder="Bank Name"
                                    value={bankName}
                                    onChange={(e) => {
                                        setBankName(
                                            e.target.value.toUpperCase()
                                        );
                                    }}
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
