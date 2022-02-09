import React from "react";
import '../../styles/SettingsPage.css';

import { Link } from 'react-router-dom';
import BackButton from "../BackButton";

class SettingsPage extends React.Component{
    render()
    {
        return (
            <div className="page settingsPage">
                <BackButton route="/dashboard" />
                <p className="Title">SETTINGS</p>
                <div className="settingsBtns">
                    <Link className="greyBtn" to="/websites"><p>Websites</p></Link>
                    <div className="greyBtn"><p>History</p></div>
                    <div className="greyBtn"><p>Other preferences</p></div>
                    <div className="redBtn"><p>DELETE ALL DATA</p></div>
                </div>
            </div>
        );
    }
}

export default SettingsPage;