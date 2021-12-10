import React from "react";

function MatchingTable({ feeders }) {
    let feederTypeList = ["", "Body", "Border", "Meena"];
    return (
        <tbody>
            {feeders.map((feeder, index) => {
                console.log(feeder);
                return (
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
                );
            })}
        </tbody>
    );
}

export default MatchingTable;
