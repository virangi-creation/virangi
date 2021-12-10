import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError.js";
import amountFormatter from "../../Util/amountFormatter.js";

function PrintMachineProgram() {
    const [machineProgram, setMachineProgram] = useState([]);
    const [load, setLoad] = useState(true);
    const location = useLocation();

    useEffect(async () => {
        try {
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            if (location.state) {
                document.title = "Machine - " + location.state.machineno;
                setLoad(true);
                await axios
                    .get(`/machineprogram/print/${location.state.machineno}`)
                    .then(({ data }) => {
                        console.log(data);
                        setMachineProgram(data);
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

    return (
        <div>
            {load && <div>Loading...</div>}
            {!load && (
                <div>
                    {machineProgram.map((machineProgram, index) => {
                        let programno = machineProgram.programid;
                        if (machineProgram.programid < 10000)
                            programno = "S" + machineProgram.programid;
                        else
                            programno =
                                "P" + (machineProgram.programid % 10000);
                        return (
                            <div
                                style={{
                                    minHeight: "684px",
                                    border: "1px solid black",
                                    display: "flex",
                                    verticalAlign: "middle",
                                    margin: "10px",
                                }}
                            >
                                <table
                                    style={{
                                        width: "95%",
                                        margin: "auto",
                                        textAlign: "center",
                                    }}
                                    className="table table-bordered table-hover table-responsive border-dark"
                                >
                                    <thead>
                                        <tr style={{ verticalAlign: "middle" }}>
                                            <td
                                                rowSpan="2"
                                                style={{
                                                    fontSize: "x-large",
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Program no -{" "}
                                                {machineProgram.machineno} /{" "}
                                                {programno}
                                            </td>
                                            <td>
                                                Design No -{" "}
                                                <b>
                                                    {
                                                        machineProgram.design
                                                            .designno
                                                    }
                                                    &emsp; &#40;{" "}
                                                    {
                                                        machineProgram.design
                                                            .catalogueno
                                                    }{" "}
                                                    &#41;
                                                </b>
                                            </td>
                                            <td>
                                                Saree -{" "}
                                                <b>
                                                    {
                                                        machineProgram
                                                            .designMatching
                                                            .bodycolour
                                                    }
                                                </b>
                                            </td>
                                            <td>
                                                Border -{" "}
                                                {
                                                    machineProgram
                                                        .designMatching
                                                        .bordercolour
                                                }
                                            </td>
                                        </tr>
                                        <tr style={{ verticalAlign: "middle" }}>
                                            <td>
                                                File Name - <br />
                                                <span
                                                    style={{
                                                        fontSize: "large",
                                                    }}
                                                >
                                                    {
                                                        machineProgram.designfilename
                                                    }
                                                </span>
                                            </td>
                                            <td>
                                                Order No -{" "}
                                                {machineProgram.orderno}
                                            </td>
                                            <td>
                                                <span
                                                    style={{
                                                        fontSize: "x-large",
                                                    }}
                                                >
                                                    Repeat -{" "}
                                                    {machineProgram.totalrepeat}
                                                </span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Feeder No</td>
                                            <td>Yarn Quality</td>
                                            <td>Shade No</td>
                                            <td>Colour</td>
                                        </tr>
                                        {machineProgram.program.map(
                                            (program, index) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {program.feederno}
                                                        </td>
                                                        <td>
                                                            {
                                                                program.yarnqualityname
                                                            }
                                                        </td>
                                                        <td>{program.shade}</td>
                                                        <td>
                                                            {program.colour}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                        <tr>
                                            <td>
                                                Design Pick -{" "}
                                                {amountFormatter(
                                                    machineProgram.totalpicks /
                                                        machineProgram.totalrepeat
                                                )}
                                            </td>
                                            <td>Estimated Start Time</td>
                                            <td>Estimated End Time</td>
                                            <td>Estimated Time Period</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Program Total Pick -{" "}
                                                {amountFormatter(
                                                    machineProgram.totalpicks
                                                )}
                                            </td>
                                            <td>
                                                Start ___ / ___ / _____ <br />
                                                ___ : ___
                                            </td>
                                            <td>
                                                End ___ / ___ / _____ <br /> ___
                                                : ___
                                            </td>
                                            <td>Actual Time Period</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                    {machineProgram.map((machineProgram, index) => {
                        let programno = machineProgram.programid;
                        if (machineProgram.programid < 10000)
                            programno = "S" + machineProgram.programid;
                        else
                            programno =
                                "P" + (machineProgram.programid % 10000);
                        return (
                            <div
                                style={{
                                    minHeight: "680px",
                                    border: "1px solid black",
                                    display: "flex",
                                    verticalAlign: "middle",
                                    margin: "10px",
                                }}
                            >
                                <table
                                    style={{
                                        width: "95%",
                                        margin: "auto",
                                        textAlign: "center",
                                    }}
                                    className="table table-bordered table-hover table-responsive border-dark"
                                >
                                    <thead>
                                        <tr style={{ verticalAlign: "middle" }}>
                                            <td
                                                rowSpan="2"
                                                style={{
                                                    fontSize: "x-large",
                                                    verticalAlign: "middle",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Program no -{" "}
                                                {machineProgram.machineno} /{" "}
                                                {programno}
                                            </td>
                                            <td>
                                                Design No -{" "}
                                                <b>
                                                    {
                                                        machineProgram.design
                                                            .designno
                                                    }
                                                    &emsp; &#40;{" "}
                                                    {
                                                        machineProgram.design
                                                            .catalogueno
                                                    }{" "}
                                                    &#41;
                                                </b>
                                            </td>
                                            <td>
                                                Saree -{" "}
                                                <b>
                                                    {
                                                        machineProgram
                                                            .designMatching
                                                            .bodycolour
                                                    }
                                                </b>
                                            </td>
                                            <td>
                                                Border -{" "}
                                                {
                                                    machineProgram
                                                        .designMatching
                                                        .bordercolour
                                                }
                                            </td>
                                        </tr>
                                        <tr style={{ verticalAlign: "middle" }}>
                                            <td>
                                                File Name - <br />
                                                <span
                                                    style={{
                                                        fontSize: "large",
                                                    }}
                                                >
                                                    {
                                                        machineProgram.designfilename
                                                    }
                                                </span>
                                            </td>
                                            <td>
                                                Order No -{" "}
                                                {machineProgram.orderno}
                                            </td>
                                            <td>
                                                <span
                                                    style={{
                                                        fontSize: "x-large",
                                                    }}
                                                >
                                                    Repeat -{" "}
                                                    {machineProgram.totalrepeat}
                                                </span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Feeder No</td>
                                            <td>Yarn Quality</td>
                                            <td>Shade No</td>
                                            <td>Colour</td>
                                        </tr>
                                        {machineProgram.program.map(
                                            (program, index) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {program.feederno}
                                                        </td>
                                                        <td>
                                                            {
                                                                program.yarnqualityname
                                                            }
                                                        </td>
                                                        <td>{program.shade}</td>
                                                        <td>
                                                            {program.colour}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                        <tr>
                                            <td>
                                                Design Pick -{" "}
                                                {amountFormatter(
                                                    machineProgram.totalpicks /
                                                        machineProgram.totalrepeat
                                                )}
                                            </td>
                                            <td>Estimated Start Time</td>
                                            <td>Estimated End Time</td>
                                            <td>Estimated Time Period</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Program Total Pick -{" "}
                                                {amountFormatter(
                                                    machineProgram.totalpicks
                                                )}
                                            </td>
                                            <td>
                                                Start ___ / ___ / _____ <br />
                                                ___ : ___
                                            </td>
                                            <td>
                                                End ___ / ___ / _____ <br /> ___
                                                : ___
                                            </td>
                                            <td>Actual Time Period</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default PrintMachineProgram;
