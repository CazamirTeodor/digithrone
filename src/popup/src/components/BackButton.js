import React from "react";
import { Link } from "react-router-dom";
import BackIconBlack from '../assets/back_b.png';
import BackIconWhite from '../assets/back_w.png';
import '../styles/BackButton.css';

class BackButton extends React.Component{
    render(){
        return (
            <Link className="backBtn" to={this.props.route}>
                    <img className="backIcon" src={BackIconBlack} alt="backIcon" onMouseOver={e => {e.currentTarget.src = BackIconWhite}} onMouseOut={e => {e.currentTarget.src = BackIconBlack}}/>
            </Link>
        );
    }
}

export default BackButton;