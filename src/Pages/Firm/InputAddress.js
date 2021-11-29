const InputAccount = ({ address, setAddress }) => {
    return (
        <tr>
            <td>
                <input
                    value={address.lineone}
                    onChange={(e) => {
                        setAddress({ ...address, lineone: e.target.value });
                    }}
                    placeholder="Line One"
                />
            </td>
            <td>
                <input
                    value={address.linetwo}
                    onChange={(e) => {
                        setAddress({ ...address, linetwo: e.target.value });
                    }}
                    placeholder="Line Two"
                />
            </td>
            <td>
                <input
                    value={address.city}
                    onChange={(e) => {
                        setAddress({ ...address, city: e.target.value });
                    }}
                    placeholder="City"
                />
            </td>
            <td>
                <input
                    value={address.state}
                    onChange={(e) => {
                        setAddress({ ...address, state: e.target.value });
                    }}
                    placeholder="State"
                />
            </td>
            <td>
                <input
                    value={address.pincode}
                    onChange={(e) => {
                        setAddress({ ...address, pincode: e.target.value });
                    }}
                    placeholder="PinCode"
                />
            </td>
        </tr>
    );
};

export default InputAccount;
