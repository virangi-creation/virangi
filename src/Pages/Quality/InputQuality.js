import axios from "../../axios.js";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError";
import buttonStyles from "../../Modules/Button.module.css";
import InputWarp from "./InputWarp.js";

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
    const [lasercharge, setLasercharge] = useState(0);
    const [designcharge, setDesigncharge] = useState(0);
    const [finishingcharge, setFinishingcharge] = useState(0);
    const [packingcharge, setPackingcharge] = useState(0);
    const [agentcharge, setAgentcharge] = useState(0);
    const [dyeingcharge, setDyeingCharge] = useState(0);
    const [marketmargin, setMarketMargin] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [length, setLength] = useState(0);
    const [weftwastage, setWeftWastage] = useState(0);

    const [yarnQualities, setYarnqualities] = useState([]);

    useEffect(() => {
        try {
            setLoad(true);
            axios
                .get(`/quality/add`)
                .then(({ data }) => {
                    setYarnqualities(data.quality);
                    setLoad(false);
                })
                .catch(catchAxiosError);
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
            axios
                .post(`/quality/`, {
                    qualityname,
                    jobcharge,
                    bodywarp,
                    borderwarp,
                    topbeam: topwarp,
                    pickonloom,
                    buttacharge,
                    lasercharge,
                    designcharge,
                    finishingcharge,
                    packingcharge,
                    agentcharge,
                    weftwastage,
                    dyeingcharge,
                    marketmargin,
                    discount,
                    length,
                })
                .then(() => {
                    setLoad(false);
                    history.push("/quality");
                })
                .catch(catchAxiosError);
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    const handleFocus = (event) => {
        event.target.select();
    };

    function captureEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

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
                                <td colSpan="2">Length of Saree</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Enter Saree Length..."
                                        value={length}
                                        onChange={(e) => {
                                            setLength(e.target.value);
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
                                yarnQualities={yarnQualities}
                                captureEnter={captureEnter}
                                handleFocus={handleFocus}
                            />
                            <InputWarp
                                warp={borderwarp}
                                setWarp={setBorderwarp}
                                firstRender={firstRender}
                                role="Border"
                                yarnQualities={yarnQualities}
                                captureEnter={captureEnter}
                                handleFocus={handleFocus}
                            />
                            <InputWarp
                                warp={topwarp}
                                setWarp={setTopwarp}
                                firstRender={firstRender}
                                role="Top Beam"
                                yarnQualities={yarnQualities}
                                captureEnter={captureEnter}
                                handleFocus={handleFocus}
                            />
                            <tr>
                                <td
                                    style={{ borderBottom: "1px solid black" }}
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
                                    style={{ borderBottom: "1px solid black" }}
                                    colSpan="2"
                                >
                                    Butta Charge
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
                                    style={{ borderBottom: "1px solid black" }}
                                    colSpan="2"
                                >
                                    Laser Charge
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
                                    style={{ borderBottom: "1px solid black" }}
                                    colSpan="2"
                                >
                                    Design Charge
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
                                    style={{ borderBottom: "1px solid black" }}
                                    colSpan="2"
                                >
                                    Finishing Charge
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Enter Finishing Charge..."
                                        value={finishingcharge}
                                        onChange={(e) => {
                                            setFinishingcharge(e.target.value);
                                        }}
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{ borderBottom: "1px solid black" }}
                                    colSpan="2"
                                >
                                    Packing Charge
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Enter Paching Charge..."
                                        value={packingcharge}
                                        onChange={(e) => {
                                            setPackingcharge(e.target.value);
                                        }}
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{ borderBottom: "1px solid black" }}
                                    colSpan="2"
                                >
                                    Agent Charge
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
                                <td
                                    style={{ borderBottom: "1px solid black" }}
                                    colSpan="2"
                                >
                                    Dyeing Charge
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
                                    style={{ borderBottom: "1px solid black" }}
                                    colSpan="2"
                                >
                                    Market Margin
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
                                    style={{ borderBottom: "1px solid black" }}
                                    colSpan="2"
                                >
                                    Discount
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

export default InputQuality;
