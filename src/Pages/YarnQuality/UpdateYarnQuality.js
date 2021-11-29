import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import buttonStyles from "../../Modules/Button.module.css";
import catchAxiosError from "../../Util/catchAxiosError.js";
import handleFocus from "../../Util/handleFocus";

function UpdateYarnQuality() {
    let history = useHistory();
    let location = useLocation();

    const [load, setLoad] = useState(false);
    const [qualityid, setQualityid] = useState(0);
    const [qualityname, setQualityname] = useState("");
    const [denier, setDenier] = useState(0);
    const [price, setPrice] = useState(0);
    const [cartage, setCartage] = useState(0);
    const [gst, setGst] = useState(0);
    const [totalprice, setTotalprice] = useState(0);

    useEffect(() => {
        try {
            document.addEventListener("keydown", captureEnter, false);
            document.addEventListener("focus", handleFocus, true);
            document.title = "Update Yarn Quality";
            if (location.state) {
                setQualityid(location.state.qualityid);
                setQualityname(location.state.qualityname);
                setDenier(location.state.denier);
                setPrice(location.state.price);
                setCartage(location.state.cartage);
                setGst(location.state.gst);
                setTotalprice(location.state.totalprice);
            }
        } catch (err) {
            alert(err.message);
        }
    }, []);

    const onSubmitEvent = async () => {
        setLoad(true);
        await axios
            .put(`/yarnquality/${qualityid}`, {
                qualityid,
                qualityname,
                denier,
                price,
                cartage,
                gst,
                totalprice,
            })
            .then(() => {
                setLoad(false);
                history.push("/yarnquality");
            })
            .catch((err) => {
                setLoad(false);
                catchAxiosError(err);
            });
    };

    const captureEnter = (event) => {
        let kC = event.keyCode;
        if (kC == 27 && window.confirm("Are you sure you want to save?"))
            onSubmitEvent();
        else if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    useEffect(() => {
        let tempTotalPrice =
            (parseFloat(price) + parseFloat(cartage)) * (1 + gst / 100);
        setTotalprice(tempTotalPrice.toFixed(2));
    }, [price, cartage, gst]);

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
                                <td>Quality Name</td>
                                <td>
                                    <input
                                        placeholder="Quality Name"
                                        value={qualityname}
                                        onChange={(e) => {
                                            setQualityname(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        autoFocus
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Denier</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Denier"
                                        value={denier}
                                        onChange={(e) => {
                                            setDenier(e.target.value);
                                        }}
                                        count="0.01"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={price}
                                        onChange={(e) => {
                                            setPrice(e.target.value);
                                        }}
                                        count="0.01"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Cartage</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Cartage"
                                        value={cartage}
                                        onChange={(e) => {
                                            setCartage(e.target.value);
                                        }}
                                        count="0.01"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>GST</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="GST %"
                                        value={gst}
                                        count="0.01"
                                        onChange={(e) => {
                                            setGst(e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Total Price</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Total Price"
                                        value={totalprice}
                                        count="0.01"
                                        readOnly="read-only"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button
                                        type="button"
                                        className={buttonStyles.inputbutton}
                                        onClick={onSubmitEvent}
                                    >
                                        Update Yarn Quality
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            )}
        </div>
    );
}

export default UpdateYarnQuality;
