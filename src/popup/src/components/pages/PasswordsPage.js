import React from "react";
import '../../styles/SettingsPage.css';

import { Link } from 'react-router-dom';
import BackButton from "../BackButton";

class PasswordsPage extends React.Component{
    render()
    {
        return (
            <div className="page settingsPage">
                <BackButton {...this.props}/>
                <p className="Title">SETTINGS</p>
                <div className="settingsBtns">
                    <Link className="greyBtn" to="/websites"><p>Websites</p></Link>
                    <Link className="greyBtn" to="/history"><p>History</p></Link>
                </div>
            </div>
        );
    }
}

export default PasswordsPage;