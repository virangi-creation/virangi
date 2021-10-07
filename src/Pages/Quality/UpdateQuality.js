import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import buttonStyles from "../../Modules/Button.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError";
import InputWarp from "./InputWarp.js";

function UpdateQuality() {
    let history = useHistory();
    let location = useLocation();
    let firstRender = useRef(true);
    const [load, setLoad] = useState(false);

    let templateWarpObject = {
        warpqualityid: 1,
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

    const [qualityid] = useState(location.state.qualityid);
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
                .get(`/quality/${qualityid}/update`)
                .then(async ({ data }) => {
                    console.log(data);
                    setYarnqualities(data.yarnQualities);
                    let quality = data.quality[0];
                    setQualityname(quality.qualityname);
                    setJobcharge(quality.jobcharge);
                    setBodywarp({
                        warpid: quality.bodywarpid,
                        warpqualityid: quality.bodywarpqualityid,
                        yarnprice: quality.bodyyarnprice,
                        denier: quality.bodydenier,
                        warplength: quality.bodywarplength,
                        warpshortage: quality.bodywarpshortage,
                        totalwarplength: quality.bodytotalwarplength,
                        ends: quality.bodyends,
                        reed: quality.bodyreed,
                        endsperden: quality.bodyendsperden,
                        selvedgeden: quality.bodyselvedgeden,
                        selvedgeendsperden: quality.bodyselvedgeden,
                        rs: quality.bodyrs,
                        warpweight: quality.bodywarpweight,
                        warpwastage: quality.bodywarpwastage,
                        totalweight: quality.bodytotalweight,
                        yarncost: quality.bodyyarncost,
                    });
                    setBorderwarp({
                        warpid: quality.borderwarpid,
                        warpqualityid: quality.borderwarpqualityid,
                        yarnprice: quality.borderyarnprice,
                        denier: quality.borderdenier,
                        warplength: quality.borderwarplength,
                        warpshortage: quality.borderwarpshortage,
                        totalwarplength: quality.bordertotalwarplength,
                        ends: quality.borderends,
                        reed: quality.borderreed,
                        endsperden: quality.borderendsperden,
                        selvedgeden: quality.borderselvedgeden,
                        selvedgeendsperden: quality.borderselvedgeden,
                        rs: quality.borderrs,
                        warpweight: quality.borderwarpweight,
                        warpwastage: quality.borderwarpwastage,
                        totalweight: quality.bordertotalweight,
                        yarncost: quality.borderyarncost,
                    });
                    setTopwarp({
                        warpid: quality.topbeamid,
                        warpqualityid: quality.topbeamwarpqualityid,
                        yarnprice: quality.topbeamyarnprice,
                        denier: quality.topbeamdenier,
                        warplength: quality.topbeamwarplength,
                        warpshortage: quality.topbeamwarpshortage,
                        totalwarplength: quality.topbeamtotalwarplength,
                        ends: quality.topbeamends,
                        reed: quality.topbeamreed,
                        endsperden: quality.topbeamendsperden,
                        selvedgeden: quality.topbeamselvedgeden,
                        selvedgeendsperden: quality.topbeamselvedgeden,
                        rs: quality.topbeamrs,
                        warpweight: quality.topbeamwarpweight,
                        warpwastage: quality.topbeamwarpwastage,
                        totalweight: quality.topbeamtotalweight,
                        yarncost: quality.topbeamyarncost,
                    });
                    setPickonloom(quality.pickonloom);
                    setButtacharge(quality.buttacharge);
                    setLasercharge(quality.lasercharge);
                    setDesigncharge(quality.designcharge);
                    setFinishingcharge(quality.finishingcharge);
                    setPackingcharge(quality.packingcharge);
                    setAgentcharge(quality.agentcharge);
                    setDyeingCharge(quality.dyeingcharge);
                    setMarketMargin(quality.marketmargin);
                    setDiscount(quality.discount);
                    setLength(quality.length);
                    setWeftWastage(quality.weftwastage);
                    setLoad(false);

                    firstRender.current = false;
                })
                .catch(catchAxiosError);
            document.title = "Update Quality";
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number") {
                    document.activeElement.blur();
                }
            });
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }, []);

    useEffect(() => {
        console.log(
            bodywarp.warpqualityid,
            borderwarp.warpqualityid,
            topwarp.warpqualityid
        );
        yarnQualities.map((yq) => {
            if (yq.qualityid === bodywarp.warpqualityid) {
                console.log(yq.qualityname);
                setBodywarp((prevState) => ({
                    ...prevState,
                    warpqualityname: yq.qualityname,
                }));
            }
            if (yq.qualityid === borderwarp.warpqualityid) {
                console.log(yq.qualityname);
                setBorderwarp((prevState) => ({
                    ...prevState,
                    warpqualityname: yq.qualityname,
                }));
            }
            if (yq.qualityid === topwarp.warpqualityid) {
                console.log(yq.qualityname);
                setTopwarp((prevState) => ({
                    ...prevState,
                    warpqualityname: yq.qualityname,
                }));
            }
        });
    }, [
        bodywarp.warpqualityid,
        borderwarp.warpqualityid,
        topwarp.warpqualityid,
    ]);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            axios
                .put(`/quality/`, {
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
                                <td colSpan="2">Pick on loom</td>
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
                                <td colSpan="2">Butta Charge</td>
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
                                <td colSpan="2">Laser Charge</td>
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
                                <td colSpan="2">Design Charge</td>
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
                                <td colSpan="2">Finishing Charge</td>
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
                                <td colSpan="2">Packing Charge</td>
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
                                <td colSpan="2">Agent Charge</td>
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
                                <td colSpan="2">Dyeing Charge</td>
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
                                <td colSpan="2">Market Margin</td>
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
                                <td colSpan="2">Discount</td>
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
                                        Update Quality
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

export default UpdateQuality;
