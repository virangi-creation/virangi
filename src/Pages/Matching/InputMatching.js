import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";
import InputMatchingTable from "./InputMatchingTable.js";
import MatchingTable from "./MatchingTable.js";
import handleFocus from "../../Util/handleFocus";
import { Link } from "react-router-dom";

function InputMatching() {
    const [designs, setDesigns] = useState([]);
    const [designFileName, setDesignFileName] = useState("");
    const [designNo, setDesignNo] = useState(null);
    const [load, setLoad] = useState(false);
    const [feederDetails, setFeederDetails] = useState([]);
    const [yarnQualities, setYarnQualities] = useState([]);
    const [yarnShades, setYarnShades] = useState([]);
    const [matchings, setMatchings] = useState([]);
    const [feederLayout, setFeederLayout] = useState([]);
    const [matchingCodes, setMatchingCodes] = useState([]);
    const [prevSavedMatchings, setPrevSavedMatchings] = useState([]);
    const [prevSavedFeederLayout, setPrevSavedFeederLayout] = useState([]);

    useEffect(async () => {
        try {
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);

            let date = new Date();
            let strDate = date.toLocaleString().substr(0, 10);
            document.title = "Matching " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/matching/`)
                .then(({ data }) => {
                    setDesigns(data.designs);
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

    const captureEnter = (event) => {
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
        if (
            event.keyCode === 27 &&
            window.confirm("Are you sure you want to add?")
        ) {
            onSubmitEvent();
        }
    };

    useEffect(async () => {
        if (designNo !== null) {
            await axios
                .get(`/matching/design/${designNo}`)
                .then(({ data }) => {
                    console.log(data);
                    setFeederDetails(data.feederDetails);
                    setYarnQualities(data.yarnQualities);
                    setYarnShades(data.yarnShades);
                    setPrevSavedMatchings(data.matchings);
                    setPrevSavedFeederLayout(data.matchingFeeders);
                    setMatchingCodes(data.matchingCodes);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        }
    }, [designNo]);

    useEffect(() => {
        console.log(prevSavedFeederLayout);
    }, [prevSavedFeederLayout]);

    useEffect(async () => {
        let tempFeederDetails = [];
        await feederDetails.map(async (feederDetail) => {
            if (feederDetail.pick > 0) {
                await yarnQualities.map(async (yarnQuality) => {
                    if (yarnQuality.qualityid === feederDetail.yarnqualityid) {
                        feederDetail.yarnqualityname = yarnQuality.qualityname;
                        feederDetail.tempyarnqualityname =
                            yarnQuality.qualityname;
                    }
                });
                tempFeederDetails.push(feederDetail);
            }
        });
        setFeederLayout(tempFeederDetails);
        setMatchings([]);
    }, [feederDetails, yarnQualities]);

    const onUpdateDesign = (e) => {
        let q = e.target.value;
        setDesignFileName(q);
        setDesignNo(null);
        designs.map((design) => {
            if (design.designfilename === q) setDesignNo(design.designfilename);
        });
    };

    const onSubmitEvent = async (e) => {
        e.preventDefault();
        try {
            setLoad(true);
            await axios
                .post(`/matching/`, {
                    designfilename: designFileName,
                    designno: designNo,
                    matchings,
                })
                .then(() => {
                    console.log("success");
                    window.location.reload();
                    setLoad(false);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    };

    const addMatching = async (e) => {
        e.preventDefault();
        let tempFeeder = [...feederLayout];
        let max = 65;
        await matchingCodes.map((matchingCode) => {
            max = Math.max(max, matchingCode.charCodeAt(0) + 1);
        });
        await matchings.map((matching) => {
            max = Math.max(max, matching.matchingcode.charCodeAt(0) + 1);
        });
        console.log(max);
        let tempMatching = {
            feederLayout: tempFeeder,
            matchingcode: String.fromCharCode(max),
            bodyColour: "",
            borderColour: "",
        };
        setMatchings([...matchings, tempMatching]);
        document
            .getElementById(
                `${String.fromCharCode(max)}${matchings.length}matchingcode`
            )
            .focus();
    };

    const removeMatching = (index) => {
        let tempMatchings = [...matchings];
        tempMatchings.splice(index, 1);
        setMatchings([...tempMatchings]);
    };

    const updateMatchingCode = (e, index) => {
        let tempMatchings = [...matchings];
        tempMatchings[index].matchingcode = e.target.value.toUpperCase();
        setMatchings(tempMatchings);
    };

    const checkMatchingCode = (e, index) => {
        let flag = false;
        matchingCodes.map((matchingCode) => {
            if (!flag && matchingCode === e.target.value) {
                alert(`Matching code - ${matchingCode} already exists!`);
                document
                    .getElementById(`${matchingCode}${index}matchingcode`)
                    .focus();
                flag = true;
            }
        });
        matchings.map((matching, key) => {
            if (
                !flag &&
                matching.matchingcode === e.target.value &&
                key !== index
            ) {
                alert(
                    `Matching code - ${matching.matchingcode} already exists!`
                );
                document
                    .getElementById(
                        `${matching.matchingcode}${index}matchingcode`
                    )
                    .focus();
                flag = true;
            }
        });
    };

    const onUpdateYarnQuality = async (e, matchingIndex, feederIndex) => {
        let q = e.target.value;
        let tempMatchings = [...matchings];
        let matching = tempMatchings[matchingIndex];
        let tempFeederLayout = matching.feederLayout;
        let tempFeeders = [...tempFeederLayout];
        tempFeeders[feederIndex].tempyarnqualityname = q;
        await yarnQualities.map((quality) => {
            if (quality.qualityname === q) {
                tempFeeders[feederIndex].yarnqualityname = quality.qualityname;
                tempFeeders[feederIndex].yarnqualityid = quality.qualityid;
            }
        });
        tempMatchings[matchingIndex].feederLayout = tempFeeders;
        setMatchings([...tempMatchings]);
    };
    const onUpdateYarnShade = async (e, matchingIndex, feederIndex) => {
        let query = e.target.value;
        let tempMatchings = [...matchings];
        let tempFeederLayout = tempMatchings[matchingIndex].feederLayout;
        let tempFeeders = [...tempFeederLayout];
        tempFeeders[feederIndex].tempyarnshadename = query;
        let q = query.split("/").map((value) => value.trim());

        let shadeno = q[0];
        tempFeeders[feederIndex].yarnshadecolour = "";
        tempFeeders[feederIndex].partyid = "";
        tempFeeders[feederIndex].yarnshadeno = "";
        if (tempFeeders[feederIndex].feedertype === 1)
            tempMatchings[matchingIndex].bodyColour = "";
        if (tempFeeders[feederIndex].feedertype === 2)
            tempMatchings[matchingIndex].borderColour = "";
        if (q.length > 1) {
            let colour = q[1];
            let partyname = q[2];
            await yarnShades.map((yarnShade) => {
                if (
                    yarnShade.shadeno === shadeno &&
                    yarnShade.colour === colour &&
                    yarnShade.partyname === partyname
                ) {
                    tempFeeders[feederIndex].yarnshadecolour = yarnShade.colour;
                    tempFeeders[feederIndex].partyid = yarnShade.partyid;
                    tempFeeders[feederIndex].yarnshadeno = yarnShade.shadeno;

                    if (tempFeeders[feederIndex].feedertype === 1)
                        tempMatchings[matchingIndex].bodyColour =
                            yarnShade.colour;
                    if (tempFeeders[feederIndex].feedertype === 2)
                        tempMatchings[matchingIndex].borderColour =
                            yarnShade.colour;
                }
            });
        }
        tempMatchings[matchingIndex].feederLayout = tempFeeders;
        setMatchings([...tempMatchings]);
    };

    return (
        <div>
            {load ? (
                <div>Loading..</div>
            ) : (
                <form>
                    <table
                        className="table table-bordered table-hover table-responsive"
                        style={{
                            width: "50%",
                            margin: "20px auto",
                            maxHeight: "800px",
                        }}
                    >
                        <tbody>
                            <tr>
                                <td>Design no</td>
                                <td>
                                    <input
                                        list="designlist"
                                        onChange={onUpdateDesign}
                                        value={designFileName}
                                        autoFocus
                                        autoCapitalize
                                        placeholder="Design File name"
                                    />
                                    <datalist id="designlist">
                                        {designs.length > 0 &&
                                            designs.map((design) => (
                                                <option
                                                    value={
                                                        design.designfilename
                                                    }
                                                />
                                            ))}
                                    </datalist>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {load && <div>Loading...</div>}
                    {!load && (
                        <div className="text-center mb-2 mr-2">
                            {prevSavedMatchings &&
                                prevSavedMatchings.length > 0 &&
                                prevSavedFeederLayout &&
                                prevSavedFeederLayout.length > 0 &&
                                prevSavedMatchings.map((matching, index) => (
                                    <table
                                        className="table table-bordered table-hover table-responsive"
                                        style={{
                                            width: "80%",
                                            margin: "50px 10%",
                                        }}
                                    >
                                        <thead>
                                            <tr>
                                                <th>Matching Code</th>
                                                <td>{matching.matchingcode}</td>

                                                <td>
                                                    Body -{matching.bodycolour}
                                                </td>
                                                <td>
                                                    Border -
                                                    {matching.bordercolour}
                                                </td>
                                                <td>
                                                    <button className="btn btn-outline-primary">
                                                        <Link
                                                            to={{
                                                                pathname:
                                                                    "/matching/update",
                                                                state: {
                                                                    designmatchingid:
                                                                        matching.designmatchingid,
                                                                    designfilename:
                                                                        designFileName,
                                                                },
                                                            }}
                                                        >
                                                            Update
                                                        </Link>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Feeder no.</td>
                                                <td>Type</td>
                                                <td>Pick</td>
                                                <td>Yarn Quality</td>
                                                <td>Yarn Shade</td>
                                            </tr>
                                        </thead>
                                        <MatchingTable
                                            feeders={
                                                prevSavedFeederLayout[index]
                                            }
                                        />
                                    </table>
                                ))}
                            {matchings.length > 0 &&
                                matchings.map((matching, key) => {
                                    return (
                                        <table
                                            className="table table-bordered table-hover table-responsive"
                                            style={{
                                                margin: "50px 10%",
                                                width: "80%",
                                            }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Matching Code</th>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            id={`${matching.matchingcode}${key}matchingcode`}
                                                            onChange={(e) =>
                                                                updateMatchingCode(
                                                                    e,
                                                                    key
                                                                )
                                                            }
                                                            onBlur={(e) => {
                                                                checkMatchingCode(
                                                                    e,
                                                                    key
                                                                );
                                                            }}
                                                            placeholder="Matching Code"
                                                            value={
                                                                matching.matchingcode
                                                            }
                                                        />
                                                    </td>

                                                    <td>
                                                        Body -
                                                        <input
                                                            value={
                                                                matching.bodyColour
                                                            }
                                                            placeholder="Body Colour"
                                                            onChange={(e) => {
                                                                let tempMatchings =
                                                                    [
                                                                        ...matchings,
                                                                    ];
                                                                tempMatchings[
                                                                    key
                                                                ].bodyColour =
                                                                    e.target.value.toUpperCase();
                                                                setMatchings([
                                                                    ...tempMatchings,
                                                                ]);
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        Border -
                                                        <input
                                                            value={
                                                                matching.borderColour
                                                            }
                                                            placeholder="Body Colour"
                                                            onChange={(e) => {
                                                                let tempMatchings =
                                                                    [
                                                                        ...matchings,
                                                                    ];
                                                                tempMatchings[
                                                                    key
                                                                ].borderColour =
                                                                    e.target.value.toUpperCase();
                                                                setMatchings([
                                                                    ...tempMatchings,
                                                                ]);
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-danger"
                                                            onClick={() => {
                                                                removeMatching(
                                                                    key
                                                                );
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Feeder no.</td>
                                                    <td>Type</td>
                                                    <td>Pick</td>
                                                    <td>Yarn Quality</td>
                                                    <td>Yarn Shade</td>
                                                </tr>
                                            </thead>
                                            <InputMatchingTable
                                                feeders={matching.feederLayout}
                                                onUpdateYarnQuality={
                                                    onUpdateYarnQuality
                                                }
                                                matchingIndex={key}
                                                yarnQualities={yarnQualities}
                                                matchingCode={
                                                    matching.matchingcode
                                                }
                                                yarnShades={yarnShades}
                                                onUpdateYarnShade={
                                                    onUpdateYarnShade
                                                }
                                            />
                                        </table>
                                    );
                                })}
                            <button
                                className="btn btn-outline-secondary"
                                onClick={addMatching}
                            >
                                Add Matching
                            </button>
                        </div>
                    )}
                    <div className="container ">
                        <div
                            className="col-md-12 text-center"
                            style={{ marginBottom: "20px" }}
                        >
                            <button
                                style={{ fontSize: "20px" }}
                                className="btn btn-primary"
                                onClick={onSubmitEvent}
                                type="button"
                            >
                                Save Matching
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default InputMatching;
