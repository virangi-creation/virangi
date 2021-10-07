import React from "react";

function ContentPrototype({ content, heading, boldContent }) {
    return (
        <div className="content-prototype">
            <div className="heading">{heading}</div>
            <div className="colon">:</div>
            {boldContent ? (
                <div className="content">
                    <b>{content}</b>
                </div>
            ) : (
                <div className="content">
                    <span>{content}</span>
                </div>
            )}
        </div>
    );
}

export default ContentPrototype;
