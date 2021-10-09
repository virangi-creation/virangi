import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory, useLocation } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError.js";

const UpdateHarness = () => {
    const [harnessid, setHarnessid] = useState("");
    const [harnessname, setHarnessname] = useState("");
    const [reed, setReed] = useState("");
    const [loomno, setLoomno] = useState("");
    const [fulldetail, setFulldetail] = useState("");

    const [load, setLoad] = useState(false);

    const location = useLocation();
    const history = useHistory();

    useEffect(async () => {
        try {
            document.title = "Add Harness";
            if (location.state) {
                setHarnessid(location.state.harnessid);
                setLoad(true);
                await axios
                    .get(`/harness/${location.state.harnessid}`)
                    .then(({ data }) => {
                        let h = data[0];
                        setHarnessname(h.harnessname);
                        setReed(h.reed);
                        setLoomno(h.loomno);
                        setFulldetail(h.fulldetail);
                        setLoad(false);
                    })
                    .catch((err) => {
                        setLoad(false);
                        catchAxiosError(err);
                    });
            }
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }, []);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            axios
                .put(`/harness/${harnessid}`, {
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
                                <td>Harness Name</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Harness Name"
                                        value={harnessname}
                                        onChange={(e) =>
                                            setHarnessname(
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
                                <td>Complete Harness Pattern</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Complete Harness Pattern"
                                        value={fulldetail}
                                        onChange={(e) =>
                                            setFulldetail(
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        onKeyDown={captureEnter}
                                        required
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
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Loom No</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Loom no"
                                        value={loomno}
                                        onChange={(e) =>
                                            setLoomno(
                                                e.target.value.toUpperCase()
                                            )
                                        }
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
                                        Update Harness
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

export default UpdateHarness;
