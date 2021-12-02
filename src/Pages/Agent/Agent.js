import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";
import generateAddressString from "../../Util/generateAddressString.js";

function Agent() {
    const [agents, setAgents] = useState([]);
    const [searchedAgents, setSearchedAgents] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let agentid = e;
            if (window.confirm("Are you sure you want to delete this agent?")) {
                setLoad(true);
                await axios
                    .delete(`/agent/${agentid}`)
                    .then(() => {
                        setLoad(false);
                        window.location.reload();
                    })
                    .catch((err) => {
                        setLoad(false);
                        catchAxiosError(err);
                    });
            }
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        try {
            document.title = "Agent";
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            axios
                .get(`/agent/`)
                .then((res) => {
                    setLoad(false);
                    setAgents(res.data);
                    setSearchedAgents(res.data);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const onSearchChange = (e) => {
        let str = e.target.value;
        str = str.toUpperCase();
        let tempAgents = [];
        agents.map((agent) => {
            if (agent.agentname.includes(str)) tempAgents.push(agent);
        });
        setSearchedAgents([...tempAgents]);
    };

    return (
        <div className="margin">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "10px auto",
                    minWidth: "30%",
                }}
            >
                <input
                    type="text"
                    onChange={onSearchChange}
                    className={inputStyles.textInput}
                    placeholder="Search Agent"
                    autoFocus
                />
                <Link to="/agent/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Agent
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table className="table table-bordered table-hover table-responsive">
                    <tbody>
                        <tr>
                            <th>Agent ID</th>
                            <th>Name</th>
                            <th>GST</th>
                            <th>PAN</th>
                            <th>Phone no</th>
                            <th>Address</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedAgents.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="4">No Agent Found yet</td>
                            </tr>
                        )}
                        {searchedAgents.length !== 0 &&
                            searchedAgents.map((agent) => {
                                let address = generateAddressString(
                                    agent.lineone,
                                    agent.linetwo,
                                    agent.city,
                                    agent.state,
                                    agent.pincode
                                );
                                return (
                                    <tr key={agent.agentid}>
                                        <td>{agent.agentid}</td>
                                        <td>{agent.agentname}</td>
                                        <td>{agent.gst}</td>
                                        <td>{agent.pan}</td>
                                        <td>{agent.phoneno}</td>
                                        <td>{address}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() => {
                                                    deleteRequest(
                                                        agent.agentid
                                                    );
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                            >
                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/agent/update",
                                                        state: {
                                                            agentid:
                                                                agent.agentid,
                                                        },
                                                    }}
                                                >
                                                    Update
                                                </Link>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            )}{" "}
        </div>
    );
}

export default Agent;
