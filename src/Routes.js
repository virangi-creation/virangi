import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Page404 from "./Pages/NotFound/404Page";
import PrintSalesBill from "./Pages/SalesBill/PrintSalesBill";
import Login from "./Pages/Login/Login";
import InputSalesBill from "./Pages/SalesBill/InputSalesBill";
import SalesBill from "./Pages/SalesBill/SalesBill";
import UpdateSalesBill from "./Pages/SalesBill/UpdateSalesBill";
import Home from "./Pages/Home/Home";
import Bank from "./Pages/Bank/Bank";
import InputBank from "./Pages/Bank/InputBank";
import UpdateBank from "./Pages/Bank/UpdateBank";
import Party from "./Pages/Party/Party";
import InputParty from "./Pages/Party/InputParty";
import UpdateParty from "./Pages/Party/UpdateParty";
import Agent from "./Pages/Agent/Agent";
import InputAgent from "./Pages/Agent/InputAgent";
import UpdateAgent from "./Pages/Agent/UpdateAgent";
import InputChallan from "./Pages/Challan/InputChallan";
import Challan from "./Pages/Challan/Challan";
import UpdateChallan from "./Pages/Challan/UpdateChallan";
import PrintChallan from "./Pages/Challan/PrintChallan";
import YarnQuality from "./Pages/YarnQuality/YarnQuality";
import InputYarnQuality from "./Pages/YarnQuality/InputYarnQuality";
import UpdateYarnQuality from "./Pages/YarnQuality/UpdateYarnQuality";
import YarnShade from "./Pages/YarnShade/YarnShade";
import InputYarnShade from "./Pages/YarnShade/InputYarnShade";
import UpdateYarnShade from "./Pages/YarnShade/UpdateYarnShade";
import Quality from "./Pages/Quality/Quality";
import InputQuality from "./Pages/Quality/InputQuality";
import UpdateQuality from "./Pages/Quality/UpdateQuality";
import Design from "./Pages/Desgin/Design";
import InputDesign from "./Pages/Desgin/InputDesign";
import Harness from "./Pages/Harness/Harness";
import InputHarness from "./Pages/Harness/InputHarness";
import UpdateHarness from "./Pages/Harness/UpdateHarness";
import UpdateDesign from "./Pages/Desgin/UpdateDesign";
import PurchaseOrder from "./Pages/PurchaseOrder/PurchaseOrder";
import InputPurchaseOrder from "./Pages/PurchaseOrder/InputPurchaseOrder";
import UpdatePurchaseOrder from "./Pages/PurchaseOrder/UpdatePurchaseOrder";
import Nav from "./Containers/Nav";
import Catalogue from "./Pages/Catalogue/Catalogue";
import InputCatalogue from "./Pages/Catalogue/InputCatalogue";
import UpdateCatalogue from "./Pages/Catalogue/UpdateCatalogue";
import Firm from "./Pages/Firm/Firm";
import InputFirm from "./Pages/Firm/InputFirm";
import UpdateFirm from "./Pages/Firm/UpdateFirm";
import SalesOrder from "./Pages/SalesOrder/SalesOrder";
import InputSalesOrder from "./Pages/SalesOrder/InputSalesOrder";
import Matching from "./Pages/Matching/Matching";
import InputMatching from "./Pages/Matching/InputMatching";
import UpdateMatching from "./Pages/Matching/UpdateMatching";
import Machine from "./Pages/Machine/Machine";
import InputMachine from "./Pages/Machine/InputMachine";
import UpdateMachine from "./Pages/Machine/UpdateMachine";

export const siteMap = {
    HomePage: {
        title: "Home",
        path: "/",
        description: "My home page",
    },
};

