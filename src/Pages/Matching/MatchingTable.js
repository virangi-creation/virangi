import React from "react";
import { Link } from "react-router-dom";

function MatchingTable({ feeders, matching, designFileName }) {
    let feederTypeList = ["", "Body", "Border", "Meena"];
    return (
        <table
            className="table table-bordered table-hover table-responsive"
            style={{ width: "80%", margin: "50px auto" }}
        >
            <thead>
                <tr>
                    <th>Matching Code</th>
                    <td>{matching.matchingcode}</td>

                    <td>Body -{matching.bodycolour}</td>
                    <td>Border -{matching.bordercolour}</td>
                    <td>
                        <button className="btn btn-outline-primary">
                            <Link
                                to={{
                                    pathname: "/matching/update",
                                    state: {
                                        designmatchingid:
                                            matching.designmatchingid,
                                        designfilename: designFileName,
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
            <tbody>
                {feeders.map((feeder, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{feederTypeList[feeder.feedertype]}</td>
                        <td>{feeder.pick}</td>
                        <td>{feeder.yarnqualityname}</td>
                        <td>
                            {feeder.shade} / {feeder.colour} /{" "}
                            {feeder.partyname}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MatchingTable;
