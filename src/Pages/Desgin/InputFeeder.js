const InputFeeder = ({
    feeder,
    setFeeder,
    role,
    length,
    weftwastage,
    rs,
    yarnQualities,
    captureEnter,
    handleFocus,
}) => {
    const onUpdateYarnQuality = (e) => {
        let q = e.target.value;
        yarnQualities.map((quality) => {
            if (quality.qualityname === q) {
                let tempAvgPick = feeder.pick / (length * 39.37);
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
                    rate: quality.totalprice,
                }));
            }
        });
    };

    const updateRate = (e) => {
        setFeeder((prevState) => ({
            ...prevState,
            rate: e.target.value,
            amount: (e.target.value * feeder.weight).toFixed(2),
        }));
    };
    const updatePick = (e) => {
        let tempAvgPick = e.target.value / (length * 39.37);
        let tempWeight = (tempAvgPick * rs * feeder.denier) / 90000;
        let tempAmount = tempWeight * feeder.rate;
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
                    list={`${role}yarnquality`}
                    onChange={onUpdateYarnQuality}
                    autoCapitalize
                    placeholder="Yarn Quality"
                    onKeyDown={captureEnter}
                />
                <datalist id={`${role}yarnquality`}>
                    {yarnQualities.length > 0 &&
                        yarnQualities.map((quality, key) => (
                            <option value={quality.qualityname} />
                        ))}
                </datalist>
            </td>
            <td>{feeder.denier}</td>
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
                    value={feeder.rate}
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
