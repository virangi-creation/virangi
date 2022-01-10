import React from "react";
import { Link } from "react-router-dom";
import logo from "./Pictures/logo.png";
import styles from "../Modules/Nav.module.css";
import { useHistory } from "react-router";

const Nav = ({ loggedIn, setLoggedIn, user, setUser }) => {
    const history = useHistory();

    const logout = () => {
        setLoggedIn(false);
        setUser({});
        window.localStorage.setItem("loggedIn", false);
        window.localStorage.setItem("rjuser", JSON.stringify({}));
        window.localStorage.setItem("vcpltokenrepier", "NA");
        history.push("/login");
        window.location.reload();
    };

    return (
        <nav id="navbar">
            <div className={styles.nav_align}>
                <div className="img">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Forum Logo"
                            height="75px"
                            width="auto"
                        />
                    </Link>
                </div>
                <div className="list_item">
                    <ul>
                        {(user.qualityp ||
                            user.yarnqualityp ||
                            user.yarnshadep ||
                            user.cdesignp ||
                            user.designp ||
                            user.harnessp ||
                            user.cataloguep ||
                            user.matchingp ||
                            user.machinep ||
                            user.machineprogram) && (
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>
                                    Inventory
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className={styles.dropdown_content}>
                                    {user.qualityp && (
                                        <Link to="/quality">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Quality
                                            </button>
                                        </Link>
                                    )}
                                    {user.yarnqualityp && (
                                        <Link to="/yarnquality">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Yarn Quality
                                            </button>
                                        </Link>
                                    )}
                                    {user.yarnshadep && (
                                        <Link to="/yarnshade">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Yarn Shade
                                            </button>
                                        </Link>
                                    )}
                                    {user.cdesignp && (
                                        <Link to="/design/cost">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Design Cost
                                            </button>
                                        </Link>
                                    )}
                                    {user.designp && (
                                        <Link to="/design">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Design
                                            </button>
                                        </Link>
                                    )}
                                    {user.harnessp && (
                                        <Link to="/harness">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Harness
                                            </button>
                                        </Link>
                                    )}
                                    {user.cataloguep && (
                                        <Link to="/catalogue">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Catalogue
                                            </button>
                                        </Link>
                                    )}
                                    {user.amatchingp && (
                                        <Link to="/matching">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Matching
                                            </button>
                                        </Link>
                                    )}
                                    {user.machinep && (
                                        <Link to="/machine">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Machine
                                            </button>
                                        </Link>
                                    )}
                                    {user.machineprogramp && (
                                        <Link to="/machineprogram/">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Machine Program
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                        {(user.bankp ||
                            user.partyp ||
                            user.agentp ||
                            user.firmp) && (
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>
                                    Accounts
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className={styles.dropdown_content}>
                                    {user.bankp && (
                                        <Link to="/bank">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Bank
                                            </button>
                                        </Link>
                                    )}
                                    {user.partyp && (
                                        <Link to="/party">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Party
                                            </button>
                                        </Link>
                                    )}
                                    {user.agentp && (
                                        <Link to="/agent">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Agent
                                            </button>
                                        </Link>
                                    )}
                                    {user.firmp && (
                                        <Link to="/firm">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Firm
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                        {(user.salesorderp ||
                            user.challanp ||
                            user.salesbillp) && (
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>
                                    Sales
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className={styles.dropdown_content}>
                                    {user.salesorderp && (
                                        <Link to="/salesorder">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Sales Order
                                            </button>
                                        </Link>
                                    )}
                                    {user.challanp && (
                                        <Link to="/challan">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Challan
                                            </button>
                                        </Link>
                                    )}
                                    {user.salesbillp && (
                                        <Link to="/salesbill">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Sales Bill
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                        {(user.purchaseorderp ||
                            user.purchasebillp ||
                            user.purchasechallanp) && (
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>
                                    Purchase
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className={styles.dropdown_content}>
                                    {user.purchaseorderp && (
                                        <Link to="/purchaseorder">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Purchase Orders
                                            </button>
                                        </Link>
                                    )}
                                    {user.purchasebillp && (
                                        <Link to="/party">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Purchase Bill
                                            </button>
                                        </Link>
                                    )}
                                    {user.purchasechallanp && (
                                        <Link to="/agent">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Purchase Challan
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                        {!loggedIn && (
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>
                                    Login
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className={styles.dropdown_content}>
                                    <Link to="/login">
                                        <button className={styles.nav_button}>
                                            Login
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                        {loggedIn && (
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>
                                    Log Out
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className={styles.dropdown_content}>
                                    {user.auserp && (
                                        <Link to="/user/create">
                                            <button
                                                className={styles.nav_button}
                                            >
                                                Create User
                                            </button>
                                        </Link>
                                    )}
                                    <Link to="/">
                                        <button
                                            className={styles.nav_button}
                                            onClick={logout}
                                        >
                                            Log Out
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
