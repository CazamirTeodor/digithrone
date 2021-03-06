import React from "react";
import '../styles/SwitchComponent.css';

class SwitchComponent extends React.Component {
    render()
    {
        return (
        <div>
            <label className="switch">
                <input type="checkbox" id={this.props.id} onChange={this.props.toggleFunction} checked={this.props.active}/>
                <span className="slider round"></span>
            </label>
        </div>
        );    
    }
}

export default SwitchComponent;