import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <p>
            This is not the page that you are looking for!
            <br />
            <Link to="/">Go Home</Link>
        </p>
    );
};

export default Page404;
