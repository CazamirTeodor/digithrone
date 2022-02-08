import React from "react";
import '../styles/Switch.css';

class Switch extends React.Component {
    render()
    {
        return (
        <div>
            <label className="switch">
                <input type="checkbox" id={this.props.id}/>
                <span className="slider round"></span>
            </label>
        </div>
        );    
    }
}

export default Switch;