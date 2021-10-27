import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import { useHistory, useLocation } from "react-router";
import buttonStyles from "../../Modules/Button.module.css";
import catchAxiosError from "../../Util/catchAxiosError.js";

function UpdateYarnShade() {
    let history = useHistory();
    let location = useLocation();

    // Final Variables

    const [quality, setQuality] = useState("");
    const [qualityid, setQualityid] = useState(0);
    const [colour, setColour] = useState("");
    const [shadeno, setShadeno] = useState(0);
    const [partyid, setPartyid] = useState(0);
    const [load, setLoad] = useState(false);
    const [party, setParty] = useState("");

    const [parties, setParties] = useState([]);
    const [qualities, setQualities] = useState([]);
    // Final Variables

    useEffect(async () => {
        try {
            if (location.state) {
                setQuality(location.state.quality);
                setQualityid(location.state.qualityid);
                setColour(location.state.colour);
                setShadeno(location.state.shadeno);
                setPartyid(location.state.partyid);
                setParty(location.state.party);
            } else history.goBack();
            setLoad(true);
            document.title = "Update Yarn Shade";
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number") {
                    document.activeElement.blur();
                }
            });
            await axios
                .get(`/yarnshade/${shadeno}/update`)
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

    const handleFocus = (event) => {
        event.target.select();
    };

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .put(`/yarnshade/`, {
                    shadeno: shadeno,
                    qualityid: qualityid,
                    partyid: partyid,
                    colour: colour,
                    prevcolour: location.state.colour,
                    prevshadeno: location.state.shadeno,
                    prevpartyid: location.state.partyid,
                    prevqualityid: location.state.qualityid,
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
                    <table>
                        <tbody>
                            <tr>
                                <td>Quality Name</td>
                                <td>
                                    <input
                                        type="text"
                                        list="qualitylist"
                                        onChange={onUpdateQuality}
                                        value={quality}
                                        autoFocus
                                        autoCapitalize="true"
                                        placeholder="Quality Name"
                                        onKeyDown={captureEnter}
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
                                        type="text"
                                        placeholder="Yarn Shade"
                                        value={shadeno}
                                        onChange={onUpdateShadeno}
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Colour</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Colour"
                                        value={colour}
                                        onChange={onUpdateColour}
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Company Name</td>
                                <td>
                                    <input
                                        type="text"
                                        list="partylist"
                                        onChange={onUpdateParty}
                                        placeholder="Company Name"
                                        value={party}
                                        required
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
                                        Update Yarn Quality
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

export default UpdateYarnShade;
