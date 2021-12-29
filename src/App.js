import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        setLoggedIn(JSON.parse(window.localStorage.getItem("loggedIn")));
        setUser(JSON.parse(window.localStorage.getItem("rjuser")));
    }, []);

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
