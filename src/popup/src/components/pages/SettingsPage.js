import React from "react";
import '../../styles/SettingsPage.css';
import BackIconBlack from '../../assets/back_b.png';
import BackIconWhite from '../../assets/back_w.png';
import { Link } from 'react-router-dom';

class SettingsPage extends React.Component{
    render()
    {
        return (
            <div className="page settingsPage">
                <Link className="backBtn" to="/dashboard">
                    <img className="backIcon" src={BackIconBlack} alt="backIcon" onMouseOver={e => {e.currentTarget.src = BackIconWhite}} onMouseOut={e => {e.currentTarget.src = BackIconBlack}}/>
                </Link>
                <p className="Title">SETTINGS</p>
                <div className="settingsBtns">
                    <div className="greyBtn"><p>Websites</p></div>
                    <div className="greyBtn"><p>History</p></div>
                    <div className="greyBtn"><p>Other preferences</p></div>
                    <div className="redBtn"><p>DELETE ALL DATA</p></div>

                </div>
            </div>
        );
    }
}

export default SettingsPage;