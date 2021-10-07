import axios from "../../axios.js";
import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import catchAxiosError from "../../Util/catchAxiosError.js";
import InputFeeder from "./InputFeeder.js";
function InputDesign() {
    let history = useHistory();

    const [load, setLoad] = useState(false);
    const [yarnQualities, setYarnQualities] = useState([]);
    const [qualities, setQualities] = useState([]);

    // Final Variables
    const [quality, setQuality] = useState("");
    const [designno, setDesignNo] = useState("");
    const [qualityid, setQualityid] = useState("");
    const [pickonloom, setPickOnLoom] = useState(0);
    const [pickonfabric, setPickOnFabric] = useState(0);
    const [length, setLength] = useState(0);
    const [rs, setRS] = useState(0);
    const [weftwastage, setWeftWastage] = useState(0);

    const [feeder1, setFeeder1] = useState({});
    const [feeder2, setFeeder2] = useState({});
    const [feeder3, setFeeder3] = useState({});
    const [feeder4, setFeeder4] = useState({});
    const [feeder5, setFeeder5] = useState({});
    const [feeder6, setFeeder6] = useState({});
    const [feeder7, setFeeder7] = useState({});
    const [feeder8, setFeeder8] = useState({});

    const [feeders] = useState([
        ["feeder1", "setFeeder1"],
        ["feeder2", "setFeeder2"],
        ["feeder3", "setFeeder3"],
        ["feeder4", "setFeeder4"],
        ["feeder5", "setFeeder5"],
        ["feeder6", "setFeeder6"],
        ["feeder7", "setFeeder7"],
        ["feeder8", "setFeeder8"],
    ]);

    const [totalpick, setTotalPick] = useState(0);
    const [totalavgpick, setTotalAvgPick] = useState(0);
    const [calculatedavgpick, setCalculatedAvgPick] = useState(0);
    const [totalweftweight, setTotalWeftWeight] = useState(0);
    const [totalweftamount, setTotalWeftAmount] = useState(0);

    const [totalEnds, setTotalEnds] = useState(0);
    const [totalWarpLength, setTotalWarpLength] = useState(0);
    const [totalWarpWeight, setTotalWarpWeight] = useState(0);
    const [totalWarpYarnCost, setTotalWarpYarnCost] = useState(0);

    const [totalAmountOneMtr, setTotalAmountOneMtr] = useState(0);
    const [baseAmountDesign, setBaseAmountDesign] = useState(0);

    const [jobcharge, setJobCharge] = useState(0);
    const [jobAmount, setJobAmount] = useState(0);
    const [buttacharge, setButtaCharge] = useState(0);
    const [lasercharge, setLaserCharge] = useState(0);
    const [designcharge, setDesignCharge] = useState(0);
    const [finishingcharge, setFinishingCharge] = useState(0);
    const [packingcharge, setPackingCharge] = useState(0);
    const [agentcharge, setAgentCharge] = useState(0);
    const [dyeingcharge, setDyeingCharge] = useState(0);
    const [marketmargin, setMarketMargin] = useState(0);
    const [discount, setDiscount] = useState(0);

    const [totalAmountDesign, setTotalAmountDesign] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);

    // Final Variables

    useEffect(() => {
        document.title = "Input Design";
        document.addEventListener("wheel", function (event) {
            if (document.activeElement.type === "number")
                document.activeElement.blur();
        });
        setLoad(true);
        axios.get("/design/add").then(({ data }) => {
            setYarnQualities(data.yarnQualities);
            setQualities(data.qualities);
            setLoad(false);
        });
    }, []);

    const handleFocus = (event) => {
        event.target.select();
    };

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            axios
                .post(`/design/`, {
                    qualityid,
                    designno,
                    pickonloom,
                    length,
                    feeder1,
                    feeder2,
                    feeder3,
                    feeder4,
                    feeder5,
                    feeder6,
                    feeder7,
                    feeder8,
                    totalpick,
                    jobcharge,
                    jobAmount,
                    buttacharge,
                    weftwastage,
                    lasercharge,
                    designcharge,
                    finishingcharge,
                    packingcharge,
                    agentcharge,
                    dyeingcharge,
                    marketmargin,
                    discount,
                    totalAmountDesign,
                    totalaveragepick: totalavgpick,
                    sellPrice,
                })
                .then(() => {
                    setLoad(false);
                    history.push("/design");
                })
                .catch(catchAxiosError);
        } catch (err) {
            console.log(err);
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
    const onUpdateQuality = (e) => {
        let q = e.target.value;
        setQualityid(null);
        qualities.map((quality) => {
            if (quality.qualityname === q) {
                setQuality(quality);
                console.log(quality.qualityid, quality);
                setQualityid(quality.qualityid);
                console.log(quality.qualityid);
                setAgentCharge(
                    parseFloat(quality.agentcharge ? quality.agentcharge : 0)
                );
                setJobCharge(
                    parseFloat(quality.jobcharge ? quality.jobcharge : 0)
                );
                setPickOnLoom(
                    parseFloat(quality.pickonloom ? quality.pickonloom : 0)
                );
                setButtaCharge(
                    parseFloat(quality.buttacharge ? quality.buttacharge : 0)
                );
                setLaserCharge(
                    parseFloat(quality.lasercharge ? quality.lasercharge : 0)
                );
                setDesignCharge(
                    parseFloat(quality.designcharge ? quality.designcharge : 0)
                );
                setFinishingCharge(
                    parseFloat(
                        quality.finishingcharge ? quality.finishingcharge : 0
                    )
                );
                setPackingCharge(
                    parseFloat(
                        quality.packingcharge ? quality.packingcharge : 0
                    )
                );
                setDyeingCharge(
                    parseFloat(quality.dyeingcharge ? quality.dyeingcharge : 0)
                );
                setMarketMargin(
                    parseFloat(quality.marketmargin ? quality.marketmargin : 0)
                );
                setDiscount(
                    parseFloat(quality.discount ? quality.discount : 0)
                );
                setWeftWastage(
                    parseFloat(quality.weftwastage ? quality.weftwastage : 0)
                );
                setLength(parseFloat(quality.length ? quality.length : 6.1));
                setPickOnFabric(
                    (
                        quality.pickonloom *
                        (quality.bodytotalwarplength / 100)
                    ).toFixed(2)
                );
                setRS(
                    parseFloat(quality.bodyrs) +
                        (quality.borderrs ? parseFloat(quality.borderrs) : 0) +
                        2
                );
                setTotalEnds(
                    (quality.bodyends ? parseInt(quality.bodyends) : 0) +
                        (quality.borderends
                            ? parseInt(quality.borderends)
                            : 0) +
                        (quality.topbeamends
                            ? parseInt(quality.topbeamends)
                            : 0)
                );
                setTotalWarpLength(
                    quality.bodytotalwarplength
                        ? parseFloat(quality.bodytotalwarplength)
                        : 0
                );
                setTotalWarpWeight(
                    (quality.bodytotalweight
                        ? parseFloat(quality.bodytotalweight)
                        : 0) +
                        (quality.bordertotalweight
                            ? parseFloat(quality.bordertotalweight)
                            : 0) +
                        (quality.topbeamtotalweight
                            ? parseFloat(quality.topbeamtotalweight)
                            : 0)
                );
                setTotalWarpYarnCost(
                    (quality.bodyyarncost
                        ? parseFloat(quality.bodyyarncost)
                        : 0) +
                        (quality.borderyarncost
                            ? parseFloat(quality.borderyarncost)
                            : 0) +
                        (quality.topbeamyarncost
                            ? parseFloat(quality.topbeamyarncost)
                            : 0)
                );
            }
        });
    };

    useEffect(() => {
        if (isNaN(rs)) setRS(0);
    }, [rs]);

    console.log("HEllo");

    useEffect(() => {
        feeders.map((feedername, index) => {
            let feeder = eval(feedername[0]);
            let setFeeder = eval(feedername[1]);
            let tempAvgPick = feeder.pick / (length * 39.37);
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
    }, [length, weftwastage]);

    useEffect(() => {
        let tempTotalPick = 0,
            tempTotalAveragePick = 0,
            tempTotalWeftWeight = 0,
            tempTotalWeftAmount = 0;
        feeders.map((feedername) => {
            let feeder = eval(feedername[0]);
            tempTotalPick += isNaN(feeder.pick) ? 0 : parseInt(feeder.pick);
            tempTotalAveragePick += isNaN(feeder.averagepick)
                ? 0
                : parseFloat(feeder.averagepick);
            tempTotalWeftWeight += isNaN(feeder.weight)
                ? 0
                : parseFloat(feeder.weight);
            tempTotalWeftAmount += isNaN(feeder.amount)
                ? 0
                : parseFloat(feeder.amount);
        });

        setTotalPick(tempTotalPick);
        setTotalAvgPick(tempTotalAveragePick.toFixed(2));
        let tempCalculatedAvgPick = tempTotalPick / (length * 39.37).toFixed(2);
        setCalculatedAvgPick(
            isNaN(tempCalculatedAvgPick) ? 0 : tempCalculatedAvgPick
        );
        setTotalWeftAmount(tempTotalWeftAmount);
        setTotalWeftWeight(tempTotalWeftWeight);
    }, [
        feeder1,
        feeder2,
        feeder3,
        feeder4,
        feeder5,
        feeder6,
        feeder7,
        feeder8,
    ]);

    useEffect(() => {
        let tempTotalAmountHundredMtr =
            parseFloat(totalweftamount) + parseFloat(totalWarpYarnCost);
        let tempTotalAmountOneMtr = tempTotalAmountHundredMtr / 100;
        let tempBaseAmount = tempTotalAmountOneMtr * length;
        setTotalAmountOneMtr(tempTotalAmountOneMtr);
        setBaseAmountDesign(tempBaseAmount);
    }, [totalWarpYarnCost, totalweftamount]);

    useEffect(() => {
        setJobAmount((calculatedavgpick * jobcharge * length) / 100);
    }, [totalpick, jobcharge]);

    useEffect(() => {
        let tempTotalAmount = baseAmountDesign;

        tempTotalAmount += parseFloat(isNaN(jobAmount) ? 0 : jobAmount);
        tempTotalAmount += parseFloat(
            isNaN(buttacharge) ? 0 : buttacharge * length
        );
        tempTotalAmount += parseFloat(
            isNaN(lasercharge) ? 0 : lasercharge * length
        );
        tempTotalAmount += parseFloat(
            isNaN(designcharge) ? 0 : designcharge * length
        );
        tempTotalAmount += parseFloat(
            isNaN(dyeingcharge) ? 0 : dyeingcharge * length
        );
        tempTotalAmount += parseFloat(
            isNaN(finishingcharge) ? 0 : finishingcharge
        );
        tempTotalAmount += parseFloat(isNaN(packingcharge) ? 0 : packingcharge);
        if (!isNaN(marketmargin)) {
            tempTotalAmount += parseFloat(
                (tempTotalAmount * parseFloat(marketmargin)) / 100
            );
        }
        if (!isNaN(discount)) {
            tempTotalAmount -= parseFloat(
                (tempTotalAmount * parseFloat(discount)) / 100
            );
        }
        if (!isNaN(agentcharge)) {
            tempTotalAmount += parseFloat(
                (tempTotalAmount * parseFloat(agentcharge)) / 100
            );
        }
        setTotalAmountDesign(tempTotalAmount);
        setSellPrice(tempTotalAmount.toFixed(2));
    }, [
        baseAmountDesign,
        jobAmount,
        buttacharge,
        lasercharge,
        designcharge,
        finishingcharge,
        packingcharge,
        agentcharge,
        dyeingcharge,
        marketmargin,
        discount,
    ]);

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
                    <table className={tableStyles.quality_table}>
                        <tbody>
                            <tr>
                                <td>Design No</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Design No"
                                        value={designno}
                                        onChange={(e) => {
                                            setDesignNo(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        autoFocus
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Quality</td>
                                <td>
                                    <input
                                        type="text"
                                        list="qualitylist"
                                        onChange={onUpdateQuality}
                                        autoCapitalize
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
                                <td>Job Charge</td>
                                <td>{jobcharge}</td>
                            </tr>
                            <tr>
                                <td>RS</td>
                                <td>{rs}</td>
                            </tr>
                            <tr>
                                <td>Length</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Pick on Loom"
                                        count="0.01"
                                        value={length}
                                        onChange={(e) => {
                                            setLength(e.target.value);
                                        }}
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Pick on Loom</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Pick on Loom"
                                        count="0.01"
                                        value={pickonloom}
                                        onChange={(e) => {
                                            setPickOnLoom(e.target.value);
                                        }}
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Pick on Fabric</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Pick on Fabric"
                                        count="0.01"
                                        value={pickonfabric}
                                        onChange={(e) => {
                                            setPickOnFabric(e.target.value);
                                        }}
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={tableStyles.design_table}>
                        <tbody>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Quality</th>
                                <th>Reed</th>
                                <th>Width</th>
                                <th>Ends</th>
                                <th>Length</th>
                                <th>Denier</th>
                                <th>Weight</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                            {quality.bodyends && quality.bodyends > 0 && (
                                <tr>
                                    <td>1</td>
                                    <td>{quality.bodyqualityname}</td>
                                    <td>{quality.bodyreed}</td>
                                    <td>{quality.bodyrs}</td>
                                    <td>{quality.bodyends}</td>
                                    <td>{quality.bodytotalwarplength}</td>
                                    <td>{quality.bodydenier}</td>
                                    <td>{quality.bodytotalweight}</td>
                                    <td>{quality.bodyyarnprice}</td>
                                    <td>{quality.bodyyarncost}</td>
                                </tr>
                            )}
                            {quality.borderends && quality.borderends > 0 && (
                                <tr>
                                    <td>2</td>
                                    <td>{quality.borderqualityname}</td>
                                    <td>{quality.borderreed}</td>
                                    <td>{quality.borderrs}</td>
                                    <td>{quality.borderends}</td>
                                    <td>{quality.bordertotalwarplength}</td>
                                    <td>{quality.borderdenier}</td>
                                    <td>{quality.bordertotalweight}</td>
                                    <td>{quality.borderyarnprice}</td>
                                    <td>{quality.borderyarncost}</td>
                                </tr>
                            )}
                            {quality.topbeamends && quality.topbeamends > 0 && (
                                <tr>
                                    <td>3</td>
                                    <td>{quality.topbeamqualityname}</td>
                                    <td>{quality.topbeamreed}</td>
                                    <td>{quality.topbeamrs}</td>
                                    <td>{quality.topbeamends}</td>
                                    <td>{quality.topbeamtotalwarplength}</td>
                                    <td>{quality.topbeamdenier}</td>
                                    <td>{quality.topbeamtotalweight}</td>
                                    <td>{quality.topbeamyarnprice}</td>
                                    <td>{quality.topbeamyarncost}</td>
                                </tr>
                            )}

                            <tr>
                                <td>Totals</td>
                                <td colSpan="2"></td>
                                <td>{rs}</td>
                                <td>{totalEnds}</td>
                                <td>{totalWarpLength}</td>
                                <td></td>
                                <td>{totalWarpWeight}</td>
                                <td></td>
                                <td>{totalWarpYarnCost}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className={tableStyles.design_table}>
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
                        {feeders.map((feeder, index) => (
                            <InputFeeder
                                role={index + 1}
                                feeder={eval(feeder[0])}
                                length={length}
                                rs={rs}
                                weftwastage={weftwastage}
                                setFeeder={eval(feeder[1])}
                                yarnQualities={yarnQualities}
                                captureEnter={captureEnter}
                                handleFocus={handleFocus}
                            />
                        ))}
                        <tr>
                            <td colSpan="3"></td>
                            <td>{totalpick}</td>
                            <td>{totalavgpick}</td>
                            <td>{totalweftweight.toFixed(3)}</td>
                            <td></td>
                            <td>{totalweftamount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="1"></td>
                            <td colSpan="3">Calculated Average Pick =&gt;</td>
                            <td>{calculatedavgpick.toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Yarn Cost Per MTR :</td>
                            <td>{totalAmountOneMtr.toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Length :</td>
                            <td>{length.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Yarn Cost Saree :</td>
                            <td>{baseAmountDesign.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Weft Wastage :</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Weft Wastage"
                                    count="0.01"
                                    value={weftwastage}
                                    onChange={(e) => {
                                        setWeftWastage(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                            <td>
                                {(
                                    (baseAmountDesign * weftwastage) /
                                    100
                                ).toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td>.</td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Job Charge</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Job Charge"
                                    count="0.01"
                                    value={jobcharge}
                                    onChange={(e) => {
                                        setJobCharge(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                            <td>{jobAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Butta Charge / MTR</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Butta Charge"
                                    count="0.01"
                                    value={buttacharge}
                                    onChange={(e) => {
                                        setButtaCharge(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Laser Charge / MTR</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Laser Charge"
                                    count="0.01"
                                    value={lasercharge}
                                    onChange={(e) => {
                                        setLaserCharge(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Design Charge / MTR</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Design Charge"
                                    count="0.01"
                                    value={designcharge}
                                    onChange={(e) => {
                                        setDesignCharge(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Finishing Charge / SAREE</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Finishing Charge"
                                    count="0.01"
                                    value={finishingcharge}
                                    onChange={(e) => {
                                        setFinishingCharge(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Packing Charge / SAREE</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Packing Charge"
                                    count="0.01"
                                    value={packingcharge}
                                    onChange={(e) => {
                                        setPackingCharge(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Agent Charge % </td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Agent Charge"
                                    count="0.01"
                                    value={agentcharge}
                                    onChange={(e) => {
                                        setAgentCharge(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Dyeing Charge / MTR</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Dyeing Charge"
                                    count="0.01"
                                    value={dyeingcharge}
                                    onChange={(e) => {
                                        setDyeingCharge(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Market Margin %</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Market Margin"
                                    count="0.01"
                                    value={marketmargin}
                                    onChange={(e) => {
                                        setMarketMargin(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Discount %</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Discount"
                                    count="0.01"
                                    value={discount}
                                    onChange={(e) => {
                                        setDiscount(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>.</td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="2">Total Amount Per Saree :</td>
                            <td>{totalAmountDesign.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="6"></td>
                            <td>Selling Price :</td>
                            <td>
                                <input
                                    type="text"
                                    size="7"
                                    placeholder="Selling Price"
                                    count="0.01"
                                    value={sellPrice}
                                    onChange={(e) => {
                                        setSellPrice(e.target.value);
                                    }}
                                    onKeyDown={captureEnter}
                                    onFocus={handleFocus}
                                />
                            </td>
                        </tr>
                    </table>
                    <button
                        type="button"
                        className={buttonStyles.inputbutton}
                        onClick={onSubmitEvent}
                    >
                        Add new Design
                    </button>
                </form>
            )}{" "}
        </div>
    );
}

export default InputDesign;
