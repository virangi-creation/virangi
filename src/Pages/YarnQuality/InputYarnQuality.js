import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import buttonStyles from "../../Modules/Button.module.css";
import catchAxiosError from "../../Util/catchAxiosError.js";

function InputYarnQuality() {
    let history = useHistory();

    const [load, setLoad] = useState(false);

    const [qualityname, setQualityname] = useState("");
    const [denier, setDenier] = useState(0);
    const [price, setPrice] = useState(0);
    const [cartage, setCartage] = useState(0);
    const [gst, setGst] = useState(0);
    const [totalprice, setTotalprice] = useState(0);

    useEffect(() => {
        document.title = "Update Yarn Quality";
        document.addEventListener("wheel", function (event) {
            if (document.activeElement.type === "number") {
                document.activeElement.blur();
            }
        });
    }, []);

    const handleFocus = (event) => {
        event.target.select();
    };

    const onSubmitEvent = async () => {
        try {
            setLoad(true);
            await axios
                .post(`/yarnquality/`, {
                    qualityname,
                    denier,
                    price,
                    cartage,
                    gst,
                    totalprice,
                })
                .then((res) => {
                    setLoad(false);
                    history.push("/yarnquality");
                })
                .catch((err) => {
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    function captureEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    }

    useEffect(() => {
        let tempTotalPrice =
            (parseFloat(price) + parseFloat(cartage)) * (1 + gst / 100);
        setTotalprice(tempTotalPrice.toFixed(2));
    }, [gst, cartage, price]);

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
                    <table>
                        <tbody>
                            <tr>
                                <td>Quality Name</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Quality Name"
                                        value={qualityname}
                                        onChange={(e) => {
                                            setQualityname(
                                                e.target.value.toUpperCase()
                                            );
                                        }}
                                        onKeyDown={captureEnter}
                                        required
                                        onFocus={handleFocus}
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
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        count="0.01"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        onFocus={handleFocus}
                                        value={price}
                                        onChange={(e) => {
                                            setPrice(e.target.value);
                                        }}
                                        count="0.01"
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Cartage</td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="Cartage"
                                        onFocus={handleFocus}
                                        value={cartage}
                                        onChange={(e) => {
                                            setCartage(e.target.value);
                                        }}
                                        count="0.01"
                                        onKeyDown={captureEnter}
                                        required
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
                                        onFocus={handleFocus}
                                        onKeyDown={captureEnter}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Total Price</td>
                                <td>
                                    <input
                                        type="number"
                                        onFocus={handleFocus}
                                        placeholder="Total Price"
                                        value={totalprice}
                                        onKeyDown={captureEnter}
                                        required
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
                                        Add new Yarn Quality
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

export default InputYarnQuality;
