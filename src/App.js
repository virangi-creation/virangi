import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    console.log("1", user);
    useEffect(() => {
        setLoggedIn(JSON.parse(window.localStorage.getItem("loggedIn")));
        setUser(JSON.parse(window.localStorage.getItem("rjuser")));
        console.log("2", user);
    }, []);

    useEffect(() => {
        window.localStorage.setItem("loggedIn", loggedIn);
        window.localStorage.setItem("rjuser", JSON.stringify(user));
        console.log("3", user);
    }, [loggedIn]);

    return (
        <div>
            <Router>
                {/* {pathname !== "print" ? (
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                ) : null} */}
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
