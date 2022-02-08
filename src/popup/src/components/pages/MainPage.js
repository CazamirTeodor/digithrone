import React from "react";
import Logo from "../../assets/logo_b.png";
import SettingsIcon from "../../assets/settings_w.png";
import "../../styles/MainPage.css";
import StorageIndicator from "../StorageIndicator";
import Switch from "../Switch";

class MainPage extends React.Component {
    render(){
        return (
            <div className="mainPage">
                <img className="Logo" src={Logo} alt="Logo"/>
                <p className="Title">DIGITHRONE</p>
                <p className="Banner">WELCOME BACK,</p>
                <p className="Username">{this.props.username}</p>
                <div className="dashboard">
                    <StorageIndicator/>
                    <Switch id="status"/>
                    <div className="settingsBtn">
                        <img className="settingsIcon" src={SettingsIcon} alt="settingsIcon"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;