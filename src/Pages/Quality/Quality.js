import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError";

function Quality() {
    const [qualities, setQualities] = useState([]);
    const [searchedQualities, setSearchedQualities] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = (qualityid) => {
        try {
            if (
                window.confirm("Are you sure you want to delete this Quality?")
            ) {
                setLoad(true);
                axios
                    .delete(`/quality/${qualityid}`)
                    .then(() => {
                        window.location.reload();
                        setLoad(false);
                    })
                    .catch(catchAxiosError);
            }
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    useEffect(() => {
        try {
            let date = new Date();
            let strDate = date.toLocaleString().substr(0, 10);
            document.title = "Quality " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            axios
                .get(`/quality/`)
                .then(({ data }) => {
                    setLoad(false);
                    if (data && data.length > 0) {
                        setSearchedQualities(data);
                        setQualities(data);
                    }
                })
                .catch(catchAxiosError);
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }, []);

    const onSearchChange = (e) => {
        let str = e.target.value;
        str = str.toUpperCase();
        let tempQualities = [];
        qualities.map((quality) => {
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
                    placeholder="Search Quality"
                    autoFocus
                />
                <Link to="/quality/add">
                    <button className={buttonStyles.inputbutton}>
                        Add new Quality
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table border="1" className={tableStyles.table}>
                    <tbody>
                        <tr>
                            <th rowSpan="2"></th>
                            <th rowSpan="2"></th>
                            <th rowSpan="2">Quality</th>
                            <th rowSpan="2">Job Charge</th>
                            <th colSpan="15">Body Warp Details</th>
                            <th colSpan="15">Border Warp Details</th>
                            <th colSpan="15">Top Beam Warp Details</th>
                            <th rowSpan="2">Pick On Loom</th>
                            <th rowSpan="2">Butta Charge</th>
                            <th rowSpan="2">Laser Charge</th>
                            <th rowSpan="2">Design Charge</th>
                            <th rowSpan="2">Finishing Charge</th>
                            <th rowSpan="2">Packing Charge</th>
                            <th rowSpan="2">Agent Charge</th>
                        </tr>
                        <tr>
                            <th>Warp Yarn Quality</th>
                            <th>Denier</th>
                            <th>Length</th>
                            <th>Shortage</th>
                            <th>Total Length</th>
                            <th>Ends</th>
                            <th>Reed</th>
                            <th>Ends Per Den</th>
                            <th>Selvedge Den</th>
                            <th>Selvedge Ends per Den</th>
                            <th>RS</th>
                            <th>Warp Weight</th>
                            <th>Warp Wastage</th>
                            <th>Total Weight</th>
                            <th>Yarn Cost</th>
                            <th>Warp Yarn Quality</th>
                            <th>Denier</th>
                            <th>Length</th>
                            <th>Shortage</th>
                            <th>Total Length</th>
                            <th>Ends</th>
                            <th>Reed</th>
                            <th>Ends Per Den</th>
                            <th>Selvedge Den</th>
                            <th>Selvedge Ends per Den</th>
                            <th>RS</th>
                            <th>Warp Weight</th>
                            <th>Warp Wastage</th>
                            <th>Total Weight</th>
                            <th>Yarn Cost</th>
                            <th>Warp Yarn Quality</th>
                            <th>Denier</th>
                            <th>Length</th>
                            <th>Shortage</th>
                            <th>Total Length</th>
                            <th>Ends</th>
                            <th>Reed</th>
                            <th>Ends Per Den</th>
                            <th>Selvedge Den</th>
                            <th>Selvedge Ends per Den</th>
                            <th>RS</th>
                            <th>Warp Weight</th>
                            <th>Warp Wastage</th>
                            <th>Total Weight</th>
                            <th>Yarn Cost</th>
                        </tr>
                        {searchedQualities.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="8">No Quality Found yet</td>
                            </tr>
                        )}
                        {searchedQualities.length !== 0 &&
                            searchedQualities.map((quality) => {
                                return (
                                    <tr key={quality.qualityid}>
                                        <td
                                            className={tableStyles.tableButton}
                                            onClick={() => {
                                                deleteRequest(
                                                    quality.qualityid
                                                );
                                            }}
                                        >
                                            Delete
                                        </td>
                                        <td className={tableStyles.tableButton}>
                                            <Link
                                                style={{ color: "white" }}
                                                to={{
                                                    pathname: "/quality/update",
                                                    state: {
                                                        qualityid:
                                                            quality.qualityid,
                                                    },
                                                }}
                                            >
                                                Update
                                            </Link>
                                        </td>
                                        <td>{quality.qualityname}</td>
                                        <th>{quality.jobcharge}</th>
                                        <td>{quality.bodyqualityname}</td>
                                        <td>{quality.bodydenier}</td>
                                        <td>{quality.bodywarplength}</td>
                                        <td>{quality.bodywarpshortage}</td>
                                        <td>{quality.bodytotalwarplength}</td>
                                        <td>{quality.bodyends}</td>
                                        <td>{quality.bodyreed}</td>
                                        <td>{quality.bodyendsperden}</td>
                                        <td>{quality.bodyselvedgeden}</td>
                                        <td>{quality.bodyselvedgeden}</td>
                                        <td>{quality.bodyrs}</td>
                                        <td>{quality.bodywarpweight}</td>
                                        <td>{quality.bodywarpwastage}</td>
                                        <td>{quality.bodytotalweight}</td>
                                        <td>{quality.bodyyarncost}</td>
                                        <td>{quality.borderqualityname}</td>
                                        <td>{quality.borderdenier}</td>
                                        <td>{quality.borderwarplength}</td>
                                        <td>{quality.borderwarpshortage}</td>
                                        <td>{quality.bordertotalwarplength}</td>
                                        <td>{quality.borderends}</td>
                                        <td>{quality.borderreed}</td>
                                        <td>{quality.borderendsperden}</td>
                                        <td>{quality.borderselvedgeden}</td>
                                        <td>{quality.borderselvedgeden}</td>
                                        <td>{quality.borderrs}</td>
                                        <td>{quality.borderwarpweight}</td>
                                        <td>{quality.borderwarpwastage}</td>
                                        <td>{quality.bordertotalweight}</td>
                                        <td>{quality.borderyarncost}</td>
                                        <td>{quality.topbeamqualityname}</td>
                                        <td>{quality.topbeamdenier}</td>
                                        <td>{quality.topbeamwarplength}</td>
                                        <td>{quality.topbeamwarpshortage}</td>
                                        <td>
                                            {quality.topbeamtotalwarplength}
                                        </td>
                                        <td>{quality.topbeamends}</td>
                                        <td>{quality.topbeamreed}</td>
                                        <td>{quality.topbeamendsperden}</td>
                                        <td>{quality.topbeamselvedgeden}</td>
                                        <td>{quality.topbeamselvedgeden}</td>
                                        <td>{quality.topbeamrs}</td>
                                        <td>{quality.topbeamwarpweight}</td>
                                        <td>{quality.topbeamwarpwastage}</td>
                                        <td>{quality.topbeamtotalweight}</td>
                                        <td>{quality.topbeamyarncost}</td>
                                        <td>{quality.pickonloom}</td>
                                        <td>{quality.buttacharge}</td>
                                        <td>{quality.lasercharge}</td>
                                        <td>{quality.designcharge}</td>
                                        <td>{quality.finishingcharge}</td>
                                        <td>{quality.packingcharge}</td>
                                        <td>{quality.agentcharge}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Quality;
