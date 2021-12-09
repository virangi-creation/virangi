import React from "react";

function InputMatchingTable({
    feeders,
    matchingCode,
    yarnQualities,
    onUpdateYarnQuality,
    matchingIndex,
    onUpdateYarnShade,
    yarnShades,
}) {
    let feederTypeList = ["", "Body", "Border", "Meena"];
    return (
        <tbody>
            {feeders.map((feeder, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{feederTypeList[feeder.feedertype]}</td>
                        <td>{feeder.pick}</td>
                        <td>
                            <input
                                list={`${matchingCode}yq${index}`}
                                onChange={(e) =>
                                    onUpdateYarnQuality(e, matchingIndex, index)
                                }
                                value={feeder.tempyarnqualityname}
                                autoCapitalize
                                placeholder="Yarn Quality"
                            />
                            <datalist id={`${matchingCode}yq${index}`}>
                                {yarnQualities.length > 0 &&
                                    yarnQualities.map((yarnQuality, key) => (
                                        <option
                                            value={yarnQuality.qualityname}
                                        />
                                    ))}
                            </datalist>
                        </td>
                        <td>
                            <input
                                list={`${matchingCode}ys${index}`}
                                onChange={(e) =>
                                    onUpdateYarnShade(e, matchingIndex, index)
                                }
                                value={feeder.tempyarnshadename}
                                autoCapitalize
                                placeholder="Yarn Shade"
                            />
                            <datalist id={`${matchingCode}ys${index}`}>
                                {yarnShades.length > 0 &&
                                    yarnShades.map((yarnShade, key) => {
                                        if (
                                            yarnShade.qualityid ===
                                            feeder.yarnqualityid
                                        )
                                            return (
                                                <option
                                                    value={`${yarnShade.shadeno} / ${yarnShade.colour} / ${yarnShade.partyname}`}
                                                />
                                            );
                                    })}
                            </datalist>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
}

export default InputMatchingTable;
