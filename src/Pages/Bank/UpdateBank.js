import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "../../axios.js";
import buttonStyles from "../../Modules/Button.module.css";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus.js";

function UpdateBank() {
    let history = useHistory();
    let location = useLocation();

    const [bankName, setBankName] = useState("");
    const [load, setLoad] = useState(false);
    const [bankid] = useState(location.state.bankid);

    useEffect(async () => {
        try {
            setLoad(true);
            document.title = "Update Bank";
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            await axios
                .get(`/bank/${bankid}`)
                .then((res) => {
                    setLoad(false);
                    setBankName(res.data[0].bankname);
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
            await axios
                .put(`/bank/${bankid}`, {
                    bankName: bankName,
                    bankid: bankid,
                })
                .then(async (res) => {
                    if (res.request.status !== 200) {
                        console.log(res);
                    } else history.push(`/bank`);
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
                    <tr>
                        <td>Bank Name</td>
                        <td>
                            <input
                                placeholder="Bank Name"
                                value={bankName}
                                onChange={(e) => {
                                    setBankName(e.target.value.toUpperCase());
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
                                Update Bank
                            </button>
                        </td>
                    </tr>
                </table>
            )}
        </div>
    );
}

export default UpdateBank;
