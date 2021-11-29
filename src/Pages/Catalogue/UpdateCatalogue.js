import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import { useHistory, useLocation } from "react-router";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus.js";

function UpdateCatalogue() {
    const [catalogueNo, setCatalogueNo] = useState("");
    const [designNo, setDesignNo] = useState("");
    const [designs, setDesigns] = useState([]);
    const [designNos, setDesignNos] = useState([]);
    const [selectedDesigns, setSelectedDesigns] = useState([]);
    const [manufacturerPrice, setManufacturerPrice] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);
    const [maxManufacturerPrice, setMaxManufacturerPrice] = useState(0);
    const [maxSellPrice, setMaxSellPrice] = useState(0);
    const [load, setLoad] = useState(false);
    const history = useHistory();

    let location = useLocation();

    useEffect(async () => {
        try {
            document.title = "Update Catalogue";
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            let date = new Date();
            let strDate = date.toLocaleString().substr(0, 10);
            document.title = "HS " + strDate;
            document.addEventListener("wheel", function (event) {
                if (document.activeElement.type === "number")
                    document.activeElement.blur();
            });
            if (location.state) {
                setLoad(true);
                await axios
                    .get(`/catalogue/${location.state.catalogueno}/update/`)
                    .then(({ data }) => {
                        console.log(data);
                        setDesigns(data.designs);
                        setDesignNos(data.designnos);
                        let catalogue = data.catalogue;
                        setCatalogueNo(catalogue.catalogueno);
                        setDesignNo(catalogue.designno);
                        setManufacturerPrice(catalogue.manufacturerprice);
                        setSellPrice(catalogue.sellprice);
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

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .put(`/catalogue/${location.state.catalogueno}`, {
                    catalogueNo,
                    designNo,
                    manufacturerPrice,
                    sellPrice,
                })
                .then(() => {
                    setLoad(false);
                    history.push(`/catalogue`);
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
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
        if (
            event.keyCode === 27 &&
            window.confirm("Are you sure you want to add?")
        ) {
            onSubmitEvent();
        }
    };

    const onUpdateDesign = (e) => {
        let q = e.target.value;

        setDesignNo(null);
        let flag = false;
        designNos.map((design) => {
            if (!flag && design.designno === q) {
                setDesignNo(design.designno);
                flag = true;
            }
        });
    };

    useEffect(async () => {
        let tempSelectedDesigns = [];
        let tempMaxManufacturerPrice = 0;
        let tempMaxSellPrice = 0;
        if (designNo !== null) {
            await designs.map((design) => {
                if (design.designno === designNo) {
                    tempSelectedDesigns.push(design);
                    if (design.manufaturersellprice > tempMaxManufacturerPrice)
                        tempMaxManufacturerPrice = design.manufaturersellprice;
                    if (design.sellprice > tempMaxSellPrice)
                        tempMaxSellPrice = design.sellprice;
                }
            });
        }
        setMaxManufacturerPrice(tempMaxManufacturerPrice);
        setMaxSellPrice(tempMaxSellPrice);
        setSelectedDesigns([...tempSelectedDesigns]);
    }, [designNo]);

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
                    <table className="table table-bordered table-hover table-responsive">
                        <tbody>
                            <tr>
                                <td>Catalogu No</td>
                                <td>
                                    <input
                                        placeholder="Catalogue No"
                                        value={catalogueNo}
                                        onChange={(e) =>
                                            setCatalogueNo(
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        autoFocus
                                    />
                                </td>
                                <td>File Name</td>
                                <td>Total Amount Design</td>
                                <td>Manufacturer Price</td>
                                <td>Sell Price</td>
                            </tr>
                            <tr>
                                <td rowSpan={selectedDesigns.length + 1}>
                                    Design No
                                </td>
                                <td rowSpan={selectedDesigns.length + 1}>
                                    <input
                                        list="designlist"
                                        onChange={onUpdateDesign}
                                        value={designNo}
                                        autoCapitalize
                                        placeholder="Design No"
                                    />

                                    <datalist id="designlist">
                                        {designNos.length > 0 &&
                                            designNos.map((design) => (
                                                <option
                                                    value={design.designno}
                                                />
                                            ))}
                                    </datalist>
                                </td>
                            </tr>
                            {selectedDesigns.length > 0 &&
                                selectedDesigns.map((design) => (
                                    <tr>
                                        <td>{design.designfilename}</td>
                                        <td>{design.totalamountdesign}</td>
                                        <td>{design.manufaturersellprice}</td>
                                        <td>{design.sellprice}</td>
                                    </tr>
                                ))}
                            <tr>
                                <td>Manufacturer Price</td>
                                <td>
                                    <input
                                        type="number"
                                        value={manufacturerPrice}
                                        onChange={(e) =>
                                            setManufacturerPrice(e.target.value)
                                        }
                                    />
                                </td>
                                <td colSpan="4">
                                    Max Manufacturer Price :
                                    <b> {maxManufacturerPrice}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Sell Price</td>
                                <td>
                                    <input
                                        type="number"
                                        value={sellPrice}
                                        onChange={(e) =>
                                            setSellPrice(e.target.value)
                                        }
                                    />
                                </td>
                                <td colSpan="4">
                                    Max Sell Price :<b> {maxSellPrice}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            type="button"
                            onClick={onSubmitEvent}
                            className={buttonStyles.inputbutton}
                        >
                            Save
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default UpdateCatalogue;
