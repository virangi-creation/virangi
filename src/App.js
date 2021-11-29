import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    // let pathname = window.location.hash;
    // pathname = pathname.split("/");
    // pathname = pathname[pathname.length - 1];

    useEffect(() => {
        setLoggedIn(JSON.parse(window.localStorage.getItem("loggedIn")));
    }, []);

    useEffect(() => {
        window.localStorage.setItem("loggedIn", loggedIn);
    }, [loggedIn]);

    return (
        <div>
            <Router>
                {/* {pathname !== "print" ? (
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                ) : null} */}
                <Routes setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
            </Router>
        </div>
    );
};

export default App;