const BrowserRoutes = ({ setLoggedIn, loggedIn }) => {
    let pathName = window.location.hash;
    pathName = pathName.split("/");
    pathName = pathName[pathName.length - 1];

    return (
        <div>
            {pathName !== "print" ? (
                <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            ) : null}
            <Switch>
                <Route path="/quality" exact component={Quality} />
                <Route path="/quality/add" exact component={InputQuality} />
                <Route path="/quality/update" exact component={UpdateQuality} />
                <Route path="/yarnshade" exact component={YarnShade} />
                <Route path="/yarnshade/add" exact component={InputYarnShade} />
                <Route
                    path="/yarnshade/update"
                    exact
                    component={UpdateYarnShade}
                />
                <Route path="/yarnquality" exact component={YarnQuality} />
                <Route
                    path="/yarnquality/add"
                    exact
                    component={InputYarnQuality}
                />
                <Route
                    path="/yarnquality/update"
                    exact
                    component={UpdateYarnQuality}
                />
                <Route path="/bank" exact component={Bank} />
                <Route path="/bank/add" exact component={InputBank} />
                <Route path="/bank/update" exact component={UpdateBank} />
                <Route path="/catalogue" exact component={Catalogue} />
                <Route path="/catalogue/add" exact component={InputCatalogue} />
                <Route
                    path="/catalogue/update"
                    exact
                    component={UpdateCatalogue}
                />
                <Route path="/party" exact component={Party} />
                <Route path="/party/add" exact component={InputParty} />
                <Route path="/party/update" exact component={UpdateParty} />
                <Route path="/firm" exact component={Firm} />
                <Route path="/firm/add" exact component={InputFirm} />
                <Route path="/firm/update" exact component={UpdateFirm} />
                <Route path="/agent" exact component={Agent} />
                <Route path="/agent/add" exact component={InputAgent} />
                <Route path="/agent/update" exact component={UpdateAgent} />
                <Route path="/design" exact component={Design} />
                <Route path="/design/add" exact component={InputDesign} />
                <Route path="/design/update" exact component={UpdateDesign} />
                <Route path="/harness" exact component={Harness} />
                <Route path="/harness/add" exact component={InputHarness} />
                <Route path="/harness/update" exact component={UpdateHarness} />
                <Route path="/machine" exact component={Machine} />
                <Route path="/machine/add" exact component={InputMachine} />
                <Route path="/machine/update" exact component={UpdateMachine} />
                <Route path="/salesorder" exact component={SalesOrder} />
                <Route
                    path="/salesorder/add"
                    exact
                    component={InputSalesOrder}
                />
                <Route
                    path="/salesorder/update"
                    exact
                    component={InputSalesOrder}
                />
                <Route path="/salesorder/print" exact component={SalesOrder} />

                <Route path="/purchaseorder" exact component={PurchaseOrder} />
                <Route
                    path="/purchaseorder/add"
                    exact
                    component={InputPurchaseOrder}
                />
                <Route
                    path="/salesbill/print"
                    exact
                    component={PrintSalesBill}
                />
                <Route path="/salesbill/add" exact component={InputSalesBill} />
                <Route path="/salesbill/" exact component={SalesBill} />
                <Route
                    path="/salesbill/update"
                    exact
                    component={UpdateSalesBill}
                />
                <Route path="/challan/print" exact component={PrintChallan} />
                <Route path="/challan/add" exact component={InputChallan} />
                <Route path="/challan/" exact component={Challan} />
                <Route path="/challan/update" exact component={UpdateChallan} />
                <Route
                    path="/purchaseorder/update"
                    exact
                    component={UpdatePurchaseOrder}
                />
                <Route path="/matching/add" exact component={InputMatching} />
                <Route
                    path="/matching/update"
                    exact
                    component={UpdateMatching}
                />
                {/* <Route path="/matching" exact component={Matching} /> */}
                <Route path="/login" exact>
                    {loggedIn && <Redirect to="/" />}
                    {!loggedIn && (
                        <Login
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn}
                            setLoggedIn={setLoggedIn}
                        />
                    )}
                </Route>
                <Route path="/" exact component={Home} />
                <Route component={Page404} />
            </Switch>
        </div>
    );
};

export default withRouter(BrowserRoutes);
