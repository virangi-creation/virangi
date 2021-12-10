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
import InputMachineProgram from "./Pages/Program/InputMachineProgram";
import PrintMachineProgram from "./Pages/Program/PrintMachineProgram";
import CostDesign from "./Pages/Desgin/CostDesign";
import UpdateMachineProgram from "./Pages/Program/UpdateMachineProgram";
import AddSimilarDesign from "./Pages/Desgin/AddSimilarDesign";
import MachineProgram from "./Pages/Program/MachineProgram";
import CloseMachineProgram from "./Pages/Program/CloseMachineProgram";
import InputUser from "./Pages/User/InputUser";

const BrowserRoutes = ({ setLoggedIn, loggedIn, user, setUser }) => {
    let pathName = window.location.hash;
    pathName = pathName.split("/");
    pathName = pathName[pathName.length - 1];
    return (
        <div>
            {pathName !== "print" ? (
                <Nav
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    user={user}
                    setUser={setUser}
                />
            ) : null}
            <Switch>
                <Route path="/quality" exact>
                    {user.qualityp ? <Quality /> : <Redirect to="/login" />}
                </Route>
                <Route path="/quality/add" exact>
                    {user.aqualityp ? (
                        <InputQuality />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/quality/update" exact>
                    {user.uqualityp ? (
                        <UpdateQuality />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/yarnshade" exact>
                    {user.yarnshadep ? <YarnShade /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/yarnshade/add" exact>
                    {user.ayarnshadep ? (
                        <InputYarnShade />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/yarnshade/update" exact>
                    {user.uyarnshadep ? (
                        <UpdateYarnShade />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/yarnquality" exact>
                    {user.yarnqualityp ? (
                        <YarnQuality />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/yarnquality/add" exact>
                    {user.ayarnqualityp ? (
                        <InputYarnQuality />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/yarnquality/update" exact>
                    {user.uyarnqualityp ? (
                        <UpdateYarnQuality />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/bank" exact>
                    {user.bankp ? <Bank /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/bank/add" exact>
                    {user.abankp ? <InputBank /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/bank/update" exact>
                    {user.ubankp ? <UpdateBank /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/catalogue" exact>
                    {user.cataloguep ? <Catalogue /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/catalogue/add" exact>
                    {user.acataloguep ? (
                        <InputCatalogue />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/catalogue/update" exact>
                    {user.ucataloguep ? (
                        <UpdateCatalogue />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/party" exact>
                    {user.partyp ? <Party /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/party/add" exact>
                    {user.apartyp ? <InputParty /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/party/update" exact>
                    {user.upartyp ? <UpdateParty /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/firm" exact>
                    {user.firmp ? <Firm /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/firm/add" exact>
                    {user.afirmp ? <InputFirm /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/firm/update" exact>
                    {user.ufirmp ? <UpdateFirm /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/agent" exact>
                    {user.agentp ? <Agent /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/agent/add" exact>
                    {user.aagentp ? <InputAgent /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/agent/update" exact>
                    {user.uagentp ? <UpdateAgent /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/design" exact>
                    {user.designp ? <Design /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/design/cost" exact>
                    {user.cdesignp ? <CostDesign /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/design/add" exact>
                    {user.adesignp ? <InputDesign /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/design/add/similar" exact>
                    {user.adesignp ? (
                        <AddSimilarDesign />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/design/update" exact>
                    {user.udesignp ? (
                        <UpdateDesign />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/harness" exact>
                    {user.harnessp ? <Harness /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/harness/add" exact>
                    {user.aharnessp ? (
                        <InputHarness />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/harness/update" exact>
                    {user.uharnessp ? (
                        <UpdateHarness />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/machine" exact>
                    {user.machinep ? <Machine /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/machine/add" exact>
                    {user.amachinep ? (
                        <InputMachine />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/machine/update" exact>
                    {user.umachinep ? (
                        <UpdateMachine />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/salesorder" exact>
                    {user.salesorderp ? (
                        <SalesOrder />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/salesorder/add" exact>
                    {user.asalesorderp ? (
                        <InputSalesOrder />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/salesorder/update" exact>
                    {user.usalesorderp ? (
                        <InputSalesOrder />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/salesorder/print" exact>
                    {user.psalesorderp ? (
                        <SalesOrder />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/purchaseorder" exact>
                    {user.purchaseorderp ? (
                        <PurchaseOrder />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/purchaseorder/add" exact>
                    {user.apurchaseorderp ? (
                        <InputPurchaseOrder />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/purchaseorder/update" exact>
                    {user.upurchaseorderp ? (
                        <UpdatePurchaseOrder />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/salesbill/print" exact>
                    {user.psalesbillp ? (
                        <PrintSalesBill />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/salesbill/add" exact>
                    {user.asalesbillp ? (
                        <InputSalesBill />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/salesbill/" exact>
                    {user.salesbillp ? <SalesBill /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/salesbill/update" exact>
                    {user.usalesbillp ? (
                        <UpdateSalesBill />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/challan/print" exact>
                    {user.pchallanp ? (
                        <PrintChallan />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/challan/add" exact>
                    {user.achallanp ? (
                        <InputChallan />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/challan/" exact>
                    {user.challanp ? <Challan /> : <Redirect to="/login" />}{" "}
                </Route>
                <Route path="/challan/update" exact>
                    {user.uchallanp ? (
                        <UpdateChallan />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/matching/add" exact>
                    {user.amatchingp ? (
                        <InputMatching />
                    ) : (
                        <Redirect to="/login" />
                    )}{" "}
                </Route>
                <Route path="/matching/update" exact>
                    {user.umatchingp ? (
                        <UpdateMatching />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/machineprogram" exact>
                    {user.matchingprogramp ? (
                        <MachineProgram />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/machineprogram/add" exact>
                    {user.amatchingprogramp ? (
                        <InputMachineProgram />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/machineprogram/close" exact>
                    {user.cmatchingprogramp ? (
                        <CloseMachineProgram />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/machineprogram/print" exact>
                    {user.pmatchingprogramp ? (
                        <PrintMachineProgram />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/machineprogram/update" exact>
                    {user.umatchingprogramp ? (
                        <UpdateMachineProgram />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="/user/create" exact>
                    {user.auserp ? <InputUser /> : <Redirect to="/login" />}
                </Route>
                {/* <Route path="/matching" exact >{user.matchingp?<Matching/>:<Redirect to="/login"/>} </Route> */}
                <Route path="/login" exact>
                    {loggedIn && <Redirect to="/" />}
                    {!loggedIn && (
                        <Login
                            user={user}
                            setUser={setUser}
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn}
                            setLoggedIn={setLoggedIn}
                        />
                    )}
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="*">
                    <Page404 />
                </Route>
            </Switch>
        </div>
    );
};

export default withRouter(BrowserRoutes);
