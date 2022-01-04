import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus";
import InputMatchingTable from "./InputMatchingTable.js";

function UpdateMatching() {
    let history = useHistory();
    let location = useLocation();

    const [load, setLoad] = useState(false);
    const [designFileName, setDesignFileName] = useState("");
    const [tempDesignFileName, setTempDesignFileName] = useState("");
    const [designMatchingId, setDesignMatchingId] = useState("");
    const [yarnShades, setYarnShades] = useState([]);
    const [yarnQualities, setYarnQualities] = useState([]);
    const [matchings, setMatchings] = useState([]);
    const [feederLayout, setFeederLayout] = useState([]);
    const [designs, setDesigns] = useState([]);
    const [matchingCodes, setMatchingCodes] = useState([]);

    useEffect(() => {
        try {
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            document.title = "Update Yarn Quality";
            if (location.state) {
                setDesignFileName(location.state.designfilename);
                setTempDesignFileName(location.state.designfilename);
                setDesignMatchingId(location.state.designmatchingid);
                axios
                    .get(`/matching/${location.state.designmatchingid}`)
                    .then(async ({ data }) => {
                        let tempFeederLayout = [...data.matchingFeeder];
                        await tempFeederLayout.map((feeder) => {
                            feeder.tempyarnqualityname = feeder.yarnqualityname;
                            feeder.shadeno = feeder.shade;
                            feeder.tempyarnshadename = `${feeder.shadeno} / ${feeder.colour} / ${feeder.partyname}`;
                        });

                        let tempMatchings = [...data.matchings];
                        await tempMatchings.map((matching) => {
                            matching.feederLayout = [...tempFeederLayout];
                            matching.bodyColour = matching.bodycolour;
                            matching.borderColour = matching.bordercolour;
                        });
                        setYarnQualities(data.yarnQualities);
                        setYarnShades(data.yarnShades);
                        setMatchings([...tempMatchings]);
                        setDesigns(data.designs);
                        setFeederLayout([...tempFeederLayout]);
                        setMatchingCodes(data.matchingCodes);
                    })
                    .catch((err) => {
                        setLoad(false);
                        catchAxiosError(err);
                    });
            }
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const onSubmitEvent = async () => {
        setLoad(true);
        await axios
            .put(`/matching`, {
                matchings,
                designfilename: designFileName,
            })
            .then(() => {
                setLoad(false);
                history.push("/matching/add");
            })
            .catch((err) => {
                setLoad(false);
                catchAxiosError(err);
            });
    };

    const deleteRequest = async (id) => {
        setLoad(true);
        await axios
            .delete(`/matching/${id}`, {
                designMatchingId,
            })
            .then(() => {
                setLoad(false);
                history.push("/matching/add");
            })
            .catch((err) => {
                setLoad(false);
                catchAxiosError(err);
            });
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
    };

    const updateMatchingCode = (e, index) => {
        let tempMatchings = [...matchings];
        tempMatchings[index].matchingcode = e.target.value.toUpperCase();
        setMatchings(tempMatchings);
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
        console.log(tempMatchings, matchingIndex, feederIndex);

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

    const onUpdateDesign = (e) => {
        let q = e.target.value;
        setTempDesignFileName(q);
        setDesignFileName(null);
        designs.map((design) => {
            if (design.designfilename === q)
                setDesignFileName(design.designfilename);
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
                                        value={tempDesignFileName}
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
                                                            onClick={() =>
                                                                deleteRequest(
                                                                    matching.designmatchingid
                                                                )
                                                            }
                                                        >
                                                            Delete
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
                                                yarnQualities={yarnQualities}
                                                matchingCode={
                                                    matching.matchingcode
                                                }
                                                matchingIndex={key}
                                                yarnShades={yarnShades}
                                                onUpdateYarnShade={
                                                    onUpdateYarnShade
                                                }
                                            />
                                        </table>
                                    );
                                })}
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

export default UpdateMatching;
