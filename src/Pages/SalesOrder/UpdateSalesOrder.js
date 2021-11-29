import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import catchAxiosError from "../../Util/catchAxiosError";
import axios from "../../axios";
import { useHistory, useLocation } from "react-router";
import generateAddressString from "../../Util/generateAddressString";
import handleFocus from "../../Util/handleFocus";

function UpdateChallan() {
    let yesDate = new Date();
    let [prevChallanNo, setPrevChallanNo] = useState(0);
    let [challanNo, setChallanNo] = useState(0);
    let [templateDesignChallan, setTemplateDesignChallan] = useState({
        challanno: 0,
        designno: "",
        pieces: 0,
        colour: "",
    });
    let [totalSarees, setTotalSarees] = useState(0);

    let [challandate, setchallandate] = useState(
        yesDate.toISOString().substr(0, 10)
    );

    let [tempno, settempono] = useState("GJ-05-BZ-0037");

    let [partyName, setPartyName] = useState("");
    let [deliveryPartyName, setDeliveryPartyName] = useState("");
    let [agentName, setAgentName] = useState("");
    let [partyId, setPartyId] = useState(-1);
    let [partyGst, setPartyGst] = useState("");
    let [agentId, setAgentId] = useState(-1);
    let [deliveryPartyId, setDeliveryPartyId] = useState(-1);

    let [deliveryAdd, setDeliveryAdd] = useState("");
    let [parties, setParties] = useState([]);
    let [agents, setAgents] = useState([]);
    let [designs, setDesigns] = useState([]);
    let [load, setLoad] = useState(true);

    let history = useHistory();
    let location = useLocation();

    const updateChallanDate = () => {
        let dat = document.getElementById("challandate").value;
        setchallandate(dat);
    };

    useEffect(async () => {
        try {
            document.title = "Update Challan";
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number") {
                    document.activeElement.blur();
                }
            });
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            if (location.state) {
                setChallanNo(location.state.challanno);
                setPrevChallanNo(location.state.challanno);
                setLoad(true);
                await axios
                    .get(`/challan/${location.state.challanno}/update`)
                    .then(({ data }) => {
                        let challan = data.challan[0];
                        setTotalSarees(challan.totalsarees);
                        setchallandate(challan.challandate.substr(0, 10));
                        settempono(challan.tempno);
                        setPartyId(challan.partyid);
                        setAgentId(challan.agentid);
                        setDeliveryPartyId(challan.deliverypartyid);
                        setDesigns(data.designs);
                        setParties(data.parties);
                        setAgents(data.agents);
                        setDeliveryAdd(challan.deliveryaddress);
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

    const enterNew = () => {
        let tempDesigns = designs;
        tempDesigns.push(templateDesignChallan);
        setDesigns([...tempDesigns]);
    };

    useEffect(async () => {
        let tempDesigns = designs;
        await tempDesigns.map((design) => (design.challanno = challanNo));
        setDesigns([...tempDesigns]);

        let tempTemplateDesignChallan = templateDesignChallan;
        tempTemplateDesignChallan.challanno = challanNo;
        setTemplateDesignChallan(tempTemplateDesignChallan);
    }, [challanNo]);
    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await designs.map(async (design, index) => {
                if (design.designno === "") {
                    alert(`Design No. is required for Sr no. : ${index + 1}`);
                    setLoad(false);
                    return;
                }
                if (design.colour === "") {
                    alert(
                        `Colour is required for Design no. : ${design.designno}`
                    );
                    setLoad(false);
                    return;
                }
                if (design.pieces === 0) {
                    alert(
                        `No. Of Saree is required for Design no. : ${design.designno}, Colour: ${design.colour}`
                    );
                    setLoad(false);
                    return;
                }
            });
            await axios
                .put(`/challan/${prevChallanNo}`, {
                    challanNo,
                    challandate,
                    partyId,
                    deliveryAdd,
                    deliveryPartyId,
                    tempno,
                    agentId,
                    totalSarees,
                    designs,
                })
                .then(() => {
                    history.push("/challan");
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    };

    const removeElement = async (index) => {
        let tempDesigns = designs;
        tempDesigns.splice(index, 1);
        setDesigns([...tempDesigns]);
    };

    useEffect(() => {
        let tempTotalSarees = 0;
        designs.map((design) => (tempTotalSarees += parseInt(design.pieces)));
        setTotalSarees(tempTotalSarees);
    }, [designs]);

    useEffect(() => {
        parties.map((party) => {
            if (party.partyid === partyId) setPartyName(party.partyname);
        });
    }, [partyId, parties]);

    useEffect(() => {
        parties.map((party) => {
            if (party.partyid === deliveryPartyId)
                setDeliveryPartyName(party.partyname);
        });
    }, [deliveryPartyId, parties]);

    const updateDesign = (e, index, property) => {
        let tempDesigns = designs;
        tempDesigns[index][property] = e.target.value.toUpperCase();
        setDesigns([...tempDesigns]);
    };

    const onUpdateParty = (e) => {
        let q = e.target.value;
        setPartyName(q);

        setPartyId(null);
        parties.map((party) => {
            if (party.partyname === q) {
                setPartyGst(party.gst);
                setPartyId(party.partyid);
                setAgentId(party.agentid);
                setDeliveryPartyName(q);
                setDeliveryPartyId(party.partyid);
                let deliveryaddress = generateAddressString(
                    party.dalineone,
                    party.dalinetwo,
                    party.dacity,
                    party.dastate,
                    party.dapincode
                );
                setDeliveryAdd(deliveryaddress);
            }
        });
    };

    const onUpdateDeliveryParty = (e) => {
        let q = e.target.value;
        setDeliveryPartyName(q);
        setPartyId(null);
        parties.map((party) => {
            if (party.partyname === q) {
                setDeliveryPartyId(party.partyid);
                let deliveryaddress = generateAddressString(
                    party.dalineone,
                    party.dalinetwo,
                    party.dacity,
                    party.dastate,
                    party.dapincode
                );
                setDeliveryAdd(deliveryaddress);
            }
        });
    };

    const onUpdateAgent = (e) => {
        let q = e.target.value;
        if (q) setAgentName(q);
        setAgentId(null);
        agents.map((agent) => {
            if (agent.agentname === q) setAgentId(agent.agentid);
        });
    };

    useEffect(() => {
        agents.map((agent) => {
            if (agent.agentid === agentId) setAgentName(agent.agentname);
        });
    }, [agentId, agents]);

    return (
        <div>
            {load ? (
                <div>Loading..</div>
            ) : (
                <form>
                    <table
                        style={{
                            width: "50%",
                            margin: "20px auto",
                            maxHeight: "800px",
                        }}
                    >
                        <tr>
                            <td>Challan No.</td>
                            <td>
                                <input
                                    type="number"
                                    value={challanNo}
                                    placeholder="Enter Challan no..."
                                    onChange={(e) => {
                                        setChallanNo(e.target.value);
                                    }}
                                    autoFocus
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>
                                <input
                                    type="date"
                                    value={challandate}
                                    onChange={updateChallanDate}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Tempo No.</td>
                            <td>
                                <input
                                    value={tempno}
                                    onChange={(e) => {
                                        settempono(
                                            e.target.value.toUpperCase()
                                        );
                                    }}
                                    placeholder="Enter Tempo No."
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Party</td>
                            <td>
                                <input
                                    list="partylist"
                                    onChange={onUpdateParty}
                                    value={partyName}
                                    autoCapitalize
                                    placeholder="Party"
                                />

                                <datalist id="partylist">
                                    {parties.length > 0 &&
                                        parties.map((party, key) => (
                                            <option value={party.partyname} />
                                        ))}
                                </datalist>
                            </td>
                        </tr>
                        <tr>
                            <td>Agent Name</td>
                            <td>
                                <input
                                    list="agentlist"
                                    onChange={onUpdateAgent}
                                    value={agentName}
                                    autoCapitalize
                                    placeholder="Agent Name"
                                />

                                <datalist id="agentlist">
                                    {agents.length > 0 &&
                                        agents.map((agent, key) => (
                                            <option value={agent.agentname} />
                                        ))}
                                </datalist>
                            </td>
                        </tr>

                        <tr>
                            <td>Party GST No. </td>
                            <td>
                                <input
                                    value={partyGst}
                                    readOnly="readonly"
                                    placeholder="Party GST"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Delivery Party</td>
                            <td>
                                <input
                                    list="deliverypartylist"
                                    onChange={onUpdateDeliveryParty}
                                    value={deliveryPartyName}
                                    autoCapitalize
                                    placeholder="Devliery Party"
                                />

                                <datalist id="deliverypartylist">
                                    {parties.length > 0 &&
                                        parties.map((party, key) => (
                                            <option value={party.partyname} />
                                        ))}
                                </datalist>
                            </td>
                        </tr>
                        <tr>
                            <td>Delivery Address</td>
                            <td>
                                <textarea
                                    value={deliveryAdd}
                                    // onChange={(e) => {
                                    //     setDeliveryAdd(
                                    //         e.target.value.toUpperCase()
                                    //     );
                                    // }}
                                    readOnly="readonly"
                                    cols="30"
                                    rows="3"
                                ></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Total Sarees</td>
                            <td>{totalSarees}</td>
                        </tr>
                    </table>

                    <table style={{ margin: "50px 10%" }}>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Design No.</th>
                            <th>Colour</th>
                            <th>Pieces</th>
                            <th>
                                <button
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        margin: "20px auto",
                                    }}
                                    type="button"
                                    onClick={enterNew}
                                >
                                    Add Design
                                </button>
                            </th>
                        </tr>
                        {designs.map((design, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            placeholder="Enter Design no..."
                                            onChange={(e) =>
                                                updateDesign(
                                                    e,
                                                    index,
                                                    "designno"
                                                )
                                            }
                                            value={design.designno}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            placeholder="Enter Colour..."
                                            onChange={(e) =>
                                                updateDesign(e, index, "colour")
                                            }
                                            value={design.colour}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Pieces..."
                                            onChange={(e) =>
                                                updateDesign(e, index, "pieces")
                                            }
                                            value={design.pieces}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                margin: "20px auto",
                                            }}
                                            type="button"
                                            onClick={() => {
                                                removeElement(index);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan="3"></td>
                            <td>{totalSarees}</td>
                        </tr>
                    </table>
                </form>
            )}
            <div className="container ">
                <div
                    className="col-md-12 text-center"
                    style={{ marginBottom: "20px" }}
                >
                    <Button
                        className="btn btn-primary"
                        onClick={onSubmitEvent}
                        type="button"
                    >
                        Save Challan
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UpdateChallan;
