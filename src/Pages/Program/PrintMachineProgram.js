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
                    {machineProgram.map((machineProgram) => {
                        let tempPrograms = machineProgram.program.sort(
                            (a, b) =>
                                parseInt(a.feederno) - parseInt(b.feederno)
                        );
                        let programno = machineProgram.programid;
                        if (machineProgram.programid < 10000)
                            programno = "S" + machineProgram.programid;
                        else
                            programno =
                                "P" + (machineProgram.programid % 10000);
                        return (
                            <div
                                style={{
                                    minHeight: "685px",
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
                                    <thead style={{ verticalAlign: "middle" }}>
                                        <tr>
                                            <td
                                                rowSpan="2"
                                                style={{
                                                    fontSize: "x-large",
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
                                        <tr>
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
                                                    {machineProgram.totalrepeat}{" "}
                                                    / Pick -{" "}
                                                    {parseInt(
                                                        machineProgram.pickonloom
                                                    ) || "______"}
                                                </span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody style={{ verticalAlign: "middle" }}>
                                        <tr>
                                            <td>Feeder No</td>
                                            <td>Yarn Quality</td>
                                            <td>Shade No</td>
                                            <td>Colour</td>
                                        </tr>
                                        {tempPrograms.map((program) => {
                                            return (
                                                <tr>
                                                    <td>{program.feederno}</td>
                                                    <td>
                                                        {
                                                            program.yarnqualityname
                                                        }
                                                    </td>
                                                    <td>{program.shade}</td>
                                                    <td>{program.colour}</td>
                                                </tr>
                                            );
                                        })}
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
                                            <td>
                                                Est. Time Period :{" "}
                                                <b>
                                                    {" "}
                                                    {(
                                                        machineProgram.timeRequired -
                                                        (machineProgram.timeRequired %
                                                            1)
                                                    ).toFixed(0)}
                                                    H{" "}
                                                    {(
                                                        (machineProgram.timeRequired %
                                                            1) *
                                                        60
                                                    ).toFixed(0)}
                                                    M
                                                </b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Program Total Pick -{" "}
                                                {amountFormatter(
                                                    machineProgram.totalpicks
                                                )}
                                            </td>
                                            <td>
                                                Start : ___ / ___ / _____ <br />
                                                ___ : ___ | ___
                                            </td>
                                            <td>
                                                End : ___ / ___ / _____ <br />{" "}
                                                ___ : ___ | ___
                                            </td>
                                            <td style={{ textAlign: "start" }}>
                                                Actual <br />
                                                Time &emsp; : <br />
                                                Period
                                            </td>
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
