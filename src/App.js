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

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(JSON.parse(window.localStorage.getItem("loggedIn")));
    }, []);

    useEffect(() => {
        window.localStorage.setItem("loggedIn", loggedIn);
    }, [loggedIn]);
    return (
        <Router>
            <Switch>
                <Route path="/quality" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <Quality />
                </Route>
                <Route path="/quality/add" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <InputQuality />
                </Route>
                <Route path="/quality/update" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <UpdateQuality />
                </Route>
                <Route path="/yarnshade" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <YarnShade />
                </Route>
                <Route path="/yarnshade/add" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <InputYarnShade />
                </Route>
                <Route path="/yarnshade/update" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <UpdateYarnShade />
                </Route>
                <Route path="/yarnquality" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <YarnQuality />
                </Route>
                <Route path="/yarnquality/add" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <InputYarnQuality />
                </Route>
                <Route path="/yarnquality/update" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <UpdateYarnQuality />
                </Route>
                <Route path="/bank" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <Bank />
                </Route>
                <Route path="/bank/add" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <InputBank />
                </Route>
                <Route path="/bank/update" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <UpdateBank />
                </Route>
                <Route path="/party" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <Party />
                </Route>
                <Route path="/party/add" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <InputParty />
                </Route>
                <Route path="/party/update" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <UpdateParty />
                </Route>
                <Route path="/agent" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <Agent />
                </Route>
                <Route path="/agent/add" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <InputAgent />
                </Route>
                <Route path="/agent/update" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <UpdateAgent />
                </Route>
                <Route path="/design" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <Design />
                </Route>
                <Route path="/design/add" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <InputDesign />
                </Route>
                <Route path="/design/update" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <UpdateAgent />
                </Route>
                <Route path="/harness" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <Harness />
                </Route>
                <Route path="/harness/add" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <InputHarness />
                </Route>
                <Route path="/harness/update" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    {loggedIn && <Redirect to="/login" />}
                    <UpdateHarness />
                </Route>
                <Route path="/login" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    {loggedIn && <Redirect to="/" />}
                    {!loggedIn && (
                        <Login
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn}
                            setLoggedIn={setLoggedIn}
                        />
                    )}
                </Route>
                <Route path="/" exact>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <Home />
                </Route>
                <Route path="*">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
