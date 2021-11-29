import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./challan.css";
import axios from "../../axios";
import catchAxiosError from "../../Util/catchAxiosError";
import generateAddressString from "../../Util/generateAddressString";
import ContentPrototype from "../../Containers/ContentPrototype";

function PrintChallan() {
    let location = useLocation();
    const [challandate, setChallanDate] = useState(10);
    const [challan, setChallan] = useState({});
    const [agent, setAgent] = useState({});
    const [party, setParty] = useState({});
    const [deliveryParty, setDeliveryParty] = useState({});
    const [designChallan, setDesignChallan] = useState([]);
    const [load, setLoad] = useState(false);
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [billingadd, setBillingAdd] = useState("");

    useEffect(async () => {
        try {
            if (location.state) {
                document.title = `HS-${location.state.challanno}`;
                setLoad(true);
                await axios
                    .get(`/challan/${location.state.challanno}/print`)
                    .then(({ data }) => {
                        let challan = data.challan[0];
                        let tempDate = new Date(
                            challan.challandate.substr(0, 10)
                        );
                        setChallanDate(
                            `${tempDate.getDate()}/${(
                                "00" + parseInt(tempDate.getMonth() + 1)
                            ).slice(-2)}/${tempDate.getFullYear()}`
                        );
                        setAgent(data.agent[0]);
                        setParty(data.party[0]);
                        setDeliveryParty(data.deliveryparty[0]);
                        setDesignChallan(data.designs);
                        console.log(data);
                        setChallan(challan);
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

    useEffect(async () => {
        var excludeAfterIndex = designChallan.length / 2;
        let tempFirstHalf = [],
            tempSecondHalf = [];
        tempFirstHalf = await designChallan.reduce(
            (tempFirstHalf, design, index) => {
                if (index < excludeAfterIndex) tempFirstHalf.push(design);
                return tempFirstHalf;
            },
            []
        );
        tempSecondHalf = await designChallan.reduce(
            (tempSecondHalf, design, index) => {
                if (index >= excludeAfterIndex) tempSecondHalf.push(design);
                return tempSecondHalf;
            },
            []
        );
        setFirstHalf(tempFirstHalf);
        setSecondHalf(tempSecondHalf);
    }, [designChallan]);

    useEffect(() => {
        let tempbillingadd = generateAddressString(
            party.balineone,
            party.balinetwo,
            party.bacity,
            party.bastate,
            party.bapincode
        );
        setBillingAdd(tempbillingadd);
    }, [party]);

    return (
        <div>
            {load && <div>Loading...</div>}
            {!load && (
                <div className="main">
                    <div className="challan-details">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <h1
                                style={{
                                    margin: "10px auto",
                                    fontSize: "50px",
                                }}
                            >
                                Hariom Synthetics
                            </h1>
                            <p
                                style={{
                                    margin: "10px auto",
                                    wordSpacing: "5px",
                                }}
                            >
                                5814, Road No. 58, Sachin G.I.D.C, Sachin, Surat
                                - 394230
                            </p>
                            <div className="firm-details">
                                <div className="left">
                                    <div
                                        className="mob-gst"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <ContentPrototype
                                            heading="GSTIN"
                                            content="24AIUPP2987K1ZC"
                                            boldContent={true}
                                        />
                                        <br />
                                        <ContentPrototype
                                            heading="Mob No."
                                            content="9913728256"
                                            boldContent={true}
                                        />
                                        <br />
                                        <ContentPrototype
                                            heading="Vehicle No"
                                            content={challan.tempno}
                                            boldContent={true}
                                        />
                                    </div>
                                </div>
                                <div className="right">
                                    <p>
                                        <ContentPrototype
                                            heading="Challan No"
                                            content={challan.challanno}
                                            boldContent={true}
                                        />
                                    </p>
                                    <p>
                                        <ContentPrototype
                                            heading="Date"
                                            content={challandate}
                                            boldContent={true}
                                        />
                                    </p>
                                    <p>
                                        <ContentPrototype
                                            heading="Agent"
                                            content={agent.agentname}
                                            boldContent={true}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="party-details"
                            style={{ border: "1px solid black" }}
                        >
                            <div
                                className="left"
                                style={{
                                    borderRight: "1px solid black",
                                    minWidth: "50%",
                                }}
                            >
                                <div className="firm">
                                    <h6 style={{ margin: "10px 0px" }}>
                                        <ContentPrototype
                                            heading="Party"
                                            content={party.partyname}
                                            boldContent={true}
                                        />
                                    </h6>
                                    <h6>
                                        <ContentPrototype
                                            heading="GST No"
                                            content={party.gst}
                                            boldContent={true}
                                        />
                                    </h6>
                                    <h6>
                                        <ContentPrototype
                                            heading="Address"
                                            content={billingadd}
                                            boldContent={false}
                                        />
                                    </h6>
                                </div>
                            </div>
                            <div
                                className="left"
                                style={{
                                    borderRight: "1px solid black",
                                    minWidth: "50%",
                                }}
                            >
                                <h6 style={{ margin: "10px 0px" }}>
                                    <ContentPrototype
                                        heading="Delivery Party"
                                        content={deliveryParty.partyname}
                                        boldContent={false}
                                    />
                                </h6>
                                <h6>
                                    <ContentPrototype
                                        heading="Delivery Address"
                                        content={challan.deliveryaddress}
                                        boldContent={false}
                                    />
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div
                        className="taka-details "
                        style={{
                            marginTop: "20px",
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <table
                            className="table-bordered table-condensed"
                            style={{
                                width: "100%",
                                borderRight: "1px solid black",
                                borderLeft: "1px solid black",
                                paddingLeft: "200px",
                            }}
                        >
                            <tr>
                                <th
                                    style={{
                                        paddingLeft: "20px",
                                    }}
                                >
                                    Design No
                                </th>
                                <th>Colour</th>
                                <th>Sarees</th>
                            </tr>
                            {firstHalf.map((design) => {
                                return (
                                    <tr>
                                        <td
                                            style={{
                                                paddingLeft: "20px",
                                            }}
                                        >
                                            {design.designno}
                                        </td>
                                        <td>{design.colour}</td>
                                        <td>{design.pieces}</td>
                                    </tr>
                                );
                            })}
                        </table>
                        <table
                            style={{
                                width: "100%",
                                borderRight: "1px solid black",
                            }}
                            className="table-condensed table-bordered"
                        >
                            <tr style={{ height: "15px" }}>
                                <th
                                    style={{
                                        paddingLeft: "20px",
                                    }}
                                >
                                    Design No
                                </th>
                                <th>Colour</th>
                                <th>Sarees</th>
                            </tr>
                            {secondHalf.map((design) => {
                                return (
                                    <tr>
                                        <td
                                            style={{
                                                paddingLeft: "20px",
                                            }}
                                        >
                                            {design.designno}
                                        </td>
                                        <td>{design.colour}</td>
                                        <td>{design.pieces}</td>
                                    </tr>
                                );
                            })}
                            {secondHalf.length < firstHalf.length && (
                                <tr>
                                    <td
                                        colSpan="3"
                                        style={{ color: "transparent" }}
                                    >
                                        NA
                                    </td>
                                </tr>
                            )}
                        </table>
                    </div>
                    <div className="firm-details" style={{ border: "none" }}>
                        <div className="firm-left">
                            <h3 style={{ marginBottom: "10px" }}>
                                Sarees &nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                                {challan.totalsarees}
                            </h3>
                        </div>
                        <div className="firm-middle">
                            <h3>For {deliveryParty.partyname}</h3>
                        </div>
                        <div
                            className="firm-right"
                            style={{ textAlign: "end" }}
                        >
                            <h3>For Hariom Synthetics</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PrintChallan;
