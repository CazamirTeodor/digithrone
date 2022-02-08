import React from "react";
import Logo from "../../assets/logo_b.png";
import SettingsIcon from "../../assets/settings_w.png";
import "../../styles/MainPage.css";
import StorageIndicator from "../StorageIndicator";
import SwitchComponent from "../SwitchComponent";
import { withRouter } from 'react-router-dom';

class MainPage extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            active: false
        };
    }

    

    render(){
        return (
            <div className="page mainPage" style={{backgroundColor: this.state.active?"#AFF8CE":"#F8AFAF", transition: "all .3s ease"}}>
                <img className="Logo" src={Logo} alt="Logo"/>
                <p className="Title">DIGITHRONE</p>
                <p className="Banner">WELCOME BACK,</p>
                <p className="Username">{this.props.username}</p>
                <p className="statusText">{this.state.active?"ON":"OFF"}</p>
                <div className="dashboard">
                    <StorageIndicator/>
                    <SwitchComponent id="status" updateFunction={(status) => {
                        this.setState({
                            active: status.target.checked
                        });
                    }}/>
                    <div className="settingsBtn">
                        <img className="settingsIcon" src={SettingsIcon} alt="settingsIcon"/>
                    </div>
                </div>
                <div className="logoutBtn" onClick={() => this.props.history.push("/")}>
                    <p>LOG OUT</p>
                </div>
            </div>
        );
    }
}

export default withRouter(MainPage);