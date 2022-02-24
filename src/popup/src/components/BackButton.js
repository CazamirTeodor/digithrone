import React from "react";
import BackIconBlack from '../assets/back_b.png';
import BackIconWhite from '../assets/back_w.png';
import { withRouter } from "react-router";
import '../styles/BackButton.css';

class BackButton extends React.Component{

    goBack = _ => {
        this.props.history.goBack();
    }

    render(){
        return (
            <div className="backBtn" onClick={this.goBack}>
                    <img className="backIcon" src={BackIconBlack} alt="backIcon" onMouseOver={e => {e.currentTarget.src = BackIconWhite}} onMouseOut={e => {e.currentTarget.src = BackIconBlack}}/>
            </div>
        );
    }
}

export default withRouter(BackButton);