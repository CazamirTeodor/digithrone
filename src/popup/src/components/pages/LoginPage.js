import React from "react";
import LoginForm from "../LoginForm";
import Logo from "../../assets/logo_w.png";

class LoginPage extends React.Component {
    render(){
        return (
            <div className="loginPage">
                <img className="Logo" src={Logo} alt="Logo"/>
                <p className="Title">DIGITHRONE</p>
                <LoginForm />
            </div>
        );
    }
}

export default LoginPage;