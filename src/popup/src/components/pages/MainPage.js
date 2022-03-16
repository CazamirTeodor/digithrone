import React from "react";
import Logo from "../../assets/logo_b.png";
import CookiesIcon from "../../assets/cookies-colored.png";
import HistoryIcon from "../../assets/history-colored.png";
import SwitchComponent from "../SwitchComponent";
import { Link, withRouter } from 'react-router-dom';
import "../../styles/MainPage.css";

import { getData, setCookies, setData, sendMessage } from "../Utils";
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
        getData((data) => {
            var updated = data;
            updated.logged_in = false;
            updated.active = false;
            sendMessage({ action: "Deactivate" }, null);
            setData(updated, () => {
                this.props.history.push('/login');
            });
        })
    }

    switchToggle = _ => {
        getData((data) => {
            data.active = !this.state.active;

            setData(data, () => {
                if (!this.state.active) {
                    setCookies(data.cookies, true);
                    sendMessage({ action: "Activate" }, null);
                }
                else {
                    setCookies(data.cookies, false);
                    sendMessage({ action: "Deactivate" }, null);
                }

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
                <section className="header">
                    <div className="Title">
                        <img className="Logo" src={Logo} alt="Logo" />
                        <p>DIGITHRONE</p>
                    </div>
                    <p className="Username">{this.state.name}</p>
                    <div className="logoutBtn" onClick={this.logout}>
                        <p>LOG OUT</p>
                    </div>
                </section>
                <section className="dashboard">
                    <Link to="/history">
                        <div className="dashboardBtn">
                            <img className="historyIcon" src={HistoryIcon} alt="historyIcon" />
                            <p>History</p>
                        </div>
                    </Link>
                    <SwitchComponent id="status" active={this.state.active} toggleFunction={this.switchToggle} />
                    <Link to="/cookies">
                        <div className="dashboardBtn">
                            <img className="cookiesIcon" src={CookiesIcon} alt="cookiesIcon" />
                            <p>Cookies</p>
                        </div>
                    </Link>
                </section>

            </div>
        );
    }
}

export default withRouter(MainPage);