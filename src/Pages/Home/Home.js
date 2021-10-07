import React from "react";
import logo from "../../Containers/Pictures/logo.png";

const Home = () => {
    return (
        <div
            className="body-content"
            style={{ textAlign: "center", margin: "5% auto" }}
        >
            <div className=" module">
                <img src={logo} alt="Forum Logo" height="10%" width="54%" />
            </div>
        </div>
    );
};
export default Home;
