import React, { useEffect, useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import catchAxiosError from "../../Util/catchAxiosError";
import axios from "../../axios";
import { useHistory } from "react-router";
import handleFocus from "../../Util/handleFocus";
import "./login.css";

function Login({ setLoggedIn, user, setUser }) {
    const history = useHistory();
    let [load, setLoad] = useState(false);
    let [username, setUserName] = useState("");
    let [password, setPassword] = useState("");

    console.log(user);

    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);
        window.localStorage.setItem("loggedIn", true);
        window.localStorage.setItem("rjuser", JSON.stringify(data.user));
        window.localStorage.setItem("vcpltokenrepier", data.token);
        history.push("/");
        window.location.reload();
    };
    const logout = () => {
        setLoggedIn(false);
        setUser({});
        window.localStorage.setItem("loggedIn", false);
        window.localStorage.setItem("rjuser", JSON.stringify({}));
        window.localStorage.setItem("vcpltokenrepier", "NA");
        history.push("/login");
        window.location.reload();
    };

    useEffect(() => {
        document.addEventListener("keydown", captureEnter, false);
        document.addEventListener("focus", handleFocus, true);
    }, []);

    const captureEnter = (event) => {
        let kC = event.keyCode;
        if (kC == 27 && window.confirm("Are you sure you want to Continue?"))
            onSubmitEvent();
        else if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    const onSubmitEvent = () => {
        try {
            setLoad(true);
            axios
                .post("/login", {
                    username,
                    password,
                })
                .then(({ data }) => {
                    console.log(data);
                    setLoad(false);
                    login(data);
                })
                .catch((err) => {
                    console.log(err);
                    logout();
                    setLoad(false);
                    catchAxiosError(err);
                });
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    return (
        <article>
            <form>
                <main>
                    {load && <div>Loading....</div>}
                    {!load && (
                        <div>
                            <fieldset className="sign_up" id="sign_up">
                                <legend>Login In</legend>
                                <div className="row1">
                                    <label htmlFor="email-address">Email</label>
                                    <div className="emailInput">
                                        :
                                        <input
                                            type="email"
                                            value={username}
                                            onChange={(e) =>
                                                setUserName(e.target.value)
                                            }
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="row2">
                                    <label htmlFor="password">Password </label>
                                    <div className="emailInput">
                                        :
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
            </form>
        </article>
    );
}

export default Login;
