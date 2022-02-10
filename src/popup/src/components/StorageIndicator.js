import React from "react";
import '../styles/StorageIndicator.css';

class StorageIndicator extends React.Component {
    render(){
        var current = 0.5;
        var maximum = 1.0;
        return (
            <div className="storageIndicator">
                <div className="cercle" style={{bottom : `${current / maximum * 100}%`}}></div>
                <p>{current / maximum * 100}%</p>
            </div>
        );
    }
}

export default StorageIndicator;