/*global chrome*/
import React from "react";
import Logo from "../../assets/logo_b.png";
import SettingsIcon from "../../assets/settings_w.png";
import StorageIndicator from "../StorageIndicator";
import SwitchComponent from "../SwitchComponent";
import { Link, withRouter } from 'react-router-dom';
import { setCookies } from "../Utils";
import "../../styles/MainPage.css";

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.location.state) {
            this.state = {
                active: this.props.location.state.active,
                name: this.props.location.state.name
            };
        }
        else {
            this.state = {
                active: this.props.data.active,
                name: this.props.data.name
            };
        }


    }

    logout = _ => {
        chrome.storage.local.get(['data'], (result) => {
            var updated = result.data;
            updated.logged_in = false;
            updated.active = false;
            chrome.storage.local.set({ data: updated }, () => {
                this.props.history.push('/login');
            })
        })
    }

    switchToggle = _ => {
        chrome.storage.local.get(['data'], (result) => {
            result.data.active = !this.state.active;
            chrome.storage.local.set({ data: result.data }, () => {
                if (!this.state.active)
                    setCookies(result.data.cookies, true);
                else
                    setCookies(result.data.cookies, false);

                this.setState({ active: !this.state.active });
            });
        })
    }

    render() {
        /*
        chrome.cookies.getAllCookieStores((result) => console.log('All Cookie Stores: ', result));
        chrome.cookies.getAll({
            storeId : '0'
        }, (result) => console.log(result))
        */
        return (
            <div className="page mainPage" style={{ backgroundColor: this.state.active ? "#AFF8CE" : "#F8AFAF", transition: "all .3s ease" }}>
                <img className="Logo" src={Logo} alt="Logo" />
                <p className="Title">DIGITHRONE</p>
                <p className="Banner">WELCOME BACK,</p>
                <p className="Username">{this.state.name}</p>
                <p className="statusText">{this.state.active ? "ON" : "OFF"}</p>
                <div className="dashboard">
                    <StorageIndicator />
                    <SwitchComponent id="status" active={this.state.active} toggleFunction={this.switchToggle} />
                    <Link to="/settings">
                        <div className="settingsBtn">
                            <img className="settingsIcon" src={SettingsIcon} alt="settingsIcon" />
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