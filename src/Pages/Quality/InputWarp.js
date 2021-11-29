import { useEffect } from "react";

const InputWarp = ({ warp, setWarp, role, yarnqualities, firstRender }) => {
    const onUpdateYarnQuality = (e) => {
        let q = e.target.value;
        setWarp((prevState) => ({
            ...prevState,
            warpqualityname: q,
        }));
        yarnqualities.map((quality) => {
            if (quality.qualityname === q) {
                setWarp((prevState) => ({
                    ...prevState,
                    warpqualityname: q,
                    warpqualityid: quality.qualityid,
                    denier: quality.denier,
                    yarnprice: parseFloat(quality.totalprice).toFixed(2),
                }));
            }
        });
    };

    useEffect(() => {
        if (!firstRender.current) {
            if (isNaN(warp.warplength)) {
                alert(`${role} Warp's Length is not a number`);
                return;
            }
            if (isNaN(warp.warpshortage)) {
                alert(`${role} Warp's Shortage is not a number`);
                return;
            }
            let tempLength = parseFloat(warp.warplength);
            let tempshortage = parseFloat(warp.warpshortage);
            let tempTotalLength = tempLength * (1 + tempshortage / 100);
            setWarp((prevState) => ({
                ...prevState,
                totalwarplength: tempTotalLength.toFixed(2),
            }));
        }
    }, [warp.warplength, warp.warpshortage]);

    useEffect(() => {
        if (!firstRender.current) {
            if (isNaN(warp.ends)) {
                alert(`${role}Warp's Ends is not a number`);
                return;
            }
            if (isNaN(warp.selvedgeden)) {
                alert(`${role} Warp's Selvedge Den is not a number`);
                return;
            }
            if (isNaN(warp.selvedgeendsperden)) {
                alert(`${role} Warp's Selvedge Ends Per Den is not a number`);
                return;
            }
            if (isNaN(warp.reed)) {
                alert(`${role} Warp's Reed Count Per Den is not a number`);
                return;
            }
            if (isNaN(warp.endsperden)) {
                alert(`${role} Warp's Ends Per Den is not a number`);
                return;
            }
            let tempWarpEnds = parseFloat(warp.ends);
            let tempSelvedgeDen = parseFloat(warp.selvedgeden);
            let tempSelvedgeEndsPerDen = parseFloat(warp.selvedgeendsperden);
            let tempReedCount = parseFloat(warp.reed);
            let tempEndsPerDen = parseFloat(warp.endsperden);
            var rs =
                (2 *
                    (tempWarpEnds -
                        tempSelvedgeDen *
                            2 *
                            (tempSelvedgeEndsPerDen - tempEndsPerDen))) /
                (tempReedCount * tempEndsPerDen);
            setWarp((prevState) => ({
                ...prevState,
                rs: parseFloat(rs).toFixed(2),
            }));
        }
    }, [
        warp.ends,
        warp.reed,
        warp.endsperden,
        warp.selvedgeden,
        warp.selvedgeendsperden,
        warp.totalwarplength,
    ]);

    useEffect(() => {
        if (!firstRender.current) {
            if (isNaN(warp.ends)) {
                alert(`${role} Warp's Ends is not a number`);
                return;
            }
            if (isNaN(warp.totalwarplength)) {
                alert(`${role} Warp's Length is not a number`);
                return;
            }
            if (isNaN(warp.denier)) {
                alert(`${role} Warp's Denier is not a number`);
                return;
            }
            let tempWarpLength = parseFloat(warp.totalwarplength);
            let tempDenier = parseFloat(warp.denier);
            let tempWarpEnds = parseFloat(warp.ends);
            let tempWeight = (
                (tempWarpLength * tempDenier * tempWarpEnds) /
                9000000
            ).toFixed(3);
            setWarp((prevState) => ({
                ...prevState,
                warpweight: parseFloat(tempWeight).toFixed(3),
            }));
        }
    }, [warp.rs]);

    useEffect(() => {
        if (!firstRender.current) {
            if (isNaN(warp.warpweight)) {
                alert(`${role} Warp's Weight is not a number`);
                return;
            }
            if (isNaN(warp.warpwastage)) {
                alert(`${role} Warp's Wastage is not a number`);
                return;
            }
            let tempWarpWeight = parseFloat(warp.warpweight);
            let tempWarpWastage = parseFloat(warp.warpwastage);
            let tempTotalWeight = tempWarpWeight * (1 + tempWarpWastage / 100);
            setWarp((prevState) => ({
                ...prevState,
                totalweight: parseFloat(tempTotalWeight).toFixed(3),
            }));
        }
    }, [warp.warpweight, warp.warpwastage]);

    useEffect(() => {
        if (!firstRender.current) {
            let tempTotalWeight = parseFloat(warp.totalweight);
            let tempPrice = parseFloat(warp.yarnprice);
            let tempYarnCost = tempTotalWeight * tempPrice;
            setWarp((prevState) => ({
                ...prevState,
                yarncost: parseFloat(tempYarnCost).toFixed(2),
            }));
        }
    }, [warp.totalweight]);

    return (
        <>
            <tr>
                <td rowSpan="17" style={{ paddingRight: "50px" }}>
                    {role} Warp Details
                </td>
            </tr>
            <tr>
                <td>Warp Quality</td>
                <td>
                    <input
                        id={`${role}warpquality`}
                        list={`${role}qualitylist`}
                        value={warp.warpqualityname}
                        onChange={onUpdateYarnQuality}
                        autoCapitalize
                        placeholder="Warp Quality Name"
                    />

                    <datalist id={`${role}qualitylist`}>
                        {yarnqualities.length > 0 &&
                            yarnqualities.map((quality) => (
                                <option value={quality.qualityname} />
                            ))}
                    </datalist>
                </td>
            </tr>
            <tr>
                <td>Warp Denier</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Warp Denier..."
                        value={warp.denier}
                    />
                </td>
            </tr>
            <tr>
                <td>Warp Length</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Warp Length ..."
                        value={warp.warplength}
                        onChange={(e) => {
                            setWarp((prevState) => ({
                                ...prevState,
                                warplength: e.target.value,
                            }));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>Warp Shortage</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Warp Shortage..."
                        value={warp.warpshortage}
                        onChange={(e) => {
                            setWarp((prevState) => ({
                                ...prevState,
                                warpshortage: e.target.value,
                            }));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>Total Warp Length</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Warp Length..."
                        value={warp.totalwarplength}
                    />
                </td>
            </tr>
            <tr>
                <td>Warp Ends</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Warp Ends..."
                        value={warp.ends}
                        onChange={(e) => {
                            setWarp((prevState) => ({
                                ...prevState,
                                ends: e.target.value,
                            }));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>Reed</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Reed..."
                        value={warp.reed}
                        onChange={(e) => {
                            setWarp((prevState) => ({
                                ...prevState,
                                reed: e.target.value,
                            }));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>Ends per den</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Ends per Den..."
                        value={warp.endsperden}
                        onChange={(e) => {
                            setWarp((prevState) => ({
                                ...prevState,
                                endsperden: e.target.value,
                            }));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>Selvedge Den</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Selvedge Den..."
                        value={warp.selvedgeden}
                        onChange={(e) => {
                            setWarp((prevState) => ({
                                ...prevState,
                                selvedgeden: e.target.value,
                            }));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>Selvedge Ends Per Den</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Selvedge Ends Per Den..."
                        value={warp.selvedgeendsperden}
                        onChange={(e) => {
                            setWarp((prevState) => ({
                                ...prevState,
                                selvedgeendsperden: e.target.value,
                            }));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>RS</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter RS..."
                        value={warp.rs}
                    />
                </td>
            </tr>
            <tr>
                <td>Warp Weight</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Warp Weight..."
                        value={warp.warpweight}
                    />
                </td>
            </tr>
            <tr>
                <td>Warp Wastage</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Warp Wastage..."
                        value={warp.warpwastage}
                        onChange={(e) => {
                            setWarp((prevState) => ({
                                ...prevState,
                                warpwastage: e.target.value,
                            }));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>Total Body Warp Weight</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Body Warp Weight..."
                        value={warp.totalweight}
                    />
                </td>
            </tr>
            <tr>
                <td>Yarn Price</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Yarn Price..."
                        value={warp.yarnprice}
                    />
                </td>
            </tr>
            <tr>
                <td>Yarn Cost</td>
                <td>
                    <input
                        type="number"
                        placeholder="Enter Yarn Cost..."
                        value={warp.yarncost}
                    />
                </td>
            </tr>
        </>
    );
};

export default InputWarp;
