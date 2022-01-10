import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus";
import MatchingTable from "./MatchingTable.js";

function SingleMatching() {
    let history = useHistory();
    let location = useLocation();

    const [load, setLoad] = useState(false);
    const [designFileName, setDesignFileName] = useState("");
    const [tempDesignFileName, setTempDesignFileName] = useState("");
    const [feederLayout, setFeederLayout] = useState([]);
    const [matching, setMatching] = useState({});

    useEffect(() => {
        try {
            document.addEventListener("focus", handleFocus, true);
            document.title = "View Matching";
            if (location.state) {
                setDesignFileName(location.state.designfilename);
                setTempDesignFileName(location.state.designfilename);
                axios
                    .get(`/matching/${location.state.designmatchingid}`)
                    .then(async ({ data }) => {
                        console.log(data);
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
                        setMatching(tempMatchings[0]);
                        setFeederLayout(tempFeederLayout);
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

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            {load && <div>Loading...</div>}
            {!load && (
                <form style={{ width: "100%" }}>
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
                                <td>{tempDesignFileName}</td>
                            </tr>
                        </tbody>
                    </table>
                    {load && <div>Loading...</div>}
                    {!load && (
                        <div className="text-center mb-2 mr-2 ">
                            <MatchingTable
                                feeders={feederLayout}
                                matching={matching}
                                designFileName={designFileName}
                            />
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}

export default SingleMatching;
