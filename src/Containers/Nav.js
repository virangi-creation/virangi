import React from "react";
import { Link } from "react-router-dom";
import logo from "./Pictures/logo.png";
import styles from "../Modules/Nav.module.css";
import { useHistory } from "react-router";

const Nav = ({ loggedIn, setLoggedIn }) => {
    const history = useHistory();

    const logout = () => {
        setLoggedIn(false);
        window.localStorage.setItem("loggedIn", false);
        window.localStorage.setItem("vcpltokenrepier", "NA");
        history.push("/login");
        window.location.reload();
    };

    return (
        <nav id="navbar">
            <div className={styles.nav_align}>
                <div className="img">
                    <Link to="/virangi/">
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
                        {loggedIn && (
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>
                                    Inventory
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className={styles.dropdown_content}>
                                    <Link to="/quality">
                                        <button className={styles.nav_button}>
                                            Quality
                                        </button>
                                    </Link>
                                    <Link to="/yarnquality">
                                        <button className={styles.nav_button}>
                                            Yarn Quality
                                        </button>
                                    </Link>
                                    <Link to="/yarnshade">
                                        <button className={styles.nav_button}>
                                            Yarn Shade
                                        </button>
                                    </Link>
                                    <Link to="/design">
                                        <button className={styles.nav_button}>
                                            Design
                                        </button>
                                    </Link>
                                    <Link to="/harness">
                                        <button className={styles.nav_button}>
                                            Harness
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                        {loggedIn && (
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>
                                    Accounts
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div className={styles.dropdown_content}>
                                    <Link to="/bank">
                                        <button className={styles.nav_button}>
                                            Bank
                                        </button>
                                    </Link>
                                    <Link to="/party">
                                        <button className={styles.nav_button}>
                                            Party
                                        </button>
                                    </Link>
                                    <Link to="/agent">
                                        <button className={styles.nav_button}>
                                            Agent
                                        </button>
                                    </Link>
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
