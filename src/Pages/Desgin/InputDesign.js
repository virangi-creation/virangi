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
    const [yarnqualities, setYarnQualities] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [harnesses, setHarnesses] = useState([]);
    const [feeders, setFeeders] = useState([]);
    const [warps, setWarps] = useState([]);

    // Final Variables
    const [qualityid, setQualityid] = useState("");
    const [designno, setDesignNo] = useState("");
    const [designfilename, setDesignFileName] = useState("");
    const [harnessid, setHarnessid] = useState("");
    const [loomnos, setLoomnos] = useState("");
    const [fullDetail, setFullDetail] = useState("");
    const [pickonloom, setPickOnLoom] = useState(0);
    const [pickonfabric, setPickOnFabric] = useState(0);
    const [length, setLength] = useState(0);
    const [rs, setRS] = useState(0);
    const [weftwastage, setWeftWastage] = useState(0);

    const [bodywarp, setBodyWarp] = useState({});
    const [borderwarp, setBorderWarp] = useState({});
    const [topbeam, setTopBeam] = useState({});

    let feederTemplate = {
        feederid: 1,
        yarnqualityid: 1,
        yarnqualityname: "",
        feedertype: 3,
        pick: 0,
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

    const [warpDetails] = useState([
        ["bodywarp", "setBodyWarp"],
        ["borderwarp", "setBorderWarp"],
        ["topbeam", "setTopBeam"],
    ]);
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
    const [jobamount, setJobAmount] = useState(0);
    const [buttacharge, setButtaCharge] = useState(0);
    const [lasercharge, setLaserCharge] = useState(0);
    const [designcharge, setDesignCharge] = useState(0);
    const [finishingcharge, setFinishingCharge] = useState(0);
    const [packingcharge, setPackingCharge] = useState(0);
    const [agentcharge, setAgentCharge] = useState(0);
    const [dyeingcharge, setDyeingCharge] = useState(0);
    const [marketmargin, setMarketMargin] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [marketmarginamount, setMarketMarginAmount] = useState(0);
    const [discountamount, setDiscountAmount] = useState(0);
    const [agentamount, setAgentAmount] = useState(0);

    const [totalCharges, setTotalCharges] = useState(0);
    const [totalamountdesign, setTotalAmountDesign] = useState(0);
    const [sellprice, setSellPrice] = useState(0);

    useEffect(async () => {
        document.title = "Input Design";
        document.addEventListener("wheel", function (event) {
            if (document.activeElement.type === "number")
                document.activeElement.blur();
        });
        setLoad(true);
        await axios
            .get("/design/add")
            .then(({ data }) => {
                console.log(data);
                setYarnQualities(data.yarnqualities);
                setQualities(data.qualities);
                setHarnesses(data.harnesses);
                setWarps(data.warps);
                setFeeders(data.feeders);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                catchAxiosError(err);
            });
    }, []);

    const handleFocus = (event) => {
        event.target.select();
    };

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .post(`/design/`, {
                    qualityid,
                    designno,
                    designfilename,
                    harnessid,
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
                    jobamount,
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
                    totalamountdesign,
                    totalaveragepick: totalavgpick,
                    sellprice,
                })
                .then(() => {
                    setLoad(false);
                    history.push("/design");
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
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
                console.log(quality);
                setQualityid(quality.qualityid);
                setBodyWarp({ warpid: quality.bodywarpid });
                setBorderWarp({ warpid: quality.borderwarpid });
                setTopBeam({ warpid: quality.topbeamid });
                setFeeder1({ feederid: parseInt(quality.feeder1) });
                setFeeder2({ feederid: parseInt(quality.feeder2) });
                setFeeder3({ feederid: parseInt(quality.feeder3) });
                setFeeder4({ feederid: parseInt(quality.feeder4) });
                setFeeder5({ feederid: parseInt(quality.feeder5) });
                setFeeder6({ feederid: parseInt(quality.feeder6) });
                setFeeder7({ feederid: parseInt(quality.feeder7) });
                setFeeder8({ feederid: parseInt(quality.feeder8) });
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
            }
        });
    };

    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            let warpname = eval(warpDetails[i][0]);
            let setWarpName = eval(warpDetails[i][1]);
            warps.map((warp) => {
                if (warp.warpid === warpname.warpid) {
                    let { warpid, ...y } = warp;
                    yarnqualities.map((yq) => {
                        if (yq.qualityid === warp.warpqualityid) {
                            setWarpName((prevState) => ({
                                ...prevState,
                                ...y,
                                denier: yq.denier,
                                yarnprice: yq.totalprice,
                                warpqualityname: yq.qualityname,
                            }));
                        }
                    });
                }
            });
        }
    }, [bodywarp.warpid, borderwarp.warpid, topbeam.warpid]);

    useEffect(async () => {
        for (let i = 0; i < 8; i++) {
            let feedername = eval(feederDetails[i][0]);
            let setFeederName = eval(feederDetails[i][1]);
            await feeders.map((feeder) => {
                if (feeder.feederid === feedername.feederid) {
                    let { feederid, ...y } = feeder;
                    yarnqualities.map((yq) => {
                        if (yq.qualityid === feeder.yarnqualityid) {
                            setFeederName((prevState) => ({
                                ...prevState,
                                ...y,
                                denier: yq.denier,
                                yarnprice: yq.totalprice,
                                yarnqualityname: yq.qualityname,
                            }));
                        }
                    });
                }
            });
        }
    }, [
        feeder1.feederid,
        feeder2.feederid,
        feeder3.feederid,
        feeder4.feederid,
        feeder5.feederid,
        feeder6.feederid,
        feeder7.feederid,
        feeder8.feederid,
    ]);

    useEffect(() => {
        setPickOnFabric(
            (pickonloom * (bodywarp.totalwarplength / 100)).toFixed(2)
        );
        setRS(
            (bodywarp.rs ? parseFloat(bodywarp.rs) : 0) +
                (borderwarp.rs ? parseFloat(borderwarp.rs) : 0) +
                2
        );
        setTotalEnds(
            parseInt(bodywarp.ends) +
                (borderwarp.ends ? parseInt(borderwarp.ends) : 0) +
                (topbeam.ends ? parseInt(topbeam.ends) : 0)
        );
        setTotalWarpLength(
            borderwarp.totalwarplength
                ? parseFloat(borderwarp.totalwarplength)
                : 0
        );
        setTotalWarpWeight(
            (bodywarp.totalweight ? parseFloat(bodywarp.totalweight) : 0) +
                (borderwarp.totalweight
                    ? parseFloat(borderwarp.totalweight)
                    : 0) +
                (topbeam.totalweight ? parseFloat(topbeam.totalweight) : 0)
        );
        setTotalWarpYarnCost(
            (bodywarp.yarncost ? parseFloat(bodywarp.yarncost) : 0) +
                (borderwarp.yarncost ? parseFloat(borderwarp.yarncost) : 0) +
                (topbeam.yarncost ? parseFloat(topbeam.yarncost) : 0)
        );
    }, [bodywarp.totalwarplength, borderwarp.rs, pickonloom]);

    const onUpdateHarness = (e) => {
        let q = e.target.value;
        setHarnessid(null);
        setLoomnos(null);
        setFullDetail(null);
        harnesses.map((harness) => {
            if (harness.harnessname === q) {
                setHarnessid(harness.harnessid);
                setLoomnos(harness.loomno);
                setFullDetail(harness.fulldetail);
            }
        });
    };

    useEffect(() => {
        feederDetails.map((feedername, index) => {
            let feeder = eval(feedername[0]);
            let setFeeder = eval(feedername[1]);
            let tempAvgPick = feeder.pick / (length * 39.37);
            let tempWeight = (tempAvgPick * rs * feeder.denier) / 90000;
            let tempAmount = tempWeight * feeder.yarnprice;
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
    }, [
        length,
        feeder1.yarnqualityid,
        feeder2.yarnqualityid,
        feeder3.yarnqualityid,
        feeder4.yarnqualityid,
        feeder5.yarnqualityid,
        feeder6.yarnqualityid,
        feeder7.yarnqualityid,
        feeder8.yarnqualityid,
    ]);

    useEffect(() => {
        let tempTotalPick = 0,
            tempTotalAveragePick = 0,
            tempTotalWeftWeight = 0,
            tempTotalWeftAmount = 0;
        feederDetails.map((feedername) => {
            let feeder = eval(feedername[0]);
            if (feeder.pick)
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
        length,
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
        setJobAmount((calculatedavgpick * jobcharge) / 100);
    }, [totalpick, jobcharge]);

    useEffect(() => {
        let tempTotalAmount = totalAmountOneMtr;

        tempTotalAmount += parseFloat(
            isNaN(weftwastage)
                ? 0
                : (totalweftamount * parseFloat(weftwastage)) / 10000
        );
        tempTotalAmount += parseFloat(isNaN(jobamount) ? 0 : jobamount);
        tempTotalAmount += parseFloat(isNaN(buttacharge) ? 0 : buttacharge);
        tempTotalAmount += parseFloat(isNaN(lasercharge) ? 0 : lasercharge);
        tempTotalAmount += parseFloat(isNaN(designcharge) ? 0 : designcharge);
        tempTotalAmount += parseFloat(isNaN(dyeingcharge) ? 0 : dyeingcharge);
        tempTotalAmount += parseFloat(
            isNaN(finishingcharge) ? 0 : finishingcharge / length
        );
        tempTotalAmount += parseFloat(
            isNaN(packingcharge) ? 0 : packingcharge / length
        );
        setTotalCharges(tempTotalAmount);
    }, [
        totalAmountOneMtr,
        jobamount,
        buttacharge,
        lasercharge,
        designcharge,
        finishingcharge,
        packingcharge,
        dyeingcharge,
        weftwastage,
    ]);

    useEffect(() => {
        let tempTotalAmount = totalCharges,
            tempMarginAmount = 0,
            tempDiscountAmount = 0,
            tempAgentAmount = 0;
        if (!isNaN(marketmargin)) {
            tempMarginAmount =
                (tempTotalAmount * parseFloat(marketmargin)) / 100;
            setMarketMarginAmount(tempMarginAmount);
            tempTotalAmount += parseFloat(tempMarginAmount);
        }
        if (!isNaN(discount)) {
            tempDiscountAmount = (tempTotalAmount * parseFloat(discount)) / 100;
            setDiscountAmount(tempDiscountAmount);
            tempTotalAmount -= parseFloat(tempDiscountAmount);
        }
        if (!isNaN(agentcharge)) {
            tempAgentAmount = (tempTotalAmount * parseFloat(agentcharge)) / 100;
            tempTotalAmount += parseFloat(tempAgentAmount);
            setAgentAmount(tempAgentAmount);
        }
        setTotalAmountDesign((tempTotalAmount * length).toFixed(2));
        setSellPrice((tempTotalAmount * length).toFixed(2));
    }, [marketmargin, agentcharge, discount, totalCharges]);

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
                                <td>Design File Name</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Design File Name"
                                        value={designfilename}
                                        onChange={(e) => {
                                            setDesignFileName(
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
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Harness</td>
                                <td>
                                    <input
                                        type="text"
                                        list="harnesslist"
                                        onChange={onUpdateHarness}
                                        autoCapitalize
                                        placeholder="Harness Type"
                                        onKeyDown={captureEnter}
                                    />

                                    <datalist id="harnesslist">
                                        {harnesses.length > 0 &&
                                            harnesses.map((harness) => (
                                                <option
                                                    value={harness.harnessname}
                                                />
                                            ))}
                                    </datalist>
                                </td>
                                {fullDetail && (
                                    <td style={{ paddingLeft: "10px" }}>
                                        {" "}
                                        &#91; {fullDetail} &#93; ,{" "}
                                    </td>
                                )}
                                {loomnos && (
                                    <td style={{ paddingLeft: "10px" }}>
                                        &#40; {loomnos} &#41;
                                    </td>
                                )}
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
                                        placeholder="Length / Piece"
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
                            {warpDetails.map((w, index) => {
                                let wName = eval(w[0]);
                                if (wName.ends && wName.ends > 0) {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{wName.warpqualityname}</td>
                                            <td>{wName.reed}</td>
                                            <td>{wName.rs}</td>
                                            <td>{wName.ends}</td>
                                            <td>{wName.totalwarplength}</td>
                                            <td>{wName.denier}</td>
                                            <td>{wName.totalweight}</td>
                                            <td>{wName.yarnprice}</td>
                                            <td>{wName.yarncost}</td>
                                        </tr>
                                    );
                                }
                            })}
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
                        {feederDetails.map((feeder, index) => (
                            <InputFeeder
                                role={index + 1}
                                feeder={eval(feeder[0])}
                                length={length}
                                rs={rs}
                                weftwastage={weftwastage}
                                setFeeder={eval(feeder[1])}
                                yarnqualities={yarnqualities}
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

                        <tr style={{ height: "40px" }}>
                            <td colSpan="5"></td>
                            <td colSpan="3" style={{ paddingRight: "70px" }}>
                                Length :
                            </td>
                            <td>{length.toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td colSpan="6">Yarn Cost / MTR :</td>
                            <td></td>
                            <td>{totalAmountOneMtr.toFixed(2)}</td>
                            <td>{baseAmountDesign.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="6">Weft Wastage :</td>
                            <td>
                                <input
                                    type="text"
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
                                    (totalweftamount * weftwastage) /
                                    10000
                                ).toFixed(2)}
                            </td>
                            <td>
                                {(
                                    (totalweftamount * weftwastage * length) /
                                    10000
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
                            <td colSpan="3"></td>
                            <td colSpan="3">Job Charge</td>
                            <td>
                                <input
                                    type="text"
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
                            <td>{jobamount.toFixed(2)}</td>
                            <td>{(jobamount * length).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Butta Charge / MTR</td>
                            <td>
                                <input
                                    type="text"
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
                            <td>{buttacharge.toFixed(2)}</td>
                            <td>{(buttacharge * length).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Laser Charge / MTR</td>
                            <td>
                                <input
                                    type="text"
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
                            <td>{lasercharge.toFixed(2)}</td>
                            <td>{(lasercharge * length).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Design Charge / MTR</td>
                            <td>
                                <input
                                    type="text"
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
                            <td>{designcharge.toFixed(2)}</td>
                            <td>{(designcharge * length).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Dyeing Charge / MTR</td>
                            <td>
                                <input
                                    type="text"
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
                            <td>{dyeingcharge.toFixed(2)}</td>
                            <td>{(dyeingcharge * length).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Finishing Charge / UNIT</td>
                            <td>
                                <input
                                    type="text"
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
                            <td>
                                {(isNaN(finishingcharge)
                                    ? 0
                                    : finishingcharge / length
                                ).toFixed(2)}
                            </td>
                            <td>{finishingcharge.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Packing Charge / UNIT</td>
                            <td>
                                <input
                                    type="text"
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
                            <td>
                                {(isNaN(packingcharge)
                                    ? 0
                                    : packingcharge / length
                                ).toFixed(2)}
                            </td>
                            <td>{packingcharge.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>.</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Total Charges </td>
                            <td></td>
                            <td>
                                {(isNaN(totalCharges)
                                    ? 0
                                    : totalCharges
                                ).toFixed(2)}
                            </td>
                            <td>{(totalCharges * length).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>.</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Market Margin %</td>
                            <td>
                                <input
                                    type="text"
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
                            <td>{marketmarginamount.toFixed(2)}</td>
                            <td>{(marketmarginamount * length).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Discount %</td>
                            <td>
                                <input
                                    type="text"
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
                            <td>{discountamount.toFixed(2)}</td>
                            <td>{(discountamount * length).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="3">Agent Charge % </td>
                            <td>
                                <input
                                    type="text"
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
                            <td>{agentamount.toFixed(2)}</td>
                            <td>{(agentamount * length).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>.</td>
                        </tr>
                        <tr>
                            <td colSpan="4"></td>
                            <td colSpan="3">Total Amount :</td>
                            <td>{(totalamountdesign / length).toFixed(2)}</td>
                            <td>{totalamountdesign}</td>
                        </tr>
                        <tr>
                            <td colSpan="6"></td>
                            <td>Selling Price :</td>
                            <td>
                                <input
                                    type="text"
                                    size="14"
                                    placeholder="Selling Price"
                                    count="0.01"
                                    value={sellprice}
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
