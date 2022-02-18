import React from "react";
import LoginForm from "../LoginForm";
import Logo from "../../assets/logo_fill_w.png";
import "../../styles/LoginPage.css";
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
    render(){
        return (
            <div className="page loginPage">
                <img className="Logo" src={Logo} alt="Logo"/>
                <p className="Title">DIGITHRONE</p>
                <LoginForm {...this.props}/>
            </div>
        );
    }
}

export default withRouter(LoginPage);