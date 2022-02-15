import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    let loggedInObject = JSON.parse(window.localStorage.getItem("loggedIn"));
    let rjUserObject = JSON.parse(window.localStorage.getItem("rjuser"));

    if (!loggedInObject) loggedInObject = false;

    if (!rjUserObject) rjUserObject = {};

    const [loggedIn, setLoggedIn] = useState(loggedInObject);
    const [user, setUser] = useState(rjUserObject);

    useEffect(() => {
        window.localStorage.setItem("loggedIn", loggedIn);
        window.localStorage.setItem("rjuser", JSON.stringify(user));
    }, [loggedIn]);

    return (
        <div>
            <Router>
                <Routes
                    setLoggedIn={setLoggedIn}
                    loggedIn={loggedIn}
                    user={user}
                    setUser={setUser}
                />
            </Router>
        </div>
    );
};

export default App;
