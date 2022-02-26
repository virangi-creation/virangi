import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function Design() {
    const [designs, setDesigns] = useState([]);
    const [searchedDesigns, setSearchedDesigns] = useState([]);
    const [load, setLoad] = useState(false);
    const [content, setContent] = useState();

    useEffect(async () => {
        if (searchedDesigns.length > 0) {
            let tempContent = "";
            tempContent = await searchedDesigns.map((design) => {
                console.log(design);
                return (
                    <tr key={design.designfilename}>
                        <td>{design.catalogueno}</td>
                        <td>{design.designno}</td>
                        <td>{design.designfilename}</td>
                        <td>{design.designdescription}</td>
                        <td>{design.qualityname}</td>
                        <td>{design.manufacturersellprice}</td>
                        <td>{design.totalamountdesign}</td>
                        <td>{design.sellprice}</td>
                        <td className={tableStyles.tableButton}>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                            >
                                <Link
                                    to={{
                                        pathname: "/design/add/similar",
                                        state: {
                                            designfilename:
                                                design.designfilename,
                                        },
                                    }}
                                >
                                    Add Similar
                                </Link>
                            </button>
                        </td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    deleteRequest(design.designfilename);
                                }}
                            >
                                Delete
                            </button>
                        </td>
                        <td className={tableStyles.tableButton}>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                            >
                                <Link
                                    to={{
                                        pathname: "/design/update",
                                        state: {
                                            designfilename:
                                                design.designfilename,
                                        },
                                    }}
                                >
                                    Update
                                </Link>
                            </button>
                        </td>
                    </tr>
                );
            });
            setContent(tempContent);
        } else {
            setContent(
                <tr className={tableStyles.notfound}>
                    <td colSpan="4">No Design Found yet</td>
                </tr>
            );
        }
    }, [searchedDesigns]);
    const deleteRequest = async (e) => {
        try {
            let designfilename = e;
            if (
                window.confirm("Are you sure you want to delete this design?")
            ) {
                setLoad(true);
                await axios
                    .delete(`/design/${designfilename}`)
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
            document.title = "Design";
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/design/`)
                .then(({ data }) => {
                    setLoad(false);
                    setDesigns(data);
                    console.log(data);
                    setSearchedDesigns(data);
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const onSearchChange = async (e) => {
        let str = e.target.value;
        str = str.toUpperCase();
        let tempDesigns = [];
        await designs.map((design) => {
            if (
                (design.catalogueno &&
                    design.catalogueno.toString().includes(str)) ||
                design.designno.includes(str) ||
                design.designfilename.includes(str) ||
                design.qualityname.includes(str)
            ) {
                tempDesigns.push(design);
            }
        });
        setSearchedDesigns([...tempDesigns]);
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
                    placeholder="Search Design"
                    autoFocus
                />
                <Link to="/design/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Design
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table
                    className="table table-bordered table-hover table-responsive"
                    style={{
                        width: "80%",
                        margin: "50px auto",
                        verticalAlign: "middle",
                    }}
                >
                    <tbody>
                        <tr>
                            <th>Catalogue No</th>
                            <th>Design No</th>
                            <th>Design File Name</th>
                            <th>Description</th>
                            <th>Quality</th>
                            <th>Manuf. Sell Price</th>
                            <th>Total Amount</th>
                            <th>Sell Price</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {content}
                    </tbody>
                </table>
            )}{" "}
        </div>
    );
}

export default Design;
