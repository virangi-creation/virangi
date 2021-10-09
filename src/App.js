import "./App.css";
import Nav from "./Containers/Nav";
import { useState, useEffect } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Bank from "./Pages/Bank/Bank";
import InputBank from "./Pages/Bank/InputBank";
import UpdateBank from "./Pages/Bank/UpdateBank";
import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import YarnQuality from "./Pages/YarnQuality/YarnQuality";
import InputYarnQuality from "./Pages/YarnQuality/InputYarnQuality";
import UpdateYarnQuality from "./Pages/YarnQuality/UpdateYarnQuality";
import YarnShade from "./Pages/YarnShade/YarnShade";
import InputYarnShade from "./Pages/YarnShade/InputYarnShade";
import UpdateYarnShade from "./Pages/YarnShade/UpdateYarnShade";
import Quality from "./Pages/Quality/Quality";
import InputQuality from "./Pages/Quality/InputQuality";
import UpdateQuality from "./Pages/Quality/UpdateQuality";
import Party from "./Pages/Party/Party";
import InputParty from "./Pages/Party/InputParty";
import UpdateParty from "./Pages/Party/UpdateParty";
import InputAgent from "./Pages/Agent/InputAgent";
import Agent from "./Pages/Agent/Agent";
import UpdateAgent from "./Pages/Agent/UpdateAgent";
import Design from "./Pages/Desgin/Design";
import InputDesign from "./Pages/Desgin/InputDesign";
import Harness from "./Pages/Harness/Harness";
import InputHarness from "./Pages/Harness/InputHarness";
import UpdateHarness from "./Pages/Harness/UpdateHarness";
import createBrowserHistory from "history/createBrowserHistory";

function App() {
    const history = createBrowserHistory();
    const [loggedIn, setLoggedIn] = useState(false);

    const logout = () => {
        setLoggedIn(false);
        window.localStorage.setItem("loggedIn", false);
        window.localStorage.setItem("vcpltokenrepier", "NA");
        history.push("/login");
        window.location.reload();
    };

    const login = (data) => {
        setLoggedIn(true);
        window.localStorage.setItem("loggedIn", true);
        window.localStorage.setItem("vcpltokenrepier", data.token);
        history.push("/");
        window.location.reload();
    };

    useEffect(() => {
        setLoggedIn(JSON.parse(window.localStorage.getItem("loggedIn")));
    }, []);

    useEffect(() => {
        window.localStorage.setItem("loggedIn", loggedIn);
    }, [loggedIn]);
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/quality" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <Quality />
                    </Route>
                    <Route path="/quality/add" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <InputQuality />
                    </Route>
                    <Route path="/quality/update" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <UpdateQuality />
                    </Route>
                    <Route path="/yarnshade" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <YarnShade />
                    </Route>
                    <Route path="/yarnshade/add" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <InputYarnShade />
                    </Route>
                    <Route path="/yarnshade/update" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <UpdateYarnShade />
                    </Route>
                    <Route path="/yarnquality" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <YarnQuality />
                    </Route>
                    <Route path="/yarnquality/add" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <InputYarnQuality />
                    </Route>
                    <Route path="/yarnquality/update" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <UpdateYarnQuality />
                    </Route>
                    <Route path="/bank" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <Bank />
                    </Route>
                    <Route path="/bank/add" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <InputBank />
                    </Route>
                    <Route path="/bank/update" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <UpdateBank />
                    </Route>
                    <Route path="/party" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <Party />
                    </Route>
                    <Route path="/party/add" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <InputParty />
                    </Route>
                    <Route path="/party/update" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <UpdateParty />
                    </Route>
                    <Route path="/agent" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <Agent />
                    </Route>
                    <Route path="/agent/add" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <InputAgent />
                    </Route>
                    <Route path="/agent/update" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <UpdateAgent />
                    </Route>
                    <Route path="/design" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <Design />
                    </Route>
                    <Route path="/design/add" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <InputDesign />
                    </Route>
                    <Route path="/design/update" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <UpdateAgent />
                    </Route>
                    <Route path="/harness" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <Harness />
                    </Route>
                    <Route path="/harness/add" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <InputHarness />
                    </Route>
                    <Route path="/harness/update" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        {loggedIn && <Redirect to="/login" />}
                        <UpdateHarness />
                    </Route>
                    <Route path="/login" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        {loggedIn && <Redirect to="/" />}
                        {!loggedIn && (
                            <Login
                                loggedIn={loggedIn}
                                logout={logout}
                                login={login}
                            />
                        )}
                    </Route>
                    <Route path="/" exact>
                        <Nav loggedIn={loggedIn} logout={logout} />
                        <Home />
                    </Route>
                    <Route path="*">
                        <Redirect to="/login" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
