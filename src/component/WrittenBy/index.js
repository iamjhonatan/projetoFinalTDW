import React from "react";

function WrittenBy(props) {
    return (
        <address>
            Written by <a href={"mailto:" + props.email}>{props.email}</a>
        </address>
    )
}

export default WrittenBy;