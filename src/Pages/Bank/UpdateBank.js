import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "../../axios.js";
import buttonStyles from "../../Modules/Button.module.css";
import catchAxiosError from "../../Util/catchAxiosError.js";

function UpdateBank() {
    let history = useHistory();
    let location = useLocation();

    const [bankName, setBankName] = useState("");
    const [load, setLoad] = useState(false);
    const [bankid] = useState(location.state.bankid);

    useEffect(() => {
        try {
            setLoad(true);
            document.title = "Update Bank";
            axios
                .get(`/bank/${bankid}`)
                .then((res) => {
                    setLoad(false);
                    setBankName(res.data[0].bankname);
                })
                .catch(catchAxiosError);
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const onSubmitEvent = async () => {
        try {
            axios
                .put(`/bank/${bankid}`, {
                    bankName: bankName,
                    bankid: bankid,
                })
                .then(async (res) => {
                    if (res.request.status !== 200) {
                        console.log(res);
                    } else history.push(`/bank`);
                })
                .catch(catchAxiosError);
        } catch (err) {
            alert(err.message);
        }
    };

    function captureEnter(event) {
        if (event.keyCode === 13) {
            onSubmitEvent();
        }
    }

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
