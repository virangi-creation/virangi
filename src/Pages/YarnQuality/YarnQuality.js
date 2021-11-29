import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function YarnQuality() {
    const [yarnqualities, setYarnQualities] = useState([]);
    const [searchedQualities, setSearchedQualities] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let qualityid = e;
            if (
                window.confirm(
                    "Are you sure you want to delete this Yarn Quality?"
                )
            ) {
                setLoad(true);
                await axios
                    .delete(`/yarnquality/${qualityid}`)
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
            document.title = "Yarn Quality " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            await axios
                .get(`/yarnquality/`)
                .then(({ data }) => {
                    setSearchedQualities(data);
                    setYarnQualities(data);
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
        let tempQualities = [];
        yarnqualities.map((quality) => {
            if (quality.qualityname.includes(str)) tempQualities.push(quality);
        });
        setSearchedQualities([...tempQualities]);
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
                    placeholder="Search Yarn Quality"
                    autoFocus
                />
                <Link to="/yarnquality/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Yarn Quality
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table
                    style={{ maxWidth: "80%", margin: "auto" }}
                    className="table table-bordered table-hover table-responsive"
                >
                    <tbody>
                        <tr>
                            <th>Yarn Quality ID</th>
                            <th>Quality Name</th>
                            <th>Denier</th>
                            <th>Price</th>
                            <th>Cartage</th>
                            <th>GST %</th>
                            <th>Total Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedQualities.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="9">No Yarn Quality Found yet</td>
                            </tr>
                        )}
                        {searchedQualities.length !== 0 &&
                            searchedQualities.map((quality) => {
                                return (
                                    <tr key={quality.qualityid}>
                                        <td>{quality.qualityid}</td>
                                        <td>{quality.qualityname}</td>
                                        <td>{quality.denier}</td>
                                        <td>{quality.price}</td>
                                        <td>{quality.cartage}</td>
                                        <td>{quality.gst}</td>
                                        <td>{quality.totalprice}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => {
                                                    deleteRequest(
                                                        quality.qualityid
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
                                                            "/yarnquality/update",
                                                        state: {
                                                            qualityid:
                                                                quality.qualityid,
                                                            qualityname:
                                                                quality.qualityname,
                                                            price: quality.price,
                                                            denier: quality.denier,
                                                            cartage:
                                                                quality.cartage,
                                                            gst: quality.gst,
                                                            totalprice:
                                                                quality.totalprice,
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

export default YarnQuality;
