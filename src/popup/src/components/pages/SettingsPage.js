import React from "react";
import '../../styles/SettingsPage.css';

import { Link } from 'react-router-dom';
import BackButton from "../BackButton";

class SettingsPage extends React.Component{
    render()
    {
        console.log(this.props.history);
        return (
            <div className="page settingsPage">
                <BackButton {...this.props}/>
                <p className="Title">SETTINGS</p>
                <div className="settingsBtns">
                    <Link className="greyBtn" to="/websites"><p>Websites</p></Link>
                    <Link className="greyBtn" to="/history"><p>History</p></Link>
                    <div className="greyBtn"><p>Other preferences</p></div>
                    <div className="redBtn"><p>Delete all data</p></div>
                </div>
            </div>
        );
    }
}

export default SettingsPage;