const InputAccount = ({ account, setAccount, banks }) => {
    const onUpdateBank = (e) => {
        let q = e.target.value;
        setAccount((prevState) => ({
            ...prevState,
            bankname: q,
        }));
        banks.map((bank) => {
            if (bank.bankname === q) {
                setAccount((prevState) => ({
                    ...prevState,
                    bankid: bank.bankid,
                }));
            }
        });
    };
    return (
        <tr>
            <td>
                <input
                    value={account.accountno}
                    onChange={(e) => {
                        setAccount({ ...account, accountno: e.target.value });
                    }}
                    placeholder="Account No"
                />
            </td>
            <td>
                <input
                    value={account.ifsccode}
                    onChange={(e) => {
                        setAccount({ ...account, ifsccode: e.target.value });
                    }}
                    placeholder="IFSC Code"
                />
            </td>
            <td>
                <input
                    list={`${account.accountno}banklist`}
                    value={account.bankname}
                    onChange={onUpdateBank}
                    autoCapitalize
                    placeholder="Bank"
                />
                <datalist id={`${account.accountno}banklist`}>
                    {banks.length > 0 &&
                        banks.map((bank) => {
                            return <option value={bank.bankname} />;
                        })}
                </datalist>
            </td>
        </tr>
    );
};

export default InputAccount;
