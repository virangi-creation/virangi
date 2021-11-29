import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import buttonStyles from "../../Modules/Button.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus";

function InputYarnShade() {
    let history = useHistory();

    // Final Variables
    const [qualityid, setQualityid] = useState(0);
    const [colour, setColour] = useState("");
    const [shadeno, setShadeno] = useState("");
    const [partyid, setPartyid] = useState();
    const [parties, setParties] = useState([]);
    const [qualities, setQualities] = useState([]);
    // Final Variables
    const [load, setLoad] = useState(false);

    useEffect(async () => {
        try {
            setLoad(true);
            document.title = "Input Yarn Shade";
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            await axios
                .get(`/yarnshade/add`)
                .then(({ data }) => {
                    setParties(data.party);
                    setQualities(data.quality);
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
                .post(`/yarnshade/`, {
                    shadeno: shadeno,
                    qualityid: qualityid,
                    partyid: partyid,
                    colour: colour,
                })
                .then(() => {
                    setLoad(false);
                    history.push("/yarnshade");
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

    const onUpdateColour = (e) => {
        let col = e.target.value;
        setColour(col.toUpperCase());
    };
    const onUpdateShadeno = (e) => {
        let shade = e.target.value;
        setShadeno(shade.toUpperCase());
    };

    const onUpdateParty = (e) => {
        let q = e.target.value;
        setPartyid(null);
        parties.map((party) => {
            if (party.partyname === q) {
                setPartyid(party.partyid);
            }
        });
    };

    const onUpdateQuality = (e) => {
        let q = e.target.value;
        setQualityid(null);
        qualities.map((quality) => {
            if (quality.qualityname === q) {
                setQualityid(quality.qualityid);
            }
        });
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
                                <td>Quality Name</td>
                                <td>
                                    <input
                                        list="qualitylist"
                                        onChange={onUpdateQuality}
                                        autoFocus
                                        autoCapitalize
                                        placeholder="Quality Name"
                                    />

                                    <datalist id="qualitylist">
                                        {qualities.length > 0 &&
                                            qualities.map((quality, key) => (
                                                <option
                                                    value={quality.qualityname}
                                                />
                                            ))}
                                    </datalist>
                                </td>
                            </tr>
                            <tr>
                                <td>Yarn Shade</td>
                                <td>
                                    <input
                                        placeholder="Yarn Shade"
                                        value={shadeno}
                                        onChange={onUpdateShadeno}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Colour</td>
                                <td>
                                    <input
                                        placeholder="Colour"
                                        value={colour}
                                        onChange={onUpdateColour}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Company Name</td>
                                <td>
                                    <input
                                        list="partylist"
                                        onChange={onUpdateParty}
                                        placeholder="Company Name"
                                    />

                                    <datalist id="partylist">
                                        {parties.length > 0 &&
                                            parties.map((party, key) => (
                                                <option
                                                    value={party.partyname}
                                                />
                                            ))}
                                    </datalist>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button
                                        type="button"
                                        className={buttonStyles.inputbutton}
                                        onClick={onSubmitEvent}
                                    >
                                        Add new Yarn Quality
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

export default InputYarnShade;
