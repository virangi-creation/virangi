import React from "react";

function CheckBoxComponent({
    id,
    checked,
    onChangeChecked,
    description,
    key1,
    index,
}) {
    return (
        <td rowSpan="1" className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={checked}
                id={id}
                onChange={() => onChangeChecked(key1, index)}
            />
            <label
                className="form-check-label"
                for={id}
                style={{ cursor: "pointer" }}
            >
                {description}
            </label>
        </td>
    );
}

export default CheckBoxComponent;
