import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus";
import buttonStyles from "../../Modules/Button.module.css";

import { Link } from "react-router-dom";

function DesignMatching() {
    const [designs, setDesigns] = useState([]);
    const [matchings, setMatchings] = useState([]);
    const [tempDesignNo, setTempDesignNo] = useState("");
    const [designNo, setDesignNo] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(async () => {
        try {
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
                .get(`/matching/overview`)
                .then(({ data }) => {
                    setDesigns(data);
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

    useEffect(async () => {
        if (designNo !== null) {
            await axios
                .get(`/matching/design/overview/${designNo}`)
                .then(({ data }) => {
                    console.log(data);
                    setMatchings(data);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        }
    }, [designNo]);

    const onUpdateDesign = (e) => {
        let q = e.target.value;
        setTempDesignNo(q);
        setDesignNo(null);
        designs.map((design) => {
            if (`${design.designno} / ${design.catalogueno}` === q)
                setDesignNo(design.designno);
        });
    };

    const deleteRequest = async (id) => {
        setLoad(true);
        await axios
            .post(`/matching/reload/${id}/${designNo}`)
            .then(({ data }) => {
                setLoad(false);
                console.log("All data: ", data);
                setMatchings(data);
            })
            .catch((err) => {
                setLoad(false);
                catchAxiosError(err);
            });
    };

    return (
        <div>
            {load ? (
                <div>Loading..</div>
            ) : (
                <form>
                    <div
                        style={{
                            margin: "10px auto",
                            minWidth: "30%",
                        }}
                    >
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
                                            value={tempDesignNo}
                                            autoFocus
                                            autoCapitalize
                                            placeholder="Design File name"
                                        />
                                        <datalist id="designlist">
                                            {designs.length > 0 &&
                                                designs.map((design) => (
                                                    <option
                                                        value={`${design.designno} / ${design.catalogueno}`}
                                                    />
                                                ))}
                                        </datalist>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Link to="/matching/add">
                            <button
                                type="button"
                                className={buttonStyles.inputbutton}
                            >
                                Add new Matching
                            </button>
                        </Link>
                    </div>

                    <table
                        className="table table-bordered table-hover table-responsive"
                        style={{
                            width: "80%",
                            margin: "50px 10%",
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Design File Name</th>
                                <th>Matching Code</th>
                                <th>Body Colour</th>
                                <th>Border Colour</th>
                            </tr>
                        </thead>
                        <tbody>
                            {load && <div>Loading...</div>}
                            {!load &&
                                matchings &&
                                matchings.length > 0 &&
                                matchings.map((matching, index) => {
                                    if (
                                        index > 0 &&
                                        matching.matchingcode ===
                                            matchings[index - 1].matchingcode
                                    )
                                        return (
                                            <tr
                                                style={{
                                                    backgroundColor: "#FFF1BD",
                                                }}
                                            >
                                                <th>
                                                    {matching.designfilename}
                                                </th>
                                                <td>{matching.matchingcode}</td>

                                                <td>{matching.bodycolour}</td>
                                                <td>{matching.bordercolour}</td>
                                                <td>
                                                    <button className="btn btn-outline-primary">
                                                        <Link
                                                            to={{
                                                                pathname:
                                                                    "/matching/view",
                                                                state: {
                                                                    designmatchingid:
                                                                        matching.designmatchingid,
                                                                    designfilename:
                                                                        matching.designfilename,
                                                                },
                                                            }}
                                                        >
                                                            View
                                                        </Link>
                                                    </button>
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
                                                                        matching.designfilename,
                                                                },
                                                            }}
                                                        >
                                                            Update
                                                        </Link>
                                                    </button>
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
                                        );
                                    else
                                        return (
                                            <tr>
                                                <th>
                                                    {matching.designfilename}
                                                </th>
                                                <td>{matching.matchingcode}</td>

                                                <td>{matching.bodycolour}</td>
                                                <td>{matching.bordercolour}</td>
                                                <td>
                                                    <button className="btn btn-outline-primary">
                                                        <Link
                                                            to={{
                                                                pathname:
                                                                    "/matching/view",
                                                                state: {
                                                                    designmatchingid:
                                                                        matching.designmatchingid,
                                                                    designfilename:
                                                                        matching.designfilename,
                                                                },
                                                            }}
                                                        >
                                                            View
                                                        </Link>
                                                    </button>
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
                                                                        matching.designfilename,
                                                                },
                                                            }}
                                                        >
                                                            Update
                                                        </Link>
                                                    </button>
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
                                        );
                                })}
                        </tbody>
                    </table>
                </form>
            )}
        </div>
    );
}

export default DesignMatching;
