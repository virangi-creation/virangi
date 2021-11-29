import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function YarnShade() {
    const [yarnshades, setYarnShades] = useState([]);
    const [searchedShades, setSearchedShades] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (shadeno, colour, partyid, qualityid) => {
        try {
            if (window.confirm("Are you sure you want to delete this shade?")) {
                setLoad(true);
                await axios
                    .delete(`/yarnshade`, {
                        data: {
                            shadeno,
                            colour,
                            partyid,
                            qualityid,
                        },
                    })
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

    useEffect(async () => {
        try {
            let date = new Date();
            let strDate = date.toLocaleString().substr(0, 10);
            document.title = "Yarn Shade " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/yarnshade`)
                .then(({ data }) => {
                    setSearchedShades(data);
                    setYarnShades(data);
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

    const onSearchChange = (e) => {
        let str = e.target.value;
        str = str.toUpperCase();
        let tempShades = [];
        yarnshades.map((shade) => {
            if (
                shade.colour.includes(str) ||
                shade.shadeno.includes(str) ||
                shade.qualityname.includes(str) ||
                shade.partyname.includes(str)
            )
                tempShades.push(shade);
        });
        setSearchedShades([...tempShades]);
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
                    placeholder="Search Yarn Shade"
                    autoFocus
                />
                <Link to="/yarnshade/add">
                    <button className={buttonStyles.inputbutton}>
                        Add new Yarn Shade
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table
                    className="table table-bordered table-hover table-responsive"
                    style={{ margin: "auto", maxWidth: "70%" }}
                >
                    <tbody>
                        <tr>
                            <th>Quality</th>
                            <th>Shade No</th>
                            <th>Colour</th>
                            <th>Company</th>
                            <th>Virtual Stock</th>
                            <th>Actual Stock</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedShades.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="8">No Yarn Shade Found yet</td>
                            </tr>
                        )}
                        {searchedShades.length !== 0 &&
                            searchedShades.map((shade) => {
                                return (
                                    <tr
                                        key={`${shade.shadeno}${shade.qualityname}${shade.partyname}`}
                                    >
                                        <td>{shade.qualityname}</td>
                                        <td>{shade.shadeno}</td>
                                        <td>{shade.colour}</td>
                                        <td>{shade.partyname}</td>
                                        <td>{shade.virtualstock}</td>
                                        <td>{shade.actualstock}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => {
                                                    deleteRequest(
                                                        shade.shadeno,
                                                        shade.colour,
                                                        shade.partyid,
                                                        shade.qualityid
                                                    );
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-primary">
                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/yarnshade/update",
                                                        state: {
                                                            quality:
                                                                shade.qualityname,
                                                            shadeno:
                                                                shade.shadeno,
                                                            qualityid:
                                                                shade.qualityid,
                                                            colour: shade.colour,
                                                            partyid:
                                                                shade.partyid,
                                                            party: shade.partyname,
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
            )}
        </div>
    );
}

export default YarnShade;
