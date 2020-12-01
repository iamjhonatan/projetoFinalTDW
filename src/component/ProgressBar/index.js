import React from 'react';

function pad(value){
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
}

function ProgressBar(props){
    const backStyle = {
        width: props.width || "100%",
        height: props.height || "5px",
        backgroundColor: props.backColor || "lightgray"
    }

    const barStyle = {
        width: props.percent + "%",
        heigth: props.heigth || "5px",
        backgroungColor: props.barColor || "lightgreen"
    }

    return (
        <div id="progressBar" style={backStyle}>
            <div style={barStyle}> </div>
        </div>
    )
}

export default ProgressBar;
