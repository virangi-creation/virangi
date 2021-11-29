import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory, useLocation } from "react-router-dom";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus.js";
import InputAddress from "./InputAddress.js";
import InputAccount from "./InputAccount.js";

function UpdateFirm() {
    const [firmid, setFirmId] = useState("");
    const [firmName, setFirmName] = useState("");
    const [shortName, setShortName] = useState("");
    const [gst, setGst] = useState("");
    const [pan, setPan] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno1, setPhoneno1] = useState("");
    const [phoneno2, setPhoneno2] = useState("");
    const [cin, setCin] = useState("");
    const [firmtype, setFirmtype] = useState("");
    const [firmTypes, setFirmTypes] = useState([]);
    const [banks, setBanks] = useState([]);
    const [ccAccount, setCcAccount] = useState({
        accountno: "",
        bankid: 0,
        bankname: "",
        branch: "",
        ifsccode: "",
    });
    const [currentAccount, setCurrentAccount] = useState({
        accountno: "",
        bankname: "",
        bankid: 0,
        branch: "",
        ifsccode: "",
    });

    const [billingAddress, setBillingAddress] = useState({
        lineone: "",
        linetwo: "",
        city: "SURAT",
        state: "GUJARAT",
        pincode: "",
    });
    const [deliveryAddress, setDeliveryAddress] = useState({
        lineone: "",
        linetwo: "",
        city: "SURAT",
        state: "GUJARAT",
        pincode: "",
    });

    const [load, setLoad] = useState(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(async () => {
        try {
            document.title = "Add Firm";
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            if (location.state) {
                setFirmId(location.state.firmid);
                setLoad(true);
                await axios
                    .get(`/firm/update/${location.state.firmid}`)
                    .then(({ data }) => {
                        console.log(data);
                        let firm = data.firm;
                        setFirmName(firm.firmname);
                        setShortName(firm.shortname);
                        setGst(firm.gst);
                        setPan(firm.pan);
                        setEmail(firm.email);
                        setPhoneno1(firm.phoneno1);
                        setPhoneno2(firm.phoneno2);
                        setCin(firm.cin);
                        setFirmtype(firm.firmtype);
                        let tempAccount = {
                            accountno: firm.ccaccountno,
                            bankid: firm.ccbankid,
                            bankname: firm.ccbankname,
                            ifsccode: firm.ccifsccode,
                        };
                        setCcAccount(tempAccount);
                        tempAccount = {
                            accountno: firm.currentaccountno,
                            bankid: firm.currentbankid,
                            bankname: firm.currentbankname,
                            ifsccode: firm.currentifsccode,
                        };
                        setCurrentAccount(tempAccount);

                        let deliveryadd = data.deliveryadd;
                        let billingadd = data.billingadd;

                        setBillingAddress(billingadd);
                        setDeliveryAddress(deliveryadd);

                        setBanks(data.banks);
                        let fTypes = data.firmTypes;
                        fTypes = fTypes.rows[0].enum_range;
                        fTypes = fTypes.substring(1);
                        fTypes = fTypes.slice(0, -1);
                        fTypes = fTypes.replace(/"/g, "");
                        fTypes = fTypes.split(",");
                        setFirmTypes(fTypes);
                        setLoad(false);
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

    useEffect(() => {
        banks.map((bank) => {
            if (bank.bankid === ccAccount.bankid)
                setCcAccount({
                    ...ccAccount,
                    bankname: bank.bankname,
                });

            if (bank.bankid === currentAccount.bankid)
                setCurrentAccount({
                    ...currentAccount,
                    bankname: bank.bankname,
                });
        });
    }, [banks, ccAccount.bankid, currentAccount.bankid]);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .put(`/firm/${firmid}`, {
                    firmName,
                    shortName,
                    gst,
                    pan,
                    email,
                    phoneno1,
                    phoneno2,
                    cin,
                    firmtype,
                    ccAccount,
                    currentAccount,
                    billingAddress,
                    deliveryAddress,
                })
                .then(() => {
                    setLoad(false);
                    history.push(`/firm`);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    };

    const captureEnter = (event) => {
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
        if (
            event.keyCode === 27 &&
            window.confirm("Are you sure you want to add?")
        ) {
            onSubmitEvent();
        }
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            {load && <div>Loading...</div>}
            {!load && (
                <form>
                    <table className="table table-bordered table-hover table-responsive">
                        <tbody>
                            <tr>
                                <td>Firm Name</td>
                                <td>
                                    <input
                                        placeholder="Firm Name"
                                        value={firmName}
                                        onChange={(e) => {
                                            setFirmName(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        autoFocus
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Short Name</td>
                                <td>
                                    <input
                                        placeholder="Short Name"
                                        value={shortName}
                                        onChange={(e) => {
                                            setShortName(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Firm Type</td>
                                <td colSpan="2">
                                    <select
                                        value={firmtype}
                                        onChange={(e) => {
                                            setFirmtype(e.target.value);
                                        }}
                                    >
                                        <option value="">
                                            Select Firm Type
                                        </option>
                                        {firmTypes.map((firmType) => {
                                            console.log(firmType);
                                            return (
                                                <option value={firmType}>
                                                    {firmType}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </td>
                            </tr>
                            {(firmtype === "PRIVATE LIMITED" ||
                                firmtype === "LIMITED") && (
                                <tr>
                                    <td>CIN</td>
                                    <td>
                                        <input
                                            placeholder="CIN"
                                            value={cin}
                                            onChange={(e) => {
                                                setCin(
                                                    e.target.value.toUpperCase()
                                                );
                                            }}
                                        />
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td>GST</td>
                                <td>
                                    <input
                                        placeholder="GST"
                                        value={gst}
                                        onChange={(e) => {
                                            setGst(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>PAN</td>
                                <td>
                                    <input
                                        placeholder="PAN"
                                        value={pan}
                                        onChange={(e) => {
                                            setPan(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Phone No 1</td>
                                <td>
                                    <input
                                        placeholder="Phone No 1"
                                        value={phoneno1}
                                        onChange={(e) => {
                                            setPhoneno1(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Phone No 2</td>
                                <td>
                                    <input
                                        placeholder="Phone No 2"
                                        value={phoneno2}
                                        onChange={(e) => {
                                            setPhoneno2(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Current Account</td>
                                <td>
                                    <InputAccount
                                        setAccount={setCurrentAccount}
                                        banks={banks}
                                        account={currentAccount}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>CC Account</td>
                                <td>
                                    <InputAccount
                                        setAccount={setCcAccount}
                                        banks={banks}
                                        account={ccAccount}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Billing Address</td>
                                <td>
                                    <InputAddress
                                        setAddress={setBillingAddress}
                                        address={billingAddress}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Delivery Address</td>
                                <td>
                                    <InputAddress
                                        setAddress={setDeliveryAddress}
                                        address={deliveryAddress}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2">
                                    <button
                                        type="button"
                                        className={buttonStyles.inputbutton}
                                        onClick={onSubmitEvent}
                                    >
                                        Save Changes
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            )}
        </div>
    );
}

export default UpdateFirm;
