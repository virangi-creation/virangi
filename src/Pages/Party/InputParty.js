import axios from "../../axios.js";
import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import catchAxiosError from "../../Util/catchAxiosError.js";

function InputParty() {
    let history = useHistory();

    const [agents, setAgents] = useState([]);
    const [banks, setBanks] = useState([]);
    const [partytypes] = useState([
        "DEBTOR",
        "CREDITOR",
        "MISCELLANEOUS",
        "UNSECURED LOANS",
        "LAON & ADVANCES",
        "FIXED ASSET",
    ]);
    const [load, setLoad] = useState(false);

    // Final Variables
    const [partyname, setPartyname] = useState("");
    const [partytype, setPartytype] = useState(partytypes[0]);
    const [leadingname, setLeadingname] = useState("");
    const [leadingphone, setLeadingphone] = useState("");
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
    const [agentid, setAgentid] = useState(0);
    // Final Variables

    useEffect(async () => {
        document.title = "Input Party";
        document.addEventListener("wheel", function (event) {
            if (document.activeElement.type === "number") {
                document.activeElement.blur();
            }
        });
        setLoad(true);
        await axios
            .get("/party/add")
            .then(({ data }) => {
                setAgents(data.agents);
                setBanks(data.banks);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                catchAxiosError(err);
            });
    }, []);

    const handleFocus = (event) => {
        event.target.select();
    };

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .post(`/party/`, {
                    partyname,
                    partytype,
                    leadingname,
                    leadingphone,
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
                .then((res) => {
                    setLoad(false);
                    history.push("/party");
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
            {" "}
            {load && <div>Loading...</div>}
            {!load && (
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>Agent Name</td>
                                <td>
                                    <input
                                        type="text"
                                        list="agentlist"
                                        onChange={onUpdateAgent}
                                        autoFocus
                                        autoCapitalize
                                        placeholder="Agent Name"
                                        onKeyDown={captureEnter}
                                    />

                                    <datalist id="agentlist">
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
                                        type="text"
                                        placeholder="Party Name"
                                        value={partyname}
                                        onChange={(e) => {
                                            setPartyname(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                        onFocus={handleFocus}
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
                                        onKeyDown={captureEnter}
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
                                        type="text"
                                        placeholder="Leading Name"
                                        value={leadingname}
                                        onChange={(e) => {
                                            setLeadingname(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
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
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Accountant Name</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Accountant Name"
                                        value={accountantname}
                                        onChange={(e) => {
                                            setAccountantname(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
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
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>GST</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="GST No."
                                        value={gst}
                                        onChange={(e) => {
                                            setGST(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>PAN</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="PAN No."
                                        value={pan}
                                        onChange={(e) => {
                                            setPAN(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(
                                                e.target.value.toLowerCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>CIN</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="CIN"
                                        value={cin}
                                        onChange={(e) => {
                                            setCIN(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        onFocus={handleFocus}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan="5">Billing Address</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Address Line 1"
                                        onFocus={handleFocus}
                                        value={balineone}
                                        onChange={(e) => {
                                            setBAlineone(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Address Line 2"
                                        onFocus={handleFocus}
                                        value={balinetwo}
                                        onChange={(e) => {
                                            setBAlinetwo(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        onFocus={handleFocus}
                                        value={bacity}
                                        onChange={(e) => {
                                            setBAcity(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="State"
                                        onFocus={handleFocus}
                                        value={bastate}
                                        onChange={(e) => {
                                            setBAstate(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Pin Code"
                                        onFocus={handleFocus}
                                        value={bapincode}
                                        onChange={(e) => {
                                            setBApincode(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
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
                                            id="sameasbilling"
                                            onClick={sameAsBilling}
                                            onKeyDown={captureEnter}
                                        />
                                        Delivery address same as billing address
                                    </div>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Address Line 1"
                                        onFocus={handleFocus}
                                        value={dalineone}
                                        onChange={(e) => {
                                            setDAlineone(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Address Line 2"
                                        onFocus={handleFocus}
                                        value={dalinetwo}
                                        onChange={(e) => {
                                            setDAlinetwo(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        onFocus={handleFocus}
                                        value={dacity}
                                        onChange={(e) => {
                                            setDAcity(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="State"
                                        onFocus={handleFocus}
                                        value={dastate}
                                        onChange={(e) => {
                                            setDAstate(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Pin Code"
                                        onFocus={handleFocus}
                                        value={dapincode}
                                        onChange={(e) => {
                                            setDApincode(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Account No</td>
                                <td>
                                    {" "}
                                    <input
                                        type="text"
                                        placeholder="Account No"
                                        onFocus={handleFocus}
                                        value={accountno}
                                        onChange={(e) => {
                                            setAccountno(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>IFSC Code</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="IFSC Code"
                                        onFocus={handleFocus}
                                        value={ifsccode}
                                        onChange={(e) => {
                                            setIFSCCode(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Bank Name</td>
                                <td>
                                    <input
                                        type="text"
                                        list="banklist"
                                        onChange={onUpdateBank}
                                        autoCapitalize
                                        placeholder="Bank Name"
                                        onKeyDown={captureEnter}
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
                                        Add new Yarn Quality
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

export default InputParty;
