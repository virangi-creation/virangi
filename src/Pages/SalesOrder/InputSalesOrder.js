import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import catchAxiosError from "../../Util/catchAxiosError";
import axios from "../../axios";
import generateAddressString from "../../Util/generateAddressString";
import handleFocus from "../../Util/handleFocus";

function InputSalesOrder() {
    let yesDate = new Date();
    let [totalSarees, setTotalSarees] = useState(0);

    let [salesOrderDesigns, setSalesOrderDesigns] = useState([]);
    let [orderId, setOrderId] = useState("");
    let [orderdate, setorderdate] = useState(
        yesDate.toISOString().substr(0, 10)
    );
    let [partyName, setPartyName] = useState("");
    let [deliveryPartyName, setDeliveryPartyName] = useState("");
    let [deliveryPartyId, setDeliveryPartyId] = useState("");
    let [agentId, setAgentId] = useState("");
    let [firmId, setFirmId] = useState("");
    let [firmName, setFirmName] = useState("");
    let [agentName, setAgentName] = useState("");
    let [partyGst, setPartyGst] = useState("");
    let [deliveryAdd, setDeliveryAdd] = useState("");

    let [firms, setFirms] = useState([]);
    let [parties, setParties] = useState([]);
    let [agents, setAgents] = useState([]);
    let [partyId, setPartyId] = useState("");
    let [catalogues, setCatalogues] = useState([]);

    let [baseamount, setBaseamount] = useState(0);
    let [discountper, setDiscountper] = useState(0);
    let [gstper, setGstper] = useState(5);
    let [paymentdays, setPaymentdays] = useState(0);
    let [interestrate, setInterestrate] = useState(0);
    let [intereststart, setIntereststart] = useState(0);
    let [orderstatus, setOrderstatus] = useState("");
    let [remarks, setRemarks] = useState("");

    let [load, setLoad] = useState(true);

    const updateOrderDate = () => {
        let dat = document.getElementById("orderdate").value;
        setorderdate(dat);
    };

    useEffect(async () => {
        try {
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            let date = new Date();
            let strDate = date.toLocaleString().substr(0, 10);
            document.title = "HS " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/salesorder/add/`)
                .then(({ data }) => {
                    console.log(data);
                    setParties(data.parties);
                    setAgents(data.agents);
                    setCatalogues(data.catalogue);
                    setFirms(data.firms);
                    setLoad(false);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
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
        let tempSalesOrderDesigns = salesOrderDesigns;
        tempSalesOrderDesigns.push({
            orderid: orderId,
            catalogueno: "",
            pieces: 0,
            colour: "",
        });
        setSalesOrderDesigns([...tempSalesOrderDesigns]);
    };

    useEffect(async () => {
        let tempSalesOrderDesigns = salesOrderDesigns;
        await tempSalesOrderDesigns.map(
            (salesOrderDesign) => (salesOrderDesign.orderid = orderId)
        );
        setSalesOrderDesigns([...tempSalesOrderDesigns]);
    }, [orderId]);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);

            await axios
                .post("/salesorder/", {
                    orderid: orderId,
                    firmid: firmId,
                    partyid: partyId,
                    agentid: agentId,
                    orderdate,
                    baseamount,
                    totalsarees: totalSarees,
                    discountper,
                    gstper,
                    paymentdays,
                    interestrate,
                    intereststart,
                    orderstatus,
                    remarks,
                    designs: salesOrderDesigns,
                })
                .then(() => {
                    if (window.confirm("Add new Order?"))
                        window.location.reload();
                    else window.location.href = "/salesorder";
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
        let tempSalesOrderDesigns = salesOrderDesigns;
        tempSalesOrderDesigns.splice(index, 1);
        setSalesOrderDesigns([...tempSalesOrderDesigns]);
    };

    useEffect(() => {
        let tempTotalSarees = 0;
        catalogues.map(
            (catalogue) => (tempTotalSarees += parseInt(catalogue.pieces))
        );
        setTotalSarees(tempTotalSarees);
    }, [catalogues]);

    const updateCatalogue = async (e, index, property) => {
        let tempSalesOrderDesigns = salesOrderDesigns;
        tempSalesOrderDesigns[index][property] = e.target.value.toUpperCase();
        if (index === tempSalesOrderDesigns.length - 1) await enterNew();
        setSalesOrderDesigns([...tempSalesOrderDesigns]);
    };

    const onUpdateParty = (e) => {
        let q = e.target.value;
        setPartyName(q);

        setPartyId(null);
        parties.map((party) => {
            if (party.partyname === q) {
                console.log(party);
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
                setDiscountper(party.discount);
                setDeliveryAdd(deliveryaddress);
            }
        });
    };
    const onUpdateFirm = (e) => {
        let q = e.target.value;
        setFirmName(q);
        setFirmId(null);
        firms.map((firm) => {
            if (firm.firmname === q) {
                setPartyId(firm.firmid);
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
    }, [agentId]);

    const onUpdateCatalogueNo = async (e, index) => {
        let selectedCatalogueNo = e.target.value.toUpperCase();
        let tempCatalogues = catalogues;
        tempCatalogues[index].cataloguename = selectedCatalogueNo;
        await catalogues.map((catalogue) => {
            if (catalogue.catalogueno === selectedCatalogueNo) {
                tempCatalogues[index].catalogueno = catalogue.catalogueno;
            }
        });
        setCatalogues([...tempCatalogues]);
    };

    return (
        <div>
            {load ? (
                <div>Loading..</div>
            ) : (
                <form>
                    <table
                        className="table table-bordered table-hover table-responsive"
                        style={{
                            width: "50%",
                            margin: "20px auto",
                            maxHeight: "800px",
                        }}
                    >
                        <tr>
                            <td>Order Id</td>
                            <td>
                                <input
                                    type="number"
                                    value={orderId}
                                    placeholder="Enter Order Id..."
                                    onChange={(e) => {
                                        setOrderId(e.target.value);
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
                                    value={orderdate}
                                    onChange={updateOrderDate}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Firm</td>
                            <td>
                                <input
                                    list="firmlist"
                                    onChange={onUpdateFirm}
                                    value={firmName}
                                    autoCapitalize
                                    placeholder="Firm"
                                />

                                <datalist id="firmlist">
                                    {firms.length > 0 &&
                                        firms.map((firm, key) => (
                                            <option value={firm.firmname} />
                                        ))}
                                </datalist>
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

                    <table
                        className="table table-bordered table-hover table-responsive"
                        style={{ margin: "50px 10%" }}
                    >
                        <tr>
                            <th>Sr. No.</th>
                            <th>Catalogue No.</th>
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
                                    Add Catalogue
                                </button>
                            </th>
                        </tr>
                        {salesOrderDesigns.map((salesOrderDesign, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            id={`${index}catalogueno`}
                                            list="cataloguelist"
                                            onChange={(e) => {
                                                onUpdateCatalogueNo(e, index);
                                            }}
                                            value={
                                                salesOrderDesign.cataloguename
                                            }
                                            autoCapitalize
                                            placeholder="Catalogue No"
                                        />

                                        <datalist id="cataloguelist">
                                            {catalogues.length > 0 &&
                                                catalogues.map((catalogue) => (
                                                    <option
                                                        value={
                                                            catalogue.catalogueno
                                                        }
                                                    />
                                                ))}
                                        </datalist>
                                    </td>
                                    <td>
                                        <input
                                            placeholder="Enter Colour..."
                                            onChange={(e) =>
                                                updateCatalogue(
                                                    e,
                                                    index,
                                                    "colour"
                                                )
                                            }
                                            value={salesOrderDesign.colour}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Enter Pieces..."
                                            onChange={(e) =>
                                                updateCatalogue(
                                                    e,
                                                    index,
                                                    "pieces"
                                                )
                                            }
                                            value={salesOrderDesign.pieces}
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
                        Save Order
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default InputSalesOrder;
