import React, { useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import "./login.css";
import catchAxiosError from "../../Util/catchAxiosError";
import axios from "../../axios";

function Login({ login, logout }) {
    let [load, setLoad] = useState(false);
    let [username, setEmailAddress] = useState("");
    let [password, setPassword] = useState("");

    const onSubmitEvent = () => {
        try {
            setLoad(true);
            axios
                .post("/login", {
                    username,
                    password,
                })
                .then(({ data }) => {
                    setLoad(false);
                    login(data);
                })
                .catch((err) => {
                    setLoad(false);
                    logout();
                    catchAxiosError(err);
                });
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    return (
        <article>
            <main>
                {load && <div>Loading....</div>}
                {!load && (
                    <div>
                        <fieldset id="sign_up">
                            <legend>Login In</legend>
                            <div className="row1">
                                <label htmlFor="email-address">Email </label>
                                <div className="emailInput">
                                    {" "}
                                    :{" "}
                                    <input
                                        type="email"
                                        value={username}
                                        onChange={(e) =>
                                            setEmailAddress(e.target.value)
                                        }
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="row2">
                                <label htmlFor="password">Password </label>
                                <div className="emailInput">
                                    {" "}
                                    :{" "}
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <button
                            className={buttonStyles.inputbutton}
                            onClick={onSubmitEvent}
                            type="button"
                        >
                            Sign in
                        </button>
                    </div>
                )}
            </main>
        </article>
    );
}

export default Login;
