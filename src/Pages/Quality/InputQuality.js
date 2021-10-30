import axios from "../../axios.js";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError";
import buttonStyles from "../../Modules/Button.module.css";
import InputWarp from "./InputWarp.js";
import InputFeeder from "../Desgin/InputFeeder.js";

function InputQuality() {
    let history = useHistory();
    let firstRender = useRef(true);
    const [load, setLoad] = useState(false);

    let templateWarpObject = {
        warpqualityid: 1,
        warpqualityname: "",
        yarnprice: 0,
        denier: 0,
        warplength: 100,
        warpshortage: 5,
        totalwarplength: 105,
        ends: 0,
        reed: 96,
        endsperden: 2,
        selvedgeden: 0,
        selvedgeendsperden: 4,
        rs: 0,
        warpweight: 0,
        warpwastage: 0,
        totalweight: 0,
        yarncost: 0,
    };

    const [qualityname, setQualityname] = useState("");
    const [jobcharge, setJobcharge] = useState(0);
    const [bodywarp, setBodywarp] = useState(templateWarpObject);
    const [borderwarp, setBorderwarp] = useState(templateWarpObject);
    const [topwarp, setTopwarp] = useState(templateWarpObject);
    const [pickonloom, setPickonloom] = useState(0);
    const [buttacharge, setButtacharge] = useState(0);
    const [rs, setRS] = useState(0);
    const [lasercharge, setLasercharge] = useState(0);
    const [designcharge, setDesigncharge] = useState(0);
    const [finishingcharge, setFinishingcharge] = useState(0);
    const [secondsratio, setSecondsRatio] = useState(0);
    const [valueadditioncharge, setValueAdditionCharge] = useState(0);
    const [agentcharge, setAgentcharge] = useState(0);
    const [dyeingcharge, setDyeingCharge] = useState(0);
    const [marketmargin, setMarketMargin] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [designlength, setDesignLength] = useState(0);
    const [unitlength, setUnitLength] = useState(0);
    const [weftwastage, setWeftWastage] = useState(0);
    let feederTemplate = {
        feederid: 1,
        yarnqualityid: 1,
        yarnqualityname: "",
        pick: 0,
        feedertype: 3,
        averagepick: 0,
        weftwastage: 0,
        weight: 0,
        amount: 0,
    };
    const [feeder1, setFeeder1] = useState(feederTemplate);
    const [feeder2, setFeeder2] = useState(feederTemplate);
    const [feeder3, setFeeder3] = useState(feederTemplate);
    const [feeder4, setFeeder4] = useState(feederTemplate);
    const [feeder5, setFeeder5] = useState(feederTemplate);
    const [feeder6, setFeeder6] = useState(feederTemplate);
    const [feeder7, setFeeder7] = useState(feederTemplate);
    const [feeder8, setFeeder8] = useState(feederTemplate);

    const [feederDetails] = useState([
        ["feeder1", "setFeeder1"],
        ["feeder2", "setFeeder2"],
        ["feeder3", "setFeeder3"],
        ["feeder4", "setFeeder4"],
        ["feeder5", "setFeeder5"],
        ["feeder6", "setFeeder6"],
        ["feeder7", "setFeeder7"],
        ["feeder8", "setFeeder8"],
    ]);
    const [yarnqualities, setYarnqualities] = useState([]);

    useEffect(() => {
        feederDetails.map((feedername, index) => {
            let feeder = eval(feedername[0]);
            let setFeeder = eval(feedername[1]);
            let tempAvgPick = feeder.pick / (designlength * 39.37);
            let tempWeight = (tempAvgPick * rs * feeder.denier) / 90000;
            let tempAmount = tempWeight * feeder.rate;
            setFeeder((prevState) => ({
                ...prevState,
                averagepick: isNaN(tempAvgPick)
                    ? 0
                    : parseFloat(tempAvgPick).toFixed(2),
                weight: isNaN(tempWeight)
                    ? 0
                    : parseFloat(tempWeight).toFixed(3),
                amount: isNaN(tempAmount)
                    ? 0
                    : parseFloat(tempAmount).toFixed(2),
            }));
        });
    }, [designlength, weftwastage]);

    useEffect(() => {
        let tempRS =
            parseFloat(bodywarp.rs) +
            (bodywarp.rs ? parseFloat(bodywarp.rs) : 0) +
            2;
        setRS(isNaN(tempRS) ? 0 : tempRS);
    }, []);

    useEffect(async () => {
        try {
            setLoad(true);
            await axios
                .get(`/quality/add`)
                .then(({ data }) => {
                    setYarnqualities(data.yarnqualities);
                    setLoad(false);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
            document.title = "Input Quality";
            document.addEventListener("wheel", () =>
                document.activeElement.type === "number"
                    ? document.activeElement.blur()
                    : ""
            );
            firstRender.current = false;
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }, []);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .post(`/quality/`, {
                    qualityname,
                    jobcharge,
                    bodywarp,
                    borderwarp,
                    topbeam: topwarp,
                    feeder1,
                    feeder2,
                    feeder3,
                    feeder4,
                    feeder5,
                    feeder6,
                    feeder7,
                    feeder8,
                    pickonloom,
                    buttacharge,
                    lasercharge,
                    designcharge,
                    finishingcharge,
                    valueadditioncharge,
                    secondsratio,
                    agentcharge,
                    weftwastage,
                    dyeingcharge,
                    marketmargin,
                    discount,
                    designlength,
                })
                .then(() => {
                    setLoad(false);
                    history.push("/quality");
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            setLoad(false);
            console.log(err);
            alert(err.message);
        }
    };

    const handleFocus = (event) => {
        event.target.select();
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
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="2">Quality Name</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Enter Quality Name..."
                                        value={qualityname}
                                        onChange={(e) => {
                                            setQualityname(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        autoFocus
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">Design Length</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Enter Design Length..."
                                        value={designlength}
                                        onChange={(e) => {
                                            setDesignLength(e.target.value);
                                        }}
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">Unit Length</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Enter Unit Length..."
                                        value={unitlength}
                                        onChange={(e) => {
                                            setUnitLength(e.target.value);
                                        }}
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">Weft Wastage</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Enter Weft Wastage..."
                                        value={weftwastage}
                                        onChange={(e) => {
                                            setWeftWastage(e.target.value);
                                        }}
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">Job Charge</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Enter Job Charge..."
                                        value={jobcharge}
                                        onChange={(e) => {
                                            setJobcharge(e.target.value);
                                        }}
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <InputWarp
                                warp={bodywarp}
                                setWarp={setBodywarp}
                                firstRender={firstRender}
                                role="Body"
                                yarnqualities={yarnqualities}
                                captureEnter={captureEnter}
                                handleFocus={handleFocus}
                            />
                            <InputWarp
                                warp={borderwarp}
                                setWarp={setBorderwarp}
                                firstRender={firstRender}
                                role="Border"
                                yarnqualities={yarnqualities}
                                captureEnter={captureEnter}
                                handleFocus={handleFocus}
                            />
                            <InputWarp
                                warp={topwarp}
                                setWarp={setTopwarp}
                                firstRender={firstRender}
                                role="Top Beam"
                                yarnqualities={yarnqualities}
                                captureEnter={captureEnter}
                                handleFocus={handleFocus}
                            />
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <th width="5%">Sr. No</th>
                                <th width="15%">Quality</th>
                                <th width="10%">Denier</th>
                                <th width="15%">Pick</th>
                                <th width="15%">Avg. Pick</th>
                                <th width="10%">Weight</th>
                                <th width="15%">Rate</th>
                                <th width="15%">Amount</th>
                            </tr>
                            {feederDetails.map((feeder, index) => (
                                <InputFeeder
                                    role={index + 1}
                                    feeder={eval(feeder[0])}
                                    designlength={designlength}
                                    rs={rs}
                                    weftwastage={weftwastage}
                                    setFeeder={eval(feeder[1])}
                                    yarnqualities={yarnqualities}
                                    captureEnter={captureEnter}
                                    handleFocus={handleFocus}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <table style={{ marginTop: "50px" }}>
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Pick on loom
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Pick on Loom ..."
                                            value={pickonloom}
                                            onChange={(e) => {
                                                setPickonloom(e.target.value);
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Butta Charge / MTR
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Butta Charge..."
                                            value={buttacharge}
                                            onChange={(e) => {
                                                setButtacharge(e.target.value);
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Laser Charge / MTR
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Laser Charge..."
                                            value={lasercharge}
                                            onChange={(e) => {
                                                setLasercharge(e.target.value);
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Design Charge / MTR
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Design Charge..."
                                            value={designcharge}
                                            onChange={(e) => {
                                                setDesigncharge(e.target.value);
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Dyeing Charge / MTR
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Dyeing Charge..."
                                            value={dyeingcharge}
                                            onChange={(e) => {
                                                setDyeingCharge(e.target.value);
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Finishing Charge / Piece
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Finishing Charge..."
                                            value={finishingcharge}
                                            onChange={(e) => {
                                                setFinishingcharge(
                                                    e.target.value
                                                );
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Seconds Ratio %
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Seconds Ratio..."
                                            value={secondsratio}
                                            onChange={(e) => {
                                                setSecondsRatio(e.target.value);
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Value Addition Charge / Piece
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Value Addition Charge..."
                                            value={valueadditioncharge}
                                            onChange={(e) => {
                                                setValueAdditionCharge(
                                                    e.target.value
                                                );
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Market Margin %
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Market Margin..."
                                            value={marketmargin}
                                            onChange={(e) => {
                                                setMarketMargin(e.target.value);
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Discount %
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Discount..."
                                            value={discount}
                                            onChange={(e) => {
                                                setDiscount(e.target.value);
                                            }}
                                            onFocus={handleFocus}
                                            onKeyDown={captureEnter}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            borderBottom: "1px solid black",
                                        }}
                                        colSpan="2"
                                    >
                                        Agent Charge %
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter ..."
                                            value={agentcharge}
                                            onChange={(e) => {
                                                setAgentcharge(e.target.value);
                                            }}
                                            onFocus={handleFocus}
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
                                            Save Quality
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            )}
        </div>
    );
}

export default InputQuality;
