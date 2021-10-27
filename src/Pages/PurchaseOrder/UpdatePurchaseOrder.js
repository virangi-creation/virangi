import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError.js";
import generateInputDateString from "../../Util/generateInputDateString.js";
import generateDateString from "../../Util/generateDateString.js";
import amountFormatter from "../../Util/amountFormatter.js";

function UpdatePurchaseOrder() {
    const location = useLocation();
    const [orderid, setOrderid] = useState(0);
    const [prevorderid, setPrevOrderid] = useState(0);
    const [orderdate, setOrderDate] = useState(
        generateInputDateString(new Date())
    );
    const [firmid, setFirmid] = useState(0);
    const [partyid, setPartyId] = useState(0);
    const [manufacturerid, setManufacturerId] = useState(0);
    const [agentid, setAgentId] = useState(0);
    const [qualityid, setQualityId] = useState(0);
    const [shadeno, setShadeno] = useState(0);
    const [rate, setRate] = useState(0);
    const [totalkg, setTotalKg] = useState(0);
    const [cartage, setCartage] = useState(0);
    const [gst, setGst] = useState(0);
    const [price, setPrice] = useState(0);
    const [orderamount, setOrderAmount] = useState(0);
    const [deliverydays, setDeliveryDays] = useState(0);
    const [deliverydate, setDeliveryDate] = useState(
        generateDateString(new Date())
    );
    const [paymentdays, setPaymentDays] = useState(0);
    const [interestrate, setInterestRate] = useState(0);
    const [intereststart, setInterestStart] = useState(0);
    const [refund, setRefund] = useState(0);
    const [remarks, setRemarks] = useState(0);

    const [parties, setParties] = useState([]);
    const [agents, setAgents] = useState([]);
    const [yarnqualities, setYarnQualities] = useState([]);
    const [yarnshades, setYarnShades] = useState([]);
    const [firms, setFirms] = useState([]);
    const [specificyarnshades, setSpecificYarnShades] = useState([]);

    const [load, setLoad] = useState(false);
    const history = useHistory();

    useEffect(async () => {
        document.title = "Add Purchase Order";
        if (location.state) {
            setOrderid(location.state.orderid);
            setPrevOrderid(location.state.orderid);
            await axios
                .get(`/purchaseorder/${location.state.orderid}/update`)
                .then(({ data }) => {
                    setParties(data.parties);
                    setAgents(data.agents);
                    setYarnQualities(data.yarnqualities);
                    setYarnShades(data.yarnshades);
                    setFirms(data.firms);
                    setSpecificYarnShades(data.yarnshades);

                    if (data.parties.length > 0) {
                        setPartyId(data.parties[0].partyid);
                        setManufacturerId(data.parties[0].partyid);
                    } else alert("Please enter Party to be selected.");

                    if (data.agents.length > 0)
                        setAgentId(data.agents[0].agentid);
                    else alert("Please enter Agents to be selected.");

                    if (data.yarnqualities.length > 0)
                        setQualityId(data.yarnqualities[0].qualityid);
                    else alert("Please enter Yarn Qualities to be selected.");

                    if (data.yarnshades.length > 0)
                        setShadeno(data.yarnshades[0].shadeno);
                    else alert("Please enter Yarn Shades to be selected.");

                    if (data.firms.length > 0) setFirmid(data.firms[0].firmid);
                    else alert("Please enter Firm to be selected.");

                    let order = data.order;
                    setFirmid(order.firmid);
                    setPartyId(order.partyid);
                    setManufacturerId(order.manufacturerid);
                    setAgentId(order.agentid);
                    setQualityId(order.qualityid);
                    setShadeno(order.shadeno);
                    setRate(order.rate);
                    setTotalKg(order.totalkg);
                    setGst(order.gst);
                    setCartage(order.cartage);
                    setDeliveryDays(order.deliverydays);
                    setPaymentDays(order.paymentdays);
                    setInterestRate(order.interestrate);
                    setInterestStart(order.intereststart);
                    setRefund(order.refund);
                    setRemarks(order.remarks);
                });
        }
    }, []);

    useEffect(() => {}, [firms]);

    useEffect(() => {
        parties.map((party) => {
            if (party.partyid === partyid) setAgentId(party.agentid);
        });
    }, [partyid]);

    useEffect(() => {
        let currDate = new Date(orderdate);
        currDate.setDate(currDate.getDate() + parseInt(deliverydays));
        setDeliveryDate(generateDateString(currDate));
    }, [deliverydays, orderdate]);

    useEffect(() => {
        let tempSpecificYarnShades = [];
        yarnshades.map((ys) => {
            if (ys.qualityid === qualityid && ys.partyid === manufacturerid)
                tempSpecificYarnShades.push(ys);
        });
        if (tempSpecificYarnShades.length > 0)
            setShadeno(tempSpecificYarnShades[0].shadeno);
        else setShadeno(0);
        console.log(tempSpecificYarnShades, yarnshades, qualityid);
        setSpecificYarnShades(tempSpecificYarnShades);
    }, [yarnshades, qualityid, manufacturerid]);

    useEffect(() => {
        setPrice(
            (
                ((parseFloat(rate) + parseFloat(cartage)) *
                    (100 + parseFloat(gst))) /
                100
            ).toFixed(2)
        );
    }, [gst, cartage, rate]);

    useEffect(() => {
        setOrderAmount((price * totalkg).toFixed(2));
    }, [price, totalkg]);

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .put(`/purchaseorder/${prevorderid}`, {
                    orderid,
                    orderdate,
                    firmid,
                    partyid,
                    manufacturerid,
                    agentid,
                    qualityid,
                    shadeno,
                    rate,
                    totalkg,
                    cartage,
                    gst,
                    deliverydays,
                    paymentdays,
                    interestrate,
                    intereststart,
                    refund,
                    remarks,
                })
                .then(() => {
                    setLoad(false);
                    history.push(`/purchaseorder`);
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
                    <table>
                        <tbody>
                            <tr>
                                <td>Order Id</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Order Id"
                                        value={orderid}
                                        onChange={(e) => {
                                            setOrderid(e.target.value);
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                        autoFocus
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Order Date</td>
                                <td>
                                    <input
                                        type="date"
                                        value={orderdate}
                                        onChange={(e) => {
                                            setOrderDate(e.target.value);
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Firm</td>
                                <td>
                                    <select
                                        value={firmid}
                                        onChange={(e) => {
                                            setFirmid(parseInt(e.target.value));
                                        }}
                                        onKeyDown={captureEnter}
                                    >
                                        {firms.map((firm) => (
                                            <option value={firm.firmid}>
                                                {firm.firmname}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Party</td>
                                <td>
                                    <select
                                        value={partyid}
                                        onKeyDown={captureEnter}
                                        onChange={(e) => {
                                            setPartyId(
                                                parseInt(e.target.value)
                                            );
                                        }}
                                    >
                                        {parties.map((party) => (
                                            <option value={party.partyid}>
                                                {party.partyname}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Broker</td>
                                <td>
                                    <select
                                        value={agentid}
                                        onKeyDown={captureEnter}
                                        onChange={(e) => {
                                            setAgentId(
                                                parseInt(e.target.value)
                                            );
                                        }}
                                    >
                                        {agents.map((agent) => (
                                            <option
                                                value={parseInt(agent.agentid)}
                                            >
                                                {agent.agentname}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Manufacturer</td>
                                <td>
                                    <select
                                        value={manufacturerid}
                                        onKeyDown={captureEnter}
                                        onChange={(e) => {
                                            setManufacturerId(
                                                parseInt(e.target.value)
                                            );
                                        }}
                                    >
                                        {parties.map((party) => (
                                            <option value={party.partyid}>
                                                {party.partyname}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Yarn Quality</td>
                                <td>
                                    <select
                                        value={qualityid}
                                        onKeyDown={captureEnter}
                                        onChange={(e) => {
                                            setQualityId(
                                                parseInt(e.target.value)
                                            );
                                        }}
                                    >
                                        {yarnqualities.map((yq) => (
                                            <option value={yq.qualityid}>
                                                {yq.qualityname}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Yarn Shades</td>
                                <td>
                                    <select
                                        value={shadeno}
                                        onKeyDown={captureEnter}
                                        onChange={(e) => {
                                            setShadeno(
                                                parseInt(e.target.value)
                                            );
                                        }}
                                    >
                                        {specificyarnshades.map((ys) => (
                                            <option value={ys.shadeno}>
                                                {ys.shadeno} - {ys.colour}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Quantity Kg.</td>
                                <td>
                                    <input
                                        value={totalkg}
                                        onChange={(e) =>
                                            setTotalKg(e.target.value)
                                        }
                                        value={totalkg}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Delivery Days</td>
                                <td>
                                    <input
                                        type="number"
                                        value={deliverydays}
                                        onChange={(e) => {
                                            setDeliveryDays(e.target.value);
                                        }}
                                        value={deliverydays}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Approx. Delivery Date</td>
                                <td>{deliverydate}</td>
                            </tr>
                            <tr>
                                <td>Rate</td>
                                <td>
                                    <input
                                        type="number"
                                        value={rate}
                                        onChange={(e) => {
                                            setRate(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>GST Per</td>
                                <td>
                                    <input
                                        type="number"
                                        value={gst}
                                        onChange={(e) => {
                                            setGst(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Cartage</td>
                                <td>
                                    <input
                                        type="number"
                                        value={cartage}
                                        onChange={(e) => {
                                            setCartage(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{amountFormatter(price, 2)}</td>
                            </tr>
                            <tr>
                                <td>Order Amount</td>
                                <td>{amountFormatter(orderamount, 0)}</td>
                            </tr>
                            <tr>
                                <td>Payment Days</td>
                                <td>
                                    <input
                                        type="number"
                                        onChange={(e) => {
                                            setPaymentDays(e.target.value);
                                        }}
                                        value={paymentdays}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Interest Rate</td>
                                <td>
                                    <input
                                        type="number"
                                        onChange={(e) => {
                                            setInterestRate(e.target.value);
                                        }}
                                        value={interestrate}
                                    />
                                </td>
                            </tr>{" "}
                            <tr>
                                <td>Interest Start</td>
                                <td>
                                    <input
                                        type="number"
                                        onChange={(e) => {
                                            setInterestStart(e.target.value);
                                        }}
                                        value={intereststart}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Refund %</td>
                                <td>
                                    <input
                                        type="number"
                                        onChange={(e) => {
                                            setRefund(e.target.value);
                                        }}
                                        value={refund}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Remarks</td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setRemarks(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        value={remarks}
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
                                        Save Purchase Order
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

export default UpdatePurchaseOrder;
