import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buttonStyles from "../../Modules/Button.module.css";
import tableStyles from "../../Modules/Table.module.css";
import inputStyles from "../../Modules/Input.module.css";
import axios from "../../axios.js";
import catchAxiosError from "../../Util/catchAxiosError.js";

function Catalogue() {
    const [catalogues, setCatalogues] = useState([]);
    const [searchedCatalogues, setSearchedCatalogues] = useState([]);
    const [load, setLoad] = useState(false);

    const deleteRequest = async (e) => {
        try {
            let catalogueNo = e;
            if (
                window.confirm(
                    "Are you sure you want to delete this Catalogue?"
                )
            ) {
                setLoad(true);
                await axios
                    .delete(`/catalogue/${catalogueNo}`)
                    .then(() => {
                        setLoad(false);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
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
            document.title = "Catalogue " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            setLoad(true);
            await axios
                .get(`/catalogue/`)
                .then((res) => {
                    setLoad(false);
                    console.log(res);
                    setCatalogues(res.data);
                    setSearchedCatalogues(res.data);
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
        let tempCatalogues = [];
        await catalogues.map((catalogue) => {
            let catNo = catalogue.catalogueno.toString();
            if (catNo.includes(str) || catalogue.designno.includes(str))
                tempCatalogues.push(catalogue);
        });
        setSearchedCatalogues([...tempCatalogues]);
    };

    return (
        <div
            className="margin"
            style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
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
                    placeholder="Search Catalogue"
                    autoFocus
                />
                <Link to="/catalogue/add">
                    <button type="button" className={buttonStyles.inputbutton}>
                        Add new Catalogue
                    </button>
                </Link>
            </div>
            {load && <div>Loading...</div>}
            {!load && (
                <table
                    className="table table-bordered table-hover table-responsive"
                    style={{ maxWidth: "80%", margin: "auto" }}
                >
                    <tbody>
                        <tr>
                            <th>Catalogue No</th>
                            <th>Design No</th>
                            <th>Manufacturer Cost Price</th>
                            <th>Sale Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchedCatalogues.length === 0 && (
                            <tr className={tableStyles.notfound}>
                                <td colSpan="4">No Catalogue Found yet</td>
                            </tr>
                        )}
                        {searchedCatalogues.length !== 0 &&
                            searchedCatalogues.map((catalogue) => {
                                return (
                                    <tr key={catalogue.catalogueno}>
                                        <td>{catalogue.catalogueno}</td>
                                        <td>{catalogue.designno}</td>
                                        <td>{catalogue.manufacturerprice}</td>
                                        <td>{catalogue.sellprice}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => {
                                                    deleteRequest(
                                                        catalogue.catalogueno
                                                    );
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-primary">
                                                {" "}
                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/catalogue/update",
                                                        state: {
                                                            catalogueno:
                                                                catalogue.catalogueno,
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

export default Catalogue;
