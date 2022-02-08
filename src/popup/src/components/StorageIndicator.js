import React from "react";
import '../styles/StorageIndicator.css';

class StorageIndicator extends React.Component {
    render(){
        var current = "0.7";
        var maximum = "2.0";
        var unit = "GB"
        return (
            <div className="storageIndicator">
                <p>{current} / {maximum} {unit}</p>
            </div>
        );
    }
}

export default StorageIndicator;