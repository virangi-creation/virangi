import axios from "../../axios.js";
import { useHistory, useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import catchAxiosError from "../../Util/catchAxiosError.js";
import InputFeeder from "./InputFeeder.js";
import handleFocus from "../../Util/handleFocus.js";

function UpdateDesign() {
    let history = useHistory();
    let location = useLocation();

    const [load, setLoad] = useState(false);
    const [yarnqualities, setYarnQualities] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [harnesses, setHarnesses] = useState([]);
    const [feeders, setFeeders] = useState([]);
    const [warps, setWarps] = useState([]);

    // Final Variables
    const [qualityid, setQualityid] = useState("");
    const [qualityname, setQualityname] = useState("");
    const [designno, setDesignNo] = useState("");
    const [designfilename, setDesignFileName] = useState("");
    const [designdescription, setDesignDescription] = useState("");
    const [harnessid, setHarnessid] = useState("");
    const [harnessname, setHarnessName] = useState("");
    const [loomnos, setLoomnos] = useState("");
    const [fullDetail, setFullDetail] = useState("");
    const [pickonloom, setPickOnLoom] = useState(0);
    const [pickonfabric, setPickOnFabric] = useState(0);
    const [designlength, setDesignLength] = useState(0);
    const [unitlength, setUnitLength] = useState(0);
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
    const [secondsratio, setSecondsRatio] = useState(0);
    const [valueadditioncharge, setValueAdditionCharge] = useState(0);
    const [manufacturersellprice, setManufacturerSellPrice] = useState(0);
    const [agentcharge, setAgentCharge] = useState(0);
    const [dyeingcharge, setDyeingCharge] = useState(0);
    const [marketmargin, setMarketMargin] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [secondsratioamount, setSecondsRatioAmount] = useState(0);
    const [marketmarginamount, setMarketMarginAmount] = useState(0);
    const [discountamount, setDiscountAmount] = useState(0);
    const [agentamount, setAgentAmount] = useState(0);

    const [totalCharges, setTotalCharges] = useState(0);
    const [totalamountdesign, setTotalAmountDesign] = useState(0);
    const [sellprice, setSellPrice] = useState(0);

    useEffect(async () => {
        try {
            if (location.state) {
                console.log(location.state.designfilename);
                setDesignFileName(location.state.designfilename);
                setLoad(true);
                await axios
                    .get(`/design/${location.state.designfilename}/update`)
                    .then(async ({ data }) => {
                        console.log(data);
                        let design = data.design;
                        setQualityid(parseInt(design.qualityid));
                        setDesignFileName(design.designfilename);
                        setDesignDescription(design.designdescription);
                        setDesignNo(design.designno);
                        setHarnessid(design.harnessid);

                        let tempHarnesses = data.harnesses;
                        tempHarnesses.map((h) => {
                            if (h.harnessid === design.harnessid) {
                                setHarnessName(h.harnessname);
                                setLoomnos(h.loomno);
                                setFullDetail(h.fulldetail);
                            }
                        });

                        setFeeder1({ feederid: parseInt(design.feeder1) });
                        setFeeder2({ feederid: parseInt(design.feeder2) });
                        setFeeder3({ feederid: parseInt(design.feeder3) });
                        setFeeder4({ feederid: parseInt(design.feeder4) });
                        setFeeder5({ feederid: parseInt(design.feeder5) });
                        setFeeder6({ feederid: parseInt(design.feeder6) });
                        setFeeder7({ feederid: parseInt(design.feeder7) });
                        setFeeder8({ feederid: parseInt(design.feeder8) });
                        setAgentCharge(
                            parseFloat(
                                design.agentcharge ? design.agentcharge : 0
                            )
                        );
                        setJobCharge(
                            parseFloat(design.jobcharge ? design.jobcharge : 0)
                        );
                        setPickOnLoom(
                            parseFloat(
                                design.pickonloom ? design.pickonloom : 0
                            )
                        );
                        setButtaCharge(
                            parseFloat(
                                design.buttacharge ? design.buttacharge : 0
                            )
                        );
                        setLaserCharge(
                            parseFloat(
                                design.lasercharge ? design.lasercharge : 0
                            )
                        );
                        setDesignCharge(
                            parseFloat(
                                design.designcharge ? design.designcharge : 0
                            )
                        );
                        setFinishingCharge(
                            parseFloat(
                                design.finishingcharge
                                    ? design.finishingcharge
                                    : 0
                            )
                        );
                        setSecondsRatio(
                            parseFloat(
                                design.secondsratio ? design.secondsratio : 0
                            )
                        );
                        setValueAdditionCharge(
                            parseFloat(
                                design.valueadditioncharge
                                    ? design.valueadditioncharge
                                    : 0
                            )
                        );
                        setDyeingCharge(
                            parseFloat(
                                design.dyeingcharge ? design.dyeingcharge : 0
                            )
                        );
                        setMarketMargin(
                            parseFloat(
                                design.marketmargin ? design.marketmargin : 0
                            )
                        );
                        setDiscount(
                            parseFloat(design.discount ? design.discount : 0)
                        );
                        setWeftWastage(
                            parseFloat(
                                design.weftwastage ? design.weftwastage : 0
                            )
                        );
                        setDesignLength(
                            parseFloat(
                                design.designlength ? design.designlength : 6.1
                            )
                        );
                        setUnitLength(
                            parseFloat(
                                design.unitlength ? design.unitlength : 6.1
                            )
                        );
                        setManufacturerSellPrice(design.manufacturersellprice);
                        setSellPrice(design.sellprice);
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
                document.title = "Update Design";
                document.addEventListener("wheel", function (event) {
                    if (document.activeElement.type === "number") {
                        document.activeElement.blur();
                    }
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
            await axios
                .put(`/design/${location.state.designfilename}`, {
                    qualityid,
                    designno,
                    designfilename,
                    designdescription,
                    harnessid,
                    pickonloom,
                    designlength,
                    unitlength,
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
                    secondsratio,
                    valueadditioncharge,
                    agentcharge,
                    dyeingcharge,
                    marketmargin,
                    discount,
                    totalamountdesign,
                    totalaveragepick: totalavgpick,
                    sellprice,
                    manufacturersellprice,
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

    useEffect(async () => {
        await qualities.map((quality) => {
            if (quality.qualityid === qualityid) {
                setQualityname(quality.qualityname);
                setBodyWarp({ warpid: quality.bodywarpid });
                setBorderWarp({ warpid: quality.borderwarpid });
                setTopBeam({ warpid: quality.topbeamid });
            }
        });
    }, [qualityid, qualities]);

    const onUpdateQuality = (e) => {
        let q = e.target.value;
        setQualityname(q);
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
                setSecondsRatio(
                    parseFloat(quality.secondsratio ? quality.secondsratio : 0)
                );
                setValueAdditionCharge(
                    parseFloat(
                        quality.valueadditioncharge
                            ? quality.valueadditioncharge
                            : 0
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
                setDesignLength(
                    parseFloat(
                        quality.designlength ? quality.designlength : 6.1
                    )
                );
                setUnitLength(
                    parseFloat(quality.unitlength ? quality.unitlength : 6.1)
                );
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
    }, [warps, bodywarp.warpid, borderwarp.warpid, topbeam.warpid]);

    useEffect(async () => {
        for (let i = 0; i < 8; i++) {
            let feedername = eval(feederDetails[i][0]);
            let setFeederName = eval(feederDetails[i][1]);
            await feeders.map((feeder) => {
                if (feeder.feederid === feedername.feederid) {
                    console.log(feedername, feeder);
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
        feeders,
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
        console.log("Total Warp Length", bodywarp.totalwarplength);
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
        setHarnessName(q);
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
            let tempAvgPick = feeder.pick / (designlength * 39.37);
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
        designlength,
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
        let tempCalculatedAvgPick =
            tempTotalPick / (designlength * 39.37).toFixed(2);
        setCalculatedAvgPick(
            isNaN(tempCalculatedAvgPick) ? 0 : tempCalculatedAvgPick
        );
        setTotalWeftAmount(tempTotalWeftAmount);
        setTotalWeftWeight(tempTotalWeftWeight);
    }, [
        designlength,
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
        let tempBaseAmount = tempTotalAmountOneMtr * unitlength;
        setTotalAmountOneMtr(tempTotalAmountOneMtr);
        setBaseAmountDesign(tempBaseAmount);
    }, [unitlength, totalWarpYarnCost, totalweftamount]);

    useEffect(() => {
        setJobAmount((calculatedavgpick * jobcharge) / 100);
    }, [unitlength, totalpick, jobcharge]);

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
        if (!isNaN(secondsratio)) {
            let tempSecondsRationAmount =
                (tempTotalAmount * parseFloat(secondsratio) * unitlength) / 100;
            tempTotalAmount += parseFloat(tempSecondsRationAmount / unitlength);
            setSecondsRatioAmount(tempSecondsRationAmount);
        }

        setTotalCharges(tempTotalAmount);
    }, [
        totalAmountOneMtr,
        jobamount,
        buttacharge,
        lasercharge,
        designcharge,
        secondsratio,
        dyeingcharge,
        weftwastage,
        unitlength,
    ]);

    useEffect(() => {
        let tempTotalAmount = parseFloat(manufacturersellprice) / unitlength,
            tempMarginAmount = 0,
            tempDiscountAmount = 0,
            tempAgentAmount = 0;

        tempTotalAmount += parseFloat(
            isNaN(finishingcharge) ? 0 : finishingcharge / unitlength
        );

        tempTotalAmount += parseFloat(
            isNaN(valueadditioncharge) ? 0 : valueadditioncharge / unitlength
        );

        if (!isNaN(marketmargin)) {
            tempMarginAmount =
                (tempTotalAmount * 100) / (100 - parseFloat(marketmargin)) -
                tempTotalAmount;
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
        setTotalAmountDesign((tempTotalAmount * unitlength).toFixed(2));
    }, [
        marketmargin,
        agentcharge,
        discount,
        manufacturersellprice,
        finishingcharge,
        valueadditioncharge,
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
                    <table
                        className="table table-bordered table-hover table-responsive"
                        style={{
                            width: "80%",
                            verticalAlign: "middle",
                        }}
                    >
                        <tbody>
                            <tr>
                                <td>Design File Name</td>
                                <td>
                                    <input
                                        placeholder="Design File Name"
                                        value={designfilename}
                                        onChange={(e) => {
                                            setDesignFileName(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        autoFocus
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Design No</td>
                                <td>
                                    <input
                                        placeholder="Design No"
                                        value={designno}
                                        onChange={(e) => {
                                            setDesignNo(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Design Description</td>
                                <td>
                                    <input
                                        placeholder="Design Description"
                                        value={designdescription}
                                        onChange={(e) => {
                                            setDesignDescription(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Harness</td>
                                <td>
                                    <input
                                        list="harnesslist"
                                        value={harnessname}
                                        onChange={onUpdateHarness}
                                        autoCapitalize
                                        placeholder="Harness Type"
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
                                        list="qualitylist"
                                        value={qualityname}
                                        onChange={onUpdateQuality}
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
                                <td>Job Charge</td>
                                <td>{jobcharge}</td>
                            </tr>
                            <tr>
                                <td>RS</td>
                                <td>{rs}</td>
                            </tr>
                            <tr>
                                <td>Design Length</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Design Length"
                                        count="0.01"
                                        value={designlength}
                                        onChange={(e) => {
                                            setDesignLength(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Unit Length</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Unit Length"
                                        count="0.01"
                                        value={unitlength}
                                        onChange={(e) => {
                                            setUnitLength(e.target.value);
                                        }}
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
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table table-bordered table-hover table-responsive">
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
                    <table className="table table-bordered table-hover table-responsive">
                        <tbody>
                            <tr>
                                <th width="5%">Sr. No</th>
                                <th width="15%">Quality</th>
                                <th width="10%">Denier</th>
                                <th width="10%">Feeder</th>
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
                                />
                            ))}
                            <tr>
                                <td colSpan="4"></td>
                                <td>{totalpick}</td>
                                <td>{totalavgpick}</td>
                                <td>{totalweftweight.toFixed(3)}</td>
                                <td></td>
                                <td>{totalweftamount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="1"></td>
                                <td colSpan="3">
                                    Calculated Average Pick =&gt;
                                </td>
                                <td>{calculatedavgpick.toFixed(2)}</td>
                            </tr>

                            <tr style={{ height: "40px" }}>
                                <td colSpan="5"></td>
                                <td
                                    colSpan="3"
                                    style={{ paddingRight: "70px" }}
                                >
                                    Unit Length :
                                </td>
                                <td>{unitlength}</td>
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
                                        placeholder="Weft Wastage"
                                        count="0.01"
                                        value={weftwastage}
                                        onChange={(e) => {
                                            setWeftWastage(e.target.value);
                                        }}
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
                                        (totalweftamount *
                                            weftwastage *
                                            unitlength) /
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
                                        placeholder="Job Charge"
                                        count="0.01"
                                        value={jobcharge}
                                        onChange={(e) => {
                                            setJobCharge(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>{jobamount.toFixed(2)}</td>
                                <td>{(jobamount * unitlength).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Butta Charge / MTR</td>
                                <td>
                                    <input
                                        placeholder="Butta Charge"
                                        count="0.01"
                                        value={buttacharge}
                                        onChange={(e) => {
                                            setButtaCharge(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>{buttacharge}</td>
                                <td>{(buttacharge * unitlength).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Laser Charge / MTR</td>
                                <td>
                                    <input
                                        placeholder="Laser Charge"
                                        count="0.01"
                                        value={lasercharge}
                                        onChange={(e) => {
                                            setLaserCharge(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>{lasercharge}</td>
                                <td>{(lasercharge * unitlength).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Design Charge / MTR</td>
                                <td>
                                    <input
                                        placeholder="Design Charge"
                                        count="0.01"
                                        value={designcharge}
                                        onChange={(e) => {
                                            setDesignCharge(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>{designcharge}</td>
                                <td>
                                    {(designcharge * unitlength).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Dyeing Charge / MTR</td>
                                <td>
                                    <input
                                        placeholder="Dyeing Charge"
                                        count="0.01"
                                        value={dyeingcharge}
                                        onChange={(e) => {
                                            setDyeingCharge(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>{dyeingcharge}</td>
                                <td>
                                    {(dyeingcharge * unitlength).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Seconds Ratio / UNIT</td>
                                <td>
                                    <input
                                        placeholder="Seconds Ratio"
                                        count="0.01"
                                        value={secondsratio}
                                        onChange={(e) => {
                                            setSecondsRatio(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>
                                    {(isNaN(secondsratioamount)
                                        ? 0
                                        : secondsratioamount / unitlength
                                    ).toFixed(2)}
                                </td>
                                <td>{secondsratioamount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>.</td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Total Cost </td>
                                <td></td>
                                <td>
                                    {(isNaN(totalCharges)
                                        ? 0
                                        : totalCharges
                                    ).toFixed(2)}
                                </td>
                                <td>
                                    {(totalCharges * unitlength).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">
                                    Manufacturer Sell Price / UNIT
                                </td>
                                <td></td>
                                <td colSpan="2">
                                    <input
                                        placeholder="Manufacturer Sell Price"
                                        count="0.01"
                                        value={manufacturersellprice}
                                        onChange={(e) => {
                                            setManufacturerSellPrice(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>.</td>
                            </tr>

                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Finishing Charge / UNIT</td>
                                <td>
                                    <input
                                        placeholder="Finishing Charge"
                                        count="0.01"
                                        value={finishingcharge}
                                        onChange={(e) => {
                                            setFinishingCharge(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>
                                    {(isNaN(finishingcharge)
                                        ? 0
                                        : finishingcharge / unitlength
                                    ).toFixed(2)}
                                </td>
                                <td>{finishingcharge}</td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">
                                    Value Addition Charge / UNIT
                                </td>
                                <td>
                                    <input
                                        placeholder="Value Addition Charge"
                                        count="0.01"
                                        value={valueadditioncharge}
                                        onChange={(e) => {
                                            setValueAdditionCharge(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </td>
                                <td>
                                    {(isNaN(valueadditioncharge)
                                        ? 0
                                        : valueadditioncharge / unitlength
                                    ).toFixed(2)}
                                </td>
                                <td>{valueadditioncharge}</td>
                            </tr>
                            <tr>
                                <td>.</td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Market Margin %</td>
                                <td>
                                    <input
                                        placeholder="Market Margin"
                                        count="0.01"
                                        value={marketmargin}
                                        onChange={(e) => {
                                            setMarketMargin(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>{marketmarginamount.toFixed(2)}</td>
                                <td>
                                    {(marketmarginamount * unitlength).toFixed(
                                        2
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Discount %</td>
                                <td>
                                    <input
                                        placeholder="Discount"
                                        count="0.01"
                                        value={discount}
                                        onChange={(e) => {
                                            setDiscount(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>{discountamount.toFixed(2)}</td>
                                <td>
                                    {(discountamount * unitlength).toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td colSpan="3">Agent Charge % </td>
                                <td>
                                    <input
                                        placeholder="Agent Charge"
                                        count="0.01"
                                        value={agentcharge}
                                        onChange={(e) => {
                                            setAgentCharge(e.target.value);
                                        }}
                                    />
                                </td>
                                <td>{agentamount.toFixed(2)}</td>
                                <td>{(agentamount * unitlength).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>.</td>
                            </tr>
                            <tr>
                                <td colSpan="4"></td>
                                <td colSpan="3">Total Amount :</td>
                                <td>
                                    {(totalamountdesign / unitlength).toFixed(
                                        2
                                    )}
                                </td>
                                <td>{totalamountdesign}</td>
                            </tr>
                            <tr>
                                <td colSpan="6"></td>
                                <td>Selling Price :</td>
                                <td>
                                    <input
                                        size="14"
                                        placeholder="Selling Price"
                                        count="0.01"
                                        value={sellprice}
                                        onChange={(e) => {
                                            setSellPrice(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        type="button"
                        className={buttonStyles.inputbutton}
                        onClick={onSubmitEvent}
                    >
                        Update Design
                    </button>
                </form>
            )}{" "}
        </div>
    );
}

export default UpdateDesign;
