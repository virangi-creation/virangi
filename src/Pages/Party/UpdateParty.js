import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import buttonStyles from "../../Modules/Button.module.css";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus";

function UpdateParty() {
    let history = useHistory();
    let location = useLocation();
    const [load, setLoad] = useState(false);

    const [agents, setAgents] = useState([]);
    const [banks, setBanks] = useState([]);
    const [partyid, setPartyid] = useState([]);
    const [partytypes] = useState([
        "DEBTOR",
        "CREDITOR",
        "MISCELLANEOUS",
        "UNSECURED LOANS",
        "LAON & ADVANCES",
        "FIXED ASSET",
    ]);

    // Final Variables
    const [partyname, setPartyname] = useState("");
    const [partytype, setPartytype] = useState(partytypes[0]);
    const [leadingname, setLeadingname] = useState("");
    const [leadingphone, setLeadingphone] = useState("");
    const [discount, setDiscount] = useState(0);
    const [accountantname, setAccountantname] = useState("");
    const [accountantphone, setAccountantphone] = useState("");
    const [gst, setGST] = useState("");
    const [pan, setPAN] = useState("");
    const [accountno, setAccountno] = useState("");
    const [ifsccode, setIFSCCode] = useState("");
    const [bankid, setBankid] = useState();
    const [email, setEmail] = useState("");
    const [cin, setCIN] = useState("");
    const [balineone, setBAlineone] = useState("");
    const [balinetwo, setBAlinetwo] = useState("");
    const [bacity, setBAcity] = useState("SURAT");
    const [bastate, setBAstate] = useState("GUJARAT");
    const [bapincode, setBApincode] = useState("");
    const [dalineone, setDAlineone] = useState("");
    const [dalinetwo, setDAlinetwo] = useState("");
    const [dacity, setDAcity] = useState("SURAT");
    const [dastate, setDAstate] = useState("GUJARAT");
    const [dapincode, setDApincode] = useState("");
    const [agentid, setAgentid] = useState();
    // Final Variables

    // Temp Variables
    const [tempagentname, setTempagentname] = useState("");
    const [tempbankname, setTempbankname] = useState("");

    useEffect(async () => {
        try {
            document.title = "Update Party";
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number") {
                    document.activeElement.blur();
                }
            });
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            if (location.state) {
                setPartyid(location.state.partyid);
                setTempagentname(location.state.agentname);
                setTempbankname(location.state.bankname);
                setLoad(true);
                await axios
                    .get(`/party/${location.state.partyid}/update`)
                    .then(({ data }) => {
                        setAgents(data.agents);
                        setBanks(data.banks);
                        let p = data.party[0];
                        setPartyname(p.partyname);
                        setPartytype(p.partytype);
                        setLeadingname(p.leadingname);
                        setLeadingphone(p.leadingphone);
                        setDiscount(p.discount);
                        setAccountantname(p.accountantname);
                        setAccountantphone(p.accountantphone);
                        setGST(p.gst);
                        setPAN(p.pan);
                        setAccountno(p.accountno);
                        setIFSCCode(p.ifsccode);
                        setBankid(p.bankid);
                        setEmail(p.email);
                        setCIN(p.cin);
                        setBAlineone(p.balineone);
                        setBAlinetwo(p.balinetwo);
                        setBAcity(p.bacity);
                        setBAstate(p.bastate);
                        setBApincode(p.bapincode);
                        setDAlineone(p.dalineone);
                        setDAlinetwo(p.dalinetwo);
                        setDAcity(p.dacity);
                        setDAstate(p.dastate);
                        setDApincode(p.dapincode);
                        setAgentid(p.agentid);
                        setLoad(false);
                    })
                    .catch((err) => {
                        setLoad(false);
                        catchAxiosError(err);
                    });
            }
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }, []);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .put(`/party/${partyid}`, {
                    partyid,
                    partyname,
                    partytype,
                    leadingname,
                    leadingphone,
                    discount,
                    accountantname,
                    accountantphone,
                    gst,
                    pan,
                    email,
                    cin,
                    balineone,
                    balinetwo,
                    bacity,
                    bastate,
                    bapincode,
                    dalineone,
                    dalinetwo,
                    dacity,
                    dastate,
                    dapincode,
                    agentid,
                    accountno,
                    ifsccode,
                    bankid,
                })
                .then(() => {
                    history.push("/party");
                    setLoad(false);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    const captureEnter = (event) => {
        let kC = event.keyCode;
        if (kC == 27 && window.confirm("Are you sure you want to save?"))
            onSubmitEvent();
        else if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    const onUpdateAgent = (e) => {
        let q = e.target.value;
        setAgentid(null);
        agents.map((agent) => {
            if (agent.agentname === q) {
                setAgentid(agent.agentid);
            }
        });
    };
    const onUpdateBank = (e) => {
        let q = e.target.value;
        console.log(q);
        setTempagentname(q);
        setBankid(null);
        banks.map((bank) => {
            if (bank.bankname === q) {
                setBankid(bank.bankid);
            }
        });
    };

    const sameAsBilling = (e) => {
        setDAlineone(balineone);
        setDAlinetwo(balinetwo);
        setDAcity(bacity);
        setDAstate(bastate);
        setDApincode(bapincode);
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
                    <table
                        className="table table-bordered table-hover table-responsive"
                        style={{ verticalAlign: "middle" }}
                    >
                        <tbody>
                            <tr>
                                <td>Agent Name</td>
                                <td>
                                    <input
                                        list="agentlist"
                                        onChange={onUpdateAgent}
                                        defaultValue={tempagentname}
                                        autoFocus
                                        autoCapitalize
                                        placeholder="Agent Name"
                                    />

                                    <datalist
                                        id="agentlist"
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setTempagentname(e.target.value);
                                        }}
                                    >
                                        {agents.length > 0 &&
                                            agents.map((agent, key) => (
                                                <option
                                                    value={agent.agentname}
                                                />
                                            ))}
                                    </datalist>
                                </td>
                            </tr>
                            <tr>
                                <td>Party Name</td>
                                <td>
                                    <input
                                        placeholder="Party Name"
                                        value={partyname}
                                        onChange={(e) => {
                                            setPartyname(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Party Type</td>
                                <td>
                                    <select
                                        value={partytype}
                                        onChange={(e) => {
                                            setPartytype(e.target.value.trim());
                                        }}
                                    >
                                        {partytypes.map((pt) => (
                                            <option value={pt}>{pt}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Leading Name</td>
                                <td>
                                    <input
                                        placeholder="Leading Name"
                                        value={leadingname}
                                        onChange={(e) => {
                                            setLeadingname(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Leading Phone</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Leading Phone"
                                        value={leadingphone}
                                        onChange={(e) => {
                                            setLeadingphone(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Default Discount</td>
                                <td>
                                    <input
                                        type="number"
                                        value={discount}
                                        placeholder="Discount on Delivery"
                                        onChange={(e) => {
                                            setDiscount(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Accountant Name</td>
                                <td>
                                    <input
                                        placeholder="Accountant Name"
                                        value={accountantname}
                                        onChange={(e) => {
                                            setAccountantname(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Accountant Phone</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Accountant Phone"
                                        value={accountantphone}
                                        onChange={(e) => {
                                            setAccountantphone(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>GST</td>
                                <td>
                                    <input
                                        placeholder="GST No."
                                        value={gst}
                                        onChange={(e) => {
                                            setGST(
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
                                        placeholder="PAN No."
                                        value={pan}
                                        onChange={(e) => {
                                            setPAN(
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
                                                e.target.value.toLowerCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>CIN</td>
                                <td>
                                    <input
                                        placeholder="CIN"
                                        value={cin}
                                        onChange={(e) => {
                                            setCIN(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan="5">Billing Address</td>
                                <td>
                                    <input
                                        placeholder="Address Line 1"
                                        value={balineone}
                                        onChange={(e) => {
                                            setBAlineone(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Address Line 2"
                                        value={balinetwo}
                                        onChange={(e) => {
                                            setBAlinetwo(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        placeholder="City"
                                        value={bacity}
                                        onChange={(e) => {
                                            setBAcity(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        placeholder="State"
                                        value={bastate}
                                        onChange={(e) => {
                                            setBAstate(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Pin Code"
                                        value={bapincode}
                                        onChange={(e) => {
                                            setBApincode(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan="5">
                                    Delivery Address <br />
                                    <div
                                        style={{
                                            marginTop: "5px",
                                            paddingLeft: "15px",
                                            maxWidth: "50%",
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            name="sameasbilling"
                                            onClick={sameAsBilling}
                                        />
                                        Delivery address same as billing address
                                    </div>
                                </td>
                                <td>
                                    <input
                                        placeholder="Address Line 1"
                                        value={dalineone}
                                        onChange={(e) => {
                                            setDAlineone(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Address Line 2"
                                        value={dalinetwo}
                                        onChange={(e) => {
                                            setDAlinetwo(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        placeholder="City"
                                        value={dacity}
                                        onChange={(e) => {
                                            setDAcity(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        placeholder="State"
                                        value={dastate}
                                        onChange={(e) => {
                                            setDAstate(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        placeholder="Pin Code"
                                        value={dapincode}
                                        onChange={(e) => {
                                            setDApincode(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Account No</td>
                                <td>
                                    {" "}
                                    <input
                                        placeholder="Account No"
                                        value={accountno}
                                        onChange={(e) => {
                                            setAccountno(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>IFSC Code</td>
                                <td>
                                    <input
                                        placeholder="IFSC Code"
                                        value={ifsccode}
                                        onChange={(e) => {
                                            setIFSCCode(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Bank Name</td>
                                <td>
                                    <input
                                        list="banklist"
                                        defaultValue={tempbankname}
                                        onChange={onUpdateBank}
                                        autoCapitalize
                                        placeholder="Bank Name"
                                    />

                                    <datalist id="banklist">
                                        {banks.length > 0 &&
                                            banks.map((bank, key) => (
                                                <option value={bank.bankname} />
                                            ))}
                                    </datalist>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2">
                                    <button
                                        type="button"
                                        className={buttonStyles.inputbutton}
                                        onClick={onSubmitEvent}
                                    >
                                        Save Party
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

export default UpdateParty;
