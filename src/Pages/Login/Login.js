import React, { useState } from "react";
import buttonStyles from "../../Modules/Button.module.css";
import "./login.css";

function Login({ setLoggedIn, loggedIn, validateLogin }) {
    let [emailAddress, setEmailAddress] = useState("");
    let [password, setPassword] = useState("");

    const onSubmitEvent = (event) => {
        validateLogin(emailAddress, password);
    };

    console.log();

    return (
        <article>
            <main>
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
                                    value={emailAddress}
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
            </main>
        </article>
    );
}

export default Login;
