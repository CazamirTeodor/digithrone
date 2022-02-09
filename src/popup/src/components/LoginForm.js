import React from "react";

class LoginForm extends React.Component{

    login = () => {
        this.props.history.push("/dashboard");
    }

    render(){
        return (
            <form className="loginForm">
                <input type="text" id="email" placeholder="Email"></input>
                <input type="password" id="password" placeholder="Password"></input>
                <div className="loginBtn" onClick={this.login}>
                    <p>LOG IN</p>
                </div>
            </form>
        );
    }
}

export default LoginForm;