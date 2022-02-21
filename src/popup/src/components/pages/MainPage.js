/*global chrome*/
import React from "react";
import Logo from "../../assets/logo_b.png";
import SettingsIcon from "../../assets/settings_w.png";
import "../../styles/MainPage.css";
import StorageIndicator from "../StorageIndicator";
import SwitchComponent from "../SwitchComponent";
import { Link, withRouter } from 'react-router-dom';

class MainPage extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            name: null,
            active: false
        };

        chrome.storage.local.set({'loggedIn' : true});
    }

    componentDidMount(){
        chrome.storage.local.get(['data'], (data) => {
            this.setState({name: data['data']['name']});
        })
    }

    logout = _ => {
        chrome.storage.local.set({'loggedIn' : false}, () => {
            this.props.history.push('/login');
        })
    }

    render(){
        console.log("Dashboard rendered!");
        return (
            <div className="page mainPage" style={{backgroundColor: this.state.active?"#AFF8CE":"#F8AFAF", transition: "all .3s ease"}}>
                <img className="Logo" src={Logo} alt="Logo"/>
                <p className="Title">DIGITHRONE</p>
                <p className="Banner">WELCOME BACK,</p>
                <p className="Username">{this.state.name}</p>
                <p className="statusText">{this.state.active?"ON":"OFF"}</p>
                <div className="dashboard">
                    <StorageIndicator/>
                    <SwitchComponent id="status" updateFunction={(status) => {
                        this.setState({
                            active: status.target.checked
                        });
                    }}/>
                    <Link to="/settings">
                        <div className="settingsBtn">
                            <img className="settingsIcon" src={SettingsIcon} alt="settingsIcon"/>
                        </div>
                    </Link>
                </div>
                <div className="logoutBtn" onClick={this.logout}>
                    <p>LOG OUT</p>
                </div>
            </div>
        );
    }
}

export default withRouter(MainPage);