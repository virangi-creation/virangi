const InputFeeder = ({
    feeder,
    setFeeder,
    role,
    designlength,
    rs,
    yarnqualities,
    captureEnter,
    handleFocus,
}) => {
    const onUpdateYarnQuality = (e) => {
        let q = e.target.value;
        setFeeder((prevState) => ({
            ...prevState,
            yarnqualityname: q,
        }));
        yarnqualities.map((quality) => {
            if (quality.qualityname === q) {
                let tempAvgPick = feeder.pick / (designlength * 39.37);
                let tempWeight = (tempAvgPick * rs * quality.denier) / 90000;
                let tempAmount = tempWeight * quality.totalprice;
                setFeeder((prevState) => ({
                    ...prevState,
                    averagepick: isNaN(tempAvgPick)
                        ? 0
                        : parseFloat(tempAvgPick.toFixed(3)),
                    weight: isNaN(tempWeight)
                        ? 0
                        : parseFloat(tempWeight.toFixed(3)),
                    amount: isNaN(tempAmount)
                        ? 0
                        : parseFloat(tempAmount.toFixed(2)),
                    yarnqualityid: quality.qualityid,
                    denier: quality.denier,
                    yarnprice: quality.totalprice,
                }));
            }
        });
    };

    const updateRate = (e) => {
        setFeeder((prevState) => ({
            ...prevState,
            yarnprice: e.target.value,
            amount: (e.target.value * feeder.weight).toFixed(2),
        }));
    };
    const updatePick = (e) => {
        let tempAvgPick = e.target.value / (designlength * 39.37);
        let tempWeight = (tempAvgPick * rs * feeder.denier) / 90000;
        let tempAmount = tempWeight * feeder.yarnprice;
        setFeeder((prevState) => ({
            ...prevState,
            pick: e.target.value,
            averagepick: isNaN(tempAvgPick)
                ? 0
                : parseFloat(tempAvgPick.toFixed(3)),
            weight: isNaN(tempWeight) ? 0 : parseFloat(tempWeight.toFixed(3)),
            amount: isNaN(tempAmount) ? 0 : parseFloat(tempAmount.toFixed(2)),
        }));
    };

    return (
        <tr>
            <td>{role}</td>
            <td>
                <input
                    type="text"
                    id={`${role}yarnquality`}
                    list={`${role}yarnqualitylist`}
                    value={feeder.yarnqualityname}
                    onChange={onUpdateYarnQuality}
                    autoCapitalize
                    onFocus={handleFocus}
                    placeholder="Yarn Quality"
                    onKeyDown={captureEnter}
                />
                <datalist id={`${role}yarnqualitylist`}>
                    {yarnqualities.length > 0 &&
                        yarnqualities.map((quality) => {
                            return <option value={quality.qualityname} />;
                        })}
                </datalist>
            </td>
            <td>{feeder.denier}</td>
            <td>
                <select
                    value={feeder.feedertype}
                    onKeyDown={captureEnter}
                    onChange={(e) => {
                        setFeeder((prevState) => ({
                            ...prevState,
                            feedertype: parseInt(e.target.value),
                        }));
                    }}
                >
                    <option value="1">Body</option>
                    <option value="2">Border</option>
                    <option value="3">Meena</option>
                </select>
            </td>
            <td>
                <input
                    type="number"
                    placeholder="Pick"
                    count="0.01"
                    value={feeder.pick}
                    onChange={updatePick}
                    onKeyDown={captureEnter}
                    onFocus={handleFocus}
                />
            </td>
            <td>{feeder.averagepick}</td>
            <td>{feeder.weight}</td>
            <td>
                <input
                    type="number"
                    placeholder="Rate"
                    count="0.01"
                    value={feeder.yarnprice}
                    onChange={updateRate}
                    onKeyDown={captureEnter}
                    onFocus={handleFocus}
                />
            </td>
            <td>{feeder.amount}</td>
        </tr>
    );
};

export default InputFeeder;
